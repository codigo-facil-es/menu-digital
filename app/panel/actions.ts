"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) redirect("/panel/entrar?error=1");
  redirect("/panel");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/panel/entrar");
}

/** Activa o desactiva «agotado» / «recomendado». La seguridad la pone Supabase (RLS): solo el dueño puede. */
export async function toggleDish(id: string, field: "available" | "recommended", value: boolean) {
  const supabase = await createClient();
  await supabase.from("dishes").update({ [field]: value }).eq("id", id);
  revalidatePath("/panel");
}

export async function updatePrice(formData: FormData) {
  const supabase = await createClient();
  const euros = Number(String(formData.get("price")).replace(",", "."));
  if (!Number.isFinite(euros) || euros < 0) return;
  await supabase.from("dishes").update({ price_cents: Math.round(euros * 100) }).eq("id", String(formData.get("id")));
  revalidatePath("/panel");
}

export async function createDish(formData: FormData) {
  const supabase = await createClient();
  const { data: restaurant } = await supabase.from("restaurants").select("id").single();
  if (!restaurant) return;

  // La foto va a Supabase Storage; en la carta guardamos su dirección pública.
  let image_url: string | null = null;
  const photo = formData.get("photo") as File | null;
  if (photo && photo.size > 0) {
    const path = `${restaurant.id}/${crypto.randomUUID()}-${photo.name}`;
    const { error } = await supabase.storage.from("platos").upload(path, photo);
    if (!error) image_url = supabase.storage.from("platos").getPublicUrl(path).data.publicUrl;
  }

  await supabase.from("dishes").insert({
    restaurant_id: restaurant.id,
    category_id: String(formData.get("category_id")),
    name: String(formData.get("name")),
    description: String(formData.get("description") ?? ""),
    price_cents: Math.round(Number(String(formData.get("price")).replace(",", ".")) * 100),
    allergens: formData.getAll("allergens").map(String),
    image_url,
    position: 99,
  });
  redirect("/panel");
}

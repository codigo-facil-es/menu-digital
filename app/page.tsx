import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import LiveMenu from "@/components/LiveMenu";

async function Menu() {
  const supabase = await createClient();
  const { data: restaurant } = await supabase.from("restaurants").select("id, slug, name").single();
  if (!restaurant) return <p className="p-8">Todavía no hay ninguna carta.</p>;

  const { data: categories } = await supabase.from("categories").select("id, name, position").order("position");
  const { data: dishes } = await supabase.from("dishes").select("*").order("position");

  return <LiveMenu restaurant={restaurant} categories={categories ?? []} initialDishes={dishes ?? []} />;
}

export default function MenuPage() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-stone-500">Cargando la carta…</p>}>
      <Menu />
    </Suspense>
  );
}

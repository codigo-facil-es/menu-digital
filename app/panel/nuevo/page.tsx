import { Suspense } from "react";
import Loading from "@/components/Loading";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ALLERGENS } from "@/lib/allergens";
import { createDish } from "../actions";

const field = "w-full rounded-xl border border-stone-300 px-4 py-3";

async function NewDishForm() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("id, name").order("position");

  return (
    <main className="mx-auto max-w-lg px-4 py-8">
      <Link href="/panel" className="text-sm text-stone-500">← Volver</Link>
      <h1 className="mb-6 mt-2 font-serif text-3xl font-bold text-stone-900">Nuevo plato</h1>
      <form action={createDish} className="space-y-4">
        <input name="name" required placeholder="Nombre" className={field} />
        <textarea name="description" placeholder="Descripción" className={field} />
        <div className="flex gap-3">
          <input name="price" required inputMode="decimal" placeholder="Precio (€)" className={field} />
          <select name="category_id" className={field}>
            {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <fieldset>
          <legend className="mb-2 font-semibold text-stone-900">Alérgenos</legend>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(ALLERGENS).map(([key, a]) => (
              <label key={key} className="flex items-center gap-2">
                <input type="checkbox" name="allergens" value={key} /> {a.icon} {a.label}
              </label>
            ))}
          </div>
        </fieldset>
        <input name="photo" type="file" accept="image/*" className="text-sm" />
        <button className="w-full rounded-xl bg-amber-600 px-4 py-3 font-bold text-white hover:bg-amber-700">Guardar plato</button>
      </form>
    </main>
  );
}

export default function NewDishPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NewDishForm />
    </Suspense>
  );
}

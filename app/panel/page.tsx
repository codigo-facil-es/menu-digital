import { Suspense } from "react";
import Loading from "@/components/Loading";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/price";
import type { Dish } from "@/lib/types";
import { signOut, toggleDish, updatePrice } from "./actions";

async function Panel() {
  const supabase = await createClient();
  const { data: restaurant } = await supabase.from("restaurants").select("name").single();
  const { data: categories } = await supabase.from("categories").select("id, name").order("position");
  const { data: dishes } = await supabase.from("dishes").select("*").order("position");

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-bold text-stone-900">{restaurant?.name}</h1>
        <nav className="flex gap-2 text-sm font-bold">
          <Link href="/panel/nuevo" className="rounded-xl bg-amber-600 px-4 py-2 text-white">+ Nuevo plato</Link>
          <form action={signOut}>
            <button className="rounded-xl px-3 py-2 text-stone-500">Salir</button>
          </form>
        </nav>
      </header>

      {categories?.map((category) => (
        <section key={category.id} className="mb-6">
          <h2 className="mb-2 font-serif text-xl font-bold text-amber-800">{category.name}</h2>
          <ul className="divide-y divide-stone-200 rounded-2xl bg-white shadow-sm">
            {(dishes as Dish[])
              .filter((d) => d.category_id === category.id)
              .map((dish) => (
                <li key={dish.id} className="flex flex-wrap items-center gap-3 p-3">
                  <span className="min-w-0 flex-1 font-semibold text-stone-900">{dish.name}</span>

                  <form action={updatePrice} className="flex items-center gap-1">
                    <input type="hidden" name="id" value={dish.id} />
                    <input name="price" defaultValue={(dish.price_cents / 100).toFixed(2).replace(".", ",")} aria-label={`Precio de ${dish.name} (ahora ${formatPrice(dish.price_cents)})`}
                      className="w-20 rounded-lg border border-stone-300 px-2 py-1 text-right" />
                    <span className="text-stone-500">€</span>
                  </form>

                  <form action={toggleDish.bind(null, dish.id, "recommended", !dish.recommended)}>
                    <button className={`rounded-lg px-3 py-1 text-sm font-bold ${dish.recommended ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-500"}`}>
                      ★ Recomendado
                    </button>
                  </form>
                  <form action={toggleDish.bind(null, dish.id, "available", !dish.available)}>
                    <button className={`rounded-lg px-3 py-1 text-sm font-bold ${dish.available ? "bg-stone-100 text-stone-500" : "bg-stone-800 text-white"}`}>
                      Agotado
                    </button>
                  </form>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

export default function PanelPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Panel />
    </Suspense>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Category, Dish, Restaurant } from "@/lib/types";
import DishCard from "@/components/DishCard";

type Props = { restaurant: Restaurant; categories: Category[]; initialDishes: Dish[] };

export default function LiveMenu({ restaurant, categories, initialDishes }: Props) {
  const [dishes, setDishes] = useState(initialDishes);

  // Tiempo real: cuando el restaurante cambia un plato, la carta se actualiza sola.
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("carta")
      .on("postgres_changes", { event: "*", schema: "public", table: "dishes" }, (change) => {
        if (change.eventType === "DELETE") {
          setDishes((list) => list.filter((d) => d.id !== change.old.id));
        } else {
          const dish = change.new as Dish;
          setDishes((list) => [...list.filter((d) => d.id !== dish.id), dish]);
        }
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="mx-auto max-w-md px-4 pb-16">
      <header className="py-8 text-center">
        <p className="text-sm uppercase tracking-widest text-amber-700">Carta</p>
        <h1 className="font-serif text-4xl font-bold text-stone-900">{restaurant.name}</h1>
      </header>

      {categories.map((category) => {
        const list = dishes
          .filter((d) => d.category_id === category.id)
          .sort((a, b) => Number(b.available) - Number(a.available) || a.position - b.position);
        if (list.length === 0) return null;
        return (
          <section key={category.id} className="mb-8">
            <h2 className="mb-3 border-b border-amber-200 pb-1 font-serif text-2xl font-bold text-amber-800">{category.name}</h2>
            <ul className="space-y-3">
              {list.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}

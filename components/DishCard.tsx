import { ALLERGENS } from "@/lib/allergens";
import { formatPrice } from "@/lib/price";
import type { Dish } from "@/lib/types";

export default function DishCard({ dish }: { dish: Dish }) {
  return (
    <li className={`flex gap-3 rounded-2xl bg-white p-3 shadow-sm transition ${dish.available ? "" : "opacity-50 grayscale"}`}>
      {dish.image_url && (
        // eslint-disable-next-line @next/next/no-img-element -- fotos subidas por el restaurante
        <img src={dish.image_url} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-stone-900">{dish.name}</h3>
          <span className="font-semibold text-stone-900">{formatPrice(dish.price_cents)}</span>
        </div>
        <p className="text-sm text-stone-600">{dish.description}</p>
        <div className="mt-2 flex flex-wrap gap-1 text-xs">
          {!dish.available && <span className="rounded-full bg-stone-800 px-2 py-0.5 font-bold text-white">Agotado</span>}
          {dish.available && dish.recommended && (
            <span className="rounded-full bg-amber-500 px-2 py-0.5 font-bold text-white">★ Recomendado</span>
          )}
          {dish.allergens.map((a) => (
            <span key={a} className="rounded-full bg-stone-100 px-2 py-0.5 text-stone-700">
              {ALLERGENS[a]?.icon} {ALLERGENS[a]?.label ?? a}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

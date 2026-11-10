/** Los 14 alérgenos que los restaurantes de la UE deben indicar (Reglamento UE 1169/2011). */
export const ALLERGENS: Record<string, { label: string; icon: string }> = {
  gluten: { label: "Gluten", icon: "🌾" },
  crustaceos: { label: "Crustáceos", icon: "🦐" },
  huevos: { label: "Huevos", icon: "🥚" },
  pescado: { label: "Pescado", icon: "🐟" },
  cacahuetes: { label: "Cacahuetes", icon: "🥜" },
  soja: { label: "Soja", icon: "🫘" },
  leche: { label: "Leche", icon: "🥛" },
  "frutos-de-cascara": { label: "Frutos de cáscara", icon: "🌰" },
  apio: { label: "Apio", icon: "🥬" },
  mostaza: { label: "Mostaza", icon: "🟡" },
  sesamo: { label: "Sésamo", icon: "⚪" },
  sulfitos: { label: "Sulfitos", icon: "🍷" },
  altramuces: { label: "Altramuces", icon: "🌼" },
  moluscos: { label: "Moluscos", icon: "🦑" },
};

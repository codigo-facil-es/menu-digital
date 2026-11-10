export type Dish = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price_cents: number;
  allergens: string[];
  image_url: string | null;
  available: boolean;
  recommended: boolean;
  position: number;
};

export type Category = { id: string; name: string; position: number };

export type Restaurant = { id: string; slug: string; name: string };

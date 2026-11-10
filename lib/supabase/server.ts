import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { connection } from "next/server";

/** Supabase en el servidor (páginas y Server Actions): lee y renueva la sesión desde las cookies. */
export async function createClient() {
  await connection(); // datos de esta visita: se generan al momento, no al compilar
  const cookieStore = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Desde una página no se pueden escribir cookies: ya las renueva proxy.ts.
        }
      },
    },
  });
}

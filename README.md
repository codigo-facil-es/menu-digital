# La Taberna de Codi · carta digital autogestionable

El código del tutorial de [Código Fácil](https://www.codigofacil.es/aprender) **«Menú digital autogestionable»**:
una carta de restaurante que el cliente abre con un código QR, y un panel privado donde el restaurante cambia
precios, marca platos como agotados o recomendados y añade platos con foto. Los cambios llegan a todas las cartas
abiertas **en tiempo real**.

«La Taberna de Codi» es un restaurante inventado; todo lo demás es real.

## Sigue el vídeo capítulo a capítulo

Cada capítulo tiene su etiqueta, con el código exactamente como queda al terminarlo:

| Etiqueta | Capítulo | Qué añade |
|---|---|---|
| [`cap-2`](../../tree/cap-2) | El proyecto y Supabase | Tablas, seguridad (RLS) y tiempo real; carta de ejemplo con fotos |
| [`cap-3`](../../tree/cap-3) | La carta del cliente | La carta pública con Supabase, `Suspense` y alérgenos |
| [`cap-4`](../../tree/cap-4) | El panel del restaurante | Inicio de sesión, Server Actions, nuevo plato con foto |
| [`cap-5`](../../tree/cap-5) | Tiempo real | La carta se actualiza sola (Supabase Realtime) |
| [`cap-6`](../../tree/cap-6) | El QR y publicar | El código QR de la carta |

```bash
git clone https://github.com/codigo-facil-es/menu-digital.git
cd menu-digital
git checkout cap-3   # o el capítulo que quieras
```

## Ponerlo en marcha

1. Crea un proyecto en [Supabase](https://supabase.com) y ejecuta en el editor SQL, en este orden:
   `supabase/schema.sql`, `supabase/storage.sql` y, después de crear el usuario del dueño en
   Authentication → Users, `supabase/seed.sql` (cambia en él el email del dueño).
2. Crea `.env.local` con la dirección del proyecto y su clave publicable:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_…
   ```
3. Instala y arranca:
   ```bash
   npm install
   npm run dev
   ```
   La carta está en <http://localhost:3000> y el panel en <http://localhost:3000/panel>.
4. Para publicarla, importa el repositorio en [Vercel](https://vercel.com/new) y añade esas dos variables.

En Supabase, desactiva los registros nuevos (Authentication → Sign In / Providers → «Allow new users to sign up»):
así solo el dueño puede entrar en el panel.

## Cómo está protegido

- La clave publicable es pública a propósito: va dentro de la web.
- Lo que protege los datos son las reglas de seguridad de la base de datos (RLS, en `supabase/schema.sql`):
  cualquiera puede **leer** la carta, pero solo el dueño del restaurante puede **cambiarla**.
- Las fotos siguen la misma idea (`supabase/storage.sql`): cualquiera puede verlas, solo el dueño puede subirlas.

## Herramientas

Next.js 16 (App Router, TypeScript, Tailwind CSS) · Supabase (base de datos, inicio de sesión, almacenamiento de
fotos y tiempo real) · Vercel. El plan inicial se hizo con [De idea a plan](https://www.codigofacil.es/crear)
(`plan-menu-digital.md`).

## Créditos

Las fotos de los platos son de Unsplash, con su licencia: los autores están en [CREDITS.md](CREDITS.md).

import { Suspense } from "react";
import { signIn } from "../actions";

export default function LoginPage({ searchParams }: PageProps<"/panel/entrar">) {
  return (
    <main className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-6 font-serif text-3xl font-bold text-stone-900">Panel del restaurante</h1>
      <form action={signIn} className="space-y-4">
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-stone-300 px-4 py-3" />
        <input name="password" type="password" required placeholder="Contraseña" className="w-full rounded-xl border border-stone-300 px-4 py-3" />
        <Suspense>
          <LoginError searchParams={searchParams} />
        </Suspense>
        <button className="w-full rounded-xl bg-amber-600 px-4 py-3 font-bold text-white hover:bg-amber-700">Entrar</button>
      </form>
    </main>
  );
}

async function LoginError({ searchParams }: Pick<PageProps<"/panel/entrar">, "searchParams">) {
  const { error } = await searchParams;
  return error ? <p className="text-sm text-red-700">Email o contraseña incorrectos.</p> : null;
}

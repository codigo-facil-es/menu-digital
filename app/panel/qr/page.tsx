import { Suspense } from "react";
import Loading from "@/components/Loading";
import QRCode from "qrcode";
import { headers } from "next/headers";

async function Qr() {
  // La dirección de la carta: la misma web en la que estamos, en la raíz.
  const host = (await headers()).get("host");
  const url = `${host?.startsWith("localhost") ? "http" : "https"}://${host}/`;
  const qr = await QRCode.toDataURL(url, { width: 600, margin: 1 });

  return (
    <main className="mx-auto max-w-sm px-4 py-12 text-center">
      <h1 className="font-serif text-3xl font-bold text-stone-900">Escanea para ver la carta</h1>
      {/* eslint-disable-next-line @next/next/no-img-element -- imagen generada aquí mismo */}
      <img src={qr} alt={`Código QR de ${url}`} className="mx-auto my-6 w-72" />
      <p className="text-stone-600">{url}</p>
    </main>
  );
}

export default function QrPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Qr />
    </Suspense>
  );
}

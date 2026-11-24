import type { Metadata } from "next";
import { Firma, Isotipo } from "@/components/logo";
import { BotonWhatsApp } from "@/components/redes";
import { URL_WHATSAPP } from "@/lib/enlaces";

export const metadata: Metadata = {
  title: "Página no encontrada · Petra",
  robots: { index: false },
};

/** Página de error propia: cuando alguien entra a una dirección que no existe. */
export default function NoEncontrada() {
  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex min-h-16 w-full max-w-[1120px] items-center px-5 md:px-8">
          <a href="/" aria-label="Petra, inicio" className="rounded-md">
            <Firma />
          </a>
        </div>
      </header>
      <main className="fondo-roca relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[640px] px-5 py-20 text-center">
          <Isotipo className="mx-auto h-24 w-auto" />
          <p className="mt-8 type-etiqueta text-ink-muted">Error 404</p>
          <h1 className="mt-3 type-titulo text-balance text-ink">Esta página no existe</h1>
          <p className="mx-auto mt-4 max-w-[460px] text-[17px] leading-7 text-ink">
            Puede que el link esté mal escrito o que la página ya no esté. Volvé al inicio y seguí desde ahí.
          </p>
          <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <a
              href="/"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-[12px] bg-azul px-6 text-[16px] font-bold text-on-azul transition-colors hover:bg-azul-hover sm:w-auto"
            >
              Volver al inicio
            </a>
            <a
              href={URL_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              ¿Buscabas algo? Preguntanos
            </a>
          </div>
        </div>
      </main>
      <BotonWhatsApp />
    </>
  );
}

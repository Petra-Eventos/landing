"use client";

import { useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** Tarjetas que se deslizan de costado. Con dedo, con teclado o con las flechas. */
export function Riel({ etiqueta, children }: { etiqueta: string; children: ReactNode }) {
  const riel = useRef<HTMLUListElement>(null);
  const mover = (lado: number) => {
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    riel.current?.scrollBy({ left: lado * 340, behavior: quieto ? "auto" : "smooth" });
  };
  const flecha =
    "flex size-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink";
  return (
    <div>
      <ul
        ref={riel}
        tabIndex={0}
        aria-label={etiqueta}
        className="riel flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 md:scroll-px-8 md:px-8 xl:scroll-px-[calc((100vw-1180px)/2+2rem)] xl:px-[calc((100vw-1180px)/2+2rem)]"
      >
        {children}
      </ul>
      <div className="mx-auto mt-6 hidden w-full max-w-[1180px] justify-end gap-2 px-8 md:flex">
        <button type="button" onClick={() => mover(-1)} aria-label="Ver las anteriores" className={flecha}>
          <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => mover(1)} aria-label="Ver las siguientes" className={flecha}>
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

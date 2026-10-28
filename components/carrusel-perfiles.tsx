"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Smartphone, Store, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Los tres perfiles de cada producto (se configuran desde el sistema). Mismo orden que las vistas del simulador.
// Cada perfil con un color de la marca en su ícono (azul, dorado y oliva), con su texto que contrasta.
const PERFILES: { icono: LucideIcon; color: string; nombre: string; texto: string }[] = [
  {
    icono: Store,
    color: "bg-azul text-on-azul",
    nombre: "Tu staff",
    texto: "Coordinación asigna el producto a la fiesta y sigue todo desde el panel.",
  },
  {
    icono: UserRound,
    color: "bg-dorado text-on-dorado",
    nombre: "Tus clientes",
    texto: "Quienes festejan lo configuran desde un link: sin cuenta y sin contraseñas.",
  },
  {
    icono: Smartphone,
    color: "bg-oliva text-on-dorado",
    nombre: "Los invitados",
    texto: "Lo usan desde el celular, sin bajar ninguna app.",
  },
];

/**
 * Carrusel de los tres perfiles. Marca el perfil que se ve en el simulador (`paso`).
 * En el celular, además, se desliza hasta esa tarjeta. En la tablet van en fila y en la compu,
 * una debajo de la otra con flechas hacia abajo; en las dos entran las tres y no se mueve.
 */
export function CarruselPerfiles({ paso, onTocar }: { paso: number; onTocar: () => void }) {
  const lista = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = lista.current;
    // Solo se desliza si no entran todas.
    if (!ul || ul.scrollWidth <= ul.clientWidth + 1) return;
    const tarjeta = ul.children[paso] as HTMLElement | undefined;
    if (!tarjeta) return;
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ul.scrollTo({ left: tarjeta.offsetLeft, behavior: suave ? "smooth" : "auto" });
  }, [paso]);

  return (
    <>
      <ul
        ref={lista}
        aria-label="Quién usa cada producto"
        onPointerDown={onTocar}
        onTouchStart={onTocar}
        onWheel={onTocar}
        onFocus={onTocar}
        className="sin-barra relative mt-6 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 sm:overflow-visible lg:mt-8 lg:max-w-[560px] lg:flex-col lg:gap-1.5"
      >
        {PERFILES.map(({ icono: Icono, color, nombre, texto }, i) => (
          <li
            key={nombre}
            className="flex w-[86%] shrink-0 snap-start items-center gap-2 sm:w-auto sm:flex-1 sm:shrink lg:flex-col lg:items-stretch lg:gap-1.5"
          >
            <div
              className={`flex h-full flex-1 items-start gap-3 rounded-lg border p-4 transition-colors duration-300 ${
                i === paso ? "border-dorado bg-dorado-soft" : "border-line bg-surface-raised/60"
              }`}
            >
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-md ${color}`}>
                <Icono size={18} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span>
                <span className="type-boton block text-ink">{nombre}</span>
                <span className="block text-[13px] leading-5 text-ink-muted">{texto}</span>
              </span>
            </div>
            {i < PERFILES.length - 1 && (
              <ArrowRight size={20} strokeWidth={2} className="shrink-0 text-dorado lg:ml-7 lg:rotate-90" aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
      <p className="mt-2 flex items-center gap-1 text-[12px] text-ink-muted sm:hidden" aria-hidden="true">
        Deslizá para ver los tres <ArrowRight size={14} strokeWidth={2} />
      </p>
    </>
  );
}

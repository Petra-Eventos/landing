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
    texto: "Organizan su fiesta desde su celular.",
  },
  {
    icono: Smartphone,
    color: "bg-oliva text-on-dorado",
    nombre: "Los invitados",
    texto: "Disfrutan de la fiesta y tu salón se luce genial.",
  },
];

/**
 * Los tres perfiles como pasos. Marca el perfil que se ve en el simulador (`paso`).
 * En el celular es un carrusel que se desliza hasta esa tarjeta, con puntitos abajo;
 * en la tablet van en fila con flechas y en la compu, una debajo de la otra unidas por una línea dorada.
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
        className="sin-barra relative mt-8 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 sm:overflow-visible lg:max-w-[540px] lg:flex-col lg:gap-3 lg:before:absolute lg:before:top-9 lg:before:bottom-9 lg:before:left-[34px] lg:before:w-px lg:before:bg-linear-to-b lg:before:from-azul/60 lg:before:via-dorado/60 lg:before:to-oliva/60"
      >
        {PERFILES.map(({ icono: Icono, color, nombre, texto }, i) => (
          <li key={nombre} className="flex w-[86%] shrink-0 snap-start items-center gap-2 sm:w-auto sm:flex-1 sm:shrink">
            <div
              className={`relative flex h-full flex-1 items-start gap-3 rounded-lg border p-4 transition-colors duration-300 ${
                i === paso ? "border-dorado/80 bg-dorado-soft" : "border-line bg-surface-raised"
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
              <ArrowRight size={18} strokeWidth={2} className="hidden shrink-0 text-dorado sm:block lg:hidden" aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
      {/* En el celular: un puntito por paso; el dorado es el que se está viendo. */}
      <div aria-hidden="true" className="mt-3 flex justify-center gap-1.5 sm:hidden">
        {PERFILES.map(({ nombre }, i) => (
          <span
            key={nombre}
            className={`h-1 rounded-full transition-all duration-300 ${i === paso ? "w-6 bg-dorado" : "w-2 bg-line-strong"}`}
          />
        ))}
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Smartphone, Store, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Los tres perfiles de cada producto (se configuran desde el sistema).
const PERFILES: { icono: LucideIcon; nombre: string; texto: string }[] = [
  { icono: Store, nombre: "Tu staff", texto: "Tu equipo asigna el producto a la fiesta y sigue todo desde el panel." },
  { icono: UserRound, nombre: "Tus clientes", texto: "Quienes festejan lo configuran desde un link: sin cuenta y sin contraseñas." },
  { icono: Smartphone, nombre: "Los invitados", texto: "Lo usan desde el celular, sin bajar ninguna app." },
];

const CADA_MS = 3000;

/**
 * Carrusel de los tres perfiles. En el celular pasa solo (1, 2, 3, 1, 2…) hasta que la persona lo toca;
 * ahí se queda quieto y lo maneja ella. En la compu entran los tres y no se mueve.
 * Si la persona pidió menos movimiento, tampoco pasa solo.
 */
export function CarruselPerfiles() {
  const lista = useRef<HTMLUListElement>(null);
  const [tocado, setTocado] = useState(false);

  useEffect(() => {
    const ul = lista.current;
    if (!ul || tocado) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let actual = 0;
    const id = window.setInterval(() => {
      // Solo se mueve si no entran todas (en la compu se ven las tres y no hace falta).
      if (ul.scrollWidth <= ul.clientWidth + 1) return;
      actual = (actual + 1) % PERFILES.length;
      const tarjeta = ul.children[actual] as HTMLElement | undefined;
      if (tarjeta) ul.scrollTo({ left: tarjeta.offsetLeft, behavior: "smooth" });
    }, CADA_MS);
    return () => window.clearInterval(id);
  }, [tocado]);

  const parar = () => setTocado(true);

  return (
    <>
      <ul
        ref={lista}
        aria-label="Quién usa cada producto"
        onPointerDown={parar}
        onTouchStart={parar}
        onWheel={parar}
        onFocus={parar}
        className="sin-barra relative mt-6 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 sm:overflow-visible"
      >
        {PERFILES.map(({ icono: Icono, nombre, texto }, i) => (
          <li key={nombre} className="flex w-[86%] shrink-0 snap-start items-center gap-2 sm:w-auto sm:flex-1 sm:shrink">
            <div className="flex h-full flex-1 items-start gap-3 rounded-lg border border-line bg-surface-raised/60 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-dorado-soft text-dorado">
                <Icono size={18} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span>
                <span className="type-boton block text-ink">{nombre}</span>
                <span className="block text-[13px] leading-5 text-ink-muted">{texto}</span>
              </span>
            </div>
            {i < PERFILES.length - 1 && <ArrowRight size={20} strokeWidth={2} className="shrink-0 text-dorado" aria-hidden="true" />}
          </li>
        ))}
      </ul>
      <p className="mt-2 flex items-center gap-1 text-[12px] text-ink-muted sm:hidden" aria-hidden="true">
        Deslizá para ver los tres <ArrowRight size={14} strokeWidth={2} />
      </p>
    </>
  );
}

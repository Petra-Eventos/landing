"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CarruselPerfiles } from "@/components/carrusel-perfiles";
import { Simulador, VISTAS } from "@/components/simulador";

const CADA_MS = 3000;

/**
 * Las tarjetas de perfiles y el simulador, sincronizados: cada 3 segundos pasan juntos
 * (tu staff, tus clientes, los invitados, y otra vez) hasta que la persona toca cualquiera de los dos.
 * Si la persona pidió menos movimiento, no pasan solos.
 * En el celular va todo en columna (texto, tarjetas, simulador, botones);
 * en la compu, texto + tarjetas + botones a la izquierda y el simulador a la derecha.
 */
export function PerfilesEnVivo({ intro, acciones }: { intro: ReactNode; acciones: ReactNode }) {
  const [paso, setPaso] = useState(0);
  const [solo, setSolo] = useState(true);

  useEffect(() => {
    if (!solo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setPaso((p) => (p + 1) % VISTAS.length), CADA_MS);
    return () => window.clearInterval(id);
  }, [solo]);

  const parar = () => setSolo(false);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-16 xl:gap-x-24">
      <div>
        {intro}
        <CarruselPerfiles paso={paso} onTocar={parar} />
        {/* En la compu los botones van debajo de las tarjetas; en el celular, debajo del simulador. */}
        <div className="mt-8 hidden lg:block">{acciones}</div>
      </div>
      <div className="mt-10 lg:mt-0 lg:pr-10">
        <Simulador
          perfil={VISTAS[paso]}
          onElegir={(vista) => {
            setSolo(false);
            setPaso(VISTAS.indexOf(vista));
          }}
          onTocar={parar}
        />
      </div>
      <div className="mt-10 lg:hidden">{acciones}</div>
    </div>
  );
}

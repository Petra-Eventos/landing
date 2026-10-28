"use client";

import { useEffect, useState } from "react";
import { CarruselPerfiles } from "@/components/carrusel-perfiles";
import { Simulador, VISTAS } from "@/components/simulador";

const CADA_MS = 3000;

/**
 * Las tarjetas de perfiles y el simulador, sincronizados: cada 3 segundos pasan juntos
 * (tu staff, tus clientes, los invitados, y otra vez) hasta que la persona toca cualquiera de los dos.
 * Si la persona pidió menos movimiento, no pasan solos.
 */
export function PerfilesEnVivo() {
  const [paso, setPaso] = useState(0);
  const [solo, setSolo] = useState(true);

  useEffect(() => {
    if (!solo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setPaso((p) => (p + 1) % VISTAS.length), CADA_MS);
    return () => window.clearInterval(id);
  }, [solo]);

  const parar = () => setSolo(false);

  return (
    <>
      <CarruselPerfiles paso={paso} onTocar={parar} />
      <div className="mt-10">
        <Simulador
          perfil={VISTAS[paso]}
          onElegir={(vista) => {
            setSolo(false);
            setPaso(VISTAS.indexOf(vista));
          }}
          onTocar={parar}
        />
      </div>
    </>
  );
}

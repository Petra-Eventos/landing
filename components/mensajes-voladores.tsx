"use client";

import { useEffect, useRef, useState } from "react";

// Mensajes que cruzan la sección "Menos mensajes" de izquierda a derecha y se desvanecen.
// Pasan una sola vez, cuando la sección entra en pantalla, y todo termina en 6 segundos.
// Con "reducir movimiento" no aparecen.
const MENSAJES = [
  { texto: "¿Precio para un XV de 120?", alto: "12%", demora: 0 },
  { texto: "¿Tienen libre el sábado 13?", alto: "70%", demora: 0.3 },
  { texto: "Info por privado porfa", alto: "38%", demora: 0.6 },
  { texto: "¿Qué incluye el menú?", alto: "86%", demora: 0.9 },
  { texto: "¿La barra es aparte?", alto: "24%", demora: 1.2 },
  { texto: "Hola! ¿Precio?", alto: "56%", demora: 1.5 },
];

export function MensajesVoladores() {
  const caja = useRef<HTMLDivElement>(null);
  const [volando, setVolando] = useState(false);

  useEffect(() => {
    const el = caja.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVolando(true);
          observador.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={caja} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {volando &&
        MENSAJES.map((m) => (
          <span
            key={m.texto}
            className="mensaje-volador absolute left-0 rounded-[14px] rounded-tl-[4px] bg-white px-3.5 py-2 text-[14px] font-medium whitespace-nowrap text-[#111b21] shadow-[0_6px_20px_#0b141a33]"
            style={{ top: m.alto, animationDelay: `${m.demora}s` }}
          >
            {m.texto}
          </span>
        ))}
    </div>
  );
}

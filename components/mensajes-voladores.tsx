"use client";

import { useEffect, useRef, useState } from "react";

// Mensajes que flotan en la sección "Menos mensajes": aparecen, se quedan casi quietos para poder leerlos
// (avanzan apenas hacia la derecha), y se desvanecen. Van solo en la franja de arriba del título y en la de abajo de las
// tarjetas, para no tapar el texto. Pasan una sola vez, al llegar a la sección, y a los 6 s ya no queda
// ninguno. En celular van 4 (los primeros), con menos recorrido. Con "reducir movimiento" no aparecen.
const MENSAJES = [
  { texto: "¿Precio para un XV de 120?", inicio: "4%", arriba: "10px", demora: 0 },
  { texto: "¿Tienen libre el sábado 13?", inicio: "8%", abajo: "46px", demora: 0.1 },
  { texto: "Info por privado porfa", inicio: "22%", arriba: "46px", demora: 0.2 },
  { texto: "¿Qué incluye el menú?", inicio: "2%", abajo: "10px", demora: 0.3 },
  { texto: "¿La barra es aparte?", inicio: "48%", arriba: "10px", demora: 0.4 },
  { texto: "Hola! ¿Precio?", inicio: "52%", abajo: "46px", demora: 0.5 },
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
        MENSAJES.map((m, i) => (
          <span
            key={m.texto}
            className="mensaje-volador absolute rounded-[12px] rounded-tl-[4px] bg-white px-3 py-1.5 text-[13px] leading-5 font-medium whitespace-nowrap text-[#111b21] shadow-[0_6px_20px_#0b141a33]"
            style={{ left: m.inicio, top: m.arriba, bottom: m.abajo, animationDelay: `${m.demora}s` }}
            data-solo-pantalla-grande={i >= 4 ? "" : undefined}
          >
            {m.texto}
          </span>
        ))}
    </div>
  );
}

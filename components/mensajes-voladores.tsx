"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { MessageCircle } from "lucide-react";

// Notificaciones de mensajes que aparecen en la sección "Menos mensajes": entran, quedan casi quietas para
// poder leerlas (avanzan apenas hacia la derecha) y se desvanecen. Van solo en la franja de arriba del título
// y en la de abajo de las tarjetas, cada una en su lugar, para no tapar el texto ni encimarse.
// Llegan en dos tandas de 8 (en celular, tres tandas de 2) y a los 12 s ya no queda ninguna.
// Pasan una sola vez, al llegar a la sección. Con "reducir movimiento" no aparecen.
const MENSAJES = [
  { nombre: "Caro", texto: "¿Precio para un 15 de 120 personas?" },
  { nombre: "Martín", texto: "¿Tienen libre el sábado 13 de marzo?" },
  { nombre: "Vane", texto: "Info por privado porfa" },
  { nombre: "Lucas", texto: "¿Qué incluye el menú?" },
  { nombre: "Sole", texto: "¿La barra es aparte?" },
  { nombre: "Juli", texto: "Hola! ¿Precio?" },
  { nombre: "Ana", texto: "¿Cuánto sale para 80 invitados?" },
  { nombre: "Diego", texto: "¿Hacen eventos empresariales?" },
  { nombre: "Flor", texto: "¿Tienen fecha en diciembre?" },
  { nombre: "Nico", texto: "¿El DJ está incluido?" },
  { nombre: "Meli", texto: "¿Se puede pagar en cuotas?" },
  { nombre: "Pablo", texto: "Pasame precios porfa" },
  { nombre: "Rocío", texto: "¿Hasta qué hora es la fiesta?" },
  { nombre: "Tomi", texto: "¿Tienen menú vegetariano?" },
  { nombre: "Agus", texto: "¿Cuánto es la seña?" },
  { nombre: "Lara", texto: "Hola, quería consultar por un casamiento" },
];

// Lugares en pantallas grandes: 4 columnas (3 por debajo de 1280 px) arriba y abajo.
const COLUMNAS_3 = ["2%", "34%", "66%", "66%"];
const COLUMNAS_4 = ["2%", "25%", "48%", "71%"];

function Notificacion({ nombre, texto, clase, estilo }: { nombre: string; texto: string; clase: string; estilo: CSSProperties }) {
  return (
    <div
      className={`absolute flex w-[min(250px,86vw)] items-center gap-2.5 rounded-[18px] bg-white/90 px-3 py-2.5 text-[#111b21] shadow-[0_8px_24px_#0b141a40] backdrop-blur-md sm:w-[min(240px,28vw)] ${clase}`}
      style={estilo}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#25d366] text-white">
        <MessageCircle size={17} strokeWidth={2.2} fill="currentColor" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[13px] leading-4 font-bold">{nombre}</span>
          <span className="shrink-0 text-[10px] leading-4 text-[#667781]">ahora</span>
        </span>
        <span className="block truncate text-[12.5px] leading-[17px]">{texto}</span>
      </span>
    </div>
  );
}

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
      {volando && (
        <>
          {/* Pantallas grandes: 16 notificaciones, en dos tandas de 8 */}
          <div className="hidden sm:block">
            {MENSAJES.map((m, i) => {
              const tanda = Math.floor(i / 8);
              const lugar = i % 8;
              const columna = lugar % 4;
              const arriba = lugar < 4;
              return (
                <Notificacion
                  key={m.nombre}
                  {...m}
                  clase={`notificacion ${columna === 3 ? "hidden xl:flex" : ""}`}
                  estilo={
                    {
                      "--x3": COLUMNAS_3[columna],
                      "--x4": COLUMNAS_4[columna],
                      top: arriba ? "14px" : undefined,
                      bottom: arriba ? undefined : "14px",
                      animationDelay: `${tanda * 6.2 + lugar * 0.08}s`,
                    } as CSSProperties
                  }
                />
              );
            })}
          </div>
          {/* Celular: 6 notificaciones, en tres tandas de 2 (una arriba y una abajo) */}
          <div className="sm:hidden">
            {MENSAJES.slice(0, 6).map((m, i) => (
              <Notificacion
                key={m.nombre}
                {...m}
                clase="notificacion-movil"
                estilo={{
                  left: "4%",
                  top: i % 2 === 0 ? "10px" : undefined,
                  bottom: i % 2 === 0 ? undefined : "10px",
                  animationDelay: `${Math.floor(i / 2) * 4 + (i % 2) * 0.15}s`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

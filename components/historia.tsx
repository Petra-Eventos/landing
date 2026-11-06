"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FileText } from "lucide-react";
import { BARRAS, EXTRAS, MENUS, SELECCION_INICIAL, fechaLarga, pesos, precioSugerido } from "@/lib/cotizador-demo";

const marco = "w-full max-w-[420px] rounded-2xl border border-white/10 bg-linear-to-b from-white/8 to-white/2 p-5 shadow-2xl";

/** El PDF de promos que se vuelve paquetes. */
function VisualPdf() {
  return (
    <div className={marco}>
      <div className="flex items-center gap-3 rounded-lg bg-crema-claro p-3 text-noche">
        <FileText size={22} strokeWidth={1.7} />
        <span className="min-w-0">
          <span className="block truncate text-[14px] font-semibold">Promos 2027.pdf</span>
          <span className="block text-[12px]">Listo para revisar</span>
        </span>
      </div>
      <ul className="mt-4 flex flex-col divide-y divide-line">
        {MENUS.map((m) => (
          <li key={m.id} className="flex items-center justify-between gap-3 py-3">
            <span className="font-semibold tracking-tight text-[20px] text-ink">{m.nombre}</span>
            <span className="text-[14px] text-ink-muted tabular-nums">{pesos(m.precio)} por persona</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Un cuadrito de QR decorativo: siempre dibuja lo mismo.
const QR = Array.from({ length: 121 }, (_, i) => {
  const x = i % 11;
  const y = Math.floor(i / 11);
  const esquina = (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7);
  return esquina || (i * 7 + (i % 5) * 3) % 3 === 0;
});

/** El link en los tres lugares donde lo compartís. */
function VisualLink() {
  return (
    <div className={marco}>
      <div className="flex items-center gap-3">
        <span className="flex size-14 items-center justify-center rounded-full bg-azul font-semibold tracking-tight text-[22px] text-on-azul">T</span>
        <span>
          <span className="block text-[15px] font-semibold text-ink">tusalon</span>
          <span className="block text-[13px] text-ink-muted">Bio de Instagram</span>
        </span>
      </div>
      <p className="mt-4 rounded-md bg-crema-claro px-4 py-3 text-center text-[14px] font-semibold text-noche">Armá tu fiesta</p>
      <div className="mt-5 flex items-center gap-4 border-t border-line pt-5">
        <span className="grid size-20 shrink-0 grid-cols-11 rounded-md bg-crema-claro p-1.5">
          {QR.map((lleno, i) => (
            <span key={i} className={lleno ? "bg-noche" : ""} />
          ))}
        </span>
        <span className="text-[14px] leading-5 text-ink-muted">Un QR en el salón para los que vienen a conocerlo.</span>
      </div>
    </div>
  );
}

/** El mismo ejemplo de la demo, como le llega al salón. */
function VisualPedido() {
  const s = SELECCION_INICIAL;
  const menu = MENUS.find((m) => m.id === s.menu)!.nombre;
  const barra = BARRAS.find((b) => b.id === s.barra)!.nombre.toLowerCase();
  const extras = EXTRAS.filter((e) => s.extras.includes(e.id)).map((e) => e.nombre.toLowerCase());
  return (
    <div className={marco}>
      <div className="flex items-center gap-3 border-b border-line pb-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-azul-soft font-semibold tracking-tight text-[15px] text-azul-text">L</span>
        <span>
          <span className="block text-[14px] font-semibold text-ink">Laura</span>
          <span className="block text-[12px] text-ink-muted">Desde tu cotizador</span>
        </span>
      </div>
      <div className="mt-4 rounded-lg rounded-tl-[4px] bg-surface p-4 text-[14px] leading-6 text-ink">
        <p>Hola, soy Laura. Quiero presupuesto para un XV:</p>
        <ul className="mt-1.5 text-ink-muted">
          <li>{fechaLarga(s.dia)}</li>
          <li>{s.invitados} invitados</li>
          <li>
            Menú {menu} y barra {barra}
          </li>
          <li className="first-letter:uppercase">{extras.join(" y ")}</li>
        </ul>
        <p className="mt-1.5">
          Precio sugerido: <span className="font-semibold text-ink">{pesos(precioSugerido(s))}</span>
        </p>
        <p className="mt-1 text-right text-[12px] text-ink-muted">23:48</p>
      </div>
    </div>
  );
}

const PASOS: { titulo: string; texto: string; visual: ReactNode }[] = [
  {
    titulo: "Subís tu PDF de promos",
    texto: "O una foto. Petra arma tus paquetes con esos precios y vos los revisás antes de activarlos. También podés cargarlo a mano.",
    visual: <VisualPdf />,
  },
  {
    titulo: "Compartís tu link",
    texto: "En la bio de Instagram, en WhatsApp o con un QR en el salón. Tu cliente lo abre sin registrarse y ve tu nombre y tu logo.",
    visual: <VisualLink />,
  },
  {
    titulo: "Te llega el pedido armado",
    texto: "Fecha, invitados, lo que eligió y el precio sugerido, en tu WhatsApp. Si cierra, lo pasás a tu calendario con un toque.",
    visual: <VisualPedido />,
  },
];

/**
 * Los tres pasos. En la compu el dibujo queda quieto a la izquierda y cambia a medida que se baja;
 * en el celular, cada paso lleva su dibujo arriba.
 */
export function Historia() {
  const [activo, setActivo] = useState(0);
  const pasos = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setActivo(pasos.current.indexOf(e.target as HTMLLIElement));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    pasos.current.forEach((p) => p && observador.observe(p));
    return () => observador.disconnect();
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-20">
      <div aria-hidden="true" className="sticky top-24 hidden h-[min(560px,calc(100svh-7rem))] lg:block">
        {PASOS.map((p, i) => (
          <div
            key={p.titulo}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 motion-reduce:transition-none ${
              i === activo ? "opacity-100" : "opacity-0"
            }`}
          >
            {p.visual}
          </div>
        ))}
      </div>
      <ol className="flex flex-col gap-16 lg:gap-0">
        {PASOS.map((p, i) => (
          <li
            key={p.titulo}
            ref={(el) => {
              pasos.current[i] = el;
            }}
            className="flex flex-col justify-center lg:min-h-[75svh]"
          >
            <div aria-hidden="true" className="mb-7 flex justify-center lg:hidden">
              {p.visual}
            </div>
            <div className={`transition-opacity duration-500 motion-reduce:transition-none ${i === activo ? "" : "lg:opacity-35"}`}>
              <p className="text-[14px] font-semibold text-azul-text">Paso {i + 1}</p>
              <h3 className="mt-2 font-semibold tracking-tight text-[30px] leading-[1.15] text-ink lg:text-[40px]">{p.titulo}</h3>
              <p className="mt-4 max-w-[480px] text-[17px] leading-7 text-ink-muted">{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

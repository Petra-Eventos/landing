"use client";

import { useEffect, useRef } from "react";
import { FileText, Link2, MessageCircle } from "lucide-react";
import { MENUS, SELECCION_INICIAL, fechaLarga, pesos, precioSugerido } from "@/lib/cotizador-demo";

// Cada paso es una tarjeta de un color de la marca (blanco crema, azul y marino, como el sistema).
// Al bajar, se apilan una sobre otra y la de atrás se achica y se oscurece un poco.
// Con "reducir movimiento" solo se apilan.
const PASOS = [
  {
    titulo: "Cargás tus precios",
    texto: "Subís tu PDF de promos o cargás tus menús y extras. Lo hacés una vez y lo cambiás cuando quieras.",
    icono: FileText,
    color: "border border-line bg-surface-raised text-ink",
    fondoVisual: "bg-azul-soft",
    visual: "pdf",
  },
  {
    titulo: "Compartís tu link",
    texto: "En la bio de Instagram, en WhatsApp o con un QR. Tu cliente lo abre sin registrarse.",
    icono: Link2,
    color: "bg-azul text-on-azul",
    fondoVisual: "bg-surface-raised",
    visual: "link",
  },
  {
    titulo: "Te llega el pedido",
    texto: "Tu cliente arma su fiesta, ve el precio y te escribe por WhatsApp con todo listo para cerrar.",
    icono: MessageCircle,
    color: "bg-marino text-on-marino",
    fondoVisual: "bg-surface-raised",
    visual: "pedido",
  },
] as const;

const panel = "w-full max-w-[380px] rounded-[16px] p-5 text-left text-ink shadow-piedra";

function Visual({ tipo, fondo }: { tipo: (typeof PASOS)[number]["visual"]; fondo: string }) {
  if (tipo === "pdf")
    return (
      <div className={`${panel} ${fondo}`}>
        <p className="flex items-center gap-2 rounded-[12px] bg-surface-raised px-3 py-2.5 text-[14px] font-semibold">
          <FileText size={18} strokeWidth={1.8} className="text-azul-text" />
          Promos 2027.pdf
        </p>
        <ul className="mt-3 flex flex-col divide-y divide-line">
          {MENUS.map((m) => (
            <li key={m.id} className="flex justify-between gap-3 py-2.5 text-[14px]">
              <span className="font-semibold">Menú {m.nombre}</span>
              <span className="text-ink-muted tabular-nums">{pesos(m.precio)} p/p</span>
            </li>
          ))}
        </ul>
      </div>
    );
  if (tipo === "link")
    return (
      <div className={`${panel} ${fondo}`}>
        <p className="text-[13px] text-ink-muted">Bio de Instagram</p>
        <p className="mt-1 text-[16px] font-semibold">tumarca</p>
        <p className="mt-4 flex items-center gap-2 rounded-[12px] bg-azul-soft px-3 py-2.5 text-[14px]">
          <Link2 size={16} strokeWidth={2} className="text-azul-text" />
          app.petraeventos.com/q/tu-marca
        </p>
        <p className="mt-3 rounded-[12px] bg-azul py-2.5 text-center text-[14px] font-semibold text-on-azul">Armá tu fiesta</p>
      </div>
    );
  const s = SELECCION_INICIAL;
  return (
    <div className={`${panel} ${fondo}`}>
      <p className="text-[13px] text-ink-muted">WhatsApp, 23:48</p>
      <div className="mt-3 rounded-[12px] rounded-tl-sm bg-azul-soft p-4 text-[14px] leading-6">
        <p>Hola, quiero presupuesto para un XV:</p>
        <p className="text-ink-muted">
          {fechaLarga(s.dia)}, {s.invitados} invitados
        </p>
        <p className="mt-1">
          Precio sugerido: <span className="font-semibold">{pesos(precioSugerido(s))}</span>
        </p>
      </div>
    </div>
  );
}

export function PasosApilados() {
  const tarjetas = useRef<(HTMLDivElement | null)[]>([]);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cuadro = 0;
    const mover = () => {
      cuadro = 0;
      const alto = window.innerHeight;
      tarjetas.current.forEach((t, i) => {
        const siguiente = items.current[i + 1];
        if (!t) return;
        if (!siguiente) {
          t.style.transform = "";
          t.style.filter = "";
          return;
        }
        const tope = parseFloat(getComputedStyle(siguiente).top) || 0;
        const arriba = siguiente.getBoundingClientRect().top;
        const avance = Math.min(1, Math.max(0, (alto - arriba) / (alto - tope)));
        t.style.transform = `scale(${1 - 0.06 * avance})`;
        t.style.filter = `brightness(${1 - 0.15 * avance})`;
      });
    };
    const pedir = () => {
      if (!cuadro) cuadro = requestAnimationFrame(mover);
    };
    mover();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <ol className="mt-14 flex flex-col gap-[12vh] pb-[4vh]">
      {PASOS.map((p, i) => {
        const Icono = p.icono;
        return (
          <li
            key={p.titulo}
            ref={(el) => {
              items.current[i] = el;
            }}
            className="sticky"
            style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}
          >
            <div
              ref={(el) => {
                tarjetas.current[i] = el;
              }}
              className={`grid origin-top items-center gap-8 rounded-[28px] p-7 shadow-[0_-20px_60px_-20px_#2a457340] will-change-transform sm:p-10 md:min-h-[420px] md:grid-cols-2 md:p-14 ${p.color}`}
            >
              <div>
                <p className="flex items-center gap-2 text-[15px] font-semibold">
                  <Icono size={18} strokeWidth={2} aria-hidden="true" />
                  Paso {i + 1}
                </p>
                <h3 className="mt-4 font-display text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-[44px]">{p.titulo}</h3>
                <p className="mt-4 max-w-[420px] text-[17px] leading-7">{p.texto}</p>
              </div>
              <div aria-hidden="true" className="flex justify-center md:justify-end">
                <Visual tipo={p.visual} fondo={p.fondoVisual} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { FileText, Link2, MessageCircle } from "lucide-react";
import { MENUS, SELECCION_INICIAL, fechaLarga, pesos, precioSugerido } from "@/lib/cotizador-demo";

// Cada paso es una tarjeta de un color de la marca. Al bajar, se apilan una sobre otra
// y la de atrás se achica y se oscurece un poco. Con "reducir movimiento" solo se apilan.
const PASOS = [
  {
    titulo: "Cargás tus precios",
    texto: "Subís tu PDF de promos o cargás tus menús y extras. Lo hacés una vez y lo cambiás cuando quieras.",
    icono: FileText,
    color: "bg-crema-claro text-noche",
    visual: "pdf",
  },
  {
    titulo: "Compartís tu link",
    texto: "En la bio de Instagram, en WhatsApp o con un QR en el salón. Tu cliente lo abre sin registrarse.",
    icono: Link2,
    color: "bg-azul text-white",
    visual: "link",
  },
  {
    titulo: "Te llega el pedido",
    texto: "Tu cliente arma su fiesta, ve el precio y te escribe por WhatsApp con todo listo para cerrar.",
    icono: MessageCircle,
    color: "bg-oliva-marca text-white",
    visual: "pedido",
  },
] as const;

const panel = "w-full max-w-[380px] rounded-xl bg-noche/90 p-5 text-left text-ink shadow-2xl";

function Visual({ tipo }: { tipo: (typeof PASOS)[number]["visual"] }) {
  if (tipo === "pdf")
    return (
      <div className={panel}>
        <p className="flex items-center gap-2 text-[14px] font-semibold">
          <FileText size={18} strokeWidth={1.8} />
          Promos 2027.pdf
        </p>
        <ul className="mt-4 flex flex-col divide-y divide-white/10">
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
      <div className={panel}>
        <p className="text-[13px] text-ink-muted">Bio de Instagram</p>
        <p className="mt-1 text-[16px] font-semibold">tusalon</p>
        <p className="mt-4 flex items-center gap-2 rounded-lg bg-white/8 px-3 py-2.5 text-[14px]">
          <Link2 size={16} strokeWidth={2} className="text-azul-text" />
          app.petraeventos.com/q/tu-salon
        </p>
        <p className="mt-3 rounded-lg bg-crema-claro py-2.5 text-center text-[14px] font-semibold text-noche">Armá tu fiesta</p>
      </div>
    );
  const s = SELECCION_INICIAL;
  return (
    <div className={panel}>
      <p className="text-[13px] text-ink-muted">WhatsApp, 23:48</p>
      <div className="mt-3 rounded-lg rounded-tl-sm bg-white/8 p-4 text-[14px] leading-6">
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
        t.style.filter = `brightness(${1 - 0.3 * avance})`;
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
              className={`grid origin-top items-center gap-8 rounded-3xl p-7 shadow-[0_-20px_60px_-20px_#0008] will-change-transform sm:p-10 md:min-h-[420px] md:grid-cols-2 md:p-14 ${p.color}`}
            >
              <div>
                <p className="flex items-center gap-2 text-[15px] font-semibold opacity-80">
                  <Icono size={18} strokeWidth={2} aria-hidden="true" />
                  Paso {i + 1}
                </p>
                <h3 className="mt-4 text-[32px] leading-[1.1] font-bold tracking-[-0.03em] sm:text-[44px]">{p.titulo}</h3>
                <p className="mt-4 max-w-[420px] text-[17px] leading-7 opacity-90">{p.texto}</p>
              </div>
              <div aria-hidden="true" className="flex justify-center md:justify-end">
                <Visual tipo={p.visual} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

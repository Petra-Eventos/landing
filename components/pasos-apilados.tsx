"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  Bell,
  Briefcase,
  Camera,
  CheckCheck,
  ChevronLeft,
  Crown,
  EllipsisVertical,
  FileText,
  Grid3x3,
  Heart,
  Link2,
  MessageCircle,
  Mic,
  Phone,
  Plus,
  Sparkles,
  SquarePlay,
  SquareUser,
  UserPlus,
  Video,
} from "lucide-react";
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

// Un perfil de Instagram en modo claro, con el link del cotizador en la bio. Marca y números de ejemplo.
const IG = { fondo: "#ffffff", texto: "#0c1014", suave: "#5f6670", boton: "#efefef", borde: "#dbdbdb" };

const DESTACADAS = [
  { nombre: "Cotizá", icono: Sparkles },
  { nombre: "XV", icono: Crown },
  { nombre: "Bodas", icono: Heart },
  { nombre: "Empresas", icono: Briefcase },
];

function PerfilInstagram() {
  const boton = "flex min-h-8 min-w-0 items-center justify-center truncate rounded-[8px] px-1 text-[13px] font-semibold";
  return (
    <div className="w-full max-w-[380px] overflow-hidden rounded-[20px] text-left shadow-piedra" style={{ backgroundColor: IG.fondo, color: IG.texto }}>
      <div className="flex items-center gap-3 px-3 sm:px-4 pt-3.5 pb-1.5">
        <ArrowLeft size={20} strokeWidth={2} />
        <span className="flex-1 truncate text-[16px] font-bold">tumarca.eventos</span>
        <Bell size={19} strokeWidth={2} />
        <EllipsisVertical size={19} strokeWidth={2} />
      </div>

      <div className="flex items-center gap-3 px-3 sm:px-4 pt-2 sm:gap-4">
        <span className="flex size-[52px] shrink-0 rounded-full bg-linear-to-br from-dorado to-azul p-[3px] sm:size-[68px]">
          <span className="flex size-full items-center justify-center rounded-full border-[3px] border-white bg-marino font-display text-[22px] font-semibold text-on-marino sm:text-[26px]">
            T
          </span>
        </span>
        <div className="flex min-w-0 flex-1 justify-between gap-1.5 text-center sm:justify-around">
          {[
            ["84", "publicaciones"],
            ["3.240", "seguidores"],
            ["512", "seguidos"],
          ].map(([n, t]) => (
            <span key={t} className="flex min-w-0 flex-col min-[360px]:shrink-0">
              <span className="text-[15px] leading-5 font-bold sm:text-[16px]">{n}</span>
              <span className="text-[10px] leading-3.5 hyphens-auto min-[360px]:whitespace-nowrap sm:text-[11px] sm:leading-4">{t}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-3 sm:px-4 pt-3 text-[13px] leading-[18px]">
        <p className="font-bold">Tu Marca Eventos</p>
        <p style={{ color: IG.suave }}>Eventos y celebraciones</p>
        <p>Armá tu fiesta y mirá el precio al instante.</p>
        <p className="mt-1.5 inline-flex max-w-full items-center gap-1.5 rounded-full bg-azul-soft px-2 py-1 text-[12px] font-semibold text-azul-text ring-2 ring-dorado/70 sm:px-2.5 sm:text-[13px]">
          <Link2 size={14} strokeWidth={2.2} className="shrink-0" />
          <span className="min-w-0 truncate">app.petraeventos.com/q/tu-marca</span>
        </p>
      </div>

      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_auto] gap-1.5 px-3 sm:px-4 pt-3">
        <span className={`${boton} bg-azul text-on-azul`}>Seguir</span>
        <span className={boton} style={{ backgroundColor: IG.boton }}>
          Mensaje
        </span>
        <span className={boton} style={{ backgroundColor: IG.boton }}>
          Contacto
        </span>
        <span className={`${boton} px-2`} style={{ backgroundColor: IG.boton }}>
          <UserPlus size={15} strokeWidth={2} />
        </span>
      </div>

      <ul className="flex justify-between gap-2 px-3 sm:px-4 pt-4 pb-3">
        {DESTACADAS.map(({ nombre, icono: Icono }, i) => (
          <li key={nombre} className={`w-14 flex-col items-center gap-1 ${i === 3 ? "hidden min-[360px]:flex" : "flex"}`}>
            <span className="flex size-14 items-center justify-center rounded-full border p-[3px]" style={{ borderColor: IG.borde }}>
              <span className="flex size-full items-center justify-center rounded-full bg-azul-soft text-ink">
                <Icono size={18} strokeWidth={1.8} />
              </span>
            </span>
            <span className="text-[11px] leading-4">{nombre}</span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-3 border-t" style={{ borderColor: IG.borde }}>
        <span className="flex justify-center border-b-2 py-2" style={{ borderColor: IG.texto }}>
          <Grid3x3 size={18} strokeWidth={2} />
        </span>
        <span className="flex justify-center py-2" style={{ color: IG.suave }}>
          <SquarePlay size={18} strokeWidth={2} />
        </span>
        <span className="flex justify-center py-2" style={{ color: IG.suave }}>
          <SquareUser size={18} strokeWidth={2} />
        </span>
      </div>
      <div className="grid grid-cols-3 gap-0.5">
        <span className="h-16 bg-arenisca" />
        <span className="h-16 bg-azul-soft" />
        <span className="h-16 bg-marino" />
      </div>
    </div>
  );
}

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
  if (tipo === "link") return <PerfilInstagram />;
  return <ChatWhatsApp />;
}

// Un chat de WhatsApp en modo claro: el pedido del cliente llega armado y el negocio responde. Datos de ejemplo.
const WA = {
  barra: "#f7f7f7",
  fondo: "#efeae2",
  recibido: "#ffffff",
  enviado: "#d9fdd3",
  texto: "#111b21",
  suave: "#667781",
  verde: "#008069",
  tilde: "#53bdeb",
  borde: "#e9edef",
};

function ChatWhatsApp() {
  const s = SELECCION_INICIAL;
  const hora = "text-[10px] leading-none";
  return (
    <div className="flex w-full max-w-[380px] flex-col overflow-hidden rounded-[20px] text-left shadow-piedra" style={{ color: WA.texto }}>
      <div className="flex items-center gap-2 border-b px-3 py-2.5" style={{ backgroundColor: WA.barra, borderColor: WA.borde }}>
        <ChevronLeft size={22} strokeWidth={2.2} style={{ color: WA.verde }} />
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-arenisca text-[15px] font-bold text-ink">L</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] leading-5 font-semibold">Laura</span>
          <span className="block truncate text-[11px] leading-4" style={{ color: WA.suave }}>
            en línea
          </span>
        </span>
        <Video size={21} strokeWidth={1.9} style={{ color: WA.verde }} />
        <Phone size={19} strokeWidth={1.9} className="ml-2" style={{ color: WA.verde }} />
      </div>

      <div className="flex flex-col gap-1.5 px-3 py-3 text-[13px] leading-[18px]" style={{ backgroundColor: WA.fondo }}>
        <span className="mx-auto mb-1 rounded-[8px] bg-white/90 px-2.5 py-1 text-[11px] font-medium" style={{ color: WA.suave }}>
          Hoy
        </span>
        <div className="max-w-[88%] self-start rounded-[10px] rounded-tl-none px-2.5 pt-1.5 pb-1 shadow-[0_1px_0.5px_#0b141a21]" style={{ backgroundColor: WA.recibido }}>
          <p>Hola, quiero presupuesto para un XV:</p>
          <p>
            {fechaLarga(s.dia)}, {s.invitados} invitados
          </p>
          <p>
            Precio sugerido: <span className="font-semibold">{pesos(precioSugerido(s))}</span>
          </p>
          <p className={`mt-0.5 text-right ${hora}`} style={{ color: WA.suave }}>
            23:48
          </p>
        </div>
        <div className="max-w-[88%] self-end rounded-[10px] rounded-tr-none px-2.5 pt-1.5 pb-1 shadow-[0_1px_0.5px_#0b141a21]" style={{ backgroundColor: WA.enviado }}>
          <p>¡Hola Laura! Sí, el 13 de marzo está libre. ¿Querés que te reservemos la fecha?</p>
          <p className={`mt-0.5 flex items-center justify-end gap-1 ${hora}`} style={{ color: WA.suave }}>
            23:52
            <CheckCheck size={14} strokeWidth={2.2} style={{ color: WA.tilde }} />
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 px-3 py-2" style={{ backgroundColor: WA.barra }}>
        <Plus size={22} strokeWidth={2} style={{ color: WA.verde }} />
        <span className="h-8 flex-1 rounded-full border bg-white" style={{ borderColor: WA.borde }} />
        <Camera size={20} strokeWidth={1.9} style={{ color: WA.verde }} />
        <Mic size={20} strokeWidth={1.9} style={{ color: WA.verde }} />
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
              className={`grid origin-top items-center gap-8 rounded-[28px] p-5 shadow-[0_-20px_60px_-20px_#2a457340] will-change-transform sm:p-10 md:min-h-[420px] md:grid-cols-2 md:p-14 ${p.color}`}
            >
              <div>
                <p className="flex items-center gap-2 text-[15px] font-semibold">
                  <Icono size={18} strokeWidth={2} aria-hidden="true" />
                  Paso {i + 1}
                </p>
                <h3 className="mt-4 font-display text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-[44px]">{p.titulo}</h3>
                <p className="mt-4 max-w-[420px] text-[17px] leading-7">{p.texto}</p>
              </div>
              <div aria-hidden="true" className="flex min-w-0 justify-center md:justify-end">
                <Visual tipo={p.visual} fondo={p.fondoVisual} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

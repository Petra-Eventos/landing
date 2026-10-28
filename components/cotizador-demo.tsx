"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Cake,
  CalendarPlus,
  Check,
  Crown,
  Heart,
  MessageCircle,
  Minus,
  Plus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  BARRAS,
  CAPACIDAD,
  EXTRAS,
  FESTEJOS,
  INCLUIDO,
  INVITADOS_MIN,
  INVITADOS_PASO,
  MENUS,
  MES,
  OCUPADOS,
  PRECIO_SALON,
  RECARGO_SABADO,
  SELECCION_INICIAL,
  diaDeSemana,
  fechaCorta,
  fechaLarga,
  pesos,
  precioSugerido,
  type IdExtra,
  type IdFestejo,
  type Seleccion,
} from "@/lib/cotizador-demo";

type Vista = "cliente" | "panel";
const PASOS = ["Festejo", "Fecha", "Invitados", "Menú", "Extras", "Precio"];
const ULTIMO = PASOS.length - 1;

// Cuánto se queda cada pantalla cuando la demo pasa sola (la del precio y la del panel, más: hay más para leer).
const MS_PASO = 2400;
const MS_PRECIO = 3400;
const MS_PANEL = 5200;

// El link del cotizador lo ve el cliente con la marca del salón: claro y con el color del salón.
// Son colores de producto (no tokens de Petra), igual que los tonos de las webapps.
const C = {
  fondo: "#faf7f2",
  tarjeta: "#ffffff",
  texto: "#1b2d52",
  suave: "#5b6478",
  borde: "#e4ddd1",
  acento: "#1c79a4",
  sobreAcento: "#ffffff",
};
const NOMBRE_SALON = "Tu salón";

const ICONO_FESTEJO: Record<IdFestejo, LucideIcon> = {
  xv: Crown,
  casamiento: Heart,
  cumple: Cake,
  empresarial: Briefcase,
};

const MIRADAS: Record<Vista, { nombre: string; texto: string }> = {
  cliente: { nombre: "Tu cliente", texto: "Así arma su fiesta tu cliente." },
  panel: { nombre: "Tu panel", texto: "Así te llega el pedido a tu panel." },
};

/**
 * Demostración del cotizador dentro de un celular, con las dos vistas:
 * la del cliente (arma su fiesta por pasos y ve el precio sugerido) y la del salón (le llega el pedido).
 * Pasa sola hasta que la persona toca algo; desde ahí, la maneja ella. Precios de ejemplo: no guarda nada.
 */
export function CotizadorDemo() {
  const [vista, setVista] = useState<Vista>("cliente");
  const [paso, setPaso] = useState(0);
  const [sel, setSel] = useState<Seleccion>(SELECCION_INICIAL);
  const [solo, setSolo] = useState(true);
  const idVistas = useId();

  useEffect(() => {
    if (!solo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const espera = vista === "panel" ? MS_PANEL : paso === ULTIMO ? MS_PRECIO : MS_PASO;
    const id = window.setTimeout(() => {
      if (vista === "panel") {
        setVista("cliente");
        setPaso(0);
      } else if (paso === ULTIMO) setVista("panel");
      else setPaso(paso + 1);
    }, espera);
    return () => window.clearTimeout(id);
  }, [solo, vista, paso]);

  const parar = () => setSolo(false);
  const total = precioSugerido(sel);
  const cambiar = (c: Partial<Seleccion>) => setSel((s) => ({ ...s, ...c }));

  return (
    <div onPointerDown={parar} onKeyDown={parar} className="mx-auto w-[280px] sm:w-[300px]">
      <p id={idVistas} className="type-etiqueta mb-2 text-center text-dorado">
        Mirá las dos vistas
      </p>
      <div role="group" aria-labelledby={idVistas} className="grid grid-cols-2 gap-1 rounded-md border border-line bg-surface-raised p-1">
        {(Object.keys(MIRADAS) as Vista[]).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={vista === v}
            onClick={() => setVista(v)}
            className={`min-h-10 rounded-[8px] px-1 text-[13px] leading-4 font-semibold transition-colors ${
              vista === v ? "bg-dorado text-on-dorado" : "text-ink-muted hover:text-ink"
            }`}
          >
            {MIRADAS[v].nombre}
          </button>
        ))}
      </div>
      <p className="mt-2 mb-8 text-center text-[13px] leading-5 text-ink-muted" aria-live="polite">
        {MIRADAS[vista].texto}
      </p>

      <div className="relative">
        {/* Escenario: un arco dorado detrás del celular, como la columna del logo de Petra. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-7 -top-6 -bottom-4 rounded-t-full border border-dorado/25 bg-linear-to-b from-dorado/12 via-azul/6 to-transparent sm:-inset-x-12"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-3 -top-2 -bottom-2 rounded-t-full border border-dorado/10 sm:-inset-x-6"
        />
        <div className="relative rounded-[42px] border border-line-strong bg-noche p-3 shadow-piedra">
          <div
            className="relative flex h-[560px] flex-col overflow-hidden rounded-[32px]"
            style={vista === "cliente" ? { backgroundColor: C.fondo, color: C.texto } : undefined}
          >
            {vista === "cliente" ? (
              <PantallaCliente
                paso={paso}
                sel={sel}
                total={total}
                onPaso={setPaso}
                onCambiar={cambiar}
                onPedir={() => setVista("panel")}
              />
            ) : (
              <PantallaPanel sel={sel} total={total} />
            )}
          </div>
        </div>
      </div>
      <p className="mt-5 text-center text-[12px] leading-4 text-ink-muted">Demostración con precios de ejemplo.</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lo que ve el cliente del salón
// ---------------------------------------------------------------------------

function PantallaCliente({
  paso,
  sel,
  total,
  onPaso,
  onCambiar,
  onPedir,
}: {
  paso: number;
  sel: Seleccion;
  total: number;
  onPaso: (p: number) => void;
  onCambiar: (c: Partial<Seleccion>) => void;
  onPedir: () => void;
}) {
  return (
    <>
      {/* Arriba: volver, la marca del salón (chica) y en qué paso va */}
      <div className="flex items-center justify-between px-4 pt-4">
        <button
          type="button"
          onClick={() => onPaso(Math.max(0, paso - 1))}
          aria-label="Paso anterior"
          className={`flex size-8 items-center justify-center rounded-full ${paso === 0 ? "invisible" : ""}`}
          style={{ color: C.suave }}
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="flex size-5 items-center justify-center rounded-full font-display text-[10px] text-white"
            style={{ backgroundColor: C.acento }}
          >
            {NOMBRE_SALON.charAt(0)}
          </span>
          <span className="text-[10px] font-semibold tracking-[0.12em] uppercase" style={{ color: C.suave }}>
            {NOMBRE_SALON}
          </span>
        </span>
        <span className="w-8 text-right text-[10px] font-semibold" style={{ color: C.suave }}>
          {paso + 1}/{PASOS.length}
        </span>
      </div>
      <div aria-hidden="true" className="mt-3 flex gap-1 px-4">
        {PASOS.map((p, i) => (
          <span
            key={p}
            className="h-1 flex-1 rounded-full transition-colors duration-300"
            style={{ backgroundColor: i <= paso ? C.acento : C.borde }}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Paso {paso + 1} de {PASOS.length}: {PASOS[paso]}
      </p>

      {/* El paso: cada vez que cambia, sus partes entran de a una. */}
      <div key={paso} className="entrar-de-a-una flex min-h-0 flex-1 flex-col px-4 pt-5">
        {paso === 0 && <PasoFestejo sel={sel} onCambiar={onCambiar} />}
        {paso === 1 && <PasoFecha sel={sel} onCambiar={onCambiar} />}
        {paso === 2 && <PasoInvitados sel={sel} onCambiar={onCambiar} />}
        {paso === 3 && <PasoMenu sel={sel} onCambiar={onCambiar} />}
        {paso === 4 && <PasoExtras sel={sel} onCambiar={onCambiar} />}
        {paso === ULTIMO && <PasoPrecio sel={sel} total={total} onPedir={onPedir} />}
      </div>

      {/* Abajo, en todos los pasos menos el último: el total en vivo y seguir */}
      {paso < ULTIMO && (
        <div className="flex items-center justify-between gap-3 border-t px-4 py-3" style={{ borderColor: C.borde, backgroundColor: C.tarjeta }}>
          <div>
            <p className="text-[10px] leading-3 font-semibold tracking-[0.06em] uppercase" style={{ color: C.suave }}>
              Precio sugerido
            </p>
            <p className="font-display text-[17px] leading-6 tabular-nums">{pesos(total)}</p>
          </div>
          <button
            type="button"
            onClick={() => onPaso(paso + 1)}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-[10px] px-3.5 text-[13px] font-semibold"
            style={{ backgroundColor: C.acento, color: C.sobreAcento }}
          >
            Siguiente
            <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}

function Pregunta({ children, ayuda }: { children: ReactNode; ayuda?: string }) {
  return (
    <div>
      <h3 className="font-display text-[22px] leading-7">{children}</h3>
      {ayuda && (
        <p className="mt-1 text-[12px] leading-4" style={{ color: C.suave }}>
          {ayuda}
        </p>
      )}
    </div>
  );
}

/** Un botón de opción del cotizador: con borde y fondo del color del salón cuando está elegido. */
function Opcion({
  elegida,
  onClick,
  children,
  className = "",
}: {
  elegida: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={elegida}
      onClick={onClick}
      className={`rounded-[12px] border text-left text-[13px] font-semibold transition-colors ${className}`}
      style={{
        borderColor: elegida ? C.acento : C.borde,
        backgroundColor: elegida ? `${C.acento}14` : C.tarjeta,
        color: C.texto,
      }}
    >
      {children}
    </button>
  );
}

type PropsPaso = { sel: Seleccion; onCambiar: (c: Partial<Seleccion>) => void };

function PasoFestejo({ sel, onCambiar }: PropsPaso) {
  return (
    <>
      <Pregunta ayuda="Armá tu fiesta y mirá el precio al instante.">¿Qué festejás?</Pregunta>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {FESTEJOS.map((f) => {
          const Icono = ICONO_FESTEJO[f.id];
          return (
            <Opcion
              key={f.id}
              elegida={sel.festejo === f.id}
              onClick={() => onCambiar({ festejo: f.id })}
              className="flex min-h-24 flex-col items-start justify-between p-3"
            >
              <Icono size={20} strokeWidth={1.7} aria-hidden="true" style={{ color: C.acento }} />
              {f.nombre}
            </Opcion>
          );
        })}
      </div>
    </>
  );
}

function PasoFecha({ sel, onCambiar }: PropsPaso) {
  const celdas = [...Array.from({ length: MES.primerDia }, () => null), ...Array.from({ length: MES.dias }, (_, i) => i + 1)];
  return (
    <>
      <Pregunta ayuda="Elegir la fecha no la reserva: la confirma el salón.">¿Qué fecha te gustaría?</Pregunta>
      <p className="mt-4 text-[13px] font-semibold">{MES.nombre}</p>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
          <span key={i} aria-hidden="true" className="text-[10px] font-semibold" style={{ color: C.suave }}>
            {d}
          </span>
        ))}
        {celdas.map((d, i) => {
          if (d === null) return <span key={`v${i}`} />;
          const ocupado = OCUPADOS.has(d);
          const elegido = sel.dia === d;
          return (
            <button
              key={d}
              type="button"
              disabled={ocupado}
              aria-pressed={elegido}
              aria-label={`${fechaLarga(d)}${ocupado ? ", ocupado" : ""}`}
              onClick={() => onCambiar({ dia: d })}
              className={`flex h-8 items-center justify-center rounded-[8px] text-[12px] tabular-nums ${ocupado ? "line-through" : ""}`}
              style={
                elegido
                  ? { backgroundColor: C.acento, color: C.sobreAcento, fontWeight: 700 }
                  : ocupado
                    ? { color: `${C.suave}80` }
                    : { color: C.texto, backgroundColor: diaDeSemana(d) === 5 ? `${C.acento}0d` : undefined }
              }
            >
              {d}
            </button>
          );
        })}
      </div>
      <p className="mt-3 flex items-center gap-3 text-[11px]" style={{ color: C.suave }}>
        <span className="flex items-center gap-1">
          <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: C.acento }} /> Elegida
        </span>
        <span className="flex items-center gap-1">
          <span aria-hidden="true" className="line-through">
            6
          </span>{" "}
          Ocupada
        </span>
      </p>
    </>
  );
}

function PasoInvitados({ sel, onCambiar }: PropsPaso) {
  const cambiar = (d: number) =>
    onCambiar({ invitados: Math.min(CAPACIDAD, Math.max(INVITADOS_MIN, sel.invitados + d)) });
  return (
    <>
      <Pregunta ayuda={`En el salón entran hasta ${CAPACIDAD} personas.`}>¿Cuántos invitados?</Pregunta>
      <div className="mt-10 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => cambiar(-INVITADOS_PASO)}
          disabled={sel.invitados <= INVITADOS_MIN}
          aria-label="Menos invitados"
          className="flex size-11 items-center justify-center rounded-full border disabled:opacity-40"
          style={{ borderColor: C.borde, backgroundColor: C.tarjeta }}
        >
          <Minus size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <p className="w-24 text-center">
          <span className="block font-display text-[48px] leading-none tabular-nums">{sel.invitados}</span>
          <span className="mt-1 block text-[12px]" style={{ color: C.suave }}>
            invitados
          </span>
        </p>
        <button
          type="button"
          onClick={() => cambiar(INVITADOS_PASO)}
          disabled={sel.invitados >= CAPACIDAD}
          aria-label="Más invitados"
          className="flex size-11 items-center justify-center rounded-full border disabled:opacity-40"
          style={{ borderColor: C.borde, backgroundColor: C.tarjeta }}
        >
          <Plus size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}

function PasoMenu({ sel, onCambiar }: PropsPaso) {
  return (
    <>
      <Pregunta>Elegí el menú</Pregunta>
      <div className="mt-4 flex flex-col gap-2">
        {MENUS.map((m) => (
          <Opcion
            key={m.id}
            elegida={sel.menu === m.id}
            onClick={() => onCambiar({ menu: m.id })}
            className="flex min-h-11 items-center justify-between px-3"
          >
            {m.nombre}
            {sel.menu === m.id && <Check size={16} strokeWidth={2.4} aria-hidden="true" style={{ color: C.acento }} />}
          </Opcion>
        ))}
      </div>
      <p className="mt-5 text-[13px] font-semibold">Y la barra</p>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {BARRAS.map((b) => (
          <Opcion
            key={b.id}
            elegida={sel.barra === b.id}
            onClick={() => onCambiar({ barra: b.id })}
            className="min-h-10 px-1 text-center text-[12px]"
          >
            {b.nombre}
          </Opcion>
        ))}
      </div>
    </>
  );
}

function PasoExtras({ sel, onCambiar }: PropsPaso) {
  const alternar = (id: IdExtra) =>
    onCambiar({ extras: sel.extras.includes(id) ? sel.extras.filter((e) => e !== id) : [...sel.extras, id] });
  return (
    <>
      <Pregunta>Sumá extras</Pregunta>
      <p className="mt-3 text-[11px] font-semibold tracking-[0.06em] uppercase" style={{ color: C.suave }}>
        Ya viene con el salón
      </p>
      <ul className="mt-1.5 flex flex-wrap gap-1.5">
        {INCLUIDO.map((t) => (
          <li
            key={t}
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px]"
            style={{ backgroundColor: `${C.acento}12`, color: C.texto }}
          >
            <Check size={12} strokeWidth={2.6} aria-hidden="true" style={{ color: C.acento }} />
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] font-semibold tracking-[0.06em] uppercase" style={{ color: C.suave }}>
        Para tus invitados
      </p>
      <div className="mt-1.5 flex flex-col gap-1.5">
        {EXTRAS.map((e) => {
          const elegido = sel.extras.includes(e.id);
          return (
            <Opcion key={e.id} elegida={elegido} onClick={() => alternar(e.id)} className="flex min-h-10 items-center gap-2.5 px-3">
              <span
                aria-hidden="true"
                className="flex size-4 shrink-0 items-center justify-center rounded-[5px] border"
                style={{ borderColor: elegido ? C.acento : C.borde, backgroundColor: elegido ? C.acento : "transparent" }}
              >
                {elegido && <Check size={11} strokeWidth={3} style={{ color: C.sobreAcento }} />}
              </span>
              {e.nombre}
            </Opcion>
          );
        })}
      </div>
    </>
  );
}

function PasoPrecio({ sel, total, onPedir }: { sel: Seleccion; total: number; onPedir: () => void }) {
  const festejo = FESTEJOS.find((f) => f.id === sel.festejo)!;
  const menu = MENUS.find((m) => m.id === sel.menu)!;
  const barra = BARRAS.find((b) => b.id === sel.barra)!;
  const extras = EXTRAS.filter((e) => sel.extras.includes(e.id));
  const filas = [
    ["Festejo", festejo.nombre],
    ["Fecha", fechaLarga(sel.dia)],
    ["Invitados", String(sel.invitados)],
    ["Menú y barra", `${menu.nombre} · ${barra.id === "sin" ? "sin barra" : `barra ${barra.nombre.toLowerCase()}`}`],
    ["Extras", extras.length ? `${extras.length} para tus invitados` : "Ninguno"],
  ];
  return (
    <>
      <Pregunta>Tu fiesta</Pregunta>
      <dl className="mt-3 flex flex-col">
        {filas.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 border-b py-1.5 text-[12px]" style={{ borderColor: C.borde }}>
            <dt style={{ color: C.suave }}>{k}</dt>
            <dd className="text-right font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 rounded-[14px] p-3.5 text-center" style={{ backgroundColor: `${C.acento}12` }}>
        <p className="text-[10px] font-semibold tracking-[0.08em] uppercase" style={{ color: C.acento }}>
          Precio sugerido
        </p>
        <p className="mt-1 font-display text-[28px] leading-8 tabular-nums">{pesos(total)}</p>
        <p className="mt-1 text-[11px] leading-4" style={{ color: C.suave }}>
          El final depende de la forma de pago.
        </p>
      </div>
      <button
        type="button"
        onClick={onPedir}
        className="mt-auto mb-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] text-[13px] font-semibold"
        style={{ backgroundColor: C.acento, color: C.sobreAcento }}
      >
        <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
        Pedir por WhatsApp
      </button>
    </>
  );
}

// ---------------------------------------------------------------------------
// Lo que ve el salón en su panel de Petra (modo noche, con los tokens de la marca)
// ---------------------------------------------------------------------------

function PantallaPanel({ sel, total }: { sel: Seleccion; total: number }) {
  const festejo = FESTEJOS.find((f) => f.id === sel.festejo)!;
  const menu = MENUS.find((m) => m.id === sel.menu)!;
  const ofrecido = [
    { nombre: "Salón", detalle: `sábados +${RECARGO_SABADO}%`, precio: PRECIO_SALON },
    { nombre: `Menú ${menu.nombre}`, detalle: "por invitado", precio: menu.precio },
    { nombre: "Invitación digital", detalle: "extra para invitados", precio: EXTRAS[0].precio },
  ];
  return (
    <div className="entrar-de-a-una flex h-full flex-col bg-surface px-4 pt-4 pb-4 text-ink">
      <div className="flex items-center justify-between">
        <p className="font-display text-[20px] leading-6">Cotizaciones</p>
        <span className="rounded-full bg-dorado-soft px-2 py-0.5 text-[10px] font-semibold text-dorado">3 nuevas</span>
      </div>

      {/* La que acaba de llegar: es lo que armó el cliente en la otra vista */}
      <div className="mt-2.5 rounded-[14px] border border-dorado/50 bg-surface-raised p-3">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-dorado px-2 py-0.5 text-[10px] font-bold tracking-wide text-on-dorado uppercase">
            Nueva
          </span>
          <span className="text-[10px] text-ink-muted">Recién</span>
        </div>
        <p className="mt-2 text-[14px] font-semibold">Laura M.</p>
        <p className="text-[12px] leading-4 text-ink-muted">
          {festejo.nombre} · {fechaCorta(sel.dia)} · {sel.invitados} invitados
        </p>
        <p className="mt-2 text-[11px] text-ink-muted">
          Precio sugerido <span className="font-display text-[16px] text-ink tabular-nums">{pesos(total)}</span>
        </p>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          <span className="inline-flex min-h-8 items-center justify-center gap-1 rounded-[8px] bg-oliva-soft text-[11px] font-semibold text-oliva-text">
            <MessageCircle size={12} strokeWidth={2} aria-hidden="true" />
            Responder
          </span>
          <span className="inline-flex min-h-8 items-center justify-center gap-1 rounded-[8px] bg-azul text-[11px] font-semibold text-on-azul">
            <CalendarPlus size={12} strokeWidth={2} aria-hidden="true" />
            Pasar a evento
          </span>
        </div>
      </div>

      <ul className="mt-2 flex flex-col gap-1.5 text-[12px]">
        {[
          { quien: "Martín R. · Casamiento", estado: "Contactada", clase: "bg-azul-soft text-azul-text" },
          { quien: "Andes S.A. · Empresarial", estado: "Ganada", clase: "bg-oliva-soft text-oliva-text" },
        ].map((c) => (
          <li key={c.quien} className="flex items-center justify-between rounded-[10px] bg-surface-raised px-3 py-1.5">
            <span>{c.quien}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c.clase}`}>{c.estado}</span>
          </li>
        ))}
      </ul>

      {/* Lo que el salón ofrece en su cotizador: lo prende, lo apaga y le pone precio */}
      <p className="mt-3 text-[10px] font-bold tracking-[0.08em] text-dorado uppercase">Lo que ofrecés</p>
      <ul className="mt-1.5 flex flex-col divide-y divide-line rounded-[12px] border border-line bg-surface-raised text-[12px]">
        {ofrecido.map((o) => (
          <li key={o.nombre} className="flex items-center justify-between gap-2 px-3 py-1.5">
            <span className="min-w-0">
              <span className="block truncate font-semibold">{o.nombre}</span>
              <span className="block text-[10px] text-ink-muted">{o.detalle}</span>
            </span>
            <span className="flex shrink-0 items-center gap-2">
              <span className="tabular-nums">{pesos(o.precio)}</span>
              <span aria-hidden="true" className="flex h-4 w-7 items-center justify-end rounded-full bg-azul p-0.5">
                <span className="size-3 rounded-full bg-white" />
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

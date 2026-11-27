"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  LayoutDashboard,
  UserRound,
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
// Con el dedo que toca (ver "toque" más abajo), cada pantalla dura un poco más, para que sea tranquilo.
const MS_PASO_CON_DEDO = 3600;
const MS_PRECIO_CON_DEDO = 4200;
// Con el dedo, el recorrido arranca con otras opciones y el dedo va eligiendo las del ejemplo
// (XV años, el 13, +10 invitados, Premium, Invitación digital): al final queda SELECCION_INICIAL.
const INICIO_CON_DEDO: Seleccion = {
  ...SELECCION_INICIAL,
  festejo: "casamiento",
  dia: 14,
  invitados: SELECCION_INICIAL.invitados - INVITADOS_PASO,
  menu: "clasico",
  extras: SELECCION_INICIAL.extras.filter((e) => e !== "invitacion"),
};
// Cuánto antes del cambio de pantalla aparece el dedo, toca y se va (en ms).
const DEDO_APARECE = 2000;
const DEDO_TOCA = 1400;
const DEDO_SE_VA = 700;
const MS_PANEL = 5200;

// Al cargar: el celular vibra y le "llegan" consultas con campanita, como pasa hoy por WhatsApp.
// Dura INTRO_MS (los tiempos de cada parte están en .celular-vibra y .aviso-llega, en globals.css);
// recién después arranca el recorrido de siempre. Con movimiento reducido, las consultas aparecen con un fundido.
const INTRO_MS = 3400;
const AVISOS = [
  { texto: "¿Precio para 120?", lado: "izquierda", arriba: 110, demora: 0.75 },
  { texto: "¿Tienen el 13/3?", lado: "derecha", arriba: 190, demora: 1.05 },
  { texto: "Info porfa", lado: "izquierda", arriba: 290, demora: 1.35 },
  { texto: "¿Qué incluye?", lado: "derecha", arriba: 370, demora: 1.65 },
  { texto: "¿Precio XV?", lado: "izquierda", arriba: 450, demora: 1.95 },
] as const;

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
const NOMBRE_SALON = "Tu marca";

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
  const [intro, setIntro] = useState(true);
  const idVistas = useId();

  // El dedo de ayuda: un círculo que toca lo que el recorrido elige, para que se note que el celular se puede usar.
  // El toque elige de verdad (y el precio se actualiza), partiendo de INICIO_CON_DEDO. Si algo ya está elegido,
  // toca "Siguiente". Arranca cuando el celular está a la vista y se apaga para siempre (en esta visita) apenas
  // la persona toca, pasa el mouse o hace scroll dentro del celular; ahí el ejemplo vuelve a SELECCION_INICIAL.
  // Con "reducir movimiento" no aparece y el ejemplo queda como siempre.
  const celular = useRef<HTMLDivElement>(null);
  const pantalla = useRef<HTMLDivElement>(null);
  const [aLaVista, setALaVista] = useState(false);
  const [conDedo, setConDedo] = useState(false);
  const [dedo, setDedo] = useState<{ x: number; y: number; fase: "entra" | "toca" | "sale" } | null>(null);
  // Con el mouse encima, la animación no se frena de golpe: un aviso chico cuenta 5 segundos y recién ahí se
  // frena. Si el mouse se va antes, sigue. Así quien recién llega no la corta sin querer.
  const [cuenta, setCuenta] = useState<number | null>(null);

  useEffect(() => {
    const dedoSi = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setConDedo(dedoSi);
    if (dedoSi) setSel(INICIO_CON_DEDO);
    const el = celular.current;
    if (!el) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setALaVista(true);
          observador.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  // Termina la intro de mensajes. Cuenta desde que se
  // va la pantalla de carga (evento "petra:lista"), porque mientras tanto las animaciones están en pausa.
  useEffect(() => {
    let id = 0;
    const empezar = () => {
      id = window.setTimeout(() => setIntro(false), INTRO_MS);
    };
    if (document.documentElement.classList.contains("cargando")) {
      window.addEventListener("petra:lista", empezar, { once: true });
    } else empezar();
    return () => {
      window.removeEventListener("petra:lista", empezar);
      window.clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    // El recorrido pasa solo para todos (con "reducir movimiento", las pantallas cambian con un fundido).
    if (intro || !solo || !aLaVista) return;
    const espera =
      vista === "panel" ? MS_PANEL : paso === ULTIMO ? (conDedo ? MS_PRECIO_CON_DEDO : MS_PRECIO) : conDedo ? MS_PASO_CON_DEDO : MS_PASO;
    const relojes: number[] = [];
    if (conDedo && vista === "cliente") {
      // El dedo va a lo que el recorrido "elige": la opción marcada del paso, o "Siguiente", o "Pedir" en el precio.
      const buscar = () => {
        const p = pantalla.current;
        if (!p) return null;
        const objetivo =
          paso === ULTIMO
            ? p.querySelector<HTMLElement>('[data-toque="pedir"]')
            : (p.querySelector<HTMLElement>("[data-paso] [data-meta]") ?? p.querySelector<HTMLElement>('[data-toque="siguiente"]'));
        if (!objetivo) return null;
        // En pantallas bajas la demo está achicada (zoom): se pasa de píxeles de pantalla a píxeles del celular.
        const caja = p.getBoundingClientRect();
        const escala = caja.width / p.offsetWidth || 1;
        const r = objetivo.getBoundingClientRect();
        return { objetivo, x: (r.left - caja.left + r.width / 2) / escala, y: (r.top - caja.top + r.height / 2) / escala };
      };
      let destino: ReturnType<typeof buscar> = null;
      relojes.push(
        window.setTimeout(() => {
          destino = buscar();
          if (destino) setDedo({ x: destino.x, y: destino.y, fase: "entra" });
        }, espera - DEDO_APARECE),
        window.setTimeout(() => {
          if (!destino) return;
          setDedo({ x: destino.x, y: destino.y, fase: "toca" });
          // Si es una opción del paso, queda elegida de verdad (como si la persona la tocara).
          if (destino.objetivo.hasAttribute("data-meta")) destino.objetivo.click();
          // La tarjeta se hunde un poquito y vuelve, como un toque de verdad.
          destino.objetivo.animate([{ transform: "scale(1)" }, { transform: "scale(0.95)" }, { transform: "scale(1)" }], {
            duration: 320,
            easing: "ease-out",
          });
        }, espera - DEDO_TOCA),
        window.setTimeout(() => {
          if (destino) setDedo({ x: destino.x, y: destino.y, fase: "sale" });
        }, espera - DEDO_SE_VA),
      );
    }
    const id = window.setTimeout(() => {
      if (vista === "panel") {
        setVista("cliente");
        setPaso(0);
        // Vuelta nueva: el dedo vuelve a elegir desde el principio.
        if (conDedo) setSel(INICIO_CON_DEDO);
      } else if (paso === ULTIMO) setVista("panel");
      else setPaso(paso + 1);
    }, espera);
    return () => {
      window.clearTimeout(id);
      relojes.forEach((r) => window.clearTimeout(r));
    };
  }, [intro, solo, vista, paso, aLaVista, conDedo]);

  useEffect(() => {
    if (cuenta === null) return;
    if (cuenta === 0) {
      parar();
      return;
    }
    const id = window.setTimeout(() => setCuenta((c) => (c === null ? null : c - 1)), 1000);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cuenta]);

  const parar = () => {
    // La primera vez que la persona lo usa, el ejemplo vuelve a como estaba (con todo elegido).
    if (solo && conDedo) setSel(SELECCION_INICIAL);
    setSolo(false);
    setDedo(null);
    setCuenta(null);
  };
  const total = precioSugerido(sel);
  const cambiar = (c: Partial<Seleccion>) => setSel((s) => ({ ...s, ...c }));

  return (
    // El celular y, a su derecha, los botones de vista uno arriba del otro.
    <div
      onPointerDown={parar}
      onKeyDown={parar}
      onWheel={parar}
      onTouchMove={parar}
      className="mx-auto flex w-fit items-start gap-2 sm:gap-3"
    >
      <div className="w-[250px] sm:w-[300px]">
      <p className="mt-3 mb-6 text-center text-[14px] leading-5" aria-live="polite">
        {MIRADAS[vista].texto}
      </p>

      <div className="relative">
        {intro && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
            {AVISOS.map((a) => (
              <span
                key={a.texto}
                className={`aviso-llega absolute flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap text-ink shadow-[0_8px_20px_-6px_#2a457366] ${
                  a.lado === "izquierda" ? "-left-10" : "-right-10"
                }`}
                style={{ top: a.arriba, "--demora": `${a.demora}s` } as React.CSSProperties}
              >
                <span className="campanita flex size-5 items-center justify-center rounded-full bg-dorado text-on-dorado">
                  <Bell size={12} strokeWidth={2.4} />
                </span>
                {a.texto}
              </span>
            ))}
          </div>
        )}
        <div
          ref={celular}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse" && solo) setCuenta(5);
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setCuenta(null);
          }}
          className={`relative rounded-[42px] bg-marino p-3 shadow-[0_30px_60px_-12px_#2a457366] ${intro ? "celular-vibra" : ""}`}
        >
          <div
            ref={pantalla}
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
            {dedo && solo && (
              <span
                aria-hidden="true"
                className={`dedo dedo-${dedo.fase} pointer-events-none absolute z-20`}
                style={{ left: dedo.x, top: dedo.y }}
              />
            )}
          </div>
        </div>
      </div>
      {/* Mientras cuenta (mouse encima), el aviso ocupa el lugar de esta línea. */}
      <p className="mt-5 flex h-6 items-center justify-center text-center text-[12px] leading-4" aria-live="polite">
        {cuenta !== null && cuenta > 0 ? (
          <span className="rounded-full bg-marino px-3 py-1 text-[11px] leading-4 font-semibold whitespace-nowrap text-white">
            La animación finalizará en {cuenta}
          </span>
        ) : (
          "Demostración con precios de ejemplo."
        )}
      </p>
      </div>

      <p id={idVistas} className="sr-only">
        Elegí qué vista mirar
      </p>
      <div
        role="group"
        aria-labelledby={idVistas}
        className="mt-24 flex w-[58px] flex-col gap-1 rounded-[12px] border border-line bg-surface-raised p-1 shadow-piedra sm:w-[76px]"
      >
        {(Object.keys(MIRADAS) as Vista[]).map((v) => {
          const Icono = v === "cliente" ? UserRound : LayoutDashboard;
          return (
            <button
              key={v}
              type="button"
              aria-pressed={vista === v}
              onClick={() => setVista(v)}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-[8px] px-1 text-[11px] leading-3 font-semibold transition-colors sm:text-[12px] ${
                vista === v ? "bg-marino text-white" : "text-ink-muted hover:text-ink"
              }`}
            >
              <Icono size={18} strokeWidth={2} aria-hidden="true" />
              {MIRADAS[v].nombre}
            </button>
          );
        })}
      </div>
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
            className="flex size-5 items-center justify-center rounded-full font-semibold tracking-tight text-[10px] text-white"
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
      <div key={paso} data-paso className="entrar-de-a-una flex min-h-0 flex-1 flex-col px-4 pt-5">
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
            <p className="text-[10px] leading-3 font-semibold tracking-[0.06em] whitespace-nowrap uppercase" style={{ color: C.suave }}>
              Precio sugerido
            </p>
            <p className="text-[15px] leading-6 font-semibold tracking-tight whitespace-nowrap tabular-nums sm:text-[17px]">{pesos(total)}</p>
          </div>
          <button
            type="button"
            data-toque="siguiente"
            onClick={() => onPaso(paso + 1)}
            className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-[10px] px-3 text-[13px] font-semibold sm:px-3.5"
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
      <h3 className="font-semibold tracking-tight text-[22px] leading-7">{children}</h3>
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
  meta = false,
}: {
  elegida: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  meta?: boolean;
}) {
  return (
    <button
      type="button"
      data-meta={meta && !elegida ? "" : undefined}
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
              meta={f.id === SELECCION_INICIAL.festejo}
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
      <Pregunta ayuda="Elegir la fecha no la reserva: te la confirman después.">¿Qué fecha te gustaría?</Pregunta>
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
              data-meta={d === SELECCION_INICIAL.dia && !elegido ? "" : undefined}
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
      <Pregunta ayuda={`Entran hasta ${CAPACIDAD} personas.`}>¿Cuántos invitados?</Pregunta>
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
          <span className="block font-semibold tracking-tight text-[48px] leading-none tabular-nums">{sel.invitados}</span>
          <span className="mt-1 block text-[12px]" style={{ color: C.suave }}>
            invitados
          </span>
        </p>
        <button
          type="button"
          onClick={() => cambiar(INVITADOS_PASO)}
          disabled={sel.invitados >= CAPACIDAD}
          data-meta={sel.invitados < SELECCION_INICIAL.invitados ? "" : undefined}
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
            meta={m.id === SELECCION_INICIAL.menu}
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
        Ya viene incluido
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
            <Opcion
              key={e.id}
              elegida={elegido}
              meta={SELECCION_INICIAL.extras.includes(e.id)}
              onClick={() => alternar(e.id)}
              className="flex min-h-10 items-center gap-2.5 px-3"
            >
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
        <p className="mt-1 font-semibold tracking-tight text-[28px] leading-8 tabular-nums">{pesos(total)}</p>
        <p className="mt-1 text-[11px] leading-4" style={{ color: C.suave }}>
          El final depende de la forma de pago.
        </p>
      </div>
      <button
        type="button"
        data-toque="pedir"
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
// Lo que ve el salón en su panel de Petra (con los tokens de la marca, como en el sistema)
// ---------------------------------------------------------------------------

function PantallaPanel({ sel, total }: { sel: Seleccion; total: number }) {
  const festejo = FESTEJOS.find((f) => f.id === sel.festejo)!;
  const menu = MENUS.find((m) => m.id === sel.menu)!;
  const ofrecido = [
    { nombre: "Espacio", detalle: `sábados +${RECARGO_SABADO}%`, precio: PRECIO_SALON },
    { nombre: `Menú ${menu.nombre}`, detalle: "por invitado", precio: menu.precio },
    { nombre: "Invitación digital", detalle: "extra para invitados", precio: EXTRAS[0].precio },
  ];
  return (
    <div className="entrar-de-a-una flex h-full flex-col bg-surface px-4 pt-4 pb-4 text-ink">
      <div className="flex items-center justify-between">
        <p className="font-semibold tracking-tight text-[20px] leading-6">Cotizaciones</p>
        <span className="rounded-full bg-azul-soft px-2 py-0.5 text-[10px] font-semibold text-azul-text">3 nuevas</span>
      </div>

      {/* La que acaba de llegar: es lo que armó el cliente en la otra vista */}
      <div className="mt-2.5 rounded-[14px] border border-azul/60 bg-surface-raised p-3">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-azul px-2 py-0.5 text-[10px] font-bold tracking-wide text-on-azul uppercase">
            Nueva
          </span>
          <span className="text-[10px] text-ink-muted">Recién</span>
        </div>
        <p className="mt-2 text-[14px] font-semibold">Laura M.</p>
        <p className="text-[12px] leading-4 text-ink-muted">
          {festejo.nombre} · {fechaCorta(sel.dia)} · {sel.invitados} invitados
        </p>
        <p className="mt-2 text-[11px] text-ink-muted">
          Precio sugerido <span className="font-semibold tracking-tight text-[16px] text-ink tabular-nums">{pesos(total)}</span>
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
      <p className="mt-3 text-[10px] font-bold tracking-[0.08em] text-azul-text uppercase">Lo que ofrecés</p>
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

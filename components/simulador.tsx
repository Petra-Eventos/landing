"use client";

import { useEffect, useId, useState } from "react";
import { Check, ImagePlus, Mail, LayoutGrid, ListChecks, Palette, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DESTACADOS } from "@/lib/catalogo";

// Colores que puede elegir el salón para su marca. Son datos del salón, no tokens de Petra.
const COLORES = [
  { nombre: "Azul", valor: "#1c79a4" },
  { nombre: "Dorado", valor: "#b8913f" },
  { nombre: "Rosa", valor: "#c2577a" },
  { nombre: "Verde", valor: "#4f7a3a" },
  { nombre: "Violeta", valor: "#6a4fb0" },
];

type Perfil = "salon" | "cliente" | "invitado";

type IdEvento = "casamiento" | "cumple" | "xv";

// Cada estilo es una forma distinta de armar la invitación; los colores los pone la plantilla.
type Estilo = "elegante" | "clasica" | "moderna" | "animada" | "tecno";

/**
 * Plantillas de la invitación. El cliente elige una y es la que ven sus invitados.
 * Los colores son datos del diseño (no tokens de Petra). Sin acento, se usa el color del salón.
 */
type Plantilla = {
  id: string;
  nombre: string;
  estilo: Estilo;
  fondo: string;
  texto: string;
  suave: string;
  borde: string;
  acento?: string;
  sobreAcento: string;
};

type Evento = {
  id: IdEvento;
  nombre: string;
  /** Para los encabezados del panel: "XV de Sofía". */
  corto: string;
  /** Para la pregunta del invitado: "¿Vienen a los XV de Sofía?". */
  aLa: string;
  etiqueta: string;
  protagonista: string;
  sigla: string;
  invita: string;
  grito: string;
  fecha: string;
  diaSemana: string;
  dia: string;
  mes: string;
  hora: string;
  plantillas: Plantilla[];
};

// El staff elige el tipo de evento; cada tipo trae sus propias plantillas para los anfitriones.
const EVENTOS: Evento[] = [
  {
    id: "casamiento",
    nombre: "Casamiento",
    corto: "Boda de Ana y Martín",
    aLa: "a la boda de Ana y Martín",
    etiqueta: "Nos casamos",
    protagonista: "Ana & Martín",
    sigla: "A&M",
    invita: "Queremos compartir este día con vos",
    grito: "¡Nos casamos!",
    fecha: "Sábado 22 de marzo",
    diaSemana: "Sábado",
    dia: "22",
    mes: "Mar",
    hora: "20:00",
    plantillas: [
      { id: "elegante-dorado", nombre: "Elegante dorado", estilo: "elegante", fondo: "#14110b", texto: "#f5ecd7", suave: "#cbbf9f", borde: "#c9a24b", acento: "#c9a24b", sobreAcento: "#1a1306" },
      { id: "oliva-blanco", nombre: "Verde oliva y blanco", estilo: "clasica", fondo: "#ffffff", texto: "#2f3a1a", suave: "#5f6b45", borde: "#c9cfb0", acento: "#5f6d2f", sobreAcento: "#ffffff" },
      { id: "blanco-dorado", nombre: "Blanco y dorado", estilo: "elegante", fondo: "#fffdf7", texto: "#3a2f17", suave: "#6f6043", borde: "#c9a24b", acento: "#c9a24b", sobreAcento: "#1a1306" },
      { id: "azul-negro", nombre: "Azul y negro", estilo: "moderna", fondo: "#0b0f1a", texto: "#eef2fb", suave: "#a3b0cc", borde: "#2a3a5c", acento: "#2f63c8", sobreAcento: "#ffffff" },
      { id: "naranja-blanco", nombre: "Naranja y blanco", estilo: "clasica", fondo: "#ffffff", texto: "#3a1f0b", suave: "#7a5a43", borde: "#f5cfae", acento: "#c2561a", sobreAcento: "#ffffff" },
      { id: "animado", nombre: "Animado", estilo: "animada", fondo: "#fff6f3", texto: "#4a2230", suave: "#8a5a68", borde: "#f0c9d2", acento: "#c2456b", sobreAcento: "#ffffff" },
    ],
  },
  {
    id: "cumple",
    nombre: "Cumpleaños",
    corto: "Cumple de Lucas",
    aLa: "al cumple de Lucas",
    etiqueta: "Mis 40",
    protagonista: "Lucas",
    sigla: "40",
    invita: "Te invito a festejar mis 40",
    grito: "¡Vení a festejar!",
    fecha: "Viernes 7 de noviembre",
    diaSemana: "Viernes",
    dia: "7",
    mes: "Nov",
    hora: "21:00",
    plantillas: [
      { id: "elegante", nombre: "Elegante", estilo: "elegante", fondo: "#15131d", texto: "#f3eee6", suave: "#bdb6c9", borde: "#c9a24b", acento: "#c9a24b", sobreAcento: "#1a1306" },
      { id: "informal", nombre: "Informal", estilo: "animada", fondo: "#fff7e6", texto: "#3b2a12", suave: "#7a6243", borde: "#f0d9a8", acento: "#c7363f", sobreAcento: "#ffffff" },
      { id: "casual", nombre: "Casual", estilo: "moderna", fondo: "#f3f7f4", texto: "#1f2d27", suave: "#4d5f57", borde: "#cfdcd4", sobreAcento: "#ffffff" },
    ],
  },
  {
    id: "xv",
    nombre: "XV",
    corto: "XV de Sofía",
    aLa: "a los XV de Sofía",
    etiqueta: "Mis XV",
    protagonista: "Sofía",
    sigla: "XV",
    invita: "Te invito a celebrar mis XV",
    grito: "¡Vení a festejar!",
    fecha: "Sábado 14 de diciembre",
    diaSemana: "Sábado",
    dia: "14",
    mes: "Dic",
    hora: "21:30",
    plantillas: [
      { id: "elegante-rosa", nombre: "Elegante rosa", estilo: "elegante", fondo: "#2a0f1e", texto: "#fbe9f0", suave: "#e0b9c8", borde: "#e6a3bd", acento: "#e6a3bd", sobreAcento: "#2a0f1e" },
      { id: "elegante-lila", nombre: "Elegante lila", estilo: "elegante", fondo: "#1d1530", texto: "#f1ebff", suave: "#c3b6e0", borde: "#c5b0f0", acento: "#c5b0f0", sobreAcento: "#1d1530" },
      { id: "elegante-turquesa", nombre: "Elegante turquesa", estilo: "elegante", fondo: "#0d2226", texto: "#e8fbf8", suave: "#a9d6cf", borde: "#7fd1c7", acento: "#7fd1c7", sobreAcento: "#0d2226" },
      { id: "moderno", nombre: "Moderno", estilo: "moderna", fondo: "#ffffff", texto: "#111827", suave: "#4b5563", borde: "#d1d5db", acento: "#c42a6f", sobreAcento: "#ffffff" },
      { id: "tecnologico", nombre: "Tecnológico", estilo: "tecno", fondo: "#05070f", texto: "#e6f7ff", suave: "#8fb3c7", borde: "#22e3ff", acento: "#22e3ff", sobreAcento: "#05070f" },
    ],
  },
];

// Colores de las pantallas que no son la invitación (panel, lista y mesas).
const BASE = { fondo: "#fbf8f3", texto: "#1b2d52", suave: "#56627a" };

// Las tres miradas de cada producto: el salón lo asigna, el cliente lo configura y el invitado lo usa.
const PERFILES: { id: Perfil; nombre: string; texto: string }[] = [
  { id: "salon", nombre: "Staff", texto: "Eligen el tipo de evento y siguen todo desde el panel." },
  { id: "cliente", nombre: "Anfitriones", texto: "Lo configuran desde un link, sin crearse una cuenta." },
  { id: "invitado", nombre: "Invitados", texto: "Lo usan desde su celular, sin bajar ninguna app." },
];

const ICONOS: Record<string, LucideIcon> = {
  invitacion: Mail,
  lista_invitados: ListChecks,
  armado_mesas: LayoutGrid,
};

/**
 * Simulador: el salón ve cómo queda cada producto en el celular de sus invitados,
 * con su nombre, su logo y su color. El logo se muestra solo en este navegador: no se sube a ningún lado.
 */
export function Simulador() {
  const [producto, setProducto] = useState(DESTACADOS[0].id);
  const [perfil, setPerfil] = useState<Perfil>("invitado");
  const [salon, setSalon] = useState("");
  const [color, setColor] = useState(COLORES[0].valor);
  const [logo, setLogo] = useState<string | null>(null);
  const [idEvento, setIdEvento] = useState<IdEvento>("xv");
  const [nPlantilla, setNPlantilla] = useState(0);
  const idNombre = useId();
  const idLogo = useId();

  // Libera la imagen anterior cuando se cambia o se va de la página.
  useEffect(() => {
    return () => {
      if (logo) URL.revokeObjectURL(logo);
    };
  }, [logo]);

  const nombreSalon = salon.trim() || "Tu salón";
  const actual = DESTACADOS.find((p) => p.id === producto) ?? DESTACADOS[0];
  const miradaActual = PERFILES.find((p) => p.id === perfil) ?? PERFILES[2];
  const evento = EVENTOS.find((e) => e.id === idEvento) ?? EVENTOS[2];
  const plantillas = evento.plantillas;
  const plantilla = plantillas[nPlantilla % plantillas.length];
  // La plantilla se ve en la invitación de los anfitriones (que la eligen) y de los invitados (que la reciben).
  const tema = producto === "invitacion" && perfil !== "salon" ? plantilla : BASE;
  const puedePersonalizar = producto === "invitacion" && perfil === "cliente";
  const siguientePlantilla = () => setNPlantilla((n) => (n + 1) % plantillas.length);
  const elegirEvento = (id: IdEvento) => {
    setIdEvento(id);
    setNPlantilla(0);
  };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
      {/* Controles */}
      <div>
        <div role="group" aria-label="Elegí un producto" className="grid gap-3 sm:grid-cols-3">
          {DESTACADOS.map((p) => {
            const Icono = ICONOS[p.id] ?? Mail;
            const activo = p.id === producto;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={activo}
                onClick={() => setProducto(p.id)}
                className={`flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-colors ${
                  activo ? "border-dorado bg-dorado-soft" : "border-line bg-surface-raised hover:border-line-strong"
                }`}
              >
                <span className="flex w-full items-center justify-between">
                  <Icono size={22} strokeWidth={1.7} className={activo ? "text-dorado" : "text-azul-text"} aria-hidden="true" />
                  <span className="type-etiqueta text-[10px] text-ink-muted">{p.ya ? "Ya disponible" : "Próximamente"}</span>
                </span>
                <span className="type-boton text-ink">{p.nombre}</span>
                <span className="text-[13px] leading-5 text-ink-muted">{p.texto}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg border border-line bg-surface-raised p-5">
          <p className="type-etiqueta text-dorado">Probalo con tu marca</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor={idNombre} className="text-[14px] font-semibold text-ink">
                Nombre de tu salón
              </label>
              <input
                id={idNombre}
                value={salon}
                onChange={(e) => setSalon(e.target.value)}
                maxLength={40}
                placeholder="Por ejemplo, Salón Los Álamos"
                className="min-h-11 rounded-md border border-line-strong bg-surface px-3 text-[15px] text-ink placeholder:text-ink-muted/60"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={idLogo} className="text-[14px] font-semibold text-ink">
                Tu logo
              </label>
              <div className="flex items-center gap-2">
                <label
                  htmlFor={idLogo}
                  className="type-boton inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-line-strong px-3 text-[14px] text-ink hover:border-dorado"
                >
                  <ImagePlus size={18} strokeWidth={1.8} aria-hidden="true" />
                  {logo ? "Cambiar logo" : "Subir una imagen"}
                </label>
                {logo && (
                  <button
                    type="button"
                    onClick={() => setLogo(null)}
                    aria-label="Quitar el logo"
                    className="inline-flex size-11 items-center justify-center rounded-md border border-line-strong text-ink-muted hover:text-ink"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                )}
                <input
                  id={idLogo}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const archivo = e.target.files?.[0];
                    if (archivo) setLogo(URL.createObjectURL(archivo));
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
          </div>
          <fieldset className="mt-5">
            <legend className="text-[14px] font-semibold text-ink">Color de tu marca</legend>
            <div className="mt-2 flex flex-wrap gap-2.5">
              {COLORES.map((c) => (
                <button
                  key={c.valor}
                  type="button"
                  onClick={() => setColor(c.valor)}
                  aria-label={c.nombre}
                  aria-pressed={color === c.valor}
                  className={`flex size-10 items-center justify-center rounded-full border-2 ${
                    color === c.valor ? "border-ink" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.valor }}
                >
                  {color === c.valor && <Check size={18} strokeWidth={2.6} className="text-white" aria-hidden="true" />}
                </button>
              ))}
            </div>
          </fieldset>
          <p className="mt-4 text-[12px] leading-5 text-ink-muted">
            Tu logo se ve solo en tu pantalla: no lo guardamos ni lo subimos a ningún lado.
          </p>
        </div>
      </div>

      {/* Celular */}
      <div className="mx-auto w-[280px] sm:w-[300px]">
        <div role="group" aria-label="Ver como" className="grid grid-cols-3 gap-1 rounded-md border border-line bg-surface-raised p-1">
          {PERFILES.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={perfil === p.id}
              onClick={() => setPerfil(p.id)}
              className={`min-h-10 rounded-[8px] text-[14px] font-semibold transition-colors ${
                perfil === p.id ? "bg-dorado text-on-dorado" : "text-ink-muted hover:text-ink"
              }`}
            >
              {p.nombre}
            </button>
          ))}
        </div>
        <p className="mt-2 mb-4 min-h-10 text-center text-[13px] leading-5 text-ink-muted" aria-live="polite">
          {miradaActual.texto}
        </p>
        {perfil === "salon" && (
          <div className="mb-4">
            <div role="group" aria-label="Tipo de evento" className="grid grid-cols-3 gap-1 rounded-md border border-line bg-surface-raised p-1">
              {EVENTOS.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  aria-pressed={idEvento === e.id}
                  onClick={() => elegirEvento(e.id)}
                  className={`min-h-9 rounded-[8px] border text-[13px] font-semibold transition-colors ${
                    idEvento === e.id ? "border-dorado bg-dorado-soft text-dorado" : "border-transparent text-ink-muted hover:text-ink"
                  }`}
                >
                  {e.nombre}
                </button>
              ))}
            </div>
            <p className="mt-2 text-center text-[12px] leading-5 text-ink-muted">
              Cada tipo trae sus plantillas para los anfitriones.
            </p>
          </div>
        )}
        <p className="sr-only">
          Vista previa de {actual.nombre} para {nombreSalon}, {evento.corto}, en la vista de {miradaActual.nombre.toLowerCase()}
          {producto === "invitacion" ? `, con la plantilla ${plantilla.nombre}` : ""}
        </p>
        <div className="relative">
          {puedePersonalizar && (
            <div className="absolute top-40 -right-7 z-10 flex flex-col items-center gap-1.5 sm:-right-9">
              <button
                type="button"
                onClick={siguientePlantilla}
                aria-label={`Cambiar plantilla. Ahora: ${plantilla.nombre}`}
                title="Cambiar plantilla"
                className="flex size-14 items-center justify-center rounded-full border-2 border-dorado bg-dorado text-on-dorado shadow-piedra transition-transform hover:scale-105 active:scale-95"
              >
                <Palette size={24} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <span className="rounded-full bg-surface-raised px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap text-dorado shadow-piedra">
                {nPlantilla % plantillas.length + 1} de {plantillas.length}
              </span>
            </div>
          )}
        <div aria-hidden="true" className="rounded-[42px] border border-line-strong bg-noche p-3 shadow-piedra">
          {/* La pantalla del invitado va en claro: así la ven los invitados del salón (colores fijos a propósito). */}
          <div
            className="relative flex min-h-[520px] flex-col overflow-hidden rounded-[32px]"
            style={{ backgroundColor: tema.fondo, color: tema.texto }}
          >
            <div className="flex flex-col items-center gap-2 px-5 pt-6 pb-4" style={{ backgroundColor: `${color}14` }}>
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- imagen local del visitante (blob:), no se optimiza
                <img src={logo} alt="" className="h-12 max-w-[160px] object-contain" />
              ) : (
                <span
                  className="flex size-12 items-center justify-center rounded-full font-display text-[20px] text-white"
                  style={{ backgroundColor: color }}
                >
                  {nombreSalon.charAt(0).toUpperCase()}
                </span>
              )}
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase" style={{ color }}>
                {nombreSalon}
              </p>
            </div>
            <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
              <span
                className="mb-3 self-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.06em] uppercase"
                style={{ backgroundColor: `${color}1a`, color }}
              >
                Vista {perfil === "salon" ? "del staff" : perfil === "cliente" ? "de anfitriones" : "de invitados"}
              </span>
              <Pantalla producto={producto} perfil={perfil} color={color} evento={evento} plantilla={plantilla} />
              <p className="mt-auto pt-4 text-center text-[10px]" style={{ color: tema.suave }}>
                Hecho con Petra
              </p>
            </div>
          </div>
        </div>
        </div>
        {puedePersonalizar && (
          <p className="mt-3 text-center text-[12px] text-ink-muted">Tocá el círculo para cambiar la plantilla.</p>
        )}
      </div>
    </div>
  );
}

/** La invitación que recibe el invitado, con la plantilla que eligieron los anfitriones. */
function VistaInvitacion({
  color,
  evento,
  plantilla,
  sinBotones = false,
}: {
  color: string;
  evento: Evento;
  plantilla: Plantilla;
  sinBotones?: boolean;
}) {
  const acento = plantilla.acento ?? color;
  const tecno = plantilla.estilo === "tecno";
  const botones = sinBotones ? null : (
    <div className="relative mt-6 flex flex-col gap-2">
      <span
        className={`flex min-h-11 items-center justify-center text-[15px] font-semibold ${tecno ? "rounded-md font-mono" : "rounded-xl"}`}
        style={{ backgroundColor: acento, color: plantilla.sobreAcento }}
      >
        Confirmo asistencia
      </span>
      <span
        className={`flex min-h-11 items-center justify-center border text-[15px] ${tecno ? "rounded-md font-mono" : "rounded-xl"}`}
        style={{ borderColor: plantilla.borde }}
      >
        No puedo ir
      </span>
    </div>
  );
  const suave = { color: plantilla.suave };

  if (plantilla.estilo === "elegante") {
    return (
      <div className="text-center">
        <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: plantilla.borde }}>
          ✦ {evento.etiqueta} ✦
        </p>
        <p className="mt-3 font-display text-[32px] leading-10 italic">{evento.protagonista}</p>
        <div className="mx-auto mt-3 flex items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px w-10" style={{ backgroundColor: plantilla.borde }} />
          <span className="size-1.5 rotate-45" style={{ backgroundColor: plantilla.borde }} />
          <span className="h-px w-10" style={{ backgroundColor: plantilla.borde }} />
        </div>
        <p className="mt-4 text-[13px]" style={suave}>
          {evento.invita}
        </p>
        <p className="mt-2 text-[14px] font-semibold">
          {evento.fecha} · {evento.hora}
        </p>
        {botones}
      </div>
    );
  }

  if (plantilla.estilo === "moderna") {
    return (
      <div>
        <p className="font-sans text-[52px] leading-none font-extrabold tracking-[-0.04em]" style={{ color: acento }}>
          {evento.sigla}
        </p>
        <p className="mt-1 font-sans text-[24px] leading-8 font-bold tracking-[-0.02em] uppercase">{evento.protagonista}</p>
        <div className="mt-4 flex items-stretch overflow-hidden rounded-xl" style={{ backgroundColor: acento, color: plantilla.sobreAcento }}>
          <span className="flex flex-col items-center justify-center bg-black/15 px-4 py-2">
            <span className="text-[11px] font-semibold uppercase">{evento.mes}</span>
            <span className="text-[24px] leading-7 font-extrabold">{evento.dia}</span>
          </span>
          <span className="flex flex-col justify-center px-4 text-[13px]">
            <span className="font-semibold">{evento.diaSemana}</span>
            <span>{evento.hora} hs</span>
          </span>
        </div>
        {botones}
      </div>
    );
  }

  if (plantilla.estilo === "animada") {
    // En las bodas flotan corazones; en el resto, papel picado. Se quedan quietos si la persona pidió menos movimiento.
    const casamiento = evento.id === "casamiento";
    const colores = casamiento ? [acento, plantilla.borde, acento, plantilla.borde, acento] : ["#e8505b", "#f9a826", "#14b1ab", "#7c5cbf", acento];
    return (
      <div className="relative text-center">
        {colores.map((c, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`flotar absolute ${casamiento ? "text-[16px] leading-none" : "size-2.5 rounded-sm"}`}
            style={{
              ...(casamiento ? { color: c } : { backgroundColor: c, rotate: `${i * 35}deg` }),
              top: `${[-14, -8, 96, 104, -18][i]}px`,
              left: `${[2, 92, -4, 96, 48][i]}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {casamiento ? "♥" : null}
          </span>
        ))}
        <p className="relative font-sans text-[22px] leading-7 font-extrabold">{evento.grito}</p>
        <p className="relative mt-2 font-display text-[30px] leading-9" style={{ color: acento }}>
          {evento.protagonista}
        </p>
        <p className="relative mt-4 text-[14px] font-semibold">
          {evento.fecha} · {evento.hora}
        </p>
        {botones}
      </div>
    );
  }

  if (tecno) {
    return (
      <div
        className="-mx-2 rounded-lg px-2 py-3 font-mono"
        style={{
          backgroundImage: `linear-gradient(${plantilla.borde}1f 1px, transparent 1px), linear-gradient(90deg, ${plantilla.borde}1f 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }}
      >
        <p className="text-[12px]" style={{ color: plantilla.borde }}>
          &gt; {evento.etiqueta.toLowerCase()}_
        </p>
        <p
          className="brillar mt-2 font-sans text-[40px] leading-[44px] font-extrabold tracking-[-0.02em] uppercase"
          style={{ textShadow: `0 0 18px ${plantilla.borde}99` }}
        >
          {evento.protagonista}
        </p>
        <p className="mt-3 text-[13px]" style={suave}>
          {evento.invita}
        </p>
        <p className="mt-3 inline-block rounded-md border px-2 py-1 text-[13px] font-semibold" style={{ borderColor: plantilla.borde }}>
          {evento.dia}.{evento.mes.toUpperCase()} // {evento.hora}
        </p>
        {botones}
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-[13px]" style={suave}>
        {evento.invita}
      </p>
      <p className="mt-1 font-display text-[30px] leading-9">{evento.protagonista}</p>
      <div className="mx-auto mt-4 h-px w-16" style={{ backgroundColor: acento }} />
      <p className="mt-4 text-[14px] font-semibold">{evento.fecha}</p>
      <p className="text-[13px]" style={suave}>
        {evento.hora} hs
      </p>
      {botones}
    </div>
  );
}

const INVITADOS = [
  { nombre: "Familia Gómez", cantidad: 4, estado: "Confirmó" },
  { nombre: "Tía Marta", cantidad: 1, estado: "Confirmó" },
  { nombre: "Amigas del colegio", cantidad: 8, estado: "Pendiente" },
  { nombre: "Familia Ruiz", cantidad: 3, estado: "Confirmó" },
  { nombre: "Padrinos", cantidad: 2, estado: "No viene" },
];

function VistaLista({ color }: { color: string }) {
  return (
    <div>
      <p className="font-display text-[22px] leading-7">Lista de invitados</p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          ["86", "Confirmados"],
          ["24", "Pendientes"],
          ["120", "Invitados"],
        ].map(([n, t]) => (
          <div key={t} className="rounded-lg bg-white py-2 shadow-sm">
            <p className="font-display text-[20px]" style={{ color }}>
              {n}
            </p>
            <p className="text-[10px] text-[#56627a]">{t}</p>
          </div>
        ))}
      </div>
      <ul className="mt-4 flex flex-col divide-y divide-[#e4ddd1] rounded-lg bg-white px-3 shadow-sm">
        {INVITADOS.map((i) => (
          <li key={i.nombre} className="flex items-center justify-between py-2.5 text-[13px]">
            <span>
              {i.nombre} <span className="text-[#56627a]">({i.cantidad})</span>
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
              style={
                i.estado === "Confirmó"
                  ? { backgroundColor: `${color}1f`, color }
                  : { backgroundColor: "#f1ece4", color: "#56627a" }
              }
            >
              {i.estado}
            </span>
          </li>
        ))}
      </ul>
      <span className="mt-3 flex min-h-10 items-center justify-center rounded-xl text-[14px] font-semibold text-white" style={{ backgroundColor: color }}>
        + Agregar invitado
      </span>
    </div>
  );
}

const MESAS = [
  { n: 1, ocupadas: 10, lugares: 10 },
  { n: 2, ocupadas: 8, lugares: 10 },
  { n: 3, ocupadas: 10, lugares: 10 },
  { n: 4, ocupadas: 6, lugares: 10 },
  { n: 5, ocupadas: 9, lugares: 10 },
  { n: 6, ocupadas: 4, lugares: 10 },
];

function VistaMesas({ color }: { color: string }) {
  return (
    <div>
      <p className="font-display text-[22px] leading-7">Armado de mesas</p>
      <p className="mt-1 text-[12px] text-[#56627a]">Tocá un invitado y elegí su mesa.</p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {MESAS.map((m) => {
          const llena = m.ocupadas === m.lugares;
          return (
            <div key={m.n} className="flex flex-col items-center">
              <span
                className="flex size-16 items-center justify-center rounded-full border-2 font-display text-[20px]"
                style={{ borderColor: color, backgroundColor: llena ? color : "white", color: llena ? "white" : color }}
              >
                {m.n}
              </span>
              <span className="mt-1 text-[11px] text-[#56627a]">
                {m.ocupadas}/{m.lugares}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-lg bg-white p-3 text-[13px] shadow-sm">
        <p className="font-semibold">Sin mesa: 6</p>
        <p className="text-[#56627a]">Amigas del colegio, Tío Carlos…</p>
      </div>
    </div>
  );
}

/** Qué pantalla mostrar según el producto y quién lo mira. */
function Pantalla({
  producto,
  perfil,
  color,
  evento,
  plantilla,
}: {
  producto: string;
  perfil: Perfil;
  color: string;
  evento: Evento;
  plantilla: Plantilla;
}) {
  if (producto === "invitacion") {
    if (perfil === "salon") return <InvitacionSalon color={color} evento={evento} />;
    if (perfil === "cliente") return <InvitacionCliente color={color} evento={evento} plantilla={plantilla} />;
    return <VistaInvitacion color={color} evento={evento} plantilla={plantilla} />;
  }
  if (producto === "lista_invitados") {
    if (perfil === "salon") return <ListaSalon color={color} evento={evento} />;
    if (perfil === "cliente") return <VistaLista color={color} />;
    return <ListaInvitado color={color} evento={evento} />;
  }
  if (perfil === "salon") return <MesasSalon color={color} evento={evento} />;
  if (perfil === "cliente") return <VistaMesas color={color} />;
  return <MesasInvitado color={color} />;
}

/** Fila de dato para las vistas del salón. */
function Dato({ titulo, valor, color }: { titulo: string; valor: string; color: string }) {
  return (
    <div className="flex items-center justify-between py-2 text-[13px]">
      <span className="text-[#56627a]">{titulo}</span>
      <span className="font-semibold" style={{ color }}>
        {valor}
      </span>
    </div>
  );
}

function BotonColor({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="mt-3 flex min-h-10 items-center justify-center rounded-xl text-[14px] font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
}

function InvitacionSalon({ color, evento }: { color: string; evento: Evento }) {
  return (
    <div>
      <p className="font-display text-[20px] leading-7">{evento.corto}</p>
      <p className="text-[12px] text-[#56627a]">{evento.fecha}</p>
      <div className="mt-4 divide-y divide-[#e4ddd1] rounded-lg bg-white px-3 shadow-sm">
        <Dato titulo="Tipo de evento" valor={evento.nombre} color={color} />
        <Dato titulo="Plantillas" valor={`${evento.plantillas.length} para elegir`} color={color} />
        <Dato titulo="Link de anfitriones" valor="Enviado" color={color} />
        <Dato titulo="Confirmaron" valor="86 de 120" color={color} />
      </div>
      <BotonColor color={color}>Copiar link para anfitriones</BotonColor>
    </div>
  );
}

/** Los anfitriones ven su invitación tal como va a salir, con la plantilla elegida, y la manda. */
function InvitacionCliente({ color, evento, plantilla }: { color: string; evento: Evento; plantilla: Plantilla }) {
  return (
    <div>
      <VistaInvitacion color={color} evento={evento} plantilla={plantilla} sinBotones />
      <div className="mt-5 flex items-center justify-between rounded-lg border px-3 py-2 text-[12px]" style={{ borderColor: plantilla.borde }}>
        <span style={{ color: plantilla.suave }}>Plantilla</span>
        <span className="font-semibold">{plantilla.nombre}</span>
      </div>
      <BotonColor color={color}>Enviar por WhatsApp</BotonColor>
    </div>
  );
}

function ListaSalon({ color, evento }: { color: string; evento: Evento }) {
  return (
    <div>
      <p className="font-display text-[20px] leading-7">Invitados · {evento.corto}</p>
      <div className="mt-3 divide-y divide-[#e4ddd1] rounded-lg bg-white px-3 shadow-sm">
        <Dato titulo="Invitados" valor="120" color={color} />
        <Dato titulo="Confirmados" valor="86" color={color} />
        <Dato titulo="Menores" valor="18" color={color} />
        <Dato titulo="Menú especial" valor="7" color={color} />
      </div>
      <BotonColor color={color}>Descargar para Excel</BotonColor>
    </div>
  );
}

function ListaInvitado({ color, evento }: { color: string; evento: Evento }) {
  return (
    <div className="text-center">
      <p className="text-[13px] text-[#56627a]">Hola, Familia Gómez</p>
      <p className="mt-1 font-display text-[24px] leading-8">¿Vienen {evento.aLa}?</p>
      <div className="mt-4 rounded-lg bg-white p-3 text-left text-[13px] shadow-sm">
        <p className="flex justify-between">
          <span>Personas</span>
          <span className="font-semibold">4</span>
        </p>
        <p className="mt-2 flex justify-between">
          <span>Menú especial</span>
          <span className="font-semibold">1 celíaco</span>
        </p>
      </div>
      <BotonColor color={color}>Sí, confirmamos</BotonColor>
      <span className="mt-2 flex min-h-10 items-center justify-center rounded-xl border border-[#c9bfae] text-[14px]">
        No podemos ir
      </span>
    </div>
  );
}

function MesasSalon({ color, evento }: { color: string; evento: Evento }) {
  return (
    <div>
      <p className="font-display text-[20px] leading-7">Mesas · {evento.corto}</p>
      <div className="mt-3 divide-y divide-[#e4ddd1] rounded-lg bg-white px-3 shadow-sm">
        <Dato titulo="Mesas" valor="12" color={color} />
        <Dato titulo="Lugares" valor="120" color={color} />
        <Dato titulo="Sentados" valor="114" color={color} />
        <Dato titulo="Sin mesa" valor="6" color={color} />
      </div>
      <BotonColor color={color}>Ver el plano de mesas</BotonColor>
    </div>
  );
}

function MesasInvitado({ color }: { color: string }) {
  return (
    <div className="text-center">
      <p className="text-[13px] text-[#56627a]">Hola, Tía Marta</p>
      <p className="mt-1 text-[14px]">Tu mesa es la</p>
      <span
        className="mx-auto mt-2 flex size-24 items-center justify-center rounded-full font-display text-[44px] text-white"
        style={{ backgroundColor: color }}
      >
        7
      </span>
      <p className="mt-4 text-[12px] font-semibold text-[#56627a]">Compartís mesa con</p>
      <p className="mt-1 text-[13px]">Familia Ruiz, Abuela Elsa y 5 más</p>
    </div>
  );
}

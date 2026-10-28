"use client";

import { useId, useState } from "react";
import { Palette, PartyPopper } from "lucide-react";
import { FondoFiesta, type IdFondo } from "@/components/fondos-fiesta";

// Color del salón de ejemplo en el celular (dato del salón, no token de Petra).
const COLOR_SALON = "#1c79a4";

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
  /** El dibujo de fiesta que va detrás de la invitación. */
  fondoFiesta: IdFondo;
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

// Tu staff elige el tipo de evento; cada tipo trae sus propias plantillas para tus clientes.
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
      { id: "elegante-dorado", fondoFiesta: "luces", nombre: "Elegante dorado", estilo: "elegante", fondo: "#14110b", texto: "#f5ecd7", suave: "#cbbf9f", borde: "#c9a24b", acento: "#c9a24b", sobreAcento: "#1a1306" },
      { id: "oliva-blanco", fondoFiesta: "hojas", nombre: "Verde oliva y blanco", estilo: "clasica", fondo: "#ffffff", texto: "#2f3a1a", suave: "#5f6b45", borde: "#c9cfb0", acento: "#5f6d2f", sobreAcento: "#ffffff" },
      { id: "blanco-dorado", fondoFiesta: "brillos", nombre: "Blanco y dorado", estilo: "elegante", fondo: "#fffdf7", texto: "#3a2f17", suave: "#6f6043", borde: "#c9a24b", acento: "#c9a24b", sobreAcento: "#1a1306" },
      { id: "azul-negro", fondoFiesta: "guirnalda", nombre: "Azul y negro", estilo: "moderna", fondo: "#0b0f1a", texto: "#eef2fb", suave: "#a3b0cc", borde: "#2a3a5c", acento: "#2f63c8", sobreAcento: "#ffffff" },
      { id: "naranja-blanco", fondoFiesta: "flores", nombre: "Naranja y blanco", estilo: "clasica", fondo: "#ffffff", texto: "#3a1f0b", suave: "#7a5a43", borde: "#f5cfae", acento: "#c2561a", sobreAcento: "#ffffff" },
      { id: "animado", fondoFiesta: "corazones", nombre: "Animado", estilo: "animada", fondo: "#fff6f3", texto: "#4a2230", suave: "#8a5a68", borde: "#f0c9d2", acento: "#c2456b", sobreAcento: "#ffffff" },
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
      { id: "elegante", fondoFiesta: "luces", nombre: "Elegante", estilo: "elegante", fondo: "#15131d", texto: "#f3eee6", suave: "#bdb6c9", borde: "#c9a24b", acento: "#c9a24b", sobreAcento: "#1a1306" },
      { id: "informal", fondoFiesta: "globos", nombre: "Informal", estilo: "animada", fondo: "#fff7e6", texto: "#3b2a12", suave: "#7a6243", borde: "#f0d9a8", acento: "#c7363f", sobreAcento: "#ffffff" },
      { id: "casual", fondoFiesta: "serpentinas", nombre: "Casual", estilo: "moderna", fondo: "#f3f7f4", texto: "#1f2d27", suave: "#4d5f57", borde: "#cfdcd4", sobreAcento: "#ffffff" },
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
      { id: "elegante-rosa", fondoFiesta: "luces", nombre: "Elegante rosa", estilo: "elegante", fondo: "#2a0f1e", texto: "#fbe9f0", suave: "#e0b9c8", borde: "#e6a3bd", acento: "#e6a3bd", sobreAcento: "#2a0f1e" },
      { id: "elegante-lila", fondoFiesta: "brillos", nombre: "Elegante lila", estilo: "elegante", fondo: "#1d1530", texto: "#f1ebff", suave: "#c3b6e0", borde: "#c5b0f0", acento: "#c5b0f0", sobreAcento: "#1d1530" },
      { id: "elegante-turquesa", fondoFiesta: "luces", nombre: "Elegante turquesa", estilo: "elegante", fondo: "#0d2226", texto: "#e8fbf8", suave: "#a9d6cf", borde: "#7fd1c7", acento: "#7fd1c7", sobreAcento: "#0d2226" },
      { id: "moderno", fondoFiesta: "geometrico", nombre: "Moderno", estilo: "moderna", fondo: "#ffffff", texto: "#111827", suave: "#4b5563", borde: "#d1d5db", acento: "#c42a6f", sobreAcento: "#ffffff" },
      { id: "tecnologico", fondoFiesta: "neon", nombre: "Tecnológico", estilo: "tecno", fondo: "#05070f", texto: "#e6f7ff", suave: "#8fb3c7", borde: "#22e3ff", acento: "#22e3ff", sobreAcento: "#05070f" },
    ],
  },
];

// Colores de las pantallas que no son la invitación (panel, lista y mesas).
const BASE = { fondo: "#fbf8f3", texto: "#1b2d52", suave: "#56627a" };

// Las tres miradas de cada producto: el salón lo asigna, el cliente lo configura y el invitado lo usa.
const PERFILES: { id: Perfil; nombre: string; texto: string }[] = [
  { id: "salon", nombre: "Tu staff", texto: "Eligen el tipo de evento y siguen todo desde el panel." },
  { id: "cliente", nombre: "Tus clientes", texto: "Lo configuran desde un link, sin crearse una cuenta." },
  { id: "invitado", nombre: "Los invitados", texto: "Lo usan desde su celular, sin bajar ninguna app." },
];

/** Simulador: el salón ve cómo queda la invitación digital en el celular, desde los tres lados. */
export function Simulador() {
  const [perfil, setPerfil] = useState<Perfil>("salon");
  const [idEvento, setIdEvento] = useState<IdEvento>("xv");
  const [nPlantilla, setNPlantilla] = useState(0);
  const idVistas = useId();

  const color = COLOR_SALON;
  const nombreSalon = "Tu salón";
  const miradaActual = PERFILES.find((p) => p.id === perfil) ?? PERFILES[0];
  const evento = EVENTOS.find((e) => e.id === idEvento) ?? EVENTOS[2];
  const plantillas = evento.plantillas;
  const plantilla = plantillas[nPlantilla % plantillas.length];
  // La plantilla se ve en la invitación de tus clientes (que la eligen) y de los invitados (que la reciben).
  const conPlantilla = perfil !== "salon";
  const tema = conPlantilla ? plantilla : BASE;
  const puedePersonalizar = perfil === "cliente";
  const siguientePlantilla = () => setNPlantilla((n) => (n + 1) % plantillas.length);
  // Cada tipo de evento trae sus plantillas: al cambiarlo, tus clientes arrancan por la primera.
  const siguienteEvento = () => {
    const i = EVENTOS.findIndex((e) => e.id === idEvento);
    setIdEvento(EVENTOS[(i + 1) % EVENTOS.length].id);
    setNPlantilla(0);
  };
  // El círculo al lado del celular: tu staff cambia el tipo de evento y tus clientes, la plantilla.
  const circulo = puedePersonalizar
    ? {
        accion: siguientePlantilla,
        titulo: "Cambiar plantilla",
        ahora: plantilla.nombre,
        Icono: Palette,
        chip: `${(nPlantilla % plantillas.length) + 1} de ${plantillas.length}`,
        ayuda: "Tocá el círculo para cambiar la plantilla.",
      }
    : perfil === "salon"
      ? {
          accion: siguienteEvento,
          titulo: "Cambiar tipo de evento",
          ahora: evento.nombre,
          Icono: PartyPopper,
          chip: evento.nombre,
          ayuda: "Tocá el círculo para cambiar el tipo de evento.",
        }
      : null;

  return (
    <div>
      {/* Celular */}
      <div className="mx-auto w-[280px] sm:w-[300px]">
        <p id={idVistas} className="type-etiqueta mb-2 text-center text-dorado">
          Seleccioná la vista
        </p>
        <div role="group" aria-labelledby={idVistas} className="grid grid-cols-3 gap-1 rounded-md border border-line bg-surface-raised p-1">
          {PERFILES.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={perfil === p.id}
              onClick={() => setPerfil(p.id)}
              className={`min-h-10 rounded-[8px] px-1 text-[13px] leading-4 font-semibold transition-colors ${
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
        <p className="sr-only">
          Vista previa de la invitación digital para {nombreSalon}, {evento.corto}, en la vista de{" "}
          {miradaActual.nombre.toLowerCase()}
          {conPlantilla ? `, con la plantilla ${plantilla.nombre}` : ""}
        </p>
        <div className="relative">
          {circulo && (
            <div className="absolute top-40 -right-7 z-10 flex flex-col items-center gap-1.5 sm:-right-9">
              <button
                type="button"
                onClick={circulo.accion}
                aria-label={`${circulo.titulo}. Ahora: ${circulo.ahora}`}
                title={circulo.titulo}
                className="flex size-14 items-center justify-center rounded-full border-2 border-dorado bg-dorado text-on-dorado shadow-piedra transition-transform hover:scale-105 active:scale-95"
              >
                <circulo.Icono size={24} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <span className="rounded-full bg-surface-raised px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap text-dorado shadow-piedra">
                {circulo.chip}
              </span>
            </div>
          )}
        <div aria-hidden="true" className="rounded-[42px] border border-line-strong bg-noche p-3 shadow-piedra">
          {/* La pantalla del invitado va en claro: así la ven los invitados del salón (colores fijos a propósito). */}
          <div
            className="relative flex min-h-[520px] flex-col overflow-hidden rounded-[32px]"
            style={{ backgroundColor: tema.fondo, color: tema.texto }}
          >
            {conPlantilla && (
              <FondoFiesta fondo={plantilla.fondoFiesta} acento={plantilla.acento ?? color} borde={plantilla.borde} />
            )}
            <div className="relative flex flex-col items-center gap-2 px-5 pt-6 pb-4" style={{ backgroundColor: `${color}14` }}>
              <span
                className="flex size-12 items-center justify-center rounded-full font-display text-[20px] text-white"
                style={{ backgroundColor: color }}
              >
                {nombreSalon.charAt(0).toUpperCase()}
              </span>
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase" style={{ color }}>
                {nombreSalon}
              </p>
            </div>
            <div className="relative flex flex-1 flex-col px-5 pt-4 pb-5">
              <span
                className="mb-3 self-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.06em] uppercase"
                style={{ backgroundColor: `${color}1a`, color }}
              >
                Vista {perfil === "salon" ? "de tu staff" : perfil === "cliente" ? "de tus clientes" : "de los invitados"}
              </span>
              <Pantalla perfil={perfil} color={color} evento={evento} plantilla={plantilla} />
              <p className="mt-auto pt-4 text-center text-[10px]" style={{ color: tema.suave }}>
                Hecho con Petra
              </p>
            </div>
          </div>
        </div>
        </div>
        {circulo && <p className="mt-3 text-center text-[12px] text-ink-muted">{circulo.ayuda}</p>}
      </div>
    </div>
  );
}

/** La invitación que recibe el invitado, con la plantilla que eligieron tus clientes. */
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

/** Qué pantalla de la invitación mostrar según quién la mira. */
function Pantalla({
  perfil,
  color,
  evento,
  plantilla,
}: {
  perfil: Perfil;
  color: string;
  evento: Evento;
  plantilla: Plantilla;
}) {
  if (perfil === "salon") return <InvitacionSalon color={color} evento={evento} />;
  if (perfil === "cliente") return <InvitacionCliente color={color} evento={evento} plantilla={plantilla} />;
  return <VistaInvitacion color={color} evento={evento} plantilla={plantilla} />;
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
        <Dato titulo="Link de tus clientes" valor="Enviado" color={color} />
        <Dato titulo="Confirmaron" valor="86 de 120" color={color} />
      </div>
      <BotonColor color={color}>Copiar link para tus clientes</BotonColor>
    </div>
  );
}

/** Tus clientes ven su invitación tal como va a salir, con la plantilla elegida, y la mandan. */
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

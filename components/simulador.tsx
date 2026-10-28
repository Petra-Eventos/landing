"use client";

import { useEffect, useId, useState } from "react";
import { Check, ImagePlus, Mail, LayoutGrid, ListChecks, X } from "lucide-react";
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

// Las tres miradas de cada producto: el salón lo asigna, el cliente lo configura y el invitado lo usa.
const PERFILES: { id: Perfil; nombre: string; texto: string }[] = [
  { id: "salon", nombre: "Salón", texto: "Lo asignás y seguís todo desde tu panel." },
  { id: "cliente", nombre: "Cliente", texto: "Lo configura desde un link, sin crearse una cuenta." },
  { id: "invitado", nombre: "Invitado", texto: "Lo usa desde su celular, sin bajar ninguna app." },
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
        <p className="sr-only">
          Vista previa de {actual.nombre} para {nombreSalon}, como la ve {miradaActual.nombre.toLowerCase()}
        </p>
        <div aria-hidden="true" className="rounded-[42px] border border-line-strong bg-noche p-3 shadow-piedra">
          {/* La pantalla del invitado va en claro: así la ven los invitados del salón (colores fijos a propósito). */}
          <div className="flex min-h-[520px] flex-col overflow-hidden rounded-[32px] bg-[#fbf8f3] text-[#1b2d52]">
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
                Vista {perfil === "salon" ? "del salón" : perfil === "cliente" ? "del cliente" : "del invitado"}
              </span>
              <Pantalla producto={producto} perfil={perfil} color={color} />
              <p className="mt-auto pt-4 text-center text-[10px] text-[#56627a]">Hecho con Petra</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VistaInvitacion({ color }: { color: string }) {
  return (
    <div className="text-center">
      <p className="text-[13px] text-[#56627a]">Te invitamos a celebrar</p>
      <p className="mt-1 font-display text-[30px] leading-9">los XV de Sofía</p>
      <div className="mx-auto mt-4 h-px w-16" style={{ backgroundColor: color }} />
      <p className="mt-4 text-[14px] font-semibold">Sábado 14 de diciembre</p>
      <p className="text-[13px] text-[#56627a]">21:30 hs</p>
      <div className="mt-6 flex flex-col gap-2">
        <span className="flex min-h-11 items-center justify-center rounded-xl text-[15px] font-semibold text-white" style={{ backgroundColor: color }}>
          Confirmo asistencia
        </span>
        <span className="flex min-h-11 items-center justify-center rounded-xl border border-[#c9bfae] text-[15px]">
          No puedo ir
        </span>
      </div>
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
function Pantalla({ producto, perfil, color }: { producto: string; perfil: Perfil; color: string }) {
  if (producto === "invitacion") {
    if (perfil === "salon") return <InvitacionSalon color={color} />;
    if (perfil === "cliente") return <InvitacionCliente color={color} />;
    return <VistaInvitacion color={color} />;
  }
  if (producto === "lista_invitados") {
    if (perfil === "salon") return <ListaSalon color={color} />;
    if (perfil === "cliente") return <VistaLista color={color} />;
    return <ListaInvitado color={color} />;
  }
  if (perfil === "salon") return <MesasSalon color={color} />;
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

function InvitacionSalon({ color }: { color: string }) {
  return (
    <div>
      <p className="font-display text-[20px] leading-7">XV de Sofía</p>
      <p className="text-[12px] text-[#56627a]">Sábado 14 de diciembre</p>
      <div className="mt-4 divide-y divide-[#e4ddd1] rounded-lg bg-white px-3 shadow-sm">
        <Dato titulo="Invitación" valor="Asignada" color={color} />
        <Dato titulo="Link del cliente" valor="Enviado" color={color} />
        <Dato titulo="Diseño" valor="Con tu marca" color={color} />
        <Dato titulo="Confirmaron" valor="86 de 120" color={color} />
      </div>
      <BotonColor color={color}>Copiar link para el cliente</BotonColor>
    </div>
  );
}

function InvitacionCliente({ color }: { color: string }) {
  const campos = [
    ["Quién festeja", "Sofía"],
    ["Fecha y hora", "Sábado 14 · 21:30"],
    ["Mensaje", "¡Te espero para festejar!"],
  ];
  return (
    <div>
      <p className="font-display text-[20px] leading-7">Armá tu invitación</p>
      <div className="mt-3 flex flex-col gap-2">
        {campos.map(([etiqueta, valor]) => (
          <div key={etiqueta}>
            <p className="text-[11px] font-semibold text-[#56627a]">{etiqueta}</p>
            <p className="mt-0.5 rounded-lg border border-[#c9bfae] bg-white px-3 py-2 text-[13px]">{valor}</p>
          </div>
        ))}
      </div>
      <BotonColor color={color}>Enviar por WhatsApp</BotonColor>
    </div>
  );
}

function ListaSalon({ color }: { color: string }) {
  return (
    <div>
      <p className="font-display text-[20px] leading-7">Invitados · XV de Sofía</p>
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

function ListaInvitado({ color }: { color: string }) {
  return (
    <div className="text-center">
      <p className="text-[13px] text-[#56627a]">Hola, Familia Gómez</p>
      <p className="mt-1 font-display text-[24px] leading-8">¿Vienen a los XV de Sofía?</p>
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

function MesasSalon({ color }: { color: string }) {
  return (
    <div>
      <p className="font-display text-[20px] leading-7">Mesas · XV de Sofía</p>
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

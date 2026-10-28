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
      <div className="mx-auto w-[280px] sm:w-[300px]" aria-live="polite">
        <p className="sr-only">Vista previa de {actual.nombre} para {nombreSalon}</p>
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
              {producto === "invitacion" && <VistaInvitacion color={color} />}
              {producto === "lista_invitados" && <VistaLista color={color} />}
              {producto === "armado_mesas" && <VistaMesas color={color} />}
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

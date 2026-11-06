"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FESTEJOS, MENUS, SELECCION_INICIAL, pesos, precioSugerido, type IdFestejo, type IdMenu } from "@/lib/cotizador-demo";

const CANTIDADES = [80, 100, 120, 150, 200, 250, 300];
// Días de marzo de 2027 de la demo: 13 es sábado, 19 es viernes y 14 es domingo.
const DIAS = [
  { dia: 13, nombre: "sábado" },
  { dia: 19, nombre: "viernes" },
  { dia: 14, nombre: "domingo" },
];

/** Una palabra de la frase que se puede cambiar. Es un select común: anda con teclado y en el celular. */
function Palabra({
  etiqueta,
  valor,
  texto,
  opciones,
  onChange,
}: {
  etiqueta: string;
  valor: string;
  texto: string;
  opciones: { valor: string; nombre: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <span className="relative inline-flex items-baseline whitespace-nowrap border-b border-dorado/70 pr-5 text-dorado-hover focus-within:border-dorado">
      <span aria-hidden="true">{texto}</span>
      <ChevronDown size={16} strokeWidth={2} aria-hidden="true" className="absolute right-0 bottom-2 text-dorado" />
      <select
        aria-label={etiqueta}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full cursor-pointer appearance-none bg-transparent font-sans text-[16px] text-transparent [&>option]:text-noche"
      >
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.nombre}
          </option>
        ))}
      </select>
    </span>
  );
}

/** El cotizador resumido en una frase: tocás una palabra y el precio cambia, como le pasa al cliente del salón. */
export function CotizacionEnLinea() {
  const [festejo, setFestejo] = useState<IdFestejo>("xv");
  const [invitados, setInvitados] = useState(150);
  const [dia, setDia] = useState(13);
  const [menu, setMenu] = useState<IdMenu>("premium");

  const total = precioSugerido({ ...SELECCION_INICIAL, festejo, invitados, dia, menu });
  const nombreFestejo = FESTEJOS.find((f) => f.id === festejo)!;
  const nombreDia = DIAS.find((d) => d.dia === dia)!.nombre;
  const nombreMenu = MENUS.find((m) => m.id === menu)!.nombre;

  return (
    <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-4 rounded-xl border border-line-strong/70 bg-noche/80 p-5 text-left backdrop-blur-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <p className="font-display text-[21px] leading-[1.45] text-ink sm:text-[26px]">
        <Palabra
          etiqueta="Tipo de fiesta"
          valor={festejo}
          texto={nombreFestejo.corto.replace(/^un /, "Un ")}
          opciones={FESTEJOS.map((f) => ({ valor: f.id, nombre: f.nombre }))}
          onChange={(v) => setFestejo(v as IdFestejo)}
        />{" "}
        de{" "}
        <Palabra
          etiqueta="Invitados"
          valor={String(invitados)}
          texto={`${invitados} invitados`}
          opciones={CANTIDADES.map((c) => ({ valor: String(c), nombre: `${c} invitados` }))}
          onChange={(v) => setInvitados(Number(v))}
        />
        , un{" "}
        <Palabra
          etiqueta="Día"
          valor={String(dia)}
          texto={nombreDia}
          opciones={DIAS.map((d) => ({ valor: String(d.dia), nombre: d.nombre }))}
          onChange={(v) => setDia(Number(v))}
        />
        , con menú{" "}
        <Palabra
          etiqueta="Menú"
          valor={menu}
          texto={nombreMenu}
          opciones={MENUS.map((m) => ({ valor: m.id, nombre: m.nombre }))}
          onChange={(v) => setMenu(v as IdMenu)}
        />
      </p>
      <div className="shrink-0 border-t border-line pt-3 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7" aria-live="polite">
        <p className="text-[13px] text-ink-muted">Precio de ejemplo</p>
        <p key={total} className="precio-nuevo font-display text-[32px] leading-10 text-ink tabular-nums">
          {pesos(total)}
        </p>
      </div>
    </div>
  );
}

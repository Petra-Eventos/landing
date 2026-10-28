import type { ReactNode } from "react";

/**
 * Fondos de fiesta dibujados para las plantillas de invitación del simulador.
 * Son dibujos propios (sin fotos de terceros), en los colores de cada plantilla.
 * Van detrás del texto, tenues y cargados hacia los bordes para que todo se siga leyendo.
 */
export type IdFondo =
  | "luces"
  | "brillos"
  | "hojas"
  | "guirnalda"
  | "flores"
  | "corazones"
  | "globos"
  | "serpentinas"
  | "geometrico"
  | "neon";

// Números al azar pero siempre los mismos (así el servidor y el navegador dibujan igual).
function azar(semilla: number) {
  let s = semilla;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ANCHO = 300;
const ALTO = 560;

function Luces({ colores, semilla, cantidad = 16 }: { colores: string[]; semilla: number; cantidad?: number }) {
  const r = azar(semilla);
  return (
    <>
      {Array.from({ length: cantidad }, (_, i) => {
        // Más luces en los bordes que en el centro.
        const x = r() < 0.5 ? r() * 90 : ANCHO - r() * 90;
        return (
          <circle
            key={i}
            cx={x}
            cy={r() * ALTO}
            r={10 + r() * 30}
            fill={colores[i % colores.length]}
            opacity={0.12 + r() * 0.22}
            filter="url(#desenfoque)"
          />
        );
      })}
    </>
  );
}

function Estrella({ x, y, t, color, opacidad }: { x: number; y: number; t: number; color: string; opacidad: number }) {
  return (
    <path
      d={`M${x} ${y - t} Q${x} ${y} ${x + t} ${y} Q${x} ${y} ${x} ${y + t} Q${x} ${y} ${x - t} ${y} Q${x} ${y} ${x} ${y - t}Z`}
      fill={color}
      opacity={opacidad}
    />
  );
}

function Brillos({ color, semilla }: { color: string; semilla: number }) {
  const r = azar(semilla);
  return (
    <>
      {Array.from({ length: 26 }, (_, i) => {
        const x = r() < 0.5 ? r() * 80 : ANCHO - r() * 80;
        return <Estrella key={i} x={x} y={r() * ALTO} t={3 + r() * 7} color={color} opacidad={0.35 + r() * 0.45} />;
      })}
    </>
  );
}

// Una rama con hojas; se rota y se pone en las esquinas.
function Rama({ color, transform }: { color: string; transform: string }) {
  const hojas = [0, 1, 2, 3, 4, 5];
  return (
    <g transform={transform} opacity={0.45}>
      <path d="M0 0 C40 30 70 70 90 130" stroke={color} strokeWidth={2} fill="none" />
      {hojas.map((i) => {
        const t = (i + 1) / 7;
        const x = 90 * t * t * 0.4 + 90 * t * 0.6;
        const y = 130 * t * t;
        const lado = i % 2 === 0 ? 1 : -1;
        return (
          <ellipse
            key={i}
            cx={x + lado * 12}
            cy={y}
            rx={13}
            ry={5.5}
            fill={color}
            transform={`rotate(${lado * 35 + 40} ${x + lado * 12} ${y})`}
          />
        );
      })}
    </g>
  );
}

function Flor({ x, y, t, color }: { x: number; y: number; t: number; color: string }) {
  return (
    <g opacity={0.3}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={x} cy={y - t} rx={t * 0.55} ry={t} fill={color} transform={`rotate(${a} ${x} ${y})`} />
      ))}
      <circle cx={x} cy={y} r={t * 0.45} fill={color} opacity={0.9} />
    </g>
  );
}

function Corazon({ x, y, t, color, opacidad }: { x: number; y: number; t: number; color: string; opacidad: number }) {
  return (
    <path
      d={`M${x} ${y + t * 0.9} C${x - t * 1.6} ${y - t * 0.2} ${x - t * 0.6} ${y - t * 1.3} ${x} ${y - t * 0.4} C${x + t * 0.6} ${y - t * 1.3} ${x + t * 1.6} ${y - t * 0.2} ${x} ${y + t * 0.9}Z`}
      fill={color}
      opacity={opacidad}
    />
  );
}

function Globo({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g opacity={0.55}>
      <path d={`M${x} ${y + 34} q-6 20 4 40 q8 18 -2 40`} stroke={color} strokeWidth={1.2} fill="none" />
      <ellipse cx={x} cy={y} rx={22} ry={28} fill={color} />
      <ellipse cx={x - 8} cy={y - 10} rx={5} ry={8} fill="#ffffff" opacity={0.45} />
      <path d={`M${x - 4} ${y + 28} l4 6 l4 -6z`} fill={color} />
    </g>
  );
}

const PAPEL_PICADO = ["#e8505b", "#f9a826", "#14b1ab", "#7c5cbf"];

/** El dibujo de fondo de una plantilla. `acento` y `borde` son los colores de la plantilla. */
export function FondoFiesta({ fondo, acento, borde }: { fondo: IdFondo; acento: string; borde: string }) {
  let dibujo: ReactNode = null;

  if (fondo === "luces") dibujo = <Luces colores={[acento, borde]} semilla={7} />;

  if (fondo === "brillos")
    dibujo = (
      <>
        <Luces colores={[acento]} semilla={3} cantidad={8} />
        <Brillos color={acento} semilla={11} />
      </>
    );

  if (fondo === "hojas")
    dibujo = (
      <>
        <Rama color={acento} transform="translate(-6 96)" />
        <Rama color={acento} transform="translate(306 96) scale(-1 1)" />
        <Rama color={acento} transform="translate(-6 566) scale(1 -1)" />
        <Rama color={acento} transform="translate(306 566) scale(-1 -1)" />
      </>
    );

  if (fondo === "guirnalda") {
    // Una tira de lamparitas que cuelga arriba del logo, y luces de ciudad abajo.
    const lamparas = Array.from({ length: 9 }, (_, i) => {
      const t = i / 8;
      const x = 10 + t * 280;
      const y = 6 + Math.sin(t * Math.PI) * 22;
      return { x, y };
    });
    dibujo = (
      <>
        <path d="M10 6 Q150 50 290 6" stroke={borde} strokeWidth={1.5} fill="none" opacity={0.8} />
        {lamparas.map(({ x, y }, i) => (
          <g key={i}>
            <circle cx={x} cy={y + 7} r={10} fill="#ffd27a" opacity={0.25} filter="url(#desenfoque)" />
            <circle cx={x} cy={y + 7} r={3.5} fill="#ffd27a" opacity={0.95} />
          </g>
        ))}
        <Luces colores={[acento, "#ffd27a"]} semilla={21} cantidad={10} />
      </>
    );
  }

  if (fondo === "flores")
    dibujo = (
      <>
        <Flor x={18} y={140} t={18} color={acento} />
        <Flor x={52} y={118} t={10} color={borde} />
        <Flor x={282} y={150} t={14} color={acento} />
        <Flor x={262} y={505} t={20} color={acento} />
        <Flor x={226} y={530} t={10} color={borde} />
        <Flor x={22} y={520} t={14} color={acento} />
      </>
    );

  if (fondo === "corazones") {
    const r = azar(5);
    dibujo = (
      <>
        <Luces colores={[borde]} semilla={13} cantidad={8} />
        {Array.from({ length: 16 }, (_, i) => (
          <Corazon
            key={i}
            x={r() < 0.5 ? r() * 70 : ANCHO - r() * 70}
            y={r() * ALTO}
            t={4 + r() * 7}
            color={i % 2 ? acento : borde}
            opacidad={0.3 + r() * 0.3}
          />
        ))}
      </>
    );
  }

  if (fondo === "globos")
    dibujo = (
      <>
        <Globo x={30} y={150} color={PAPEL_PICADO[0]} />
        <Globo x={270} y={170} color={PAPEL_PICADO[2]} />
        <Globo x={250} y={430} color={PAPEL_PICADO[1]} />
        <Globo x={40} y={420} color={PAPEL_PICADO[3]} />
      </>
    );

  if (fondo === "serpentinas") {
    const r = azar(17);
    dibujo = (
      <>
        {[
          [0, 120],
          [230, 110],
          [0, 470],
          [220, 480],
        ].map(([x, y], i) => (
          <path
            key={i}
            d={`M${x} ${y} q20 -18 40 0 t40 0 t40 0`}
            stroke={i % 2 ? acento : borde}
            strokeWidth={4}
            strokeLinecap="round"
            fill="none"
            opacity={0.5}
          />
        ))}
        {Array.from({ length: 22 }, (_, i) => (
          <rect
            key={i}
            x={r() < 0.5 ? r() * 70 : ANCHO - r() * 70}
            y={r() * ALTO}
            width={4}
            height={8}
            rx={1}
            fill={i % 3 === 0 ? acento : i % 3 === 1 ? borde : "#f9a826"}
            opacity={0.5}
            transform={`rotate(${r() * 180})`}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </>
    );
  }

  if (fondo === "geometrico")
    dibujo = (
      <g fill="none" stroke={acento} strokeWidth={2.5} opacity={0.35}>
        <circle cx={26} cy={140} r={16} />
        <path d="M262 118 l22 38 h-44z" />
        <path d="M12 470 q12 -14 24 0 t24 0 t24 0" />
        <rect x={250} y={470} width={28} height={28} transform="rotate(20 264 484)" />
        <circle cx={276} cy={300} r={6} fill={acento} />
        <circle cx={20} cy={320} r={4} fill={acento} />
        <path d="M228 540 l10 -10 M238 540 l10 -10 M248 540 l10 -10" />
      </g>
    );

  if (fondo === "neon")
    dibujo = (
      <>
        <circle cx={10} cy={150} r={60} fill={acento} opacity={0.18} filter="url(#desenfoque)" />
        <circle cx={300} cy={480} r={70} fill="#ff2bd6" opacity={0.16} filter="url(#desenfoque)" />
        <g stroke={acento} strokeWidth={1.5} opacity={0.6} fill="none">
          <path d="M0 520 L60 520 L80 500 L140 500" />
          <path d="M300 130 L250 130 L235 145 L190 145" />
          <circle cx={140} cy={500} r={3} fill={acento} />
          <circle cx={190} cy={145} r={3} fill={acento} />
        </g>
      </>
    );

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
      viewBox={`0 0 ${ANCHO} ${ALTO}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="desenfoque" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      {dibujo}
    </svg>
  );
}

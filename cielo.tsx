// Cielo de noche estrellado, de fondo.
// Las estrellas salen de un generador con semilla fija: siempre quedan en el mismo lugar
// (no cambian entre el servidor y el navegador).

function generador(semilla: number) {
  let a = semilla;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Estrella = { x: number; y: number; r: number; o: number; titila: boolean; delay: number; azul: boolean };

function crearEstrellas(cantidad: number, semilla: number): Estrella[] {
  const azar = generador(semilla);
  return Array.from({ length: cantidad }, () => {
    const grande = azar() > 0.9;
    return {
      x: Math.round(azar() * 1000 * 10) / 10,
      y: Math.round(azar() * 1000 * 10) / 10,
      r: grande ? 1.4 + azar() * 0.6 : 0.5 + azar() * 0.7,
      o: Math.round((0.35 + azar() * 0.55) * 100) / 100,
      titila: azar() > 0.65,
      delay: Math.round(azar() * 40) / 10,
      azul: azar() > 0.8,
    };
  });
}

// Destellos de cuatro puntas: líneas rectas, como piedra tallada.
const DESTELLOS = [
  { x: 905, y: 250, t: 9, azul: false, delay: 0 },
  { x: 700, y: 470, t: 6, azul: true, delay: 1.2 },
  { x: 300, y: 215, t: 5, azul: false, delay: 2.4 },
  { x: 560, y: 300, t: 5, azul: true, delay: 0.6 },
  { x: 60, y: 520, t: 6, azul: false, delay: 3.1 },
  { x: 950, y: 720, t: 7, azul: false, delay: 1.8 },
  { x: 380, y: 780, t: 5, azul: true, delay: 2.9 },
  { x: 640, y: 640, t: 6, azul: false, delay: 3.6 },
];

function puntosDestello(x: number, y: number, t: number) {
  const f = t * 0.18; // qué tan finito es el centro
  return [
    [x, y - t],
    [x + f, y - f],
    [x + t, y],
    [x + f, y + f],
    [x, y + t],
    [x - f, y + f],
    [x - t, y],
    [x - f, y - f],
  ]
    .map((p) => p.join(","))
    .join(" ");
}

// Una constelación chiquita, al costado del titular (en escritorio).
const CONSTELACION = [
  [770, 330],
  [815, 300],
  [860, 322],
  [900, 305],
  [930, 360],
  [885, 395],
];

export function Cielo({
  fijo = true,
  cantidad = 150,
  semilla = 7,
  conDestellos = true,
}: {
  fijo?: boolean;
  cantidad?: number;
  semilla?: number;
  conDestellos?: boolean;
}) {
  const estrellas = crearEstrellas(cantidad, semilla);
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none ${fijo ? "fixed inset-0 -z-10" : "absolute inset-0"} h-full w-full`}
    >
      {conDestellos && (
        <g>
          <polyline
            points={CONSTELACION.map((p) => p.join(",")).join(" ")}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="0.6"
            strokeOpacity="0.45"
          />
          {CONSTELACION.map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              x={x - 1.6}
              y={y - 1.6}
              width="3.2"
              height="3.2"
              transform={`rotate(45 ${x} ${y})`}
              fill="var(--estrella)"
              opacity="0.85"
            />
          ))}
        </g>
      )}

      {estrellas.map((e, i) => (
        <circle
          key={i}
          cx={e.x}
          cy={e.y}
          r={e.r}
          fill={e.azul ? "var(--estrella-azul)" : "var(--estrella)"}
          opacity={e.o}
          className={e.titila ? "titila" : undefined}
          style={e.titila ? ({ "--o": e.o, animationDelay: `${e.delay}s` } as React.CSSProperties) : undefined}
        />
      ))}

      {conDestellos &&
        DESTELLOS.map((d) => (
          <polygon
            key={`${d.x}-${d.y}`}
            points={puntosDestello(d.x, d.y, d.t)}
            fill={d.azul ? "var(--estrella-azul)" : "var(--estrella)"}
            opacity="0.9"
            className="titila"
            style={{ "--o": 0.9, animationDelay: `${d.delay}s` } as React.CSSProperties}
          />
        ))}
    </svg>
  );
}

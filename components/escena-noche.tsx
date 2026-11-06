/*
 * La escena de la landing: un salón de noche, con ventanales en arco y guirnaldas de lamparitas.
 * Es la misma idea que la bienvenida del link del cotizador. Dibujada a mano: no hay fotos todavía.
 * Cuando haya un salón real con permiso, se puede poner su foto detrás.
 */

const GUIRNALDAS = [
  { desde: [-40, 40], hasta: [760, 70], caida: 190, lamparas: 13 },
  { desde: [680, 60], hasta: [1480, 30], caida: 210, lamparas: 13 },
  { desde: [-40, 210], hasta: [1480, 190], caida: 150, lamparas: 22 },
];

/** Un punto de la curva de la guirnalda (0 = una punta, 1 = la otra). */
function punto(g: (typeof GUIRNALDAS)[number], t: number): [number, number] {
  const cx = (g.desde[0] + g.hasta[0]) / 2;
  const cy = (g.desde[1] + g.hasta[1]) / 2 + g.caida;
  const u = 1 - t;
  return [
    Math.round(u * u * g.desde[0] + 2 * u * t * cx + t * t * g.hasta[0]),
    Math.round(u * u * g.desde[1] + 2 * u * t * cy + t * t * g.hasta[1]),
  ];
}

export function EscenaNoche({ animar = true, id = "luz" }: { animar?: boolean; id?: string }) {
  let orden = 0;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMin slice"
      className="absolute inset-0 size-full -translate-y-12 md:translate-y-0"
    >
      <defs>
        <radialGradient id={id}>
          <stop offset="0%" stopColor="#ffdf9e" stopOpacity="0.75" />
          <stop offset="28%" stopColor="#f0bf6b" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#d4b06a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-ventana`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#13254a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1c79a4" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`${id}-piso`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4b06a" stopOpacity="0" />
          <stop offset="100%" stopColor="#d4b06a" stopOpacity="0.14" />
        </linearGradient>
      </defs>

      {/* Los ventanales del salón */}
      {[20, 310, 600, 890, 1180].map((x) => (
        <path
          key={x}
          d={`M${x} 800V280a120 120 0 0 1 240 0V800Z`}
          fill={`url(#${id}-ventana)`}
          stroke="#34466f"
          strokeOpacity="0.45"
        />
      ))}
      <rect y="560" width="1440" height="240" fill={`url(#${id}-piso)`} />

      {/* Las guirnaldas */}
      {GUIRNALDAS.map((g, i) => {
        const cx = (g.desde[0] + g.hasta[0]) / 2;
        const cy = (g.desde[1] + g.hasta[1]) / 2 + g.caida;
        return (
          // La guirnalda de abajo queda más lejos y no compite con el texto; en el celular no va.
          <g key={i} className={i === 2 ? "hidden opacity-40 md:block" : undefined}>
            <path
              d={`M${g.desde[0]} ${g.desde[1]}Q${cx} ${cy} ${g.hasta[0]} ${g.hasta[1]}`}
              fill="none"
              stroke="#050a16"
              strokeWidth="2"
            />
            {Array.from({ length: g.lamparas }, (_, n) => {
              const [x, y] = punto(g, (n + 0.5) / g.lamparas);
              orden += 1;
              return (
                <g
                  key={n}
                  className={animar ? "lampara" : undefined}
                  style={animar ? ({ "--orden": `${0.2 + ((orden * 7) % 48) * 0.035}s` } as React.CSSProperties) : undefined}
                >
                  <circle cx={x} cy={y + 12} r="46" fill={`url(#${id})`} />
                  <line x1={x} y1={y} x2={x} y2={y + 7} stroke="#050a16" strokeWidth="2" />
                  <circle cx={x} cy={y + 12} r="5" fill="#ffe9bd" />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

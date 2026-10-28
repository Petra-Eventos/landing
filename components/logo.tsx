// Logos de Petra. Copiados tal cual del manual de marca: no redibujar ni modificar.

type IsotipoProps = { className?: string; variante?: "principal" | "clara" };

export function Isotipo({ className, variante = "principal" }: IsotipoProps) {
  const pilar = variante === "principal" ? "#1C79A4" : "#F3EEE6";
  const base = variante === "principal" ? "#6B7A3A" : "#8C9A52";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="25 28 70 86"
      width="70"
      height="86"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g>
        <rect x="42" y="30" width="36" height="6" fill={pilar} />
        <polygon points="46,37.5 74,37.5 71,42 49,42" fill={pilar} />
        <path fillRule="evenodd" fill={pilar} d="M50 43h20v29h-20zM54.5 46h3v23h-3zM62.5 46h3v23h-3z" />
        <rect x="46" y="72" width="28" height="4" fill={pilar} />
        <polygon points="39,80 81,77.5 83,86.5 37,88.5" fill={pilar} />
        <polygon points="33,91.5 87,89 89,98.5 31,100.5" fill={pilar} />
        <polygon points="28,103.5 92,101 93,109.5 27,111.5" fill={base} />
      </g>
    </svg>
  );
}

/** Firma: isotipo + logotipo "petra". */
export function Firma({ variante = "principal" }: { variante?: "principal" | "clara" }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Isotipo variante={variante} className="h-8 w-auto" />
      <span
        className={`font-display text-[23px] font-semibold leading-none tracking-[-0.01em] ${
          variante === "principal" ? "text-ink" : "text-crema-claro"
        }`}
      >
        petra
      </span>
    </span>
  );
}

/** Recurso de las piedras. Se usa una sola vez, antes del formulario. */
export function Piedras({
  className,
  variante = "principal",
}: {
  className?: string;
  variante?: "principal" | "clara";
}) {
  const piedra = variante === "principal" ? "#1C79A4" : "#F3EEE6";
  const base = variante === "principal" ? "#6B7A3A" : "#8C9A52";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="25 76 70 37"
      width="70"
      height="37"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="39,80 81,77.5 83,86.5 37,88.5" fill={piedra} />
      <polygon points="33,91.5 87,89 89,98.5 31,100.5" fill={piedra} />
      <polygon points="28,103.5 92,101 93,109.5 27,111.5" fill={base} />
    </svg>
  );
}

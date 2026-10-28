import type { ReactNode } from "react";

/*
 * Adornos de la marca para la landing, inspirados en una invitación elegante
 * y en la columna del logo ("tu salón sobre la roca"): líneas finas doradas, un rombo y arcos.
 * Son decorativos: van con aria-hidden y no llevan texto.
 */

/** Antetítulo dorado con una línea fina delante (o a los dos lados, si va centrado). */
export function Antetitulo({ children, centrado = false }: { children: ReactNode; centrado?: boolean }) {
  return (
    <p className={`type-etiqueta flex items-center gap-3 text-dorado ${centrado ? "justify-center" : ""}`}>
      <span aria-hidden="true" className="h-px w-8 bg-linear-to-r from-transparent to-dorado/70" />
      {children}
      {centrado && <span aria-hidden="true" className="h-px w-8 bg-linear-to-l from-transparent to-dorado/70" />}
    </p>
  );
}

/** Línea fina dorada que se desvanece en las puntas, con un rombo en el medio. Separa secciones. */
export function Separador() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-3 px-4">
      <span className="h-px max-w-[420px] flex-1 bg-linear-to-r from-transparent to-dorado/35" />
      <span className="size-1.5 rotate-45 bg-dorado/70" />
      <span className="h-px max-w-[420px] flex-1 bg-linear-to-l from-transparent to-dorado/35" />
    </div>
  );
}

/** Título de cada sección: antetítulo, título y una línea opcional. */
export function Encabezado({
  id,
  ante,
  titulo,
  texto,
  centrado = false,
}: {
  id: string;
  ante: string;
  titulo: ReactNode;
  texto?: string;
  centrado?: boolean;
}) {
  return (
    <div className={`max-w-[720px] ${centrado ? "mx-auto text-center" : ""}`}>
      <Antetitulo centrado={centrado}>{ante}</Antetitulo>
      <h2 id={id} className="type-titulo mt-4 text-ink">
        {titulo}
      </h2>
      {texto && <p className="type-cuerpo mt-3 text-ink-muted">{texto}</p>}
    </div>
  );
}

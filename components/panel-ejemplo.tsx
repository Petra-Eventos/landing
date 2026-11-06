import { CalendarDays, Home, Link2, ListChecks, Menu } from "lucide-react";

// Datos de ejemplo: no son de ningún salón.
const PEDIDOS = [
  { quien: "Caro M.", festejo: "XV años", fecha: "Sáb 13/3", invitados: 120, precio: "$ 15.960.000", estado: "Nuevo", clase: "bg-azul text-on-azul" },
  { quien: "Martín R.", festejo: "Casamiento", fecha: "Vie 19/3", invitados: 180, precio: "$ 21.300.000", estado: "Reservó", clase: "bg-oliva-soft text-oliva-text" },
  { quien: "Andes S.A.", festejo: "Empresarial", fecha: "Jue 25/3", invitados: 80, precio: "$ 9.240.000", estado: "Todavía no", clase: "bg-white/8 text-ink-muted" },
  { quien: "Lucas P.", festejo: "Cumpleaños", fecha: "Dom 14/3", invitados: 60, precio: "$ 7.180.000", estado: "Nuevo", clase: "bg-azul text-on-azul" },
];
const MENU = [
  { icono: Home, nombre: "Inicio" },
  { icono: Link2, nombre: "Cotizador" },
  { icono: ListChecks, nombre: "Pedidos", activo: true },
  { icono: CalendarDays, nombre: "Eventos" },
  { icono: Menu, nombre: "Más" },
];

/** Cómo se ve el panel del salón: la lista de pedidos que llegan por el cotizador (decorativo). */
export function PanelEjemplo() {
  return (
    <div aria-hidden="true" className="flex min-h-[420px] w-full bg-surface-raised text-left text-ink">
      <div className="hidden w-48 shrink-0 flex-col gap-1 border-r border-white/8 p-4 md:flex">
        {MENU.map(({ icono: Icono, nombre, activo }) => (
          <span key={nombre} className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-[14px] ${activo ? "bg-white/8 font-semibold" : "text-ink-muted"}`}>
            <Icono size={16} strokeWidth={1.8} />
            {nombre}
          </span>
        ))}
      </div>
      <div className="min-w-0 flex-1 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[20px] font-bold tracking-tight">Pedidos</p>
            <p className="text-[14px] text-ink-muted">2 personas cotizaron esta noche</p>
          </div>
          <span className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-[13px]">
            <Link2 size={14} strokeWidth={2} />
            Compartir mi cotizador
          </span>
        </div>
        <ul className="mt-5 flex flex-col divide-y divide-white/8 rounded-xl border border-white/8">
          {PEDIDOS.map((p) => (
            <li key={p.quien} className="flex items-center gap-4 px-4 py-3.5 text-[14px]">
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{p.quien}</span>
                <span className="block truncate text-[13px] text-ink-muted">
                  {p.festejo}, {p.invitados} invitados
                </span>
              </span>
              <span className="hidden text-ink-muted sm:block">{p.fecha}</span>
              <span className="hidden w-28 text-right tabular-nums sm:block">{p.precio}</span>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${p.clase}`}>{p.estado}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

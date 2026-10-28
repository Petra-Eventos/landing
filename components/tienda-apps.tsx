import {
  Aperture,
  BellRing,
  BookHeart,
  Brain,
  Camera,
  ChartColumn,
  CircleQuestionMark,
  Clapperboard,
  Clock,
  Disc3,
  Flame,
  Frame,
  GalleryVerticalEnd,
  Gem,
  Gift,
  Grid3x3,
  HeartHandshake,
  Hourglass,
  Images,
  LayoutGrid,
  ListChecks,
  Mail,
  MapIcon,
  Medal,
  MessageSquareHeart,
  Music,
  SearchCheck,
  Sparkles,
  Trophy,
  Video,
  Vote,
  Wine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { APPS, type Categoria } from "@/lib/catalogo";

const ICONOS: Record<string, LucideIcon> = {
  invitacion: Mail,
  lista_invitados: ListChecks,
  armado_mesas: LayoutGrid,
  cronograma: Clock,
  turnos_foto: Aperture,
  carta_noche: Wine,
  mapa_salon: MapIcon,
  objetos_perdidos: SearchCheck,
  aviso_padres: BellRing,
  camara: Camera,
  historia_fotos: GalleryVerticalEnd,
  muro_fotos: Images,
  videosaludos: Video,
  marco_historias: Frame,
  video_resumen: Clapperboard,
  ruleta: Disc3,
  trivia: CircleQuestionMark,
  caza_tesoro: Gem,
  votaciones: Vote,
  bingo: Grid3x3,
  prode: Trophy,
  retos: Flame,
  memotest: Brain,
  competencia_mesas: Medal,
  mensajes_pantalla: MessageSquareHeart,
  bienvenida_pantalla: Sparkles,
  estadisticas_pantalla: ChartColumn,
  pedido_canciones: Music,
  libro_firmas: BookHeart,
  regalos: Gift,
  capsula_tiempo: Hourglass,
  tarjeta_agradecimiento: HeartHandshake,
};

/**
 * Colores de cada categoría, como los íconos de una tienda de apps.
 * Son colores de producto (no tokens de Petra), igual que las paletas de los universos en el sistema.
 */
const COLORES: Record<Categoria, { desde: string; hasta: string }> = {
  Organización: { desde: "#2f80ed", hasta: "#22c3e6" },
  "Fotos y video": { desde: "#ff5f6d", hasta: "#ffb35c" },
  Juegos: { desde: "#8e2de2", hasta: "#ff4fd8" },
  Pantalla: { desde: "#0f9b8e", hasta: "#3fdc7d" },
  Música: { desde: "#fc466b", hasta: "#3f5efb" },
  Recuerdos: { desde: "#f7971e", hasta: "#f5c518" },
};

const CATEGORIAS = Object.keys(COLORES) as Categoria[];

/** Todas las apps para invitados en una cuadrícula, como la pantalla de inicio de un celular. */
export function TiendaApps() {
  return (
    <div>
      <ul aria-label="Categorías" className="flex flex-wrap gap-2">
        {CATEGORIAS.map((c) => {
          const cantidad = APPS.filter((a) => a.categoria === c).length;
          return (
            <li
              key={c}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pr-3 pl-1 text-[13px] text-ink"
            >
              <span
                aria-hidden="true"
                className="size-5 rounded-full"
                style={{ backgroundImage: `linear-gradient(135deg, ${COLORES[c].desde}, ${COLORES[c].hasta})` }}
              />
              {c}
              <span className="text-ink-muted">{cantidad}</span>
            </li>
          );
        })}
      </ul>

      <ul className="mt-8 grid grid-cols-4 gap-x-2 gap-y-6 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 lg:gap-x-4">
        {APPS.map((app) => {
          const Icono = ICONOS[app.id] ?? Sparkles;
          const { desde, hasta } = COLORES[app.categoria];
          return (
            <li key={app.id} className="group flex flex-col items-center text-center" title={app.texto}>
              <span
                className="relative flex size-15 items-center justify-center rounded-[22%] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)] ring-1 ring-white/20 transition-transform group-hover:-translate-y-1 group-hover:scale-105 sm:size-[72px]"
                style={{ backgroundImage: `linear-gradient(140deg, ${desde}, ${hasta})` }}
              >
                {/* Brillo de arriba, como los íconos de las tiendas. */}
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 rounded-t-[22%] bg-white/15" />
                <Icono size={30} strokeWidth={2} className="relative text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" aria-hidden="true" />
                {app.ya && (
                  <span className="absolute -top-1.5 -right-1.5 rounded-full bg-[#22c55e] px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-[#052e14] uppercase shadow">
                    Ya
                  </span>
                )}
              </span>
              <span className="mt-2 line-clamp-2 text-[12px] leading-4 font-semibold text-ink sm:text-[13px]">{app.nombre}</span>
              <span className="mt-0.5 text-[11px] leading-4 text-ink-muted">Plan {app.plan}</span>
              <span className="sr-only">
                {app.texto} {app.ya ? "Ya disponible." : "Próximamente."}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 flex items-center gap-2 text-[13px] text-ink-muted">
        <span className="rounded-full bg-[#22c55e] px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-[#052e14] uppercase">Ya</span>
        Disponibles hoy. El resto se suma a tu plan a medida que sale.
      </p>
    </div>
  );
}

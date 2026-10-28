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
 * Tono de cada categoría: apagados, para que convivan con la paleta noche y oro de la marca.
 * Son colores de producto (no tokens de Petra), igual que las paletas de los universos en el sistema.
 */
const TONOS: Record<Categoria, string> = {
  Organización: "#8fb4cf",
  "Fotos y video": "#d9a08c",
  Juegos: "#b6a6d8",
  Pantalla: "#b7c37c",
  Música: "#d6a3b9",
  Recuerdos: "#d4b06a",
};

const CATEGORIAS = Object.keys(TONOS) as Categoria[];

// Los de una misma fila entran apenas corridos (ver .aparecer en globals.css).
const DEMORAS = ["", "[--demora:8%]", "[--demora:16%]", "[--demora:24%]"];

/** Todas las apps para invitados en una cuadrícula, como la pantalla de inicio de un celular. */
export function TiendaApps() {
  return (
    <div>
      <ul aria-label="Categorías" className="aparecer flex flex-wrap justify-center gap-2">
        {CATEGORIAS.map((c) => {
          const cantidad = APPS.filter((a) => a.categoria === c).length;
          return (
            <li
              key={c}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised/60 py-1.5 pr-3 pl-2.5 text-[13px] text-ink"
            >
              <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: TONOS[c] }} />
              {c}
              <span className="text-ink-muted">{cantidad}</span>
            </li>
          );
        })}
      </ul>

      <ul className="mt-8 grid grid-cols-4 gap-x-2 gap-y-6 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 lg:gap-x-4">
        {APPS.map((app, i) => {
          const Icono = ICONOS[app.id] ?? Sparkles;
          const tono = TONOS[app.categoria];
          return (
            <li
              key={app.id}
              className={`group aparecer flex flex-col items-center text-center ${DEMORAS[i % DEMORAS.length]}`}
              title={app.texto}
            >
              <span
                className="relative flex size-15 items-center justify-center rounded-[22%] border bg-surface-raised shadow-piedra transition duration-200 group-hover:-translate-y-0.5 sm:size-[68px]"
                style={{
                  borderColor: `${tono}40`,
                  backgroundImage: `linear-gradient(160deg, ${tono}2e, transparent 70%)`,
                }}
              >
                <Icono size={28} strokeWidth={1.6} style={{ color: tono }} aria-hidden="true" />
                {app.ya && (
                  <span className="absolute -top-1.5 -right-1.5 rounded-full bg-dorado px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-on-dorado uppercase">
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

      <p className="aparecer mt-10 flex items-center justify-center gap-2 text-center text-[13px] text-ink-muted">
        <span className="rounded-full bg-dorado px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-on-dorado uppercase">Ya</span>
        Disponibles hoy. El resto se suma a tu plan a medida que sale.
      </p>
    </div>
  );
}

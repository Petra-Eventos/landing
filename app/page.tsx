import {
  ArrowRight,
  Brain,
  Camera,
  CircleDot,
  Crown,
  Frame,
  Grid3x3,
  Heart,
  Images,
  LayoutGrid,
  ListChecks,
  Mail,
  MessageCircle,
  MessageSquare,
  Monitor,
  Music,
  Palette,
  PenLine,
  Smartphone,
  Sparkles,
  Ticket,
  Video,
  Vote,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { Firma, Piedras } from "@/components/logo";
import { Cielo } from "@/components/cielo";
import {
  URL_ENTRAR,
  URL_PRIVACIDAD,
  URL_REGISTRARME,
  URL_SOCIOS,
  URL_TERMINOS,
  URL_WHATSAPP,
} from "@/lib/enlaces";

const contenedor = "mx-auto w-full max-w-[1120px] px-4 md:px-8";
const botonPrincipal =
  "type-boton inline-flex min-h-13 items-center justify-center gap-2 rounded-md bg-azul px-7 py-3 text-[16px] text-on-azul transition-colors hover:bg-azul-hover";
const botonSecundario =
  "type-boton inline-flex min-h-13 items-center justify-center rounded-md border border-line-strong px-7 py-3 text-[16px] text-ink transition-colors hover:border-ink";

// Herramientas para invitados del catálogo del sistema. "lista" = ya disponible; el resto llega de a poco.
const PARA_INVITADOS: { icono: LucideIcon; nombre: string; lista?: boolean }[] = [
  { icono: ListChecks, nombre: "Lista de invitados", lista: true },
  { icono: LayoutGrid, nombre: "Armado de mesas", lista: true },
  { icono: Mail, nombre: "Invitación" },
  { icono: Ticket, nombre: "Pase del invitado" },
  { icono: Camera, nombre: "Cámara instantánea" },
  { icono: Images, nombre: "Muro de fotos en vivo" },
  { icono: CircleDot, nombre: "Ruleta" },
  { icono: Grid3x3, nombre: "Bingo" },
  { icono: Brain, nombre: "Trivia" },
  { icono: Music, nombre: "Pedido de canciones" },
  { icono: Video, nombre: "Videosaludos" },
  { icono: PenLine, nombre: "Libro de firmas" },
  { icono: Monitor, nombre: "Bienvenida en pantalla" },
  { icono: MessageSquare, nombre: "Mensajes en pantalla" },
  { icono: Vote, nombre: "Votaciones" },
  { icono: Frame, nombre: "Marco para historias" },
];

const POR_QUE: { icono: LucideIcon; titulo: string; texto: string }[] = [
  { icono: Palette, titulo: "Tu marca, siempre", texto: "Tu logo y tus colores. Petra no se ve." },
  { icono: Smartphone, titulo: "Desde el celular", texto: "Sin apps para bajar. Un link y listo." },
  { icono: Zap, titulo: "Lista en minutos", texto: "La activás para cada fiesta en un toque." },
];

function Botones({ centrado = false }: { centrado?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${centrado ? "sm:justify-center" : ""}`}>
      <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
        Crear mi cuenta gratis
        <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
      </a>
      <a href={URL_ENTRAR} className={`${botonSecundario} w-full sm:w-auto`}>
        Entrar al sistema
      </a>
    </div>
  );
}

/** Lo que ve un invitado en el celular: dibujado con los tokens, sin datos reales. */
function CelularInvitado() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[300px] rounded-[40px] border border-dorado/40 bg-noche p-3 shadow-piedra"
    >
      <div className="rounded-[30px] bg-surface-raised px-5 pt-6 pb-7">
        <p className="type-etiqueta text-center text-dorado">Tu salón</p>
        <p className="mt-3 text-center font-display text-[28px] leading-8 text-ink">XV de Sofía</p>
        <p className="mt-1 text-center text-[14px] text-ink-muted">Sábado 14 · 21:30</p>
        <div className="mt-6 flex flex-col gap-2.5">
          <span className="flex min-h-11 items-center justify-center rounded-md bg-azul text-[15px] font-semibold text-on-azul">
            Confirmar asistencia
          </span>
          <span className="flex min-h-11 items-center justify-between rounded-md border border-line px-4 text-[15px] text-ink">
            Tu mesa <span className="font-display text-[20px] text-dorado">7</span>
          </span>
          <span className="flex min-h-11 items-center gap-2 rounded-md border border-line px-4 text-[15px] text-ink">
            <Camera size={18} strokeWidth={1.8} className="text-dorado" /> Subí tu foto a la pantalla
          </span>
          <span className="flex min-h-11 items-center gap-2 rounded-md border border-line px-4 text-[15px] text-ink">
            <Music size={18} strokeWidth={1.8} className="text-dorado" /> Pedí tu canción
          </span>
        </div>
        <p className="mt-6 text-center text-[11px] text-ink-muted">Hecho con Petra</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Cielo />
      <div aria-hidden="true" className="vineta pointer-events-none fixed inset-0 -z-10" />

      {/* Encabezado */}
      <header className={`${contenedor} flex items-center justify-between gap-3 py-4`}>
        <a href="#" aria-label="Petra, inicio" className="rounded-md">
          <Firma variante="clara" />
        </a>
        <nav aria-label="Acceso" className="flex items-center gap-1 sm:gap-3">
          <a
            href={URL_ENTRAR}
            className="type-boton inline-flex min-h-11 items-center rounded-md px-3 text-ink underline-offset-4 hover:underline"
          >
            Entrar
          </a>
          <a
            href={URL_REGISTRARME}
            className="type-boton inline-flex min-h-11 items-center rounded-md bg-azul px-4 text-on-azul transition-colors hover:bg-azul-hover"
          >
            Registrarme
          </a>
        </nav>
      </header>

      <main className="flex flex-col gap-20 lg:gap-28">
        {/* Hero */}
        <section
          className={`${contenedor} grid items-center gap-12 pt-8 md:pt-16 lg:grid-cols-[1.15fr_1fr]`}
          aria-labelledby="titular"
        >
          <div>
            <p className="type-etiqueta inline-flex items-center gap-1.5 rounded-sm bg-dorado-soft px-3 py-1.5 text-dorado">
              <Sparkles size={14} strokeWidth={2} aria-hidden="true" />
              Herramientas digitales para salones
            </p>
            <h1 id="titular" className="type-display mt-6 text-ink">
              Ofrecele a tus invitados <span className="text-dorado">toda la tecnología que quieren.</span>
            </h1>
            <p className="type-subtitulo mt-5 max-w-[520px] text-ink-muted">
              Con tu marca. Tu salón, el protagonista de cada fiesta.
            </p>
            <div className="mt-8">
              <Botones />
              <p className="mt-3 text-[14px] leading-5 text-ink-muted">Gratis para empezar. Sin tarjeta.</p>
            </div>
          </div>
          <CelularInvitado />
        </section>

        {/* Lo que tus invitados quieren */}
        <section className={contenedor} aria-labelledby="invitados">
          <h2 id="invitados" className="type-titulo max-w-[640px] text-ink">
            Todo lo que tus invitados quieren, en un solo lugar
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {PARA_INVITADOS.map(({ icono: Icono, nombre, lista }) => (
              <li
                key={nombre}
                className={`inline-flex min-h-11 items-center gap-2 rounded-sm border px-4 text-[15px] ${
                  lista ? "border-dorado/60 bg-dorado-soft text-ink" : "border-line bg-surface-raised text-ink"
                }`}
              >
                <Icono size={18} strokeWidth={1.8} className={lista ? "text-dorado" : "text-azul-text"} aria-hidden="true" />
                {nombre}
                {lista && <span className="type-etiqueta text-dorado">Ya</span>}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] leading-5 text-ink-muted">
            Las marcadas con “Ya” están disponibles hoy. Las demás se van sumando.
          </p>
          <div className="mt-8">
            <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
              Probalas gratis
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Por qué */}
        <section className={contenedor} aria-label="Por qué Petra">
          <ul className="grid gap-4 md:grid-cols-3">
            {POR_QUE.map(({ icono: Icono, titulo, texto }) => (
              <li key={titulo} className="flex items-center gap-4 rounded-lg border border-line bg-surface-raised p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-azul-soft text-azul-text">
                  <Icono size={24} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span>
                  <span className="type-subtitulo block text-ink">{titulo}</span>
                  <span className="type-cuerpo block text-ink-muted">{texto}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Llamado */}
        <section className={contenedor} aria-labelledby="empezar">
          <div className="rounded-xl border border-line bg-surface-raised px-6 py-12 text-center shadow-piedra sm:px-10">
            <Piedras variante="clara" className="mx-auto mb-6 h-auto w-14" />
            <h2 id="empezar" className="type-titulo text-ink">
              Que tu salón sea el que todos recuerdan
            </h2>
            <p className="type-subtitulo mt-3 text-ink-muted">Creá tu cuenta en un minuto.</p>
            <div className="mt-8">
              <Botones centrado />
            </div>
            <a
              href={URL_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="type-boton mt-6 inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-dorado underline-offset-4 hover:underline"
            >
              <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
              ¿Dudas? Escribinos por WhatsApp
            </a>
          </div>
        </section>

        {/* Socios */}
        <section className={contenedor} aria-labelledby="socios">
          <div className="grid items-center gap-8 rounded-xl border border-dorado/60 bg-dorado-soft p-6 sm:p-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="type-etiqueta inline-flex items-center gap-1.5 text-dorado">
                <Crown size={14} strokeWidth={2} aria-hidden="true" />
                Para ir más allá
              </p>
              <h2 id="socios" className="type-titulo mt-3 text-ink">
                Sé parte de los socios de Petra
              </h2>
              <p className="type-subtitulo mt-3 max-w-[560px] text-ink-muted">
                Gestionamos todo tu salón con vos: cuotas, caja, costos, proveedores y soporte personalizado.
              </p>
            </div>
            <a
              href={URL_SOCIOS}
              target="_blank"
              rel="noopener noreferrer"
              className="type-boton inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-md bg-dorado px-7 py-3 text-[16px] text-on-dorado transition-colors hover:bg-dorado-hover md:w-auto"
            >
              <Heart size={18} strokeWidth={2} aria-hidden="true" />
              Quiero ser socio
            </a>
          </div>
        </section>

        {/* Quién está detrás */}
        <section id="creador" className={contenedor} aria-label="Quién creó Petra">
          <figure className="mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
            <Image
              src="/rodrigo-torres.jpg"
              alt="Rodrigo Torres, creador de Petra"
              width={403}
              height={449}
              sizes="144px"
              className="size-32 shrink-0 rounded-full border-2 border-dorado object-cover object-top shadow-piedra sm:size-36"
            />
            <div>
              <blockquote className="font-display text-[22px] leading-8 text-ink sm:text-[24px]">
                “Creé Petra para que cada salón sea el protagonista de sus fiestas, con tecnología simple y a su
                medida.”
              </blockquote>
              <figcaption className="mt-4">
                <span className="type-subtitulo block text-dorado">Rodrigo Torres</span>
                <span className="type-cuerpo block text-ink-muted">Creador de Petra</span>
              </figcaption>
            </div>
          </figure>
        </section>
      </main>

      {/* Pie */}
      <footer className="relative mt-20 overflow-hidden border-t border-line bg-noche text-ink lg:mt-28">
        <Cielo fijo={false} cantidad={90} semilla={21} conDestellos={false} />
        <div className={`${contenedor} relative py-14 lg:py-16`}>
          <p className="type-titulo max-w-[720px]">Tu salón sobre la roca.</p>
          <div className="mt-8">
            <Botones />
          </div>
          <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Firma variante="clara" />
            <nav
              aria-label="Legales"
              className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] leading-5 text-crema-claro"
            >
              <a href={URL_TERMINOS} className="underline-offset-4 hover:underline">
                Términos
              </a>
              <a href={URL_PRIVACIDAD} className="underline-offset-4 hover:underline">
                Privacidad
              </a>
              <a href="mailto:hola@petraeventos.com" className="underline-offset-4 hover:underline">
                hola@petraeventos.com
              </a>
              <span>© 2026 Petra</span>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}

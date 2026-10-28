import {
  ArrowRight,
  BadgeCheck,
  Brain,
  Camera,
  Check,
  CircleDot,
  Clock,
  Crown,
  Frame,
  Gauge,
  Grid3x3,
  Headset,
  Images,
  LayoutGrid,
  ListChecks,
  Mail,
  MessageCircle,
  MessageSquare,
  Monitor,
  Music,
  PenLine,
  ShieldCheck,
  Sparkles,
  Store,
  Ticket,
  TrendingUp,
  Video,
  Vote,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { Firma, Piedras } from "@/components/logo";
import {
  URL_ENTRAR,
  URL_PRIVACIDAD,
  URL_REGISTRARME,
  URL_SOCIOS,
  URL_TERMINOS,
  URL_WHATSAPP,
} from "@/lib/enlaces";

const contenedor = "mx-auto w-full max-w-[1180px] px-4 md:px-8";
const botonPrincipal =
  "type-boton inline-flex min-h-13 items-center justify-center gap-2 rounded-md bg-azul px-7 py-3 text-[16px] text-on-azul shadow-piedra transition-colors hover:bg-azul-hover";
const botonSecundario =
  "type-boton inline-flex min-h-13 items-center justify-center rounded-md border border-line-strong px-7 py-3 text-[16px] text-ink transition-colors hover:border-ink";

/** Etiqueta dorada en mayúsculas arriba de cada título de sección. */
function Antetitulo({ children }: { children: React.ReactNode }) {
  return <p className="type-etiqueta text-dorado">{children}</p>;
}

const EVENTOS = ["Casamientos", "Bautismos", "Cumpleaños", "XV", "Egresados", "Empresariales"];

// Lo que gana el salón (el negocio, no la herramienta).
const PARA_EL_SALON: { icono: LucideIcon; titulo: string; texto: string }[] = [
  {
    icono: TrendingUp,
    titulo: "Sumá ingresos en cada fiesta",
    texto: "Vendé cada herramienta a tus clientes, con el precio que vos elijas. Petra se paga sola.",
  },
  {
    icono: Store,
    titulo: "Diferenciá tu salón",
    texto: "Ofrecé lo que tus clientes ven en las mejores fiestas, con tu logo y tus colores.",
  },
  {
    icono: ShieldCheck,
    titulo: "Todo bajo control",
    texto: "Invitados, mesas, cobros y cronograma en un solo lugar. Cada salón ve solo lo suyo.",
  },
];

// Herramientas del catálogo del sistema. "lista" = ya disponible; el resto llega de a poco.
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
  { icono: MessageSquare, nombre: "Mensajes en pantalla" },
  { icono: Vote, nombre: "Votaciones" },
  { icono: Frame, nombre: "Marco para historias" },
];

const PARA_COORDINADORA: { icono: LucideIcon; nombre: string; texto: string; lista?: boolean }[] = [
  { icono: ListChecks, nombre: "Invitados y mesas", texto: "Quién viene y dónde se sienta.", lista: true },
  { icono: Gauge, nombre: "Panel del coordinador", texto: "El control remoto de la noche." },
  { icono: Monitor, nombre: "Pantalla del salón", texto: "Lo que se ve en el proyector o la tele." },
  { icono: Clock, nombre: "Cronograma de la noche", texto: "Cada momento, a horario." },
];

const PASOS = [
  { titulo: "Creá tu cuenta", texto: "Con Google, en un minuto. Gratis y sin tarjeta." },
  { titulo: "Cargá tus fiestas", texto: "Fecha, cliente y espacio. Tu calendario queda al día." },
  { titulo: "Activá las herramientas", texto: "Elegí cuáles ofrece cada fiesta y compartí el link." },
];

const CONFIANZA: { icono: LucideIcon; texto: string }[] = [
  { icono: BadgeCheck, texto: "Gratis para empezar" },
  { icono: ShieldCheck, texto: "Datos protegidos" },
  { icono: Headset, texto: "Soporte por WhatsApp" },
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

/** Lo que se ve en la fiesta: la pantalla del salón y el celular del invitado. Dibujado, sin datos reales. */
function Escena() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[520px] pb-24 sm:pb-20 lg:pb-0">
      {/* Pantalla del salón */}
      <div className="rounded-xl border border-line-strong bg-noche p-2.5 shadow-piedra">
        <div className="rounded-lg bg-surface-raised p-5">
          <div className="flex items-center justify-between">
            <p className="type-etiqueta text-dorado">Pantalla del salón</p>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-muted">
              <span className="size-2 rounded-full bg-dorado" /> En vivo
            </span>
          </div>
          <p className="mt-4 font-display text-[26px] leading-8 text-ink">Bienvenidos a los XV de Sofía</p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {["from-azul/50 to-azul-soft", "from-dorado/40 to-dorado-soft", "from-azul-soft to-azul/30", "from-dorado-soft to-dorado/30", "from-azul/30 to-dorado-soft", "from-dorado/30 to-azul-soft", "from-azul-soft to-azul/50", "from-dorado/40 to-azul-soft"].map((g) => (
              <span key={g} className={`aspect-square rounded-md bg-linear-to-br ${g}`} />
            ))}
          </div>
        </div>
      </div>
      {/* Celular del invitado */}
      <div className="absolute -bottom-6 -left-2 w-[190px] rounded-[30px] border border-dorado/50 bg-noche p-2 shadow-piedra sm:-left-8 lg:-bottom-16">
        <div className="rounded-[24px] bg-surface-raised px-4 pt-5 pb-5">
          <p className="type-etiqueta text-center text-[10px] text-dorado">Tu salón</p>
          <p className="mt-2 text-center font-display text-[18px] leading-6 text-ink">XV de Sofía</p>
          <span className="mt-4 flex min-h-9 items-center justify-center rounded-md bg-azul text-[13px] font-semibold text-on-azul">
            Confirmar asistencia
          </span>
          <span className="mt-2 flex min-h-9 items-center justify-between rounded-md border border-line px-3 text-[13px] text-ink">
            Tu mesa <span className="font-display text-[16px] text-dorado">7</span>
          </span>
          <span className="mt-2 flex min-h-9 items-center gap-1.5 rounded-md border border-line px-3 text-[13px] text-ink">
            <Camera size={14} strokeWidth={1.8} className="text-dorado" /> Subí tu foto
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Encabezado fijo */}
      <header className="sticky top-0 z-20 border-b border-line bg-surface/85 backdrop-blur">
        <div className={`${contenedor} flex min-h-16 items-center justify-between gap-3`}>
          <a href="#" aria-label="Petra, inicio" className="rounded-md">
            <Firma variante="clara" />
          </a>
          <nav aria-label="Secciones" className="hidden items-center gap-7 text-[15px] text-ink-muted lg:flex">
            <a href="#salon" className="hover:text-ink">
              Para tu salón
            </a>
            <a href="#herramientas" className="hover:text-ink">
              Herramientas
            </a>
            <a href="#como" className="hover:text-ink">
              Cómo funciona
            </a>
            <a href="#socios" className="hover:text-ink">
              Socios
            </a>
          </nav>
          <div className="flex items-center gap-1 sm:gap-3">
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
              Crear cuenta
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          className={`${contenedor} grid items-center gap-14 pt-14 pb-20 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:pb-28`}
          aria-labelledby="titular"
        >
          <div>
            <p className="type-etiqueta inline-flex items-center gap-1.5 rounded-sm border border-dorado/40 px-3 py-1.5 text-dorado">
              <Sparkles size={14} strokeWidth={2} aria-hidden="true" />
              Plataforma para salones de eventos
            </p>
            <h1 id="titular" className="type-display mt-6 text-ink lg:text-[56px] lg:leading-[62px]">
              Ofrecele a tus invitados <span className="text-dorado">toda la tecnología que quieren.</span>
            </h1>
            <p className="type-subtitulo mt-6 max-w-[540px] font-normal text-ink-muted">
              Invitación, confirmaciones, mesas y fotos en pantalla, con la marca de tu salón. Tu salón, el
              protagonista de cada fiesta.
            </p>
            <div className="mt-9">
              <Botones />
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink-muted">
              {CONFIANZA.map(({ icono: Icono, texto }) => (
                <li key={texto} className="inline-flex items-center gap-2">
                  <Icono size={16} strokeWidth={2} className="text-dorado" aria-hidden="true" />
                  {texto}
                </li>
              ))}
            </ul>
          </div>
          <Escena />
        </section>

        {/* Tipos de fiesta */}
        <section className="border-y border-line bg-noche/60" aria-labelledby="eventos">
          <div className={`${contenedor} flex flex-col items-center gap-4 py-8 lg:flex-row lg:justify-between`}>
            <h2 id="eventos" className="type-etiqueta shrink-0 text-ink-muted">
              Petra está presente en
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-center font-display text-[20px] leading-7 text-ink sm:flex sm:flex-wrap sm:justify-center sm:gap-x-8 sm:text-[22px]">
              {EVENTOS.map((evento) => (
                <li key={evento}>{evento}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Para el salón */}
        <section id="salon" className={`${contenedor} scroll-mt-20 py-20 lg:py-28`} aria-labelledby="titulo-salon">
          <div className="max-w-[680px]">
            <Antetitulo>Para tu salón</Antetitulo>
            <h2 id="titulo-salon" className="type-titulo mt-3 text-ink lg:text-[40px] lg:leading-[48px]">
              Una plataforma pensada para el negocio de las fiestas
            </h2>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {PARA_EL_SALON.map(({ icono: Icono, titulo, texto }) => (
              <li key={titulo} className="bg-surface-raised p-7 lg:p-9">
                <Icono size={28} strokeWidth={1.6} className="text-dorado" aria-hidden="true" />
                <h3 className="type-subtitulo mt-6 text-ink">{titulo}</h3>
                <p className="type-cuerpo mt-2 text-ink-muted">{texto}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Herramientas */}
        <section
          id="herramientas"
          className="scroll-mt-20 border-y border-line bg-noche/60 py-20 lg:py-28"
          aria-labelledby="titulo-herramientas"
        >
          <div className={contenedor}>
            <div className="max-w-[680px]">
              <Antetitulo>Herramientas</Antetitulo>
              <h2 id="titulo-herramientas" className="type-titulo mt-3 text-ink lg:text-[40px] lg:leading-[48px]">
                Todo lo que la fiesta necesita, con tu marca
              </h2>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
              <div>
                <h3 className="type-subtitulo text-ink">Para tus invitados</h3>
                <p className="type-cuerpo mt-1 text-ink-muted">Desde el celular, sin bajar ninguna app.</p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {PARA_INVITADOS.map(({ icono: Icono, nombre, lista }) => (
                    <li
                      key={nombre}
                      className={`inline-flex min-h-10 items-center gap-2 rounded-sm border px-3.5 text-[14px] ${
                        lista ? "border-dorado/60 bg-dorado-soft text-ink" : "border-line bg-surface-raised text-ink"
                      }`}
                    >
                      <Icono
                        size={16}
                        strokeWidth={1.8}
                        className={lista ? "text-dorado" : "text-azul-text"}
                        aria-hidden="true"
                      />
                      {nombre}
                      {lista && <span className="type-etiqueta text-dorado">Ya</span>}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] text-ink-muted">“Ya”: disponible hoy. Las demás se van sumando.</p>
              </div>

              <div>
                <h3 className="type-subtitulo text-ink">Para tu coordinadora</h3>
                <p className="type-cuerpo mt-1 text-ink-muted">Más herramientas para llevar la fiesta.</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {PARA_COORDINADORA.map(({ icono: Icono, nombre, texto, lista }) => (
                    <li key={nombre} className="rounded-lg border border-line bg-surface-raised p-4">
                      <div className="flex items-center justify-between gap-3">
                        <Icono size={22} strokeWidth={1.6} className="text-azul-text" aria-hidden="true" />
                        {lista && <span className="type-etiqueta text-dorado">Ya</span>}
                      </div>
                      <p className="type-boton mt-3 text-ink">{nombre}</p>
                      <p className="mt-1 text-[14px] leading-5 text-ink-muted">{texto}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12">
              <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
                Probalas gratis
                <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como" className={`${contenedor} scroll-mt-20 py-20 lg:py-28`} aria-labelledby="titulo-como">
          <div className="max-w-[680px]">
            <Antetitulo>Cómo funciona</Antetitulo>
            <h2 id="titulo-como" className="type-titulo mt-3 text-ink lg:text-[40px] lg:leading-[48px]">
              Tu salón, listo en tres pasos
            </h2>
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {PASOS.map((paso, i) => (
              <li key={paso.titulo} className="border-t-2 border-dorado/60 pt-6">
                <span className="font-display text-[44px] leading-none text-dorado">0{i + 1}</span>
                <h3 className="type-subtitulo mt-4 text-ink">{paso.titulo}</h3>
                <p className="type-cuerpo mt-1 text-ink-muted">{paso.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Socios */}
        <section id="socios" className={`${contenedor} scroll-mt-20 pb-20 lg:pb-28`} aria-labelledby="titulo-socios">
          <div className="grid items-center gap-8 rounded-xl border border-dorado/50 bg-linear-to-br from-dorado-soft to-surface-raised p-7 shadow-piedra sm:p-12 md:grid-cols-[1fr_auto]">
            <div>
              <p className="type-etiqueta inline-flex items-center gap-1.5 text-dorado">
                <Crown size={14} strokeWidth={2} aria-hidden="true" />
                Socios de Petra
              </p>
              <h2 id="titulo-socios" className="type-titulo mt-3 text-ink lg:text-[40px] lg:leading-[48px]">
                Sé parte de los socios de Petra
              </h2>
              <p className="type-subtitulo mt-4 max-w-[580px] font-normal text-ink-muted">
                Gestionamos todo tu salón con vos: cuotas, caja, costos, proveedores y soporte personalizado.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-ink">
                {["Todas las herramientas", "Gestión completa", "Un contacto dedicado"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <Check size={16} strokeWidth={2.4} className="text-dorado" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={URL_SOCIOS}
              target="_blank"
              rel="noopener noreferrer"
              className="type-boton inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-md bg-dorado px-7 py-3 text-[16px] text-on-dorado transition-colors hover:bg-dorado-hover md:w-auto"
            >
              Quiero ser socio
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Creador */}
        <section className="border-t border-line" aria-label="Quién creó Petra">
          <figure
            className={`${contenedor} flex max-w-[860px] flex-col items-center gap-6 py-16 text-center sm:flex-row sm:gap-10 sm:text-left`}
          >
            <Image
              src="/rodrigo-torres.jpg"
              alt="Rodrigo Torres, creador de Petra"
              width={403}
              height={449}
              sizes="144px"
              className="size-32 shrink-0 rounded-full border-2 border-dorado object-cover object-top shadow-piedra sm:size-36"
            />
            <div>
              <blockquote className="font-display text-[24px] leading-8 text-ink sm:text-[28px] sm:leading-9">
                “Creé Petra para que cada salón pueda ofrecer una experiencia completa.”
              </blockquote>
              <figcaption className="mt-4">
                <span className="type-subtitulo block text-dorado">Rodrigo Torres</span>
                <span className="type-cuerpo block text-ink-muted">Creador de Petra</span>
              </figcaption>
            </div>
          </figure>
        </section>

        {/* Cierre */}
        <section className="border-t border-line bg-noche/60" aria-labelledby="titulo-cierre">
          <div className={`${contenedor} flex flex-col items-center py-20 text-center lg:py-24`}>
            <Piedras variante="clara" className="mb-6 h-auto w-14" />
            <h2 id="titulo-cierre" className="type-titulo max-w-[640px] text-ink lg:text-[40px] lg:leading-[48px]">
              Que tu salón sea el que todos recuerdan
            </h2>
            <p className="type-subtitulo mt-4 font-normal text-ink-muted">Gratis para empezar. Sin tarjeta.</p>
            <div className="mt-9">
              <Botones centrado />
            </div>
            <a
              href={URL_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="type-boton mt-6 inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-dorado underline-offset-4 hover:underline"
            >
              <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
              ¿Preferís hablar con alguien? Escribinos por WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* Pie */}
      <footer className="border-t border-line bg-noche">
        <div className={`${contenedor} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]`}>
          <div>
            <Firma variante="clara" />
            <p className="mt-4 max-w-[300px] text-[14px] leading-6 text-ink-muted">
              Herramientas digitales para salones de eventos. Tu salón sobre la roca.
            </p>
          </div>
          <nav aria-label="Producto" className="flex flex-col gap-2.5 text-[14px]">
            <p className="type-etiqueta mb-1 text-ink-muted">Producto</p>
            <a href="#herramientas" className="text-ink hover:text-dorado">
              Herramientas
            </a>
            <a href="#como" className="text-ink hover:text-dorado">
              Cómo funciona
            </a>
            <a href="#socios" className="text-ink hover:text-dorado">
              Socios
            </a>
          </nav>
          <nav aria-label="Cuenta" className="flex flex-col gap-2.5 text-[14px]">
            <p className="type-etiqueta mb-1 text-ink-muted">Cuenta</p>
            <a href={URL_REGISTRARME} className="text-ink hover:text-dorado">
              Crear cuenta
            </a>
            <a href={URL_ENTRAR} className="text-ink hover:text-dorado">
              Entrar al sistema
            </a>
          </nav>
          <nav aria-label="Contacto y legales" className="flex flex-col gap-2.5 text-[14px]">
            <p className="type-etiqueta mb-1 text-ink-muted">Contacto</p>
            <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-dorado">
              WhatsApp
            </a>
            <a href="mailto:hola@petraeventos.com" className="text-ink hover:text-dorado">
              hola@petraeventos.com
            </a>
            <a href={URL_TERMINOS} className="text-ink hover:text-dorado">
              Términos
            </a>
            <a href={URL_PRIVACIDAD} className="text-ink hover:text-dorado">
              Privacidad
            </a>
          </nav>
        </div>
        <div className="border-t border-line">
          <p className={`${contenedor} py-6 text-[13px] text-ink-muted`}>© 2026 Petra · petraeventos.com</p>
        </div>
      </footer>
    </>
  );
}

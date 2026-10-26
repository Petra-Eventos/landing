import {
  CalendarDays,
  Calculator,
  ChefHat,
  ChevronDown,
  ClipboardList,
  Link2,
  MailCheck,
  MessageCircle,
  QrCode,
  Smartphone,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Firma, Piedras } from "@/components/logo";
import { Cielo } from "@/components/cielo";
import { URL_ENTRAR, URL_PRIVACIDAD, URL_REGISTRARME, URL_TERMINOS, URL_WHATSAPP } from "@/lib/enlaces";

const contenedor = "mx-auto w-full max-w-[1120px] px-4 md:px-8";
const botonPrincipal =
  "type-boton inline-flex min-h-12 items-center justify-center rounded-md bg-azul px-6 py-3 text-on-azul transition-colors hover:bg-azul-hover";
const botonSecundario =
  "type-boton inline-flex min-h-12 items-center justify-center rounded-md border border-line-strong px-6 py-3 text-ink transition-colors hover:border-ink";

function Badge({ children, tono = "oliva" }: { children: React.ReactNode; tono?: "oliva" | "azul" }) {
  return (
    <span
      className={`type-etiqueta inline-flex items-center rounded-sm px-2 py-1 ${
        tono === "oliva" ? "bg-oliva-soft text-oliva-text" : "bg-azul-soft text-azul-text"
      }`}
    >
      {children}
    </span>
  );
}

const PROMESAS = [
  {
    titulo: "Todo en un solo lugar.",
    texto: "Eventos, clientes, invitados y cobros. Se acabaron las planillas sueltas y los mensajes perdidos.",
  },
  {
    titulo: "Con tu marca.",
    texto: "Tus clientes ven tu salón, tu logo y tus colores. Petra queda atrás, sin hacer ruido.",
  },
  {
    titulo: "Fácil de verdad.",
    texto:
      "Pensado para usar desde el celular, con letra clara y en castellano. Y si te trabás, te ayudamos por WhatsApp.",
  },
];

const HOY: { icono: LucideIcon; nombre: string; texto: string }[] = [
  {
    icono: CalendarDays,
    nombre: "Calendario de eventos",
    texto: "Todas tus fiestas del mes de un vistazo. Te avisa si dos eventos se pisan en el mismo espacio.",
  },
  {
    icono: ClipboardList,
    nombre: "Ficha y planificador",
    texto: "Fecha, horario, quién contrata y cada detalle de la fiesta, en tarjetas fáciles de completar.",
  },
  {
    icono: Users,
    nombre: "Invitados y mesas",
    texto: "La lista de invitados y el armado de mesas. Pegás la lista desde WhatsApp o Excel y listo.",
  },
  {
    icono: Link2,
    nombre: "Un link para tu cliente",
    texto: "Tu cliente carga a sus invitados y arma las mesas desde el celular, sin crearse una cuenta.",
  },
  {
    icono: Wallet,
    nombre: "Cobros y balance",
    texto: "Qué vendiste, qué cobraste y qué falta cobrar de cada fiesta, con colores claros.",
  },
  {
    icono: Smartphone,
    nombre: "Tu equipo, con PIN",
    texto: "Cada persona entra con su perfil y un PIN, y ve solo lo que le toca.",
  },
];

const PRONTO: { icono: LucideIcon; nombre: string }[] = [
  { icono: MailCheck, nombre: "Invitación digital con confirmación" },
  { icono: QrCode, nombre: "Buscador de mesa por QR" },
  { icono: ChefHat, nombre: "Menús especiales para la cocina" },
  { icono: Calculator, nombre: "Simulador de presupuesto" },
  { icono: Star, nombre: "Encuesta y reseña después de la fiesta" },
];

const PASOS = [
  {
    titulo: "Creá tu cuenta.",
    texto: "Con tu cuenta de Google, en un toque. No hay contraseña nueva para recordar.",
  },
  { titulo: "Contanos de tu salón.", texto: "El nombre y tu WhatsApp. Nada más." },
  { titulo: "Cargá tu primer evento.", texto: "Y empezá a ordenar tus fiestas desde hoy." },
];

const PREGUNTAS = [
  {
    p: "¿Cuánto cuesta?",
    r: "Empezás gratis, sin tarjeta. Cuando quieras las herramientas para tus clientes e invitados, pasás a un plan pago. Escribinos y te contamos.",
  },
  {
    p: "¿Mis clientes van a ver la marca Petra?",
    r: "No. Ven tu salón y tus colores. Petra aparece solo como un “Hecho con Petra” chiquito al pie.",
  },
  {
    p: "¿Necesito saber de computación?",
    r: "No. Si usás WhatsApp, podés usar Petra. Y si algo no te sale, nos escribís y te ayudamos.",
  },
  {
    p: "¿Mis datos y los de mis invitados están seguros?",
    r: "Sí. Cada salón ve solo lo suyo, y las listas de invitados no aparecen en buscadores.",
  },
];

function BotonesAcceso({ centrado = false }: { centrado?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${centrado ? "sm:justify-center" : ""}`}>
      <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
        Crear mi cuenta gratis
      </a>
      <a href={URL_ENTRAR} className={`${botonSecundario} w-full sm:w-auto`}>
        Entrar al sistema
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Cielo estrellado de fondo */}
      <Cielo />
      {/* Viñeta: oscurece los bordes del fondo */}
      <div aria-hidden="true" className="vineta pointer-events-none fixed inset-0 -z-10" />

      {/* 1. Encabezado */}
      <header className={`${contenedor} flex items-center justify-between gap-3 py-4`}>
        <a href="#" aria-label="Petra, inicio" className="rounded-md">
          <Firma variante="clara" />
        </a>
        <nav aria-label="Acceso" className="flex items-center gap-1 sm:gap-3">
          <a
            href={URL_ENTRAR}
            className="type-boton inline-flex min-h-11 items-center rounded-md px-3 text-azul-text underline-offset-4 hover:underline"
          >
            Entrar
          </a>
          <a href={URL_REGISTRARME} className={`${botonPrincipal} min-h-11 px-4`}>
            Registrarme
          </a>
        </nav>
      </header>

      <main className="flex flex-col gap-14 lg:gap-24">
        {/* 2. Hero */}
        <section className={`${contenedor} pt-10 md:pt-20 lg:pt-24`} aria-labelledby="titular">
          <div className="max-w-[720px]">
            <Badge>Para salones de eventos</Badge>
            <h1 id="titular" className="type-display mt-5 text-ink">
              Tu salón ordenado, sobre la roca.
            </h1>
            <p className="type-subtitulo mt-5 max-w-[620px] text-ink-muted">
              Petra es el sistema para organizar tus fiestas: calendario, invitados, mesas y cobros. Y herramientas
              para tus clientes, con la marca de tu salón.
            </p>
            <div className="mt-8">
              <BotonesAcceso />
              <p className="mt-3 text-[14px] leading-5 text-ink-muted">Gratis para empezar. Sin tarjeta.</p>
            </div>
          </div>
        </section>

        {/* 3. La promesa */}
        <section className={contenedor} aria-labelledby="promesa">
          <h2 id="promesa" className="type-titulo max-w-[640px] text-ink">
            Tu salón se luce. Vos te ahorrás el lío.
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
            {PROMESAS.map((item) => (
              <li key={item.titulo} className="border-t border-line pt-5">
                <h3 className="type-subtitulo text-ink">{item.titulo}</h3>
                <p className="type-cuerpo mt-2 text-ink-muted">{item.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Lo que ya hace */}
        <section className={contenedor} aria-labelledby="hoy">
          <h2 id="hoy" className="type-titulo max-w-[640px] text-ink">
            Lo que ya podés hacer con Petra
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {HOY.map(({ icono: Icono, nombre, texto }) => (
              <li key={nombre} className="flex flex-col rounded-lg border border-line bg-surface-raised p-6">
                <Icono size={24} strokeWidth={1.5} className="text-azul-text" aria-hidden="true" />
                <h3 className="type-subtitulo mt-5 text-ink">{nombre}</h3>
                <p className="type-cuerpo mt-2 text-ink-muted">{texto}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Lo que viene */}
        <section className={contenedor} aria-labelledby="pronto">
          <div className="rounded-lg border border-line bg-surface-raised/60 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id="pronto" className="type-titulo text-ink">
                Lo que viene
              </h2>
              <Badge tono="azul">Próximamente</Badge>
            </div>
            <p className="type-cuerpo mt-2 max-w-[620px] text-ink-muted">
              Herramientas para que tus clientes e invitados vivan la fiesta desde el celular.
            </p>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRONTO.map(({ icono: Icono, nombre }) => (
                <li key={nombre} className="type-cuerpo flex items-center gap-3 text-ink">
                  <Icono size={20} strokeWidth={1.5} className="shrink-0 text-oliva-text" aria-hidden="true" />
                  {nombre}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. Cómo se empieza */}
        <section className={contenedor} aria-labelledby="como-empezar">
          <h2 id="como-empezar" className="type-titulo text-ink">
            Empezás en un minuto
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
            {PASOS.map((paso, i) => (
              <li key={paso.titulo} className="flex gap-4 md:flex-col md:gap-3">
                <span aria-hidden="true" className="font-display text-[40px] leading-none font-medium text-azul-text">
                  {i + 1}
                </span>
                <div>
                  <h3 className="type-subtitulo text-ink">{paso.titulo}</h3>
                  <p className="type-cuerpo mt-1 text-ink-muted">{paso.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
              Crear mi cuenta gratis
            </a>
          </div>
        </section>

        {/* 7. Preguntas */}
        <section className={contenedor} aria-labelledby="preguntas">
          <h2 id="preguntas" className="type-titulo text-ink">
            Capaz te estás preguntando
          </h2>
          <div className="mt-8 max-w-[760px] border-t border-line">
            {PREGUNTAS.map((item) => (
              <details key={item.p} className="group border-b border-line">
                <summary className="type-subtitulo flex cursor-pointer items-center justify-between gap-4 rounded-md py-5 text-ink">
                  {item.p}
                  <ChevronDown
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0 text-azul-text transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="type-cuerpo pr-9 pb-5 text-ink-muted">{item.r}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 8. Acceso */}
        <section className={contenedor} aria-labelledby="titulo-acceso">
          <div className="mx-auto max-w-[640px] text-center">
            <Piedras variante="clara" className="mx-auto mb-6 h-auto w-14" />
            <div className="rounded-lg border border-line bg-surface-raised p-6 shadow-piedra sm:p-10">
              <h2 id="titulo-acceso" className="type-titulo text-ink">
                Probá Petra con tu salón
              </h2>
              <p className="type-subtitulo mt-2 mb-8 text-ink-muted">Gratis para empezar. Sin tarjeta.</p>
              <BotonesAcceso centrado />
              <a
                href={URL_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="type-boton mt-6 inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-oliva-text underline-offset-4 hover:underline"
              >
                <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
                ¿Preferís que te expliquemos? Escribinos por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 9. Cierre y pie */}
      <footer className="relative mt-14 overflow-hidden border-t border-line bg-noche text-ink lg:mt-24">
        <Cielo fijo={false} cantidad={90} semilla={21} conDestellos={false} />
        <div className={`${contenedor} relative py-14 lg:py-20`}>
          <p className="type-titulo max-w-[720px]">Tu salón sobre la roca.</p>
          <div className="mt-8">
            <BotonesAcceso />
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

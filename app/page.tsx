import Image from "next/image";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Ghost,
  HandCoins,
  MessageCircle,
  Moon,
  QrCode,
  Repeat,
  SlidersHorizontal,
  Star,
  Store,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import { Antetitulo, Encabezado, Separador } from "@/components/adornos";
import { CotizadorDemo } from "@/components/cotizador-demo";
import { Firma } from "@/components/logo";
import { PLANES } from "@/lib/catalogo";
import { SELECCION_INICIAL, fechaLarga, pesos, precioSugerido } from "@/lib/cotizador-demo";
import {
  URL_ENTRAR,
  URL_PRIVACIDAD,
  URL_REGISTRARME,
  URL_SOCIOS,
  URL_TERMINOS,
  URL_WHATSAPP,
  URL_WHATSAPP_COTIZADOR,
} from "@/lib/enlaces";
import { RESENAS, SALONES } from "@/lib/resenas";

const contenedor = "mx-auto w-full max-w-[1180px] px-4 md:px-8";
const botonPrincipal =
  "type-boton inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-azul px-6 py-3 text-[15px] text-on-azul shadow-piedra transition-colors hover:bg-azul-hover";
const botonSecundario =
  "type-boton inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line-strong px-6 py-3 text-[15px] text-ink transition-colors hover:border-ink";

// Aparecer al bajar: los que van uno al lado del otro entran apenas corridos (ver .aparecer en globals.css).
const DEMORAS = ["", "[--demora:12%]", "[--demora:24%]", "[--demora:36%]"];

// Las consultas de todos los días (de ejemplo): lo que el cotizador contesta solo.
const CONSULTAS = [
  { quien: "Caro", texto: "Hola! ¿Precio para un 15 de 120 personas?", hora: "23:47", nueva: true },
  { quien: "Martín", texto: "¿Tienen libre el sábado 13 de marzo?", hora: "23:52", nueva: true },
  { quien: "Vane", texto: "Info por privado porfa", hora: "00:15", nueva: true },
  { quien: "Lucas", texto: "¿Qué incluye el menú? ¿La barra es aparte?", hora: "00:31", nueva: true },
  { quien: "Sole", texto: "Ok, lo hablo y te aviso", hora: "Ayer", nueva: false },
];

// Lo que le pasa hoy al salón que cotiza a mano.
const DOLORES = [
  {
    icono: Repeat,
    titulo: "Contestás lo mismo una y otra vez",
    texto: "Precio, fecha libre, qué incluye. Todos los días, a cada persona.",
  },
  {
    icono: Moon,
    titulo: "La consulta llega de noche",
    texto: "Te escriben a las 23 y contestás a la mañana. Para entonces, ya preguntaron en otro salón.",
  },
  {
    icono: Ghost,
    titulo: "Mandás el PDF y no vuelven",
    texto: "Sin saber qué querían ni cuánto pensaban gastar.",
  },
];

const PASOS = [
  {
    icono: SlidersHorizontal,
    titulo: "Cargás lo que ofrecés",
    texto: "Tus espacios, menús, barra y extras, con tu precio. Lo cambiás cuando quieras.",
  },
  {
    icono: QrCode,
    titulo: "Compartís tu link",
    texto: "En la bio de Instagram, en WhatsApp o con un QR en el salón.",
  },
  {
    icono: MessageCircle,
    titulo: "Te llega el pedido armado",
    texto: "Fecha, invitados, lo que eligió y el precio sugerido. Si cierra, pasa a tu calendario.",
  },
];

// Las dos vistas del cotizador.
const VE_TU_CLIENTE = [
  "Arma su fiesta paso a paso, desde el celular",
  "Ve qué fechas tenés libres",
  "Ve el precio sugerido al instante",
  "Todo con tu marca, no la de Petra",
];
const MANEJAS_VOS = [
  "Qué ofrecés y a cuánto",
  "Recargos de sábado y fechas especiales",
  "Las cotizaciones ordenadas: nuevas, contactadas y ganadas",
  "De cotización a evento, con un toque",
];

// Lo que gana el salón.
const RAZONES = [
  {
    icono: Clock,
    titulo: "Respondés al instante",
    texto: "Tu cotizador contesta a cualquier hora, también de noche y los fines de semana.",
  },
  {
    icono: UserCheck,
    titulo: "Consultas que ya saben el precio",
    texto: "Te escriben con la fecha, los invitados y el presupuesto armado.",
  },
  {
    icono: HandCoins,
    titulo: "Más venta en cada fiesta",
    texto: "Los extras aparecen en el presupuesto y suman a cada evento.",
  },
];

// Lo que ya hace el sistema para organizar el salón.
const GESTION = [
  { icono: CalendarDays, texto: "Calendario con todas tus fiestas" },
  { icono: Wallet, texto: "Cobros y saldo de cada fiesta" },
  { icono: Users, texto: "Tu equipo, con su perfil y su PIN" },
  { icono: BellRing, texto: "Aviso cuando dos eventos se pisan" },
];

// Preguntas frecuentes. Si cambia algo del cotizador, revisar estas respuestas.
const PREGUNTAS = [
  {
    p: "¿Mis clientes ven la marca Petra?",
    r: "No. Ven el nombre, el logo y los colores de tu salón. Petra aparece solo como una firma chiquita al pie.",
  },
  {
    p: "¿El cliente puede reservar la fecha desde el cotizador?",
    r: "No. Ve qué fechas tenés libres y te manda el pedido. La fecha la confirmás vos, cuando cierran.",
  },
  {
    p: "¿Tengo que mostrar el precio de cada cosa?",
    r: "No. Tu cliente ve un precio sugerido total, no el detalle. Vos decidís qué entra y a cuánto.",
  },
  {
    p: "¿Ya puedo usar el cotizador?",
    r: "Lo estamos lanzando con los primeros salones. Creá tu cuenta gratis y escribinos por WhatsApp: te avisamos apenas esté listo para tu salón. Mientras tanto, ya podés ordenar tus eventos en el calendario.",
  },
  {
    p: "¿Cuánto cuesta?",
    r: "Empezás gratis y sin tarjeta. Cuando quieras sumar más, pasás de plan. Escribinos y te pasamos los precios.",
  },
  {
    p: "¿Necesito saber de tecnología?",
    r: "No. Cargás tus precios una vez, como en una planilla, y te ayudamos por WhatsApp en todo.",
  },
];

/** La bandeja de mensajes de un salón cualquiera un martes a la noche (decorativa). */
function Bandeja() {
  return (
    <div aria-hidden="true" className="aparecer relative mx-auto w-full max-w-[420px]">
      <span className="absolute -inset-x-4 -top-6 bottom-10 rounded-t-full border border-dorado/20 bg-linear-to-b from-dorado/10 to-transparent" />
      <div className="relative rounded-xl border border-line bg-surface-raised p-4 shadow-piedra sm:p-5">
        <div className="flex items-center justify-between px-1">
          <p className="font-display text-[20px] text-ink">Mensajes</p>
          <span className="rounded-full bg-dorado px-2 py-0.5 text-[11px] font-bold text-on-dorado">9 sin leer</span>
        </div>
        <ul className="mt-3 flex flex-col gap-1">
          {CONSULTAS.map((c) => (
            <li key={c.quien} className="flex items-center gap-3 rounded-md px-2 py-2.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-azul-soft font-display text-[16px] text-azul-text">
                {c.quien.charAt(0)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className={`text-[14px] ${c.nueva ? "font-semibold text-ink" : "text-ink-muted"}`}>{c.quien}</span>
                  <span className={`text-[11px] ${c.nueva ? "text-dorado" : "text-ink-muted"}`}>{c.hora}</span>
                </span>
                <span className="mt-0.5 flex items-center gap-2">
                  <span className={`truncate text-[13px] ${c.nueva ? "text-ink" : "text-ink-muted"}`}>{c.texto}</span>
                  {c.nueva && <span className="ml-auto size-2 shrink-0 rounded-full bg-dorado" />}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Así le llega al salón el pedido que armó el cliente en el cotizador (el mismo ejemplo de la demo). */
function PedidoQueLlega() {
  const s = SELECCION_INICIAL;
  return (
    <figure className="aparecer relative mx-auto w-full max-w-[400px]">
      <figcaption className="sr-only">Ejemplo del mensaje de WhatsApp que le llega al salón</figcaption>
      <div className="rounded-xl border border-line bg-surface p-4 shadow-piedra sm:p-5">
        <div className="flex items-center gap-3 border-b border-line pb-3">
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-full bg-dorado-soft font-display text-[15px] text-dorado"
          >
            L
          </span>
          <span>
            <span className="block text-[14px] font-semibold text-ink">Laura</span>
            <span className="block text-[11px] text-ink-muted">Desde tu cotizador</span>
          </span>
        </div>
        <div className="mt-4 max-w-[92%] rounded-[16px] rounded-tl-[4px] border border-line bg-surface-raised p-3.5 text-[14px] leading-6 text-ink">
          <p>Hola, soy Laura. Quiero presupuesto para un XV:</p>
          <ul className="mt-1.5 text-ink-muted">
            <li>· {fechaLarga(s.dia)}</li>
            <li>· {s.invitados} invitados</li>
            <li>· Menú Premium y barra clásica</li>
            <li>· Invitación digital y cámara instantánea</li>
          </ul>
          <p className="mt-1.5">
            Precio sugerido: <span className="font-semibold text-dorado">{pesos(precioSugerido(s))}</span>
          </p>
          <p className="mt-1.5">¿Qué formas de pago tienen?</p>
          <p className="mt-1 text-right text-[11px] text-ink-muted">23:48</p>
        </div>
      </div>
    </figure>
  );
}

/** Calendario de ejemplo para la sección de gestión (decorativo: diciembre de 2026 arranca un martes). */
function CalendarioEjemplo() {
  const fiestas = new Set([5, 11, 12, 19, 26]);
  const dias = [null, ...Array.from({ length: 31 }, (_, i) => i + 1)];
  return (
    <div aria-hidden="true" className="aparecer relative mx-auto w-full max-w-[400px]">
      <span className="absolute -inset-x-4 -top-6 bottom-10 rounded-t-full border border-dorado/20 bg-linear-to-b from-dorado/10 to-transparent" />
      <div className="relative rounded-xl border border-line bg-surface-raised p-5 shadow-piedra sm:p-6">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-[22px] text-ink">Diciembre</p>
          <p className="text-[12px] text-ink-muted">5 fiestas</p>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] text-ink-muted">
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
            <span key={i} className="pb-1 font-semibold">
              {d}
            </span>
          ))}
          {dias.map((d, i) => (
            <span
              key={i}
              className={`flex h-8 items-center justify-center rounded-md text-[12px] ${
                d && fiestas.has(d) ? "bg-dorado-soft font-semibold text-dorado ring-1 ring-dorado/50" : "text-ink-muted"
              }`}
            >
              {d}
            </span>
          ))}
        </div>
        <ul className="mt-5 flex flex-col gap-2 text-[13px]">
          <li className="flex items-center justify-between gap-3 rounded-md bg-surface px-3 py-2.5">
            <span className="text-ink">Sáb 12 · Casamiento</span>
            <span className="rounded-sm bg-oliva-soft px-2 py-0.5 text-[11px] font-semibold text-oliva-text">Cobrado</span>
          </li>
          <li className="flex items-center justify-between gap-3 rounded-md bg-surface px-3 py-2.5">
            <span className="text-ink">Sáb 19 · XV años</span>
            <span className="rounded-sm bg-dorado-soft px-2 py-0.5 text-[11px] font-semibold text-dorado">Falta cobrar</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

/** Los dos botones de siempre: crear la cuenta y pedir el cotizador por WhatsApp. */
function Acciones({ centrado = false }: { centrado?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${centrado ? "justify-center" : ""}`}>
      <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
        Crear mi cuenta gratis
        <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
      </a>
      <a
        href={URL_WHATSAPP_COTIZADOR}
        target="_blank"
        rel="noopener noreferrer"
        className={`${botonSecundario} w-full sm:w-auto`}
      >
        <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
        Quiero el cotizador
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Encabezado fijo: registrarse o entrar */}
      <header className="sticky top-0 z-20 border-b border-line bg-surface/85 backdrop-blur">
        <div className={`${contenedor} flex min-h-15 items-center justify-between gap-3`}>
          <a href="#" aria-label="Petra, inicio" className="rounded-md">
            <Firma variante="clara" />
          </a>
          <nav aria-label="Secciones" className="hidden items-center gap-7 text-[14px] text-ink-muted lg:flex">
            <a href="#como-funciona" className="hover:text-ink">
              Cómo funciona
            </a>
            <a href="#planes" className="hover:text-ink">
              Planes
            </a>
            <a href="#preguntas" className="hover:text-ink">
              Preguntas
            </a>
          </nav>
          <div className="flex items-center gap-1 sm:gap-3">
            <a
              href={URL_ENTRAR}
              className="type-boton inline-flex min-h-10 items-center rounded-md px-3 text-[14px] text-ink underline-offset-4 hover:underline"
            >
              Iniciar sesión
            </a>
            <a
              href={URL_REGISTRARME}
              className="type-boton inline-flex min-h-10 items-center rounded-md bg-azul px-4 text-[14px] text-on-azul transition-colors hover:bg-azul-hover"
            >
              Registrarse
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 1. La promesa y la demo del cotizador */}
        <section
          id="cotizador"
          className={`${contenedor} scroll-mt-20 pt-12 pb-20 md:pt-16 lg:pt-8 lg:pb-28`}
          aria-labelledby="titular"
        >
          {/* En la compu: texto y botones a la izquierda; el celular a la derecha.
              En pantallas bajas (notebooks) van arriba los dos: el celular es más alto que la pantalla
              y, centrado, dejaba un hueco grande arriba del título. En pantallas altas, centrados. */}
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-16 xl:gap-x-24 [@media(min-width:64rem)_and_(max-height:53.99rem)]:items-start [@media(min-width:64rem)_and_(min-height:54rem)]:items-center">
            <div className="max-w-[640px] [@media(min-width:64rem)_and_(max-height:53.99rem)]:pt-14">
              <Antetitulo>Cotizador para salones de eventos</Antetitulo>
              <h1 id="titular" className="type-display mt-5 text-balance text-ink">
                Respondé primero, <span className="text-dorado">gestioná más fiestas.</span>
              </h1>
              <p className="mt-5 max-w-[560px] text-[17px] leading-7 text-ink-muted">
                Generá un link para que tus clientes coticen su evento las 24 horas.
              </p>
              <div className="mt-8">
                <Acciones />
              </div>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-muted">
                {["Gratis para empezar", "Sin tarjeta", "Con tu marca"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Check size={14} strokeWidth={2.4} className="text-dorado" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-dorado/40 bg-dorado-soft px-3 py-1.5 text-[13px] text-ink">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-dorado" />
                Lanzamiento: sumate a los primeros salones.
              </p>
            </div>
            <div className="mt-16 lg:mt-0 lg:pr-10">
              <CotizadorDemo />
            </div>
          </div>
        </section>

        <Separador />

        {/* 2. El problema: cotizar a mano, por mensaje */}
        <section id="problema" className={`${contenedor} scroll-mt-20 py-20 lg:py-28`} aria-labelledby="titulo-problema">
          {/* grid-cols-1: así los mensajes largos de la bandeja se cortan en vez de ensanchar la página. */}
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Encabezado
                id="titulo-problema"
                ante="¿Te suena?"
                titulo={
                  <>
                    Contestar «¿precio?» todo el día <span className="text-dorado">no es vender.</span>
                  </>
                }
              />
              <ul className="mt-8 flex flex-col gap-5">
                {DOLORES.map(({ icono: Icono, titulo, texto }) => (
                  <li key={titulo} className="aparecer flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-line bg-surface-raised text-dorado">
                      <Icono size={18} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="type-subtitulo block text-ink">{titulo}</span>
                      <span className="type-cuerpo block text-ink-muted">{texto}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Bandeja />
          </div>

          {/* El dato que lo explica, con su fuente */}
          <figure className="aparecer mt-16 flex flex-col gap-5 rounded-xl border border-dorado/40 bg-linear-to-br from-dorado-soft to-surface-raised p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8 lg:mx-auto lg:max-w-[960px]">
            <p className="shrink-0 font-display text-[64px] leading-none text-dorado sm:text-[80px]">7×</p>
            <div>
              <blockquote className="text-[17px] leading-7 text-ink">
                Las empresas que responden una consulta dentro de la primera hora tienen casi 7 veces más chances de
                concretar una charla con el cliente que las que tardan una hora más.
              </blockquote>
              <p className="type-cuerpo mt-2 text-ink-muted">Con el cotizador, tu cliente tiene su respuesta en el momento.</p>
              <figcaption className="mt-4">
                <a
                  href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  Fuente: Harvard Business Review, «The Short Life of Online Sales Leads», 2011 · EE. UU.
                </a>
              </figcaption>
            </div>
          </figure>
        </section>

        {/* 3. Cómo funciona: tres pasos y el pedido que llega */}
        <section
          id="como-funciona"
          className="relative scroll-mt-20 overflow-hidden border-y border-line bg-noche/60 py-20 lg:py-28"
          aria-labelledby="titulo-como"
        >
          {/* Dos luces suaves de la marca de fondo (decorativas): dorado y azul. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <span className="absolute -top-32 -left-24 size-96 rounded-full bg-dorado/10 blur-3xl" />
            <span className="absolute -right-24 -bottom-32 size-96 rounded-full bg-azul/15 blur-3xl" />
          </div>
          <div className={`${contenedor} relative`}>
            <Encabezado
              id="titulo-como"
              ante="Cómo funciona"
              centrado
              titulo={
                <>
                  Tres pasos y <span className="text-dorado">tu salón cotiza solo.</span>
                </>
              }
            />
            <ol className="mt-14 grid gap-10 text-center md:grid-cols-3 md:gap-8 lg:mx-auto lg:max-w-[1000px]">
              {PASOS.map(({ icono: Icono, titulo, texto }, i) => (
                <li key={titulo} className={`aparecer flex flex-col items-center ${DEMORAS[i]}`}>
                  {/* Ícono dentro de un arco, como la columna del logo */}
                  <span className="relative flex h-16 w-13 items-end justify-center rounded-t-full border border-dorado/40 bg-dorado-soft pb-3 text-dorado">
                    <Icono size={22} strokeWidth={1.7} aria-hidden="true" />
                    <span className="absolute -top-2 -right-3 flex size-6 items-center justify-center rounded-full bg-dorado text-[12px] font-bold text-on-dorado">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-5 font-display text-[22px] leading-7 text-ink">{titulo}</h3>
                  <p className="type-cuerpo mt-2 max-w-[300px] text-ink-muted">{texto}</p>
                </li>
              ))}
            </ol>

            <div className="aparecer mt-20 grid items-center gap-10 rounded-xl border border-line bg-surface-raised/60 p-6 sm:p-10 lg:mx-auto lg:max-w-[1000px] lg:grid-cols-2 lg:gap-16">
              <div>
                <Antetitulo>Te llega así</Antetitulo>
                <h3 className="mt-4 font-display text-[26px] leading-8 text-ink lg:text-[30px] lg:leading-9">
                  Un pedido con todo, <span className="text-dorado">listo para cerrar.</span>
                </h3>
                <p className="type-cuerpo mt-3 text-ink-muted">
                  Sabés qué festejan, para cuándo, cuántos son y cuánto piensan gastar. Contestás una vez y vas directo a
                  la seña.
                </p>
              </div>
              <PedidoQueLlega />
            </div>
          </div>
        </section>

        {/* 4. Las dos vistas: lo que ve el cliente y lo que maneja el salón */}
        <section id="vistas" className={`${contenedor} scroll-mt-20 py-20 lg:py-28`} aria-labelledby="titulo-vistas">
          <Encabezado
            id="titulo-vistas"
            ante="Dos vistas"
            centrado
            titulo={
              <>
                Tu cliente arma su fiesta. <span className="text-dorado">Vos manejás todo.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5 lg:mx-auto lg:max-w-[960px]">
            <div className="aparecer rounded-xl border border-line bg-surface-raised p-6 sm:p-8">
              <p className="type-etiqueta text-azul-text">Lo que ve tu cliente</p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {VE_TU_CLIENTE.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] leading-6 text-ink">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-azul text-on-azul">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="aparecer rounded-xl border border-dorado/60 bg-linear-to-br from-dorado-soft to-surface-raised p-6 shadow-[0_24px_60px_-28px_#d4b06a66] [--demora:12%] sm:p-8">
              <p className="type-etiqueta text-dorado">Lo que manejás vos</p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {MANEJAS_VOS.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] leading-6 text-ink">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-dorado text-on-dorado">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="mt-16 grid gap-10 text-center md:grid-cols-3 md:gap-8 lg:mx-auto lg:max-w-[960px]">
            {RAZONES.map(({ icono: Icono, titulo, texto }, i) => (
              <li key={titulo} className={`aparecer flex flex-col items-center ${DEMORAS[i]}`}>
                <span className="flex h-16 w-13 items-end justify-center rounded-t-full border border-dorado/40 bg-dorado-soft pb-3 text-dorado">
                  <Icono size={22} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[22px] leading-7 text-ink">{titulo}</h3>
                <p className="type-cuerpo mt-2 max-w-[300px] text-ink-muted">{texto}</p>
              </li>
            ))}
          </ul>
        </section>

        <Separador />

        {/* 5. Cuando cierra: la fiesta sigue en el panel */}
        <section id="gestion" className={`${contenedor} scroll-mt-20 py-20 lg:py-28`} aria-labelledby="titulo-gestion">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Encabezado
                id="titulo-gestion"
                ante="Y cuando cierra"
                titulo={
                  <>
                    Del presupuesto a la fiesta, <span className="text-dorado">en tu panel.</span>
                  </>
                }
                texto="La cotización ganada pasa a tu calendario. Después, los cobros, tu equipo y cada detalle, ordenados en un solo lugar."
              />
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {GESTION.map(({ icono: Icono, texto }, i) => (
                  <li
                    key={texto}
                    className={`aparecer flex items-center gap-3 rounded-lg border border-line bg-surface-raised p-4 text-[15px] leading-5 text-ink ${DEMORAS[i % 2]}`}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-azul-soft text-azul-text">
                      <Icono size={18} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    {texto}
                  </li>
                ))}
              </ul>
            </div>
            <CalendarioEjemplo />
          </div>
        </section>

        <Separador />

        {/* 6. Planes */}
        <section id="planes" className={`${contenedor} scroll-mt-20 py-20 lg:py-28`} aria-labelledby="titulo-planes">
          <Encabezado
            id="titulo-planes"
            ante="Planes"
            centrado
            titulo="Elegí el plan para tu salón"
            texto="Empezás gratis, sin tarjeta, y pasás de plan cuando quieras. No perdés nada de lo que cargaste."
          />
          <ul className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {PLANES.map((plan, i) => (
              <li
                key={plan.nombre}
                className={`aparecer relative flex flex-col rounded-xl border p-6 sm:p-7 ${DEMORAS[i]} ${
                  plan.destacado
                    ? "border-dorado/70 bg-linear-to-b from-dorado-soft to-surface-raised shadow-[0_30px_70px_-30px_#d4b06a59]"
                    : "border-line bg-surface-raised shadow-piedra"
                }`}
              >
                {plan.destacado && (
                  <span className="type-etiqueta absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-dorado px-3 py-1 text-on-dorado">
                    Recomendado
                  </span>
                )}
                <h3 className="font-display text-[28px] leading-9 text-ink">{plan.nombre}</h3>
                <p className="type-cuerpo mt-1 text-ink-muted">{plan.lema}</p>
                <span aria-hidden="true" className="mt-6 h-px bg-linear-to-r from-dorado/40 to-transparent" />
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.trae.map((t) => (
                    <li key={t} className="type-cuerpo flex items-start gap-2.5 text-ink">
                      <Check size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-dorado" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <a href={URL_REGISTRARME} className={`${plan.destacado ? botonPrincipal : botonSecundario} mt-8 w-full`}>
                  Empezar gratis
                </a>
                <a
                  href={URL_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-center text-[14px] text-dorado underline-offset-4 hover:underline"
                >
                  Consultar precio
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-[14px] text-ink-muted">
            ¿Querés que gestionemos todo tu salón?{" "}
            <a
              href={URL_SOCIOS}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-dorado underline-offset-4 hover:underline"
            >
              Sé parte de los socios de Petra
            </a>
          </p>
        </section>

        <Separador />

        {/* 7. Preguntas frecuentes (se abren sin JavaScript) */}
        <section id="preguntas" className={`${contenedor} scroll-mt-20 py-20 lg:py-28`} aria-labelledby="titulo-preguntas">
          <Encabezado id="titulo-preguntas" ante="Preguntas" centrado titulo="Preguntas frecuentes" />
          <div className="mt-12 flex flex-col gap-3 lg:mx-auto lg:max-w-[760px]">
            {PREGUNTAS.map(({ p, r }) => (
              <details
                key={p}
                className="group aparecer rounded-lg border border-line bg-surface-raised px-5 transition-colors open:border-dorado/50"
              >
                <summary className="flex min-h-14 items-center justify-between gap-4 py-4 text-[16px] leading-6 font-semibold text-ink">
                  {p}
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    className="shrink-0 text-dorado transition-transform group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="type-cuerpo pb-5 text-ink-muted">{r}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 8. Cierre: reseñas (cuando haya), la invitación a sumarse y quién está detrás */}
        <section
          id="salones"
          className="relative scroll-mt-20 overflow-hidden border-t border-line bg-noche/60 py-20 lg:py-28"
          aria-labelledby="titulo-cierre"
        >
          <div className={contenedor}>
            {RESENAS.length > 0 && (
              <div className="mb-20">
                <Encabezado id="titulo-resenas" ante="Salones" centrado titulo="Lo que dicen los salones" />
                <ul className="mt-10 grid gap-5 md:grid-cols-3">
                  {RESENAS.map((r) => (
                    <li
                      key={`${r.nombre}-${r.salon}`}
                      className="flex flex-col rounded-xl border border-line bg-surface-raised p-6"
                    >
                      <div className="flex gap-1 text-dorado" aria-hidden="true">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                        ))}
                      </div>
                      <blockquote className="type-cuerpo mt-4 flex-1 text-ink">“{r.texto}”</blockquote>
                      <p className="mt-5 text-[14px] font-semibold text-ink">{r.nombre}</p>
                      <p className="text-[13px] text-ink-muted">
                        {r.salon}
                        {r.ciudad ? ` · ${r.ciudad}` : ""}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Un arco, como la entrada de un salón */}
            <div className="aparecer relative mx-auto max-w-[760px] rounded-t-full border border-dorado/30 bg-linear-to-b from-dorado/10 via-surface-raised/40 to-surface-raised/70 px-6 pt-24 pb-10 text-center sm:px-12 sm:pt-32 sm:pb-12">
              <Antetitulo centrado>Tu salón sobre la roca</Antetitulo>
              <h2 id="titulo-cierre" className="type-titulo mt-5 text-balance text-ink">
                Mientras vos hacés la fiesta, <span className="text-dorado">tu salón cotiza.</span>
              </h2>
              <p className="type-cuerpo mx-auto mt-3 max-w-[460px] text-ink-muted">
                Estamos sumando a los primeros salones. Creá tu cuenta gratis y sé de los primeros en usar el cotizador.
              </p>
              <div className="mt-8">
                <Acciones centrado />
              </div>
              <figure className="mx-auto mt-10 flex max-w-[480px] items-center gap-4 border-t border-line pt-8 text-left">
                <Image
                  src="/rodrigo-torres.jpg"
                  alt="Rodrigo Torres, creador de Petra"
                  width={403}
                  height={449}
                  sizes="72px"
                  className="h-20 w-16 shrink-0 rounded-t-full border border-dorado/60 object-cover object-top"
                />
                <div>
                  <blockquote className="font-display text-[17px] leading-6 text-ink">
                    “Creé Petra para que cada salón pueda ofrecer una experiencia completa.”
                  </blockquote>
                  <figcaption className="mt-1.5 text-[13px] text-ink-muted">
                    <span className="font-semibold text-dorado">Rodrigo Torres</span> · Creador de Petra
                  </figcaption>
                </div>
              </figure>
            </div>

            {SALONES.length > 0 && (
              <div className="mt-14">
                <p className="type-etiqueta text-center text-ink-muted">Salones que ya trabajan con Petra</p>
                <ul className="mt-5 flex flex-wrap justify-center gap-3">
                  {SALONES.map((s) => (
                    <li
                      key={s}
                      className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-surface-raised px-4 font-display text-[18px] text-ink"
                    >
                      <Store size={16} strokeWidth={1.8} className="text-dorado" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Pie */}
      <footer className="border-t border-line bg-noche">
        <div
          className={`${contenedor} flex flex-col gap-4 py-8 text-[13px] text-ink-muted sm:flex-row sm:items-center sm:justify-between`}
        >
          <div className="flex flex-col gap-1.5">
            <Firma variante="clara" />
            <span className="font-display text-[14px] text-ink-muted">Tu salón sobre la roca</span>
          </div>
          <nav aria-label="Contacto y legales" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              WhatsApp
            </a>
            <a href="mailto:hola@petraeventos.com" className="hover:text-ink">
              hola@petraeventos.com
            </a>
            <a href={URL_TERMINOS} className="hover:text-ink">
              Términos
            </a>
            <a href={URL_PRIVACIDAD} className="hover:text-ink">
              Privacidad
            </a>
            <span>© 2026 Petra</span>
          </nav>
        </div>
      </footer>
    </>
  );
}

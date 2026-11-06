import Image from "next/image";
import {
  Bell,
  Briefcase,
  CalendarCheck,
  CalendarX,
  Cake,
  Check,
  ChevronDown,
  Clock,
  Crown,
  FileText,
  Heart,
  MessageCircle,
  Moon,
  Palette,
  Repeat,
  ShieldCheck,
  Star,
  Store,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { CotizadorDemo } from "@/components/cotizador-demo";
import { Historia } from "@/components/historia";
import { Firma } from "@/components/logo";
import { PanelEjemplo } from "@/components/panel-ejemplo";
import { PLANES } from "@/lib/catalogo";
import { URL_EJEMPLO, URL_ENTRAR, URL_PRIVACIDAD, URL_REGISTRARME, URL_SOCIOS, URL_TERMINOS, URL_WHATSAPP } from "@/lib/enlaces";
import { RESENAS, SALONES } from "@/lib/resenas";

// La estructura y el estilo se basan en Launch UI (MIT): ver licencias/launch-ui.md.
const contenedor = "mx-auto w-full max-w-[1180px] px-5 md:px-8";
const seccion = "scroll-mt-20 border-b border-white/8 py-20 sm:py-28";
const vidrio = "rounded-2xl border border-white/10 bg-linear-to-b from-white/6 to-white/1";

// La acción de toda la página: una sola, con el mismo nombre en todos lados.
const ACCION = "Armá tu cotizador gratis";
const botonPrincipal =
  "inline-flex min-h-11 items-center justify-center rounded-lg bg-linear-to-b from-white to-crema-claro px-6 text-[15px] font-semibold text-noche shadow-md transition-opacity hover:opacity-90";
const botonSecundario =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-linear-to-b from-white/12 to-white/4 px-6 text-[15px] font-semibold text-ink transition-colors hover:from-white/18";

const FIESTAS = [
  { icono: Crown, nombre: "XV años" },
  { icono: Heart, nombre: "Casamientos" },
  { icono: Cake, nombre: "Cumpleaños" },
  { icono: Briefcase, nombre: "Empresariales" },
];

// Lo que le pasa hoy al salón que cotiza a mano.
const DOLORES = [
  { icono: Repeat, titulo: "Contestás lo mismo una y otra vez", texto: "Precio, fecha libre, qué incluye. Todos los días, a cada persona." },
  { icono: Moon, titulo: "La consulta llega de noche", texto: "Te escriben a las 23 y contestás a la mañana. Para entonces, ya preguntaron en otro salón." },
  { icono: FileText, titulo: "Mandás el PDF y no vuelven", texto: "Sin saber qué querían ni cuánto pensaban gastar." },
];

// Las consultas de todos los días (de ejemplo): lo que el cotizador contesta solo.
const CONSULTAS = [
  { quien: "Caro", texto: "Hola! ¿Precio para un 15 de 120 personas?", hora: "23:47" },
  { quien: "Martín", texto: "¿Tienen libre el sábado 13 de marzo?", hora: "23:52" },
  { quien: "Vane", texto: "Info por privado porfa", hora: "00:15" },
  { quien: "Lucas", texto: "¿Qué incluye el menú? ¿La barra es aparte?", hora: "00:31" },
];

const VE_TU_CLIENTE = ["Arma su fiesta paso a paso, desde el celular", "Ve qué fechas tenés libres", "Ve el precio sugerido al instante", "Todo con tu marca, no la de Petra"];
const MANEJAS_VOS = ["Qué ofrecés y a cuánto", "Recargos de sábado y fechas especiales", "Las cotizaciones ordenadas: nuevas, contactadas y ganadas", "De cotización a evento, con un toque"];

const BENEFICIOS = [
  { icono: Clock, titulo: "Respondés al instante", texto: "Tu cotizador contesta a cualquier hora, también de noche y los fines de semana." },
  { icono: MessageCircle, titulo: "Consultas que saben el precio", texto: "Te escriben con la fecha, los invitados y el presupuesto armado." },
  { icono: CalendarX, titulo: "Sin fechas ocupadas", texto: "Tu cliente ve qué días tenés libres. La fecha la confirmás vos, cuando cierran." },
  { icono: TrendingUp, titulo: "Más venta en cada fiesta", texto: "Los extras aparecen en el presupuesto y suman a cada evento." },
  { icono: CalendarCheck, titulo: "Del pedido al calendario", texto: "La cotización ganada pasa a tu calendario con un toque." },
  { icono: Wallet, titulo: "Cobros al día", texto: "La seña, las cuotas y lo que falta cobrar de cada fiesta." },
  { icono: Bell, titulo: "Avisos a tiempo", texto: "Petra te avisa cuando dos eventos se pisan." },
  { icono: Palette, titulo: "Con tu marca", texto: "Tu cliente ve tu nombre, tu logo y tus colores." },
  { icono: ShieldCheck, titulo: "Tus datos son tuyos", texto: "Ningún otro salón los ve, y tu cliente nunca ve tus costos." },
];

// Preguntas frecuentes. Si cambia algo del cotizador, revisar estas respuestas.
const PREGUNTAS = [
  { p: "¿Ya puedo usar el cotizador?", r: "Sí. Creás tu cuenta gratis, subís tu PDF de promos o cargás tus precios, y ya tenés tu link para compartir. Si te trabás, te ayudamos por WhatsApp." },
  { p: "¿Mis clientes ven la marca Petra?", r: "No. Ven el nombre, el logo y los colores de tu salón. Petra aparece solo como una firma chiquita al pie." },
  { p: "¿El cliente puede reservar la fecha desde el cotizador?", r: "No. Ve qué fechas tenés libres y te manda el pedido. La fecha la confirmás vos, cuando cierran." },
  { p: "¿Tengo que mostrar el precio de cada cosa?", r: "No. Tu cliente ve un precio sugerido total, no el detalle. Vos decidís qué entra y a cuánto." },
  { p: "¿Quién ve mis precios y mis costos?", r: "Tus precios los ve tu cliente en tu link. Tus costos y tu ganancia no los ve nadie de afuera, y ningún otro salón entra a tus datos." },
  { p: "¿Cuánto cuesta?", r: "Empezás gratis y sin tarjeta. Cuando quieras sumar más, pasás de plan. Escribinos y te pasamos los precios." },
  { p: "¿Necesito saber de tecnología?", r: "No. Subís tu PDF o cargás tus precios como en una planilla, y te ayudamos por WhatsApp en todo." },
];

/** La luz azul de la marca, detrás de lo importante. */
function Luz({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 ${className}`}>
      <div className="absolute left-1/2 h-[256px] w-[70%] -translate-x-1/2 scale-[2] rounded-[50%] bg-radial from-azul/45 from-10% to-azul/0 to-60% sm:h-[420px]" />
      <div className="absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[1.6] rounded-[50%] bg-radial from-azul-text/30 from-10% to-azul-text/0 to-60% sm:h-[220px]" />
    </div>
  );
}

function Bandeja() {
  return (
    <div aria-hidden="true" className={`${vidrio} w-full p-5 shadow-2xl`}>
      <div className="flex items-center justify-between px-1">
        <p className="text-[17px] font-bold tracking-tight text-ink">Mensajes</p>
        <p className="rounded-full bg-azul px-2.5 py-0.5 text-[12px] font-semibold text-on-azul">4 sin leer</p>
      </div>
      <ul className="mt-3 flex flex-col">
        {CONSULTAS.map((c) => (
          <li key={c.quien} className="flex items-center gap-3 py-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/8 text-[14px] font-semibold text-ink">{c.quien.charAt(0)}</span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-[14px] font-semibold text-ink">{c.quien}</span>
                <span className="text-[12px] text-ink-muted tabular-nums">{c.hora}</span>
              </span>
              <span className="mt-0.5 block truncate text-[14px] text-ink-muted">{c.texto}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Lista({ titulo, items }: { titulo: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-[17px] font-bold tracking-tight text-ink">{titulo}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-[15px] leading-6 text-ink-muted">
            <Check size={18} strokeWidth={2.2} className="mt-0.5 shrink-0 text-azul-text" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Las dos líneas punteadas a los costados */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="mx-auto hidden h-full max-w-[1180px] border-x border-dashed border-white/6 lg:block" />
      </div>

      <header className="sticky top-0 z-20 border-b border-white/8 bg-surface/70 backdrop-blur-xl">
        <div className={`${contenedor} flex min-h-16 items-center justify-between gap-3`}>
          <a href="#" aria-label="Petra, inicio" className="rounded-md">
            <Firma variante="clara" />
          </a>
          <nav aria-label="Secciones" className="hidden items-center gap-7 text-[14px] font-medium text-ink-muted lg:flex">
            <a href="#como-funciona" className="hover:text-ink">Cómo funciona</a>
            <a href="#probalo" className="hover:text-ink">Probalo</a>
            <a href="#planes" className="hover:text-ink">Planes</a>
            <a href="#preguntas" className="hover:text-ink">Preguntas</a>
          </nav>
          <div className="flex items-center gap-1 sm:gap-3">
            <a href={URL_ENTRAR} className="inline-flex min-h-10 items-center rounded-lg px-3 text-[14px] font-semibold text-ink hover:underline hover:underline-offset-4">
              Entrar
            </a>
            <a href={URL_REGISTRARME} className="inline-flex min-h-10 items-center rounded-lg bg-linear-to-b from-white to-crema-claro px-4 text-[14px] font-semibold text-noche transition-opacity hover:opacity-90">
              <span className="sm:hidden">Empezar gratis</span>
              <span className="hidden sm:inline">{ACCION}</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* 1. La promesa y el panel */}
        <section aria-labelledby="titular" className="overflow-hidden border-b border-white/8 pt-16 sm:pt-24">
          <div className={`${contenedor} fundir-abajo flex flex-col items-center text-center`}>
            <a href={URL_REGISTRARME} className="aparecer inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] font-semibold text-ink-muted transition-colors hover:text-ink">
              Sumate a los primeros salones
            </a>
            <h1 id="titular" className="aparecer titulo-degrade type-display mt-7 max-w-[960px] pb-2 text-balance [--orden:0.08s]">
              <span className="block">Respondé primero,</span> <span className="block">gestioná más fiestas.</span>
            </h1>
            <p className="aparecer mt-5 max-w-[620px] text-[17px] leading-7 font-medium text-balance text-ink-muted [--orden:0.16s] sm:text-[20px] sm:leading-8">
              Tus clientes cotizan su evento las 24 horas, desde un link con tu marca. A vos te llega el pedido armado.
            </p>
            <div className="aparecer relative z-20 mt-8 flex w-full flex-col justify-center gap-3 [--orden:0.24s] sm:w-auto sm:flex-row">
              <a href={URL_REGISTRARME} className={botonPrincipal}>
                {ACCION}
              </a>
              <a href={URL_EJEMPLO} target="_blank" rel="noopener noreferrer" className={botonSecundario}>
                Ver un cotizador de ejemplo
              </a>
            </div>
            <div className="aparecer relative mt-14 w-full [--orden:0.36s] sm:mt-20">
              <Luz className="-top-16" />
              <div className="relative z-10 rounded-2xl bg-white/6 p-2">
                <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                  <PanelEjemplo />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Para qué fiestas */}
        <section aria-label="Tipos de fiesta" className="border-b border-white/8 py-10">
          <ul className={`${contenedor} grid grid-cols-2 gap-6 text-ink-muted sm:flex sm:items-center sm:justify-between`}>
            <li className="col-span-2 text-[14px] font-semibold sm:col-span-1">Para cada fiesta de tu salón</li>
            {FIESTAS.map(({ icono: Icono, nombre }) => (
              <li key={nombre} className="flex items-center gap-2 text-[16px] font-semibold">
                <Icono size={18} strokeWidth={1.8} aria-hidden="true" />
                {nombre}
              </li>
            ))}
          </ul>
        </section>

        {/* 3. El problema */}
        <section id="problema" className={seccion} aria-labelledby="titulo-problema">
          <div className={`${contenedor} grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-20`}>
            <div>
              <h2 id="titulo-problema" className="type-titulo text-balance text-ink">
                Contestar «¿precio?» todo el día no es vender.
              </h2>
              <ul className="mt-10 flex flex-col gap-7">
                {DOLORES.map(({ icono: Icono, titulo, texto }) => (
                  <li key={titulo} className="flex gap-4">
                    <Icono size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-azul-text" aria-hidden="true" />
                    <span>
                      <span className="block text-[17px] font-semibold text-ink">{titulo}</span>
                      <span className="mt-1 block text-[15px] leading-6 text-ink-muted">{texto}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Bandeja />
          </div>
        </section>

        {/* 4. Cómo funciona */}
        <section id="como-funciona" className={seccion} aria-labelledby="titulo-como">
          <div className={contenedor}>
            <h2 id="titulo-como" className="type-titulo mx-auto max-w-[720px] text-center text-balance text-ink">
              Ese PDF que mandás y no vuelve, ahora cotiza solo.
            </h2>
            <div className="mt-14 lg:mt-8">
              <Historia />
            </div>
          </div>
        </section>

        {/* 5. La demo */}
        <section id="probalo" className={`${seccion} relative overflow-hidden`} aria-labelledby="titulo-probalo">
          <div className={`${contenedor} relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-24`}>
            <div>
              <h2 id="titulo-probalo" className="type-titulo text-balance text-ink">
                Tu cliente arma su fiesta. Vos manejás todo.
              </h2>
              <p className="mt-5 max-w-[520px] text-[18px] leading-7 text-ink-muted">Tocá el celular: es la misma cuenta que hace tu cliente, con precios de ejemplo.</p>
              <div className="mt-10 grid gap-10 sm:grid-cols-2">
                <Lista titulo="Lo que ve tu cliente" items={VE_TU_CLIENTE} />
                <Lista titulo="Lo que manejás vos" items={MANEJAS_VOS} />
              </div>
            </div>
            <div className="relative text-ink-muted">
              <Luz className="top-20" />
              <div className="relative z-10">
                <CotizadorDemo />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Todo lo que trae */}
        <section id="beneficios" className={seccion} aria-labelledby="titulo-beneficios">
          <div className={contenedor}>
            <h2 id="titulo-beneficios" className="type-titulo mx-auto max-w-[640px] text-center text-balance text-ink">
              Lo que necesita tu salón, sin vueltas.
            </h2>
            <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFICIOS.map(({ icono: Icono, titulo, texto }) => (
                <li key={titulo} className="flex flex-col gap-3 sm:p-3">
                  <Icono size={22} strokeWidth={1.5} className="text-azul-text" aria-hidden="true" />
                  <h3 className="text-[16px] font-semibold tracking-tight text-ink">{titulo}</h3>
                  <p className="max-w-[320px] text-[15px] leading-6 text-ink-muted">{texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Planes (sin precios: todavía no están confirmados) */}
        <section id="planes" className={seccion} aria-labelledby="titulo-planes">
          <div className={contenedor}>
            <div className="mx-auto max-w-[640px] text-center">
              <h2 id="titulo-planes" className="type-titulo text-balance text-ink">
                Empezás gratis. Sumás cuando quieras.
              </h2>
              <p className="mt-4 text-[18px] leading-7 text-ink-muted">Sin tarjeta, y no perdés nada de lo que cargaste al pasar de plan.</p>
            </div>
            <ul className="mt-14 grid gap-5 lg:grid-cols-3">
              {PLANES.map((plan) => (
                <li key={plan.nombre} className={`relative flex flex-col overflow-hidden p-7 shadow-xl ${vidrio} ${plan.destacado ? "border-azul/50 from-azul/18" : ""}`}>
                  <h3 className="flex items-center justify-between gap-3 text-[22px] font-bold tracking-tight text-ink">
                    {plan.nombre}
                    {plan.destacado && <span className="rounded-full bg-azul px-2.5 py-0.5 text-[12px] font-semibold tracking-normal text-on-azul">Recomendado</span>}
                  </h3>
                  <p className="mt-2 text-[15px] leading-6 text-ink-muted">{plan.lema}</p>
                  <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-white/10 pt-6">
                    {plan.trae.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-[15px] leading-6 text-ink">
                        <Check size={18} strokeWidth={2.2} className="mt-0.5 shrink-0 text-azul-text" aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${plan.destacado ? botonPrincipal : botonSecundario} mt-8`}>
                    Consultar precio
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-[15px] text-ink-muted">
              ¿Querés que gestionemos todo tu salón?{" "}
              <a href={URL_SOCIOS} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4">
                Sé parte de los socios de Petra
              </a>
            </p>
          </div>
        </section>

        {/* 8. Preguntas frecuentes (se abren sin JavaScript) */}
        <section id="preguntas" className={seccion} aria-labelledby="titulo-preguntas">
          <div className={`${contenedor} max-w-[820px]!`}>
            <h2 id="titulo-preguntas" className="type-titulo text-center text-ink">
              Preguntas frecuentes
            </h2>
            <div className="mt-12 flex flex-col divide-y divide-white/10 border-y border-white/10">
              {PREGUNTAS.map(({ p, r }) => (
                <details key={p} className="group">
                  <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-4 text-[16px] leading-6 font-semibold text-ink">
                    {p}
                    <ChevronDown size={18} strokeWidth={2} className="shrink-0 text-ink-muted transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                  </summary>
                  <p className="pb-6 text-[15px] leading-6 text-ink-muted">{r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Reseñas (solo reales) y salones (solo con permiso): aparecen cuando las listas tengan datos */}
        {(RESENAS.length > 0 || SALONES.length > 0) && (
          <section id="salones" className={seccion} aria-labelledby="titulo-resenas">
            <div className={contenedor}>
              <h2 id="titulo-resenas" className="type-titulo text-center text-ink">
                Lo que dicen los salones
              </h2>
              {RESENAS.length > 0 && (
                <ul className="mt-10 grid gap-5 md:grid-cols-3">
                  {RESENAS.map((r) => (
                    <li key={`${r.nombre}-${r.salon}`} className={`flex flex-col p-6 ${vidrio}`}>
                      <div className="flex gap-1 text-azul-text" aria-hidden="true">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                        ))}
                      </div>
                      <blockquote className="mt-4 flex-1 text-[15px] leading-6 text-ink">“{r.texto}”</blockquote>
                      <p className="mt-5 text-[14px] font-semibold text-ink">{r.nombre}</p>
                      <p className="text-[13px] text-ink-muted">
                        {r.salon}
                        {r.ciudad ? `, ${r.ciudad}` : ""}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              {SALONES.length > 0 && (
                <ul className="mt-10 flex flex-wrap justify-center gap-3">
                  {SALONES.map((s) => (
                    <li key={s} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 px-4 text-[15px] font-semibold text-ink">
                      <Store size={16} strokeWidth={1.8} className="text-azul-text" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* 10. Cierre */}
        <section aria-labelledby="titulo-cierre" className="relative overflow-hidden py-24 sm:py-32">
          <div className={`${contenedor} relative z-10 flex flex-col items-center text-center`}>
            <h2 id="titulo-cierre" className="type-titulo max-w-[720px] text-balance text-ink">
              Mientras vos hacés la fiesta, tu salón cotiza.
            </h2>
            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <a href={URL_REGISTRARME} className={botonPrincipal}>
                {ACCION}
              </a>
              <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className={botonSecundario}>
                Hablar por WhatsApp
              </a>
            </div>
            <figure className="mt-12 flex max-w-[480px] items-center gap-4 text-left">
              <Image src="/rodrigo-torres.jpg" alt="Rodrigo Torres, creador de Petra" width={403} height={449} sizes="56px" className="size-14 shrink-0 rounded-full object-cover object-top" />
              <div>
                <blockquote className="text-[15px] leading-6 font-medium text-ink">“Creé Petra para que cada salón pueda ofrecer una experiencia completa.”</blockquote>
                <figcaption className="mt-1 text-[13px] text-ink-muted">Rodrigo Torres, creador de Petra</figcaption>
              </div>
            </figure>
          </div>
          <Luz className="bottom-[420px] sm:bottom-[360px]" />
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/8">
        <div className={`${contenedor} flex flex-col gap-6 py-10 text-[14px] text-ink-muted sm:flex-row sm:items-center sm:justify-between`}>
          <div className="flex flex-col gap-1.5">
            <Firma variante="clara" />
            <span>Tu salón sobre la roca</span>
          </div>
          <nav aria-label="Contacto y legales" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-ink">WhatsApp</a>
            <a href="mailto:hola@petraeventos.com" className="hover:text-ink">hola@petraeventos.com</a>
            <a href={URL_TERMINOS} className="hover:text-ink">Términos</a>
            <a href={URL_PRIVACIDAD} className="hover:text-ink">Privacidad</a>
            <span>© 2026 Petra</span>
          </nav>
        </div>
      </footer>
    </>
  );
}

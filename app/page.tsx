import Image from "next/image";
import { Check, ChevronDown, Star, Store } from "lucide-react";
import { CotizacionEnLinea } from "@/components/cotizacion-en-linea";
import { CotizadorDemo } from "@/components/cotizador-demo";
import { EscenaNoche } from "@/components/escena-noche";
import { Historia } from "@/components/historia";
import { Firma } from "@/components/logo";
import { Riel } from "@/components/riel";
import { PLANES } from "@/lib/catalogo";
import {
  URL_EJEMPLO,
  URL_ENTRAR,
  URL_PRIVACIDAD,
  URL_REGISTRARME,
  URL_SOCIOS,
  URL_TERMINOS,
  URL_WHATSAPP,
} from "@/lib/enlaces";
import { RESENAS, SALONES } from "@/lib/resenas";

const contenedor = "mx-auto w-full max-w-[1180px] px-4 md:px-8";
const seccion = "scroll-mt-20 py-24 lg:py-36";

// La acción de toda la página: una sola, con el mismo nombre en todos lados.
const ACCION = "Armá tu cotizador gratis";
const botonPrincipal =
  "type-boton inline-flex min-h-13 items-center justify-center rounded-md bg-crema-claro px-7 py-3 text-[16px] text-noche transition-colors hover:bg-white";
const linkSuave = "underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-current";

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
  { titulo: "Contestás lo mismo una y otra vez", texto: "Precio, fecha libre, qué incluye. Todos los días, a cada persona." },
  { titulo: "La consulta llega de noche", texto: "Te escriben a las 23 y contestás a la mañana. Para entonces, ya preguntaron en otro salón." },
  { titulo: "Mandás el PDF y no vuelven", texto: "Sin saber qué querían ni cuánto pensaban gastar." },
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

// Lo que el salón se saca de encima. Cada tarjeta es un color de la marca.
const TARJETAS = [
  { titulo: "Que el precio se conteste solo", texto: "Tu cotizador responde a cualquier hora, también de noche y los fines de semana.", clase: "bg-azul text-on-azul" },
  { titulo: "Que no me pidan una fecha ocupada", texto: "Tu cliente ve qué días tenés libres. La fecha la confirmás vos, cuando cierran.", clase: "bg-crema-claro text-noche" },
  { titulo: "Que me escriban sabiendo cuánto sale", texto: "Te llega la fecha, los invitados y el presupuesto armado. Contestás una vez.", clase: "bg-oliva-marca text-white" },
  { titulo: "Que los extras sumen solos", texto: "Aparecen en el presupuesto y suman a cada evento.", clase: "bg-dorado text-on-dorado" },
  { titulo: "Que la fiesta cerrada vaya al calendario", texto: "La cotización ganada pasa a tu calendario, y te avisa cuando dos eventos se pisan.", clase: "bg-azul-soft text-ink" },
  { titulo: "Que los cobros estén al día", texto: "La seña, las cuotas y lo que falta cobrar de cada fiesta, en un solo lugar.", clase: "bg-crema-claro text-noche" },
];

// Lo que más le preocupa a un salón de sus datos.
const CONFIANZA = [
  { titulo: "Cada salón ve solo lo suyo", texto: "Tus precios, tus clientes y tus fiestas no los ve ningún otro salón." },
  { titulo: "Tu cliente nunca ve tus costos", texto: "Ve el precio que vos decidís. Lo que te cuesta y lo que ganás quedan de tu lado." },
  { titulo: "La marca es la tuya", texto: "Tu cliente ve tu nombre, tu logo y tus colores. Petra es una firma chiquita al pie." },
];

// Preguntas frecuentes. Si cambia algo del cotizador, revisar estas respuestas.
const PREGUNTAS = [
  {
    p: "¿Ya puedo usar el cotizador?",
    r: "Sí. Creás tu cuenta gratis, subís tu PDF de promos o cargás tus precios, y ya tenés tu link para compartir. Si te trabás, te ayudamos por WhatsApp.",
  },
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
    p: "¿Quién ve mis precios y mis costos?",
    r: "Tus precios los ve tu cliente en tu link. Tus costos y tu ganancia no los ve nadie de afuera, y ningún otro salón entra a tus datos.",
  },
  {
    p: "¿Cuánto cuesta?",
    r: "Empezás gratis y sin tarjeta. Cuando quieras sumar más, pasás de plan. Escribinos y te pasamos los precios.",
  },
  {
    p: "¿Necesito saber de tecnología?",
    r: "No. Subís tu PDF o cargás tus precios como en una planilla, y te ayudamos por WhatsApp en todo.",
  },
];

/** La bandeja de mensajes de un salón cualquiera un martes a la noche (decorativa). */
function Bandeja() {
  return (
    <div aria-hidden="true" className="w-full rounded-xl border border-line bg-surface-raised p-5 shadow-piedra">
      <div className="flex items-center justify-between px-1">
        <p className="font-display text-[22px] text-ink">Mensajes</p>
        <p className="text-[13px] text-dorado">4 sin leer</p>
      </div>
      <ul className="mt-3 flex flex-col">
        {CONSULTAS.map((c) => (
          <li key={c.quien} className="flex items-center gap-3 py-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-azul-soft font-display text-[16px] text-azul-text">
              {c.quien.charAt(0)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className={`text-[14px] ${c.nueva ? "font-semibold text-ink" : "text-ink-muted"}`}>{c.quien}</span>
                <span className={`text-[12px] tabular-nums ${c.nueva ? "text-dorado" : "text-ink-muted"}`}>{c.hora}</span>
              </span>
              <span className={`mt-0.5 block truncate text-[14px] ${c.nueva ? "text-ink" : "text-ink-muted"}`}>{c.texto}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ListaConTilde({ titulo, items }: { titulo: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-display text-[24px] leading-8">{titulo}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-[16px] leading-6">
            <Check size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-azul" aria-hidden="true" />
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
      <header className="fixed inset-x-0 top-0 z-20 bg-noche/75 backdrop-blur-md">
        <div className={`${contenedor} flex min-h-16 items-center justify-between gap-3`}>
          <a href="#" aria-label="Petra, inicio" className="rounded-md">
            <Firma variante="clara" />
          </a>
          <nav aria-label="Secciones" className="hidden items-center gap-8 text-[14px] text-ink-muted lg:flex">
            <a href="#como-funciona" className="hover:text-ink">
              Cómo funciona
            </a>
            <a href="#probalo" className="hover:text-ink">
              Probalo
            </a>
            <a href="#planes" className="hover:text-ink">
              Planes
            </a>
            <a href="#preguntas" className="hover:text-ink">
              Preguntas
            </a>
          </nav>
          <div className="flex items-center gap-1 sm:gap-3">
            <a href={URL_ENTRAR} className="type-boton inline-flex min-h-10 items-center rounded-md px-3 text-[14px] text-ink hover:underline hover:underline-offset-4">
              Entrar
            </a>
            <a href={URL_REGISTRARME} className="type-boton inline-flex min-h-10 items-center rounded-md bg-crema-claro px-4 text-[14px] text-noche transition-colors hover:bg-white">
              <span className="sm:hidden">Empezar gratis</span>
              <span className="hidden sm:inline">{ACCION}</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 1. La escena, la promesa y el cotizador en una frase */}
        <section aria-labelledby="titular" className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-10">
          <EscenaNoche />
          <span aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-surface/10 via-surface/55 to-surface" />
          <div className={`${contenedor} relative text-center`}>
            <h1 id="titular" className="type-display text-balance text-ink">
              <span className="block">Respondé primero,</span> <span className="block">gestioná más fiestas.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[600px] text-[17px] leading-7 text-ink lg:text-[19px]">
              Tus clientes cotizan las 24 horas, desde un link con tu marca. Tocá una palabra y mirá:
            </p>
            <div className="mt-6">
              <CotizacionEnLinea />
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
                {ACCION}
              </a>
              <a href={URL_EJEMPLO} target="_blank" rel="noopener noreferrer" className={`${linkSuave} text-[15px] font-semibold text-ink`}>
                Abrir un cotizador de ejemplo
              </a>
            </div>
            <p className="mt-4 text-[14px] text-ink-muted">Sin tarjeta. Sumate a los primeros salones.</p>
          </div>
        </section>

        {/* 2. El problema */}
        <section id="problema" className={`${contenedor} ${seccion}`} aria-labelledby="titulo-problema">
          <h2 id="titulo-problema" className="type-titulo max-w-[860px] text-balance text-ink">
            Contestar «¿precio?» todo el día no es vender.
          </h2>
          <div className="mt-14 grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-24">
            <div>
              <dl className="flex flex-col divide-y divide-line border-y border-line">
                {DOLORES.map(({ titulo, texto }) => (
                  <div key={titulo} className="py-6">
                    <dt className="font-display text-[24px] leading-8 text-ink">{titulo}</dt>
                    <dd className="mt-1.5 text-[16px] leading-6 text-ink-muted">{texto}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 max-w-[560px] text-[14px] leading-6 text-ink-muted">
                Las empresas que responden dentro de la primera hora tienen casi 7 veces más chances de concretar una charla con el cliente.{" "}
                <a
                  href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkSuave}
                >
                  Harvard Business Review, 2011, EE. UU.
                </a>
              </p>
            </div>
            <Bandeja />
          </div>
        </section>

        {/* 3. Cómo funciona */}
        <section id="como-funciona" className={`${contenedor} scroll-mt-20 pb-24 lg:pb-36`} aria-labelledby="titulo-como">
          <h2 id="titulo-como" className="type-titulo max-w-[860px] text-balance text-ink">
            Ese PDF que mandás y no vuelve, ahora cotiza solo.
          </h2>
          <div className="mt-14 lg:mt-6">
            <Historia />
          </div>
        </section>

        {/* 4. La demo, sobre crema: como la ve el cliente del salón */}
        <section id="probalo" className={`${seccion} bg-crema-claro text-noche`} aria-labelledby="titulo-probalo">
          <div className={`${contenedor} grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-24`}>
            <div>
              <h2 id="titulo-probalo" className="type-titulo text-balance">
                Tu cliente arma su fiesta. Vos manejás todo.
              </h2>
              <p className="mt-5 max-w-[520px] text-[18px] leading-7">Tocá el celular: es la misma cuenta que hace tu cliente, con precios de ejemplo.</p>
              <div className="mt-10 grid gap-10 sm:grid-cols-2">
                <ListaConTilde titulo="Lo que ve tu cliente" items={VE_TU_CLIENTE} />
                <ListaConTilde titulo="Lo que manejás vos" items={MANEJAS_VOS} />
              </div>
            </div>
            <CotizadorDemo />
          </div>
        </section>

        {/* 5. Lo que te sacás de encima */}
        <section id="beneficios" className={seccion} aria-labelledby="titulo-beneficios">
          <div className={contenedor}>
            <h2 id="titulo-beneficios" className="type-titulo max-w-[860px] text-balance text-ink">
              Todo eso que hoy te saca tiempo.
            </h2>
          </div>
          <div className="mt-12">
            <Riel etiqueta="Lo que Petra hace por tu salón">
              {TARJETAS.map((t) => (
                <li key={t.titulo} className={`flex min-h-[340px] w-[82vw] max-w-[340px] shrink-0 snap-start flex-col justify-between rounded-xl p-7 ${t.clase}`}>
                  <h3 className="font-display text-[32px] leading-[1.12] tracking-[-0.02em]">{t.titulo}</h3>
                  <p className="mt-8 text-[16px] leading-6">{t.texto}</p>
                </li>
              ))}
            </Riel>
          </div>
        </section>

        {/* 6. Los datos */}
        <section id="tus-datos" className={`${contenedor} scroll-mt-20 pb-24 lg:pb-36`} aria-labelledby="titulo-datos">
          <h2 id="titulo-datos" className="type-titulo max-w-[860px] text-balance text-ink">
            Tus precios siguen siendo tuyos.
          </h2>
          <ul className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-12">
            {CONFIANZA.map((c) => (
              <li key={c.titulo}>
                <h3 className="font-display text-[24px] leading-8 text-ink">{c.titulo}</h3>
                <p className="mt-2 text-[16px] leading-6 text-ink-muted">{c.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 7. Planes (sin precios: todavía no están confirmados) */}
        <section id="planes" className={`${contenedor} scroll-mt-20 pb-24 lg:pb-36`} aria-labelledby="titulo-planes">
          <h2 id="titulo-planes" className="type-titulo max-w-[860px] text-balance text-ink">
            Empezás gratis. Sumás cuando quieras.
          </h2>
          <p className="mt-5 max-w-[560px] text-[18px] leading-7 text-ink-muted">Sin tarjeta, y no perdés nada de lo que cargaste al pasar de plan.</p>
          <ul className="mt-12 grid overflow-hidden rounded-xl border border-line lg:grid-cols-3">
            {PLANES.map((plan) => (
              <li
                key={plan.nombre}
                className={`flex flex-col border-b border-line p-7 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0 ${plan.destacado ? "bg-surface-raised" : ""}`}
              >
                <h3 className="flex items-baseline justify-between gap-3 font-display text-[32px] leading-10 text-ink">
                  {plan.nombre}
                  {plan.destacado && <span className="font-sans text-[13px] font-semibold text-dorado">Recomendado</span>}
                </h3>
                <p className="mt-2 text-[16px] leading-6 text-ink-muted">{plan.lema}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.trae.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-[16px] leading-6 text-ink">
                      <Check size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-dorado" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${linkSuave} mt-8 self-start text-[15px] font-semibold text-ink`}>
                  Consultar precio por WhatsApp
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
              {ACCION}
            </a>
            <p className="text-[15px] text-ink-muted">
              ¿Querés que gestionemos todo tu salón?{" "}
              <a href={URL_SOCIOS} target="_blank" rel="noopener noreferrer" className={`${linkSuave} font-semibold text-ink`}>
                Sé parte de los socios de Petra
              </a>
            </p>
          </div>
        </section>

        {/* 8. Preguntas frecuentes (se abren sin JavaScript) */}
        <section id="preguntas" className={`${contenedor} scroll-mt-20 pb-24 lg:pb-36`} aria-labelledby="titulo-preguntas">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-20">
            <h2 id="titulo-preguntas" className="type-titulo text-ink">
              Preguntas frecuentes
            </h2>
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {PREGUNTAS.map(({ p, r }) => (
                <details key={p} className="group">
                  <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-4 text-[17px] leading-6 font-semibold text-ink">
                    {p}
                    <ChevronDown size={18} strokeWidth={2} className="shrink-0 text-ink-muted transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                  </summary>
                  <p className="max-w-[640px] pb-6 text-[16px] leading-6 text-ink-muted">{r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Reseñas (solo reales) y salones (solo con permiso): aparecen cuando las listas tengan datos */}
        {(RESENAS.length > 0 || SALONES.length > 0) && (
          <section id="salones" className={`${contenedor} scroll-mt-20 pb-24 lg:pb-36`} aria-labelledby="titulo-resenas">
            <h2 id="titulo-resenas" className="type-titulo text-ink">
              Lo que dicen los salones
            </h2>
            {RESENAS.length > 0 && (
              <ul className="mt-10 grid gap-5 md:grid-cols-3">
                {RESENAS.map((r) => (
                  <li key={`${r.nombre}-${r.salon}`} className="flex flex-col rounded-xl border border-line bg-surface-raised p-6">
                    <div className="flex gap-1 text-dorado" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-[16px] leading-6 text-ink">“{r.texto}”</blockquote>
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
              <ul className="mt-10 flex flex-wrap gap-3">
                {SALONES.map((s) => (
                  <li key={s} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-surface-raised px-4 font-display text-[18px] text-ink">
                    <Store size={16} strokeWidth={1.8} className="text-dorado" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* 10. Cierre: otra vez la escena */}
        <section aria-labelledby="titulo-cierre" className="relative overflow-hidden pt-40 pb-24 lg:pt-56 lg:pb-32">
          <EscenaNoche animar={false} id="luz-cierre" />
          <span aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-surface via-surface/50 to-surface" />
          <div className={`${contenedor} relative text-center`}>
            <h2 id="titulo-cierre" className="type-titulo mx-auto max-w-[900px] text-balance text-ink">
              Mientras vos hacés la fiesta, tu salón cotiza.
            </h2>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
                {ACCION}
              </a>
              <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${linkSuave} text-[15px] font-semibold text-ink`}>
                Hablar por WhatsApp
              </a>
            </div>
            <figure className="mx-auto mt-14 flex max-w-[480px] items-center gap-4 text-left">
              <Image src="/rodrigo-torres.jpg" alt="Rodrigo Torres, creador de Petra" width={403} height={449} sizes="72px" className="size-16 shrink-0 rounded-full object-cover object-top" />
              <div>
                <blockquote className="font-display text-[18px] leading-6 text-ink">“Creé Petra para que cada salón pueda ofrecer una experiencia completa.”</blockquote>
                <figcaption className="mt-1.5 text-[14px] text-ink-muted">Rodrigo Torres, creador de Petra</figcaption>
              </div>
            </figure>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-noche">
        <div className={`${contenedor} flex flex-col gap-6 py-10 text-[14px] text-ink-muted sm:flex-row sm:items-center sm:justify-between`}>
          <div className="flex flex-col gap-1.5">
            <Firma variante="clara" />
            <span className="font-display text-[15px]">Tu salón sobre la roca</span>
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

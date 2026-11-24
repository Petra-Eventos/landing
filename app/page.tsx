import Image from "next/image";
import { Check, ChevronDown, Clock, MessageCircle, Palette, Star, Store } from "lucide-react";
import { CotizadorDemo } from "@/components/cotizador-demo";
import { Firma } from "@/components/logo";
import { PasosApilados } from "@/components/pasos-apilados";
import { BotonWhatsApp, LinkInstagram } from "@/components/redes";
import { URL_EJEMPLO, URL_ENTRAR, URL_PRIVACIDAD, URL_REGISTRARME, URL_TERMINOS, URL_WHATSAPP } from "@/lib/enlaces";
import { RESENAS, SALONES } from "@/lib/resenas";

// Estilo basado en Launch UI (MIT): ver licencias/launch-ui.md.
// La página dice tres cosas: qué es, cómo funciona y por qué conviene. Una sola acción.
const contenedor = "mx-auto w-full max-w-[1120px] px-5 md:px-8";
const seccion = "scroll-mt-20 py-20 sm:py-28";

const ACCION = "Armá tu cotizador gratis";
const botonPrincipal =
  "inline-flex min-h-12 items-center justify-center rounded-[12px] bg-azul px-6 text-[16px] font-bold text-on-azul shadow-[0_10px_24px_-8px_#1c79a466] transition-colors hover:bg-azul-hover";
const linkSecundario = "text-[15px] font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink";

/** El título de la primera pantalla: entra palabra por palabra y "las 24 horas" se subraya en ámbar. */
function Titular() {
  const antes = ["Tus", "clientes", "cotizan", "su", "evento"];
  const subrayadas = ["las", "24", "horas"];
  const paso = 0.09;
  return (
    <h1 id="titular" className="type-display mt-4 text-balance text-ink">
      {antes.map((p, i) => (
        <span key={p}>
          <span className="palabra" style={{ "--orden": `${0.1 + i * paso}s` } as React.CSSProperties}>
            {p}
          </span>{" "}
        </span>
      ))}
      <span className="relative inline-block whitespace-nowrap">
        {subrayadas.map((p, i) => (
          <span key={p}>
            <span className="palabra" style={{ "--orden": `${0.1 + (antes.length + i) * paso}s` } as React.CSSProperties}>
              {p}
            </span>
            {i < subrayadas.length - 1 ? " " : ""}
          </span>
        ))}
        <svg
          aria-hidden="true"
          viewBox="0 0 300 20"
          preserveAspectRatio="none"
          className="trazo absolute -bottom-[0.08em] left-0 h-[0.22em] w-full text-dorado"
          style={{ "--orden": "1s" } as React.CSSProperties}
        >
          <path d="M4 14C70 5 160 3 296 9" pathLength="1" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </span>
      .
    </h1>
  );
}

const POR_QUE = [
  { icono: Clock, titulo: "Dejás de contestar «¿precio?»", texto: "El cotizador responde solo, también a las 23 y los fines de semana." },
  { icono: MessageCircle, titulo: "Te escriben los que ya saben cuánto sale", texto: "Llegan con fecha, invitados y presupuesto. Hablás con quien está decidiendo." },
  { icono: Palette, titulo: "Con tu marca, no la nuestra", texto: "Tu cliente ve tu nombre, tu logo y tus colores. Nunca ve tus costos." },
];

const PREGUNTAS = [
  { p: "¿Cuánto cuesta?", r: "Nada durante un año: todo Petra es gratis los primeros 12 meses y no te pedimos tarjeta." },
  { p: "¿El cliente reserva la fecha solo?", r: "No. Ve qué fechas tenés libres y te manda el pedido. La fecha la confirmás vos, cuando cierran." },
  { p: "¿Necesito saber de tecnología?", r: "No. Si tenés tu PDF de promos, en un rato tenés tu link. Y te ayudamos por WhatsApp." },
  { p: "¿Quién ve mis precios y mis costos?", r: "Tu cliente ve el precio que vos decidís. Tus costos y tu ganancia no los ve nadie, y nadie más entra a tus datos." },
];

// Ficha para Google (datos estructurados): qué es Petra, que es web y que se empieza gratis.
// Solo datos ciertos: sin estrellas ni reseñas hasta que existan de verdad.
const FICHA_GOOGLE = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Petra",
  url: "https://www.petraeventos.com",
  description:
    "Cotizador online para salones y organizadores de eventos: generá un link para que tus clientes coticen su evento las 24 horas, con tu marca.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "es-AR",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ARS", description: "Gratis durante el primer año" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FICHA_GOOGLE).replace(/</g, "\\u003c") }}
      />
      <header className="sticky top-0 z-20 border-b border-line bg-surface/80 backdrop-blur-xl">
        <div className={`${contenedor} flex min-h-16 items-center justify-between gap-3`}>
          <a href="#" aria-label="Petra, inicio" className="rounded-md">
            <Firma />
          </a>
          <div className="flex items-center gap-1 sm:gap-3">
            <a href={URL_ENTRAR} className="inline-flex min-h-10 items-center rounded-lg px-3 text-[14px] font-semibold text-ink hover:underline hover:underline-offset-4">
              Entrar
            </a>
            <a href={URL_REGISTRARME} className="inline-flex min-h-10 items-center rounded-[12px] bg-azul px-4 text-[14px] font-bold text-on-azul transition-colors hover:bg-azul-hover">
              Empezar gratis
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 1. Qué es: en una frase, con el cotizador al lado para tocarlo */}
        <section aria-labelledby="titular" className="relative overflow-hidden bg-surface">
          {/* Foto de fondo: Petra (Jordania) de noche, con velas. La eligió Rodri.
              Encima, una capa crema para que el texto se lea: del lado del texto tapa casi todo y del lado
              del celular deja ver la fachada y las velas. */}
          <Image
            src="/fondo-petra.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-cover object-[center_72%]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-surface/80 lg:bg-transparent lg:bg-linear-to-r lg:from-surface lg:from-30% lg:via-surface/75 lg:via-50% lg:to-surface/0"
          />
          <div className={`${contenedor} relative grid grid-cols-1 items-center gap-14 py-16 sm:py-24 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20 lg:py-[clamp(16px,3vh,96px)]`}>
            <div className="text-center lg:text-left">
              <p className="aparecer type-etiqueta flex items-center justify-center gap-3 text-ink lg:justify-start">
                <span aria-hidden="true" className="h-[3px] w-8 rounded-full bg-dorado" />
                Cotizador para eventos
              </p>
              <Titular />
              <p style={{ "--orden": "0.9s" } as React.CSSProperties} className="aparecer mx-auto mt-6 max-w-[520px] text-[18px] leading-7 text-ink lg:mx-0 sm:text-[20px] sm:leading-8">
                Petra te da un link donde tu cliente arma su evento y ve el precio al instante. A vos te llega el pedido por WhatsApp.
              </p>
              <div style={{ "--orden": "1.05s" } as React.CSSProperties} className="aparecer mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start">
                <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
                  {ACCION}
                </a>
                <a href={URL_EJEMPLO} target="_blank" rel="noopener noreferrer" className={linkSecundario}>
                  Ver un ejemplo real
                </a>
              </div>
              <ul style={{ "--orden": "1.2s" } as React.CSSProperties} className="aparecer mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] font-semibold text-ink lg:justify-start">
                {["Gratis por un año", "Sin tarjeta", "Con tu marca"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Check size={16} strokeWidth={2.4} className="text-oliva" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ "--orden": "0.6s" } as React.CSSProperties} className="aparecer demo-ajustada text-ink-muted">
              <CotizadorDemo />
            </div>
          </div>
        </section>

        {/* 2. Cómo funciona: tres pasos de verdad, en orden */}
        <section id="como-funciona" className={seccion} aria-labelledby="titulo-como">
          <div className={contenedor}>
            <h2 id="titulo-como" className="revelar type-titulo text-center text-ink">
              Cómo <span className="resaltado">funciona</span>
            </h2>
            <PasosApilados />
          </div>
        </section>

        {/* 3. Por qué conviene */}
        <section id="por-que" className={`${seccion} bg-marino`} aria-labelledby="titulo-por-que">
          <div className={contenedor}>
            <h2 id="titulo-por-que" className="revelar type-titulo text-center text-balance text-on-marino">
              Menos mensajes, <span className="subrayado">más fiestas cerradas</span>
            </h2>
            <ul className="mt-14 grid gap-5 md:grid-cols-3">
              {POR_QUE.map((b) => (
                <li key={b.titulo} className="revelar rounded-[20px] border border-white/10 bg-white/5 p-7">
                  <span className="flex size-12 items-center justify-center rounded-[14px] bg-azul-soft text-ink">
                    <b.icono size={22} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-[22px] leading-7 font-semibold text-white">{b.titulo}</h3>
                  <p className="mt-3 text-[16px] leading-6 text-on-marino-muted">{b.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Reseñas (solo reales) y clientes (solo con permiso): aparecen cuando las listas tengan datos */}
        {(RESENAS.length > 0 || SALONES.length > 0) && (
          <section id="resenas" className={seccion} aria-labelledby="titulo-resenas">
            <div className={contenedor}>
              <h2 id="titulo-resenas" className="type-titulo text-center text-ink">
                Lo que dicen quienes usan Petra
              </h2>
              {RESENAS.length > 0 && (
                <ul className="mt-10 grid gap-5 md:grid-cols-3">
                  {RESENAS.map((r) => (
                    <li key={`${r.nombre}-${r.salon}`} className="flex flex-col rounded-[20px] border border-line bg-surface-raised p-6 shadow-piedra">
                      <div className="flex gap-1 text-dorado" aria-hidden="true">
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
                    <li key={s} className="inline-flex min-h-11 items-center gap-2 rounded-[12px] border border-line bg-surface-raised px-4 text-[15px] font-semibold text-ink">
                      <Store size={16} strokeWidth={1.8} className="text-azul-text" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* Quién está detrás: una persona real a la que se le puede escribir */}
        <section id="quien" className={seccion} aria-labelledby="titulo-quien">
          <div className={`${contenedor} max-w-[880px]!`}>
            <div className="revelar grid items-center gap-8 rounded-[28px] border border-line bg-surface-raised p-7 shadow-piedra sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-10">
              <Image
                src="/rodrigo-torres.jpg"
                alt="Rodrigo Torres, creador de Petra"
                width={403}
                height={449}
                sizes="(min-width: 640px) 176px, 144px"
                className="mx-auto h-44 w-36 rounded-t-full rounded-b-[20px] object-cover object-top sm:h-52 sm:w-44"
              />
              <div className="text-center sm:text-left">
                <p className="type-etiqueta text-ink-muted">Quién está detrás</p>
                <h2 id="titulo-quien" className="mt-2 type-titulo text-ink">
                  Hola, soy Rodrigo.
                </h2>
                <p className="mt-4 text-[17px] leading-7 text-ink">
                  Creé Petra para que cada evento pueda ser una experiencia completa, y para que quien lo organiza deje de
                  perder clientes por contestar tarde.
                </p>
                <p className="mt-3 text-[16px] leading-6 text-ink-muted">
                  Si tenés una duda, escribime: te respondo yo.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-start">
                  <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className={linkSecundario}>
                    Escribime por WhatsApp
                  </a>
                  <LinkInstagram className={linkSecundario} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Preguntas (se abren sin JavaScript) */}
        <section id="preguntas" className={seccion} aria-labelledby="titulo-preguntas">
          <div className={`${contenedor} max-w-[760px]!`}>
            <h2 id="titulo-preguntas" className="revelar type-titulo text-center text-ink">
              Preguntas frecuentes
            </h2>
            <div className="revelar mt-12 flex flex-col gap-3">
              {PREGUNTAS.map(({ p, r }) => (
                <details key={p} className="group rounded-[20px] border border-line bg-surface-raised px-6 shadow-piedra">
                  <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-4 font-display text-[19px] leading-6 font-semibold text-ink">
                    {p}
                    <ChevronDown size={18} strokeWidth={2} className="shrink-0 text-ink-muted transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                  </summary>
                  <p className="pb-6 text-[16px] leading-6 text-ink-muted">{r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Cierre */}
        <section aria-labelledby="titulo-cierre" className={seccion}>
          <div className={contenedor}>
            <div className="flex flex-col items-center rounded-[28px] bg-azul-soft px-5 py-14 text-center sm:px-10 sm:py-20">
              <h2 id="titulo-cierre" className="revelar type-titulo max-w-[680px] text-balance text-ink">
                Armá tu cotizador hoy. <span className="subrayado">Es gratis por un año.</span>
              </h2>
              <div className="mt-8 flex w-full flex-col items-center gap-5 sm:w-auto sm:flex-row">
                <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
                  {ACCION}
                </a>
                <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className={linkSecundario}>
                  Preguntar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-marino">
        <div className={`${contenedor} flex flex-col gap-6 py-12 text-[14px] text-on-marino-muted sm:flex-row sm:items-center sm:justify-between`}>
          <div className="flex flex-col gap-2">
            <Firma variante="clara" />
            <span className="font-display text-[17px]">Tus eventos sobre la roca</span>
          </div>
          <nav aria-label="Contacto y legales" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-on-marino">WhatsApp</a>
            <LinkInstagram className="hover:text-on-marino" />
            <a href="mailto:hola@petraeventos.com" className="hover:text-on-marino">hola@petraeventos.com</a>
            <a href={URL_TERMINOS} className="hover:text-on-marino">Términos</a>
            <a href={URL_PRIVACIDAD} className="hover:text-on-marino">Privacidad</a>
            <span>© 2026 Petra</span>
          </nav>
        </div>
      </footer>

      <BotonWhatsApp />
    </>
  );
}

import Image from "next/image";
import { Check, ChevronDown, Star, Store } from "lucide-react";
import { CotizadorDemo } from "@/components/cotizador-demo";
import { Firma } from "@/components/logo";
import { URL_EJEMPLO, URL_ENTRAR, URL_PRIVACIDAD, URL_REGISTRARME, URL_TERMINOS, URL_WHATSAPP } from "@/lib/enlaces";
import { RESENAS, SALONES } from "@/lib/resenas";

// Estilo basado en Launch UI (MIT): ver licencias/launch-ui.md.
// La página dice tres cosas: qué es, cómo funciona y por qué conviene. Una sola acción.
const contenedor = "mx-auto w-full max-w-[1120px] px-5 md:px-8";
const seccion = "scroll-mt-20 border-t border-white/8 py-20 sm:py-28";

const ACCION = "Armá tu cotizador gratis";
const botonPrincipal =
  "inline-flex min-h-12 items-center justify-center rounded-lg bg-linear-to-b from-white to-crema-claro px-6 text-[16px] font-semibold text-noche shadow-md transition-opacity hover:opacity-90";
const linkSecundario = "text-[15px] font-semibold text-ink underline decoration-white/30 underline-offset-4 hover:decoration-white";

const PASOS = [
  { titulo: "Cargás tus precios", texto: "Subís tu PDF de promos o cargás tus menús y extras. Lo hacés una vez." },
  { titulo: "Compartís tu link", texto: "En la bio de Instagram, en WhatsApp o con un QR en el salón." },
  { titulo: "Te llega el pedido", texto: "Tu cliente arma su fiesta, ve el precio y te escribe con todo listo." },
];

const POR_QUE = [
  { titulo: "Dejás de contestar «¿precio?»", texto: "El cotizador responde solo, también a las 23 y los fines de semana." },
  { titulo: "Te escriben los que ya saben cuánto sale", texto: "Llegan con fecha, invitados y presupuesto. Hablás con quien está decidiendo." },
  { titulo: "Con tu marca, no la nuestra", texto: "Tu cliente ve tu nombre, tu logo y tus colores. Nunca ve tus costos." },
];

const PREGUNTAS = [
  { p: "¿Cuánto cuesta?", r: "Empezás gratis y sin tarjeta. Cuando quieras sumar más herramientas, pasás de plan. Escribinos y te pasamos los precios." },
  { p: "¿El cliente reserva la fecha solo?", r: "No. Ve qué fechas tenés libres y te manda el pedido. La fecha la confirmás vos, cuando cierran." },
  { p: "¿Necesito saber de tecnología?", r: "No. Si tenés tu PDF de promos, en un rato tenés tu link. Y te ayudamos por WhatsApp." },
  { p: "¿Quién ve mis precios y mis costos?", r: "Tu cliente ve el precio que vos decidís. Tus costos y tu ganancia no los ve nadie, y ningún otro salón entra a tus datos." },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-white/8 bg-surface/75 backdrop-blur-xl">
        <div className={`${contenedor} flex min-h-16 items-center justify-between gap-3`}>
          <a href="#" aria-label="Petra, inicio" className="rounded-md">
            <Firma variante="clara" />
          </a>
          <div className="flex items-center gap-1 sm:gap-3">
            <a href={URL_ENTRAR} className="inline-flex min-h-10 items-center rounded-lg px-3 text-[14px] font-semibold text-ink hover:underline hover:underline-offset-4">
              Entrar
            </a>
            <a href={URL_REGISTRARME} className="inline-flex min-h-10 items-center rounded-lg bg-linear-to-b from-white to-crema-claro px-4 text-[14px] font-semibold text-noche transition-opacity hover:opacity-90">
              Empezar gratis
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 1. Qué es: en una frase, con el cotizador al lado para tocarlo */}
        <section aria-labelledby="titular" className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-[50%] bg-radial from-azul/30 to-azul/0 to-65%" />
          <div className={`${contenedor} relative grid grid-cols-1 items-center gap-14 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20`}>
            <div className="text-center lg:text-left">
              <p className="text-[15px] font-semibold text-azul-text">Para salones de eventos</p>
              <h1 id="titular" className="type-display mt-4 text-balance text-ink">
                Tus clientes cotizan su fiesta solos.
              </h1>
              <p className="mx-auto mt-6 max-w-[520px] text-[18px] leading-7 text-ink-muted lg:mx-0 sm:text-[20px] sm:leading-8">
                Petra te da un link donde tu cliente arma su evento y ve el precio al instante. A vos te llega el pedido por WhatsApp.
              </p>
              <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start">
                <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
                  {ACCION}
                </a>
                <a href={URL_EJEMPLO} target="_blank" rel="noopener noreferrer" className={linkSecundario}>
                  Ver un ejemplo real
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-ink-muted lg:justify-start">
                {["Gratis para empezar", "Sin tarjeta", "Con tu marca"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Check size={16} strokeWidth={2.4} className="text-azul-text" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-ink-muted">
              <CotizadorDemo />
            </div>
          </div>
        </section>

        {/* 2. Cómo funciona: tres pasos de verdad, en orden */}
        <section id="como-funciona" className={seccion} aria-labelledby="titulo-como">
          <div className={contenedor}>
            <h2 id="titulo-como" className="type-titulo text-center text-ink">
              Cómo funciona
            </h2>
            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {PASOS.map((p, i) => (
                <li key={p.titulo} className="flex flex-col items-center text-center">
                  <span className="flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[18px] font-bold text-ink">{i + 1}</span>
                  <h3 className="mt-5 text-[20px] font-bold tracking-tight text-ink">{p.titulo}</h3>
                  <p className="mt-2 max-w-[300px] text-[16px] leading-6 text-ink-muted">{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 3. Por qué conviene */}
        <section id="por-que" className={seccion} aria-labelledby="titulo-por-que">
          <div className={contenedor}>
            <h2 id="titulo-por-que" className="type-titulo text-center text-balance text-ink">
              Menos mensajes, más fiestas cerradas
            </h2>
            <ul className="mt-14 grid gap-5 md:grid-cols-3">
              {POR_QUE.map((b) => (
                <li key={b.titulo} className="rounded-2xl border border-white/10 bg-linear-to-b from-white/6 to-white/1 p-7">
                  <h3 className="text-[19px] leading-7 font-bold tracking-tight text-ink">{b.titulo}</h3>
                  <p className="mt-3 text-[16px] leading-6 text-ink-muted">{b.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Reseñas (solo reales) y salones (solo con permiso): aparecen cuando las listas tengan datos */}
        {(RESENAS.length > 0 || SALONES.length > 0) && (
          <section id="salones" className={seccion} aria-labelledby="titulo-resenas">
            <div className={contenedor}>
              <h2 id="titulo-resenas" className="type-titulo text-center text-ink">
                Lo que dicen los salones
              </h2>
              {RESENAS.length > 0 && (
                <ul className="mt-10 grid gap-5 md:grid-cols-3">
                  {RESENAS.map((r) => (
                    <li key={`${r.nombre}-${r.salon}`} className="flex flex-col rounded-2xl border border-white/10 p-6">
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

        {/* 4. Preguntas (se abren sin JavaScript) */}
        <section id="preguntas" className={seccion} aria-labelledby="titulo-preguntas">
          <div className={`${contenedor} max-w-[760px]!`}>
            <h2 id="titulo-preguntas" className="type-titulo text-center text-ink">
              Preguntas frecuentes
            </h2>
            <div className="mt-12 flex flex-col divide-y divide-white/10 border-y border-white/10">
              {PREGUNTAS.map(({ p, r }) => (
                <details key={p} className="group">
                  <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-4 text-[17px] leading-6 font-semibold text-ink">
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
          <div className={`${contenedor} flex flex-col items-center text-center`}>
            <h2 id="titulo-cierre" className="type-titulo max-w-[680px] text-balance text-ink">
              Armá tu cotizador hoy. Es gratis.
            </h2>
            <div className="mt-8 flex w-full flex-col items-center gap-5 sm:w-auto sm:flex-row">
              <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
                {ACCION}
              </a>
              <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className={linkSecundario}>
                Preguntar por WhatsApp
              </a>
            </div>
            <figure className="mt-14 flex max-w-[460px] items-center gap-4 text-left">
              <Image src="/rodrigo-torres.jpg" alt="Rodrigo Torres, creador de Petra" width={403} height={449} sizes="56px" className="size-14 shrink-0 rounded-full object-cover object-top" />
              <div>
                <blockquote className="text-[15px] leading-6 font-medium text-ink">“Creé Petra para que cada salón pueda ofrecer una experiencia completa.”</blockquote>
                <figcaption className="mt-1 text-[13px] text-ink-muted">Rodrigo Torres, creador de Petra</figcaption>
              </div>
            </figure>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8">
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

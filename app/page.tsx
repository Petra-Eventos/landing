import {
  ArrowRight,
  Check,
  MessageCircle,
  Quote,
  Sparkles,
  Star,
  Smartphone,
  Store,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Firma } from "@/components/logo";
import { Simulador } from "@/components/simulador";
import { TiendaApps } from "@/components/tienda-apps";
import { PLANES } from "@/lib/catalogo";
import { URL_ENTRAR, URL_PRIVACIDAD, URL_REGISTRARME, URL_SOCIOS, URL_TERMINOS, URL_WHATSAPP } from "@/lib/enlaces";
import { RESENAS, SALONES } from "@/lib/resenas";

const contenedor = "mx-auto w-full max-w-[1180px] px-4 md:px-8";
const botonPrincipal =
  "type-boton inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-azul px-6 py-3 text-[15px] text-on-azul shadow-piedra transition-colors hover:bg-azul-hover";
const botonSecundario =
  "type-boton inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line-strong px-6 py-3 text-[15px] text-ink transition-colors hover:border-ink";

// Los tres perfiles de cada producto (se configuran desde el sistema).
const PERFILES_LANDING: { icono: LucideIcon; nombre: string; texto: string }[] = [
  { icono: Store, nombre: "Tu staff", texto: "Tu equipo asigna el producto a la fiesta y sigue todo desde el panel." },
  { icono: UserRound, nombre: "Tus clientes", texto: "Quienes festejan lo configuran desde un link: sin cuenta y sin contraseñas." },
  { icono: Smartphone, nombre: "Los invitados", texto: "Lo usan desde el celular, sin bajar ninguna app." },
];

/** Título de cada sección: antetítulo dorado, título y una línea. */
function Encabezado({ id, ante, titulo, texto }: { id: string; ante: string; titulo: string; texto?: string }) {
  return (
    <div className="max-w-[680px]">
      <p className="type-etiqueta text-dorado">{ante}</p>
      <h2 id={id} className="type-titulo mt-3 text-ink">
        {titulo}
      </h2>
      {texto && <p className="type-cuerpo mt-3 text-ink-muted">{texto}</p>}
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
            <a href="#productos" className="hover:text-ink">
              Productos
            </a>
            <a href="#planes" className="hover:text-ink">
              Planes
            </a>
            <a href="#salones" className="hover:text-ink">
              Salones
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
        {/* 1. Productos destacados con simulador */}
        <section id="productos" className={`${contenedor} scroll-mt-20 pt-10 pb-16 md:pt-14 lg:pb-20`} aria-labelledby="titular">
          <div className="max-w-[760px]">
            <p className="type-etiqueta inline-flex items-center gap-1.5 rounded-sm border border-dorado/40 px-3 py-1.5 text-dorado">
              <Sparkles size={14} strokeWidth={2} aria-hidden="true" />
              Herramientas digitales para salones de eventos
            </p>
            <h1 id="titular" className="type-display mt-5 text-ink">
              Ofrecele a tus invitados <span className="text-dorado">toda la tecnología que quieren.</span>
            </h1>
            <p className="type-cuerpo mt-4 text-ink-muted">
              Probá acá mismo la invitación digital y mirala desde los tres lados.
            </p>
          </div>
          {/* Carrusel: en el celular se desliza de tu staff a los invitados; en la compu entra entero. */}
          <ul
            aria-label="Quién usa cada producto"
            className="sin-barra mt-6 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 sm:overflow-visible"
          >
            {PERFILES_LANDING.map(({ icono: Icono, nombre, texto }, i) => (
              <li key={nombre} className="flex w-[86%] shrink-0 snap-start items-center gap-2 sm:w-auto sm:flex-1 sm:shrink">
                <div className="flex h-full flex-1 items-start gap-3 rounded-lg border border-line bg-surface-raised/60 p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-dorado-soft text-dorado">
                    <Icono size={18} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="type-boton block text-ink">{nombre}</span>
                    <span className="block text-[13px] leading-5 text-ink-muted">{texto}</span>
                  </span>
                </div>
                {i < PERFILES_LANDING.length - 1 && (
                  <ArrowRight size={20} strokeWidth={2} className="shrink-0 text-dorado" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
          <p className="mt-2 flex items-center gap-1 text-[12px] text-ink-muted sm:hidden" aria-hidden="true">
            Deslizá para ver los tres <ArrowRight size={14} strokeWidth={2} />
          </p>
          <div className="mt-10">
            <Simulador />
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
              Crear mi cuenta gratis
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </a>
            <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${botonSecundario} w-full sm:w-auto`}>
              <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
              Consultar por WhatsApp
            </a>
          </div>
        </section>

        {/* 2. Todas las apps, como una tienda: colorida a propósito */}
        <section
          id="apps"
          className="relative scroll-mt-20 overflow-hidden border-y border-line bg-noche/60 py-16 lg:py-20"
          aria-labelledby="titulo-todos"
        >
          {/* Luces de colores de fondo (decorativas). */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <span className="absolute -top-24 -left-24 size-80 rounded-full bg-[#ff4fd8]/20 blur-3xl" />
            <span className="absolute top-1/3 -right-20 size-96 rounded-full bg-[#22c3e6]/20 blur-3xl" />
            <span className="absolute -bottom-24 left-1/4 size-80 rounded-full bg-[#f5c518]/15 blur-3xl" />
            <span className="absolute bottom-10 -left-10 size-64 rounded-full bg-[#8e2de2]/25 blur-3xl" />
          </div>
          <div className={`${contenedor} relative`}>
            <div className="max-w-[720px]">
              <p className="type-etiqueta text-dorado">Webapps para invitados</p>
              <h2 id="titulo-todos" className="type-titulo mt-3 text-ink">
                Conocé las{" "}
                <span className="bg-linear-to-r from-[#ff7ac6] via-[#ffd36e] to-[#5ee7ff] bg-clip-text text-transparent">
                  más de 30 webapps
                </span>{" "}
                que podés ofrecer
              </h2>
              <p className="type-cuerpo mt-3 text-ink-muted">
                Se abren desde el celular, sin bajar nada, con la marca de tu salón. Vos elegís cuáles sumar a cada fiesta.
              </p>
            </div>
            <div className="mt-8">
              <TiendaApps />
            </div>
          </div>
        </section>

        {/* 3. Planes */}
        <section id="planes" className={`${contenedor} scroll-mt-20 py-16 lg:py-20`} aria-labelledby="titulo-planes">
          <Encabezado
            id="titulo-planes"
            ante="Planes"
            titulo="Elegí el plan para tu salón"
            texto="Empezás gratis, sin tarjeta, y pasás de plan cuando quieras. No perdés nada de lo que cargaste."
          />
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {PLANES.map((plan) => (
              <li
                key={plan.nombre}
                className={`relative flex flex-col rounded-xl border bg-surface-raised p-6 shadow-piedra sm:p-7 ${
                  plan.destacado ? "border-dorado" : "border-line"
                }`}
              >
                {plan.destacado && (
                  <span className="type-etiqueta absolute -top-3 left-6 rounded-sm bg-dorado px-2.5 py-1 text-on-dorado">
                    Recomendado
                  </span>
                )}
                <h3 className="font-display text-[26px] leading-8 text-ink">{plan.nombre}</h3>
                <p className="type-cuerpo mt-1 text-ink-muted">{plan.lema}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.trae.map((t) => (
                    <li key={t} className="type-cuerpo flex items-start gap-2.5 text-ink">
                      <Check size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-dorado" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href={URL_REGISTRARME}
                  className={`${plan.destacado ? botonPrincipal : botonSecundario} mt-7 w-full`}
                >
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
          <p className="mt-6 text-[14px] text-ink-muted">
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

        {/* 4. Reseñas y salones */}
        <section
          id="salones"
          className="scroll-mt-20 border-t border-line bg-noche/60 py-16 lg:py-20"
          aria-labelledby="titulo-salones"
        >
          <div className={contenedor}>
            <Encabezado id="titulo-salones" ante="Salones" titulo="Lo que dicen los salones" />

            {RESENAS.length > 0 ? (
              <ul className="mt-10 grid gap-5 md:grid-cols-3">
                {RESENAS.map((r) => (
                  <li key={`${r.nombre}-${r.salon}`} className="flex flex-col rounded-xl border border-line bg-surface-raised p-6">
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
            ) : (
              <div className="mt-10 grid items-center gap-6 rounded-xl border border-dashed border-dorado/50 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto]">
                <Quote size={40} strokeWidth={1.4} className="text-dorado" aria-hidden="true" />
                <div>
                  <p className="font-display text-[22px] leading-7 text-ink">Tu salón puede ser el primero en contarlo.</p>
                  <p className="type-cuerpo mt-1 text-ink-muted">
                    Estamos sumando a los primeros salones. Probá Petra en tus fiestas y contanos cómo te fue.
                  </p>
                </div>
                <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full md:w-auto`}>
                  Quiero probarlo
                </a>
              </div>
            )}

            {SALONES.length > 0 && (
              <div className="mt-12">
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
          <Firma variante="clara" />
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

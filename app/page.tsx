import Image from "next/image";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  Check,
  Gem,
  HandCoins,
  Megaphone,
  MessageCircle,
  Star,
  Store,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Antetitulo, Encabezado, Separador } from "@/components/adornos";
import { Firma } from "@/components/logo";
import { PerfilesEnVivo } from "@/components/perfiles-en-vivo";
import { TiendaApps } from "@/components/tienda-apps";
import { PLANES } from "@/lib/catalogo";
import { URL_ENTRAR, URL_PRIVACIDAD, URL_REGISTRARME, URL_SOCIOS, URL_TERMINOS, URL_WHATSAPP } from "@/lib/enlaces";
import { RESENAS, SALONES } from "@/lib/resenas";

const contenedor = "mx-auto w-full max-w-[1180px] px-4 md:px-8";
const botonPrincipal =
  "type-boton inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-azul px-6 py-3 text-[15px] text-on-azul shadow-piedra transition-colors hover:bg-azul-hover";
const botonSecundario =
  "type-boton inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line-strong px-6 py-3 text-[15px] text-ink transition-colors hover:border-ink";

// Lo que hoy los clientes del salón contratan por separado, contra lo que el salón ofrece con Petra.
const AFUERA = [
  "La invitación, con la marca de otro",
  "Las fotos, en el álbum de otro proveedor",
  "Los juegos, con otro show",
  "La lista y las mesas, en un Excel",
];
const CON_PETRA = [
  "Todo en un solo link, con tu logo",
  "La lista y las mesas, conectadas",
  "Le ponés el precio y anotás los cobros",
  "Seguís cada fiesta desde tu panel",
];

// Lo que gana el salón.
const RAZONES = [
  {
    icono: Gem,
    titulo: "Diferenciate",
    texto: "Cuando comparan salones, sos el que trae todo: invitación, fotos y juegos.",
  },
  {
    icono: HandCoins,
    titulo: "La plata queda en tu salón",
    texto: "Lo que hoy pagan afuera lo sumás a tu paquete o lo cobrás como extra.",
  },
  {
    icono: Megaphone,
    titulo: "Tu marca en cada celular",
    texto: "Cada invitado ve tu salón en su celular. Publicidad que viaja sola.",
  },
];

// Lo que ya hace el sistema para organizar el salón.
const GESTION = [
  { icono: CalendarDays, texto: "Calendario con todas tus fiestas" },
  { icono: Wallet, texto: "Cobros y saldo de cada fiesta" },
  { icono: Users, texto: "Tu equipo, con su perfil y su PIN" },
  { icono: BellRing, texto: "Aviso cuando dos eventos se pisan" },
];

/** Calendario de ejemplo para la sección de gestión (decorativo: diciembre de 2026 arranca un martes). */
function CalendarioEjemplo() {
  const fiestas = new Set([5, 11, 12, 19, 26]);
  const dias = [null, ...Array.from({ length: 31 }, (_, i) => i + 1)];
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[400px]">
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
              Cómo funciona
            </a>
            <a href="#apps" className="hover:text-ink">
              Herramientas
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
        {/* 1. El mensaje, los tres pasos y el simulador */}
        <section
          id="productos"
          className={`${contenedor} scroll-mt-20 pt-12 pb-20 md:pt-16 lg:pt-20 lg:pb-28`}
          aria-labelledby="titular"
        >
          {/* En la compu: texto, botones y pasos a la izquierda; el celular a la derecha. */}
          <PerfilesEnVivo
            intro={
              <div className="max-w-[680px]">
                <Antetitulo>Tu salón sobre la roca</Antetitulo>
                <h1 id="titular" className="type-display mt-5 text-ink">
                  Que tus clientes no busquen <span className="text-dorado">nada afuera.</span>
                </h1>
                <p className="mt-5 max-w-[560px] text-[17px] leading-7 text-ink-muted">
                  Invitación digital, lista de invitados, mesas, fotos y juegos, con la marca de tu salón. Y si querés,
                  organizá tu salón con Petra.
                </p>
              </div>
            }
            acciones={
              <div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a href={URL_REGISTRARME} className={`${botonPrincipal} w-full sm:w-auto`}>
                    Crear mi cuenta gratis
                    <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
                  </a>
                  <a
                    href={URL_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${botonSecundario} w-full sm:w-auto`}
                  >
                    <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
                    Consultar por WhatsApp
                  </a>
                </div>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-muted">
                  {["Gratis para empezar", "Sin tarjeta", "Ayuda por WhatsApp"].map((t) => (
                    <li key={t} className="flex items-center gap-1.5">
                      <Check size={14} strokeWidth={2.4} className="text-dorado" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
        </section>

        <Separador />

        {/* 2. La diferencia: lo que hoy contratan afuera, ahora en el salón */}
        <section
          id="diferencia"
          className={`${contenedor} scroll-mt-20 py-20 lg:py-28`}
          aria-labelledby="titulo-diferencia"
        >
          <Encabezado
            id="titulo-diferencia"
            ante="La diferencia"
            centrado
            titulo={
              <>
                Lo que hoy contratan afuera, <span className="text-dorado">ahora lo ofrece tu salón.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5 lg:mx-auto lg:max-w-[960px]">
            <div className="rounded-xl border border-line bg-surface-raised/50 p-6 sm:p-8">
              <p className="type-etiqueta text-ink-muted">Hoy, afuera</p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {AFUERA.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] leading-6 text-ink-muted">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-line text-ink-muted">
                      <X size={12} strokeWidth={2.6} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-dorado/60 bg-linear-to-br from-dorado-soft to-surface-raised p-6 shadow-[0_24px_60px_-28px_#d4b06a66] sm:p-8">
              <p className="type-etiqueta text-dorado">Con Petra, en tu salón</p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {CON_PETRA.map((t) => (
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
            {RAZONES.map(({ icono: Icono, titulo, texto }) => (
              <li key={titulo} className="flex flex-col items-center">
                {/* Ícono dentro de un arco, como la columna del logo */}
                <span className="flex h-16 w-13 items-end justify-center rounded-t-full border border-dorado/40 bg-dorado-soft pb-3 text-dorado">
                  <Icono size={22} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[22px] leading-7 text-ink">{titulo}</h3>
                <p className="type-cuerpo mt-2 max-w-[300px] text-ink-muted">{texto}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Todas las herramientas, como la pantalla de inicio de un celular */}
        <section
          id="apps"
          className="relative scroll-mt-20 overflow-hidden border-y border-line bg-noche/60 py-20 lg:py-28"
          aria-labelledby="titulo-todos"
        >
          {/* Dos luces suaves de la marca de fondo (decorativas): dorado y azul. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <span className="absolute -top-32 -left-24 size-96 rounded-full bg-dorado/10 blur-3xl" />
            <span className="absolute -right-24 -bottom-32 size-96 rounded-full bg-azul/15 blur-3xl" />
          </div>
          <div className={`${contenedor} relative`}>
            <Encabezado
              id="titulo-todos"
              ante="Webapps para invitados"
              centrado
              titulo={
                <>
                  Conocé las <span className="text-dorado">más de 30 webapps</span> que podés ofrecer
                </>
              }
              texto="Se abren desde el celular, sin bajar nada, con la marca de tu salón. Vos elegís cuáles sumar a cada fiesta."
            />
            <div className="mt-12">
              <TiendaApps />
            </div>
          </div>
        </section>

        {/* 4. Y si quiere, el salón se organiza con Petra */}
        <section id="gestion" className={`${contenedor} scroll-mt-20 py-20 lg:py-28`} aria-labelledby="titulo-gestion">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Encabezado
                id="titulo-gestion"
                ante="Y si querés"
                titulo={
                  <>
                    Organizá tu salón <span className="text-dorado">con Petra.</span>
                  </>
                }
                texto="Las fiestas, los cobros y tu equipo, ordenados en un solo lugar."
              />
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {GESTION.map(({ icono: Icono, texto }) => (
                  <li
                    key={texto}
                    className="flex items-center gap-3 rounded-lg border border-line bg-surface-raised p-4 text-[15px] leading-5 text-ink"
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

        {/* 5. Planes */}
        <section id="planes" className={`${contenedor} scroll-mt-20 py-20 lg:py-28`} aria-labelledby="titulo-planes">
          <Encabezado
            id="titulo-planes"
            ante="Planes"
            centrado
            titulo="Elegí el plan para tu salón"
            texto="Empezás gratis, sin tarjeta, y pasás de plan cuando quieras. No perdés nada de lo que cargaste."
          />
          <ul className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {PLANES.map((plan) => (
              <li
                key={plan.nombre}
                className={`relative flex flex-col rounded-xl border p-6 sm:p-7 ${
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

        {/* 6. Cierre: reseñas (cuando haya), la invitación a sumarse y quién está detrás */}
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
            <div className="relative mx-auto max-w-[760px] rounded-t-full border border-dorado/30 bg-linear-to-b from-dorado/10 via-surface-raised/40 to-surface-raised/70 px-6 pt-24 pb-10 text-center sm:px-12 sm:pt-32 sm:pb-12">
              <Antetitulo centrado>Tu salón sobre la roca</Antetitulo>
              <h2 id="titulo-cierre" className="type-titulo mt-5 text-ink">
                Que tus clientes no busquen <span className="text-dorado">nada afuera.</span>
              </h2>
              <p className="type-cuerpo mx-auto mt-3 max-w-[460px] text-ink-muted">
                Estamos sumando a los primeros salones. Empezá gratis y probalo en tu próxima fiesta.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={URL_REGISTRARME} className={botonPrincipal}>
                  Crear mi cuenta gratis
                  <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
                </a>
                <a href={URL_WHATSAPP} target="_blank" rel="noopener noreferrer" className={botonSecundario}>
                  <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
                  Escribinos por WhatsApp
                </a>
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

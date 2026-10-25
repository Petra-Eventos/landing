import { Calculator, ChefHat, ChevronDown, MailCheck, QrCode, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Firma, Piedras } from "@/components/logo";
import { FormularioAcceso } from "@/components/formulario-acceso";
import { Cielo } from "@/components/cielo";

const contenedor = "mx-auto w-full max-w-[1120px] px-4 md:px-8";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="type-etiqueta inline-flex items-center rounded-sm bg-oliva-soft px-2 py-1 text-oliva-text">
      {children}
    </span>
  );
}

const PROMESAS = [
  {
    titulo: "Con tu marca.",
    texto: "Tus clientes ven tu logo y tus colores. Petra queda atrás, sin hacer ruido.",
  },
  {
    titulo: "Solo lo que usás.",
    texto: "Activás las herramientas que te sirven, y listo.",
  },
  {
    titulo: "Menos lío el día del evento.",
    texto:
      "Confirmaciones, mesas y pedidos especiales, ordenados antes de que llegue el primer invitado.",
  },
];

const HERRAMIENTAS: { icono: LucideIcon; nombre: string; texto: string }[] = [
  {
    icono: MailCheck,
    nombre: "Invitación con RSVP",
    texto:
      "Una invitación digital con la marca de tu salón. Los invitados confirman en un toque y sabés cuántos vienen.",
  },
  {
    icono: ChefHat,
    nombre: "Menú especial para la cocina",
    texto: "Celíacos, veganos, alergias. Cada pedido especial llega a la cocina con nombre y mesa.",
  },
  {
    icono: QrCode,
    nombre: "Mesas con buscador por QR",
    texto: "Cada invitado encuentra su mesa en dos segundos. Chau fila frente al cartel.",
  },
  {
    icono: Calculator,
    nombre: "Simulador de presupuesto",
    texto:
      "Tus clientes arman su evento y ven un estimado al toque. A vos te llegan consultas más claras.",
  },
  {
    icono: Star,
    nombre: "Encuesta con reseña",
    texto:
      "Después del evento, una encuesta corta para saber cómo les fue. Y un empujoncito para que dejen su reseña.",
  },
];

// Para que la última fila quede prolija: en tablet 2+2+1 (la última ocupa todo el ancho),
// en escritorio 3 arriba y 2 abajo, más anchas.
const SPAN_HERRAMIENTA = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "md:col-span-2 lg:col-span-3",
];

const PASOS = [
  { titulo: "Te escribimos.", texto: "Por WhatsApp, para conocer tu salón." },
  {
    titulo: "Charlamos 15 minutos.",
    texto: "Si querés, nos contás cómo trabajás. Con eso armamos Petra.",
  },
  {
    titulo: "Sos de los primeros.",
    texto: "Cuando cada herramienta esté lista, la probás antes que nadie.",
  },
];

const PREGUNTAS = [
  {
    p: "¿Cuánto va a costar?",
    r: "Estamos definiendo los precios con los primeros salones. Va a haber planes según lo que necesites. Anotarte no tiene costo.",
  },
  {
    p: "¿Mis clientes van a ver la marca Petra?",
    r: "No. Ven tu logo y tus colores. Petra aparece solo como un “Hecho con Petra” chiquito al pie.",
  },
  {
    p: "¿Puedo usar solo una herramienta?",
    r: "Sí. Activás solo las que te sirven.",
  },
  {
    p: "¿Cuándo va a estar listo?",
    r: "Estamos diseñando las primeras herramientas con los salones que se anotan. Vas a ser de los primeros en enterarte.",
  },
];

export default function Home() {
  return (
    <>
      {/* Cielo estrellado de fondo */}
      <Cielo />
      {/* Viñeta: oscurece los bordes del fondo */}
      <div aria-hidden="true" className="vineta pointer-events-none fixed inset-0 -z-10" />

      {/* 1. Encabezado */}
      <header className={`${contenedor} flex items-center justify-between py-4`}>
        <a href="#" aria-label="Petra, inicio" className="rounded-md">
          <Firma variante="clara" />
        </a>
        <a
          href="#acceso"
          className="type-boton rounded-md px-2 py-2 text-azul-text underline-offset-4 hover:underline"
        >
          Anotarme
        </a>
      </header>

      <main className="flex flex-col gap-10 lg:gap-16">
        {/* 2. Hero */}
        <section className={`${contenedor} pt-12 pb-4 md:pt-20 lg:pt-24`} aria-labelledby="titular">
          <div className="max-w-[720px]">
            <Badge>Acceso anticipado</Badge>
            <h1 id="titular" className="type-display mt-5 text-ink">
              Tu salón, con lo digital resuelto.
            </h1>
            <p className="type-subtitulo mt-5 max-w-[620px] text-ink-muted">
              Las herramientas digitales que tu salón les da a sus clientes e invitados: invitación,
              mesas, menú para la cocina, presupuesto y encuesta. Todo con tu marca.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <a
                href="#acceso"
                className="type-boton inline-flex min-h-12 w-full items-center justify-center rounded-md bg-azul px-6 py-3 text-on-azul transition-colors hover:bg-azul-hover sm:w-auto"
              >
                Quiero acceso anticipado
              </a>
              <p className="text-[14px] leading-5 text-ink-muted">
                Estamos sumando a los primeros salones. Anotarte no tiene costo.
              </p>
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

        {/* 4. Las herramientas */}
        <section className={contenedor} aria-labelledby="herramientas">
          <h2 id="herramientas" className="type-titulo max-w-[640px] text-ink">
            Cinco herramientas. Una sola marca: la tuya.
          </h2>
          <p className="type-subtitulo mt-3 text-ink-muted">
            Salen de a una. Los salones anotados las prueban primero.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {HERRAMIENTAS.map(({ icono: Icono, nombre, texto }, i) => (
              <li
                key={nombre}
                className={`flex flex-col rounded-lg border border-line bg-surface-raised p-6 ${SPAN_HERRAMIENTA[i]}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <Icono size={24} strokeWidth={1.5} className="text-azul-text" aria-hidden="true" />
                  <Badge>Próximamente</Badge>
                </div>
                <h3 className="type-subtitulo mt-5 text-ink">{nombre}</h3>
                <p className="type-cuerpo mt-2 text-ink-muted">{texto}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Cómo sigue */}
        <section className={contenedor} aria-labelledby="como-sigue">
          <h2 id="como-sigue" className="type-titulo text-ink">
            ¿Qué pasa cuando te anotás?
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
            {PASOS.map((paso, i) => (
              <li key={paso.titulo} className="flex gap-4 md:flex-col md:gap-3">
                <span
                  aria-hidden="true"
                  className="font-display text-[40px] leading-none font-medium text-azul-text"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="type-subtitulo text-ink">{paso.titulo}</h3>
                  <p className="type-cuerpo mt-1 text-ink-muted">{paso.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 6. Preguntas */}
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
                <p className="type-cuerpo pb-5 pr-9 text-ink-muted">{item.r}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 7. Formulario */}
        <section
          id="acceso"
          className={`${contenedor} scroll-mt-6`}
          aria-labelledby="titulo-acceso"
        >
          <div className="mx-auto max-w-[640px]">
            <Piedras variante="clara" className="mx-auto mb-6 h-auto w-14" />
            <div className="rounded-lg border border-line bg-surface-raised p-5 shadow-piedra sm:p-8">
              <h2 id="titulo-acceso" className="type-titulo text-ink">
                Anotá tu salón
              </h2>
              <p className="type-subtitulo mt-2 mb-8 text-ink-muted">
                Te lleva un minuto. Te avisamos primero.
              </p>
              <FormularioAcceso />
            </div>
          </div>
        </section>
      </main>

      {/* 8. Cierre y pie */}
      <footer className="relative mt-10 overflow-hidden border-t border-line bg-noche text-ink lg:mt-16">
        <Cielo fijo={false} cantidad={90} semilla={21} conDestellos={false} />
        <div className={`${contenedor} relative py-14 lg:py-20`}>
          <p className="type-titulo max-w-[720px]">
            Somos pocos, vamos de a poco y queremos hacerlo con salones de verdad.
          </p>
          <a
            href="#acceso"
            className="type-boton mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-crema-claro px-6 py-3 text-noche transition-colors hover:bg-white sm:w-auto"
          >
            Quiero acceso anticipado
          </a>
          <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Firma variante="clara" />
            <p className="text-[14px] leading-5 text-crema-claro">© 2026 Petra</p>
          </div>
        </div>
      </footer>
    </>
  );
}

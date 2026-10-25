"use client";

import { useActionState, useRef, useState } from "react";
import { Check } from "lucide-react";
import { anotarSalon, type EstadoFormulario } from "@/app/actions";
import {
  EVENTOS_POR_MES,
  HERRAMIENTAS,
  leerFormulario,
  validar,
  type Campo,
  type Errores,
  type ValoresFormulario,
} from "@/lib/schema";

const ORDEN_CAMPOS: Campo[] = ["nombre", "salon", "localidad", "whatsapp", "email", "eventosPorMes"];

const inicial: EstadoFormulario = { estado: "inicial" };

export function FormularioAcceso() {
  const [estado, accion, enviando] = useActionState(anotarSalon, inicial);
  const [erroresCliente, setErroresCliente] = useState<Errores | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  if (estado.estado === "exito") {
    return (
      <div role="status" className="py-6 text-center">
        <p className="type-titulo text-ink">¡Listo! Ya estás en la lista.</p>
        <p className="type-subtitulo mt-2 text-ink-muted">Te escribimos pronto 🎉</p>
      </div>
    );
  }

  const valores: Partial<ValoresFormulario> =
    estado.estado === "invalido" || estado.estado === "error" ? estado.valores : {};
  const errores: Errores =
    erroresCliente ?? (estado.estado === "invalido" ? estado.errores : {});

  function enfocarPrimerError(e: Errores) {
    const primero = ORDEN_CAMPOS.find((c) => e[c]);
    if (!primero) return;
    const el = formRef.current?.querySelector<HTMLInputElement>(`[name="${primero}"]`);
    el?.focus();
  }

  function alEnviar(ev: React.FormEvent<HTMLFormElement>) {
    // Validamos antes de mandar para mostrar los errores al toque.
    // El servidor vuelve a validar igual.
    const r = validar(leerFormulario(new FormData(ev.currentTarget)));
    if (!r.ok) {
      ev.preventDefault();
      setErroresCliente(r.errores);
      enfocarPrimerError(r.errores);
      return;
    }
    setErroresCliente(null);
  }

  return (
    <form
      // La key hace que el formulario conserve lo escrito si el servidor devuelve un error.
      key={estado.estado === "inicial" ? "inicial" : `intento-${estado.intento}`}
      ref={formRef}
      action={accion}
      onSubmit={alEnviar}
      noValidate
      className="flex flex-col gap-6"
    >
      {/* Campo trampa para bots: oculto para personas y lectores de pantalla */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="sitio_web">No completar</label>
        <input id="sitio_web" name="sitio_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <CampoTexto
        nombre="nombre"
        label="Tu nombre"
        autoComplete="name"
        defecto={valores.nombre}
        error={errores.nombre}
      />
      <CampoTexto
        nombre="salon"
        label="Nombre del salón"
        autoComplete="organization"
        defecto={valores.salon}
        error={errores.salon}
      />
      <CampoTexto
        nombre="localidad"
        label="Localidad"
        placeholder="Ej.: Vicente López"
        autoComplete="address-level2"
        defecto={valores.localidad}
        error={errores.localidad}
      />
      <CampoTexto
        nombre="whatsapp"
        label="WhatsApp"
        placeholder="Ej.: 11 2345 6789"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        defecto={valores.whatsapp}
        error={errores.whatsapp}
      />
      <CampoTexto
        nombre="email"
        label="Mail"
        opcional
        type="email"
        inputMode="email"
        autoComplete="email"
        defecto={valores.email}
        error={errores.email}
      />

      <fieldset
        aria-describedby={errores.eventosPorMes ? "eventosPorMes-error" : undefined}
        aria-invalid={errores.eventosPorMes ? true : undefined}
      >
        <legend className="type-cuerpo mb-2 font-semibold text-ink">
          ¿Cuántos eventos hacen por mes, más o menos?
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {EVENTOS_POR_MES.map((op) => (
            <label
              key={op.value}
              className="opcion type-boton relative flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-line-strong bg-surface-raised px-3 py-3 text-center text-ink transition-colors hover:border-azul-text has-checked:border-azul has-checked:bg-azul has-checked:text-on-azul"
            >
              <input
                type="radio"
                name="eventosPorMes"
                value={op.value}
                defaultChecked={valores.eventosPorMes === op.value}
                className="sr-only"
              />
              {op.label}
            </label>
          ))}
        </div>
        <MensajeError id="eventosPorMes-error" texto={errores.eventosPorMes} />
      </fieldset>

      <fieldset>
        <legend className="type-cuerpo mb-2 font-semibold text-ink">
          ¿Qué herramientas te interesan?
        </legend>
        <div className="flex flex-col gap-2">
          {HERRAMIENTAS.map((h) => (
            <Casilla
              key={h.value}
              name="herramientas"
              value={h.value}
              defecto={valores.herramientas?.includes(h.value)}
            >
              {h.label}
            </Casilla>
          ))}
        </div>
      </fieldset>

      <Casilla name="aceptaCharla" value="si" defecto={valores.aceptaCharla} destacada>
        Me sumo a una charla de 15 minutos para contarles cómo trabaja mi salón.
      </Casilla>

      {estado.estado === "error" && (
        <p role="alert" className="type-cuerpo rounded-md border border-line bg-azul-soft px-4 py-3 text-ink">
          Uy, algo falló al guardar. Probá de nuevo en un ratito.
        </p>
      )}

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={enviando}
          aria-disabled={enviando}
          className="type-boton inline-flex min-h-12 w-full items-center justify-center rounded-md bg-azul px-6 py-3 text-on-azul transition-colors hover:bg-azul-hover disabled:cursor-wait disabled:opacity-70"
        >
          {enviando ? "Enviando…" : "Quiero acceso anticipado"}
        </button>
        <div className="flex flex-col gap-1 text-[14px] leading-5 text-ink-muted">
          <p>Usamos tus datos solo para hablar con vos sobre Petra. No los compartimos con nadie.</p>
          <p>¿Estás organizando tu fiesta? Pasale esta página a tu salón.</p>
        </div>
      </div>
    </form>
  );
}

function CampoTexto({
  nombre,
  label,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  opcional,
  defecto,
  error,
}: {
  nombre: Campo;
  label: string;
  placeholder?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  opcional?: boolean;
  defecto?: string;
  error?: string;
}) {
  const id = `campo-${nombre}`;
  const idError = `${nombre}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="type-cuerpo font-semibold text-ink">
        {label}
        {opcional && <span className="font-normal text-ink-muted"> (opcional)</span>}
      </label>
      <input
        id={id}
        name={nombre}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={defecto}
        required={!opcional}
        aria-required={!opcional}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? idError : undefined}
        className={`type-cuerpo min-h-12 w-full rounded-md border bg-surface-raised px-3 py-3 text-ink placeholder:text-ink-muted/70 hover:border-ink-muted ${
          error ? "border-oliva-text" : "border-line-strong"
        }`}
      />
      <MensajeError id={idError} texto={error} />
    </div>
  );
}

function Casilla({
  name,
  value,
  defecto,
  destacada,
  children,
}: {
  name: string;
  value: string;
  defecto?: boolean;
  destacada?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`opcion type-cuerpo flex cursor-pointer items-start gap-3 rounded-md border px-3 py-3 text-ink transition-colors hover:border-azul-text has-checked:border-azul-text ${
        destacada ? "border-line bg-azul-soft" : "border-line bg-surface-raised"
      }`}
    >
      <input type="checkbox" name={name} value={value} defaultChecked={defecto} className="peer sr-only" />
      <span
        aria-hidden="true"
        className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border border-ink-muted bg-surface-raised text-transparent peer-checked:border-azul peer-checked:bg-azul peer-checked:text-on-azul"
      >
        <Check size={14} strokeWidth={2.5} />
      </span>
      <span>{children}</span>
    </label>
  );
}

function MensajeError({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null;
  return (
    <p id={id} className="mt-1 text-[14px] font-semibold leading-5 text-oliva-text">
      {texto}
    </p>
  );
}

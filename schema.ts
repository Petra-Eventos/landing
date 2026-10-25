import { z } from "zod";

export const EVENTOS_POR_MES = [
  { value: "menos-de-4", label: "Menos de 4" },
  { value: "4-a-8", label: "De 4 a 8" },
  { value: "9-a-15", label: "De 9 a 15" },
  { value: "mas-de-15", label: "Más de 15" },
] as const;

export const HERRAMIENTAS = [
  { value: "invitacion", label: "Invitación con RSVP" },
  { value: "menu", label: "Menú especial para la cocina" },
  { value: "mesas", label: "Mesas con buscador por QR" },
  { value: "presupuesto", label: "Simulador de presupuesto" },
  { value: "encuesta", label: "Encuesta con reseña" },
] as const;

const FALTA = "Nos falta este dato.";

const obligatorio = z.string({ error: FALTA }).trim().min(1, FALTA).max(120, "Es un poco largo, acortalo.");

export const anotadoSchema = z.object({
  nombre: obligatorio,
  salon: obligatorio,
  localidad: obligatorio,
  whatsapp: z
    .string({ error: FALTA })
    .trim()
    .min(1, FALTA)
    .refine((v) => /^[\d\s\-+()]+$/.test(v), "Revisá el número, parece incompleto.")
    .refine((v) => {
      const digitos = v.replace(/\D/g, "").length;
      return digitos >= 10 && digitos <= 13;
    }, "Revisá el número, parece incompleto."),
  email: z
    .string()
    .trim()
    .max(200, "Ese mail parece incompleto.")
    .optional()
    .transform((v) => (v ? v : undefined))
    .pipe(z.email("Ese mail parece incompleto.").optional()),
  eventosPorMes: z.enum(["menos-de-4", "4-a-8", "9-a-15", "mas-de-15"], { error: FALTA }),
  herramientas: z.array(z.enum(["invitacion", "menu", "mesas", "presupuesto", "encuesta"])),
  aceptaCharla: z.boolean(),
});

export type Anotado = z.infer<typeof anotadoSchema>;

export type Campo = "nombre" | "salon" | "localidad" | "whatsapp" | "email" | "eventosPorMes";
export type Errores = Partial<Record<Campo, string>>;

/** Pasa el FormData del formulario a un objeto plano para validar. */
export function leerFormulario(fd: FormData) {
  const texto = (k: string) => {
    const v = fd.get(k);
    return typeof v === "string" ? v : undefined;
  };
  return {
    nombre: texto("nombre") ?? "",
    salon: texto("salon") ?? "",
    localidad: texto("localidad") ?? "",
    whatsapp: texto("whatsapp") ?? "",
    email: texto("email") ?? "",
    eventosPorMes: texto("eventosPorMes"),
    herramientas: fd.getAll("herramientas").filter((v): v is string => typeof v === "string"),
    aceptaCharla: fd.get("aceptaCharla") === "si",
  };
}

export type ValoresFormulario = ReturnType<typeof leerFormulario>;

/** Valida y devuelve los datos limpios o los errores por campo. */
export function validar(valores: ValoresFormulario):
  | { ok: true; datos: Anotado }
  | { ok: false; errores: Errores } {
  const r = anotadoSchema.safeParse(valores);
  if (r.success) return { ok: true, datos: r.data };
  const errores: Errores = {};
  for (const issue of r.error.issues) {
    const campo = issue.path[0] as Campo;
    if (campo && !errores[campo]) errores[campo] = issue.message;
  }
  return { ok: false, errores };
}

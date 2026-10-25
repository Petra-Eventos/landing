"use server";

import { guardarAnotado } from "@/lib/anotados";
import { leerFormulario, validar, type Errores, type ValoresFormulario } from "@/lib/schema";

export type EstadoFormulario =
  | { estado: "inicial" }
  | { estado: "exito" }
  | { estado: "invalido"; errores: Errores; valores: ValoresFormulario; intento: number }
  | { estado: "error"; valores: ValoresFormulario; intento: number };

export async function anotarSalon(_prev: EstadoFormulario, fd: FormData): Promise<EstadoFormulario> {
  // Campo trampa para bots: si viene lleno, respondemos éxito y descartamos los datos.
  const trampa = fd.get("sitio_web");
  if (typeof trampa === "string" && trampa.trim() !== "") {
    return { estado: "exito" };
  }

  const valores = leerFormulario(fd);
  const resultado = validar(valores);
  if (!resultado.ok) {
    return { estado: "invalido", errores: resultado.errores, valores, intento: Date.now() };
  }

  try {
    const guardado = await guardarAnotado(resultado.datos);
    if (!guardado.ok) return { estado: "error", valores, intento: Date.now() };
    return { estado: "exito" };
  } catch (e) {
    console.error("[anotado] error al guardar", e);
    return { estado: "error", valores, intento: Date.now() };
  }
}

import "server-only";
import type { Anotado } from "./schema";

/**
 * Guarda un salón anotado al acceso anticipado.
 * Por ahora NO guarda nada: solo lo muestra en los logs del servidor.
 */
export async function guardarAnotado(datos: Anotado): Promise<{ ok: true } | { ok: false }> {
  // TODO: conectar a Supabase (tabla anotados)
  console.log("[anotado]", JSON.stringify({ ...datos, fecha: new Date().toISOString() }));
  return { ok: true };
}

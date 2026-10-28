/**
 * Links al sistema de Petra. La dirección se cambia con NEXT_PUBLIC_URL_SISTEMA
 * (por ejemplo, cuando el sistema pase a app.petraeventos.com).
 */
const SISTEMA = (process.env.NEXT_PUBLIC_URL_SISTEMA ?? "https://sistema-one-wheat.vercel.app").replace(/\/$/, "");

/** Crear la cuenta gratis (con Google). */
export const URL_REGISTRARME = `${SISTEMA}/registrarme`;

/** Entrar al sistema con una cuenta que ya existe. */
export const URL_ENTRAR = `${SISTEMA}/entrar`;

export const URL_TERMINOS = `${SISTEMA}/terminos`;
export const URL_PRIVACIDAD = `${SISTEMA}/privacidad`;

/** WhatsApp de Petra, con un mensaje ya escrito. */
export const URL_WHATSAPP = `https://wa.me/5491139561326?text=${encodeURIComponent(
  "Hola, quiero saber más de Petra para mi salón.",
)}`;

/** WhatsApp para pedir el cotizador (mientras se suma a Petra, los salones lo piden por acá). */
export const URL_WHATSAPP_COTIZADOR = `https://wa.me/5491139561326?text=${encodeURIComponent(
  "Hola, quiero el cotizador de Petra para mi salón.",
)}`;

/** WhatsApp para quien quiere ser socio de Petra (gestión total del salón). */
export const URL_SOCIOS = `https://wa.me/5491139561326?text=${encodeURIComponent(
  "Hola, quiero ser socio de Petra y que gestionen todo mi salón.",
)}`;

import { MessageCircle } from "lucide-react";
import { URL_INSTAGRAM, URL_WHATSAPP } from "@/lib/enlaces";

/** Logo de Instagram dibujado simple (lucide ya no trae logos de marcas). */
export function LogoInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Link a Instagram para el pie de página. */
export function LinkInstagram({ className }: { className?: string }) {
  return (
    <a href={URL_INSTAGRAM} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${className ?? ""}`}>
      <LogoInstagram size={16} />
      Instagram
    </a>
  );
}

/**
 * Botón flotante de WhatsApp, abajo a la derecha en todas las pantallas.
 * Verde de WhatsApp (color de marca de WhatsApp, no de Petra) para que se reconozca al toque.
 */
export function BotonWhatsApp() {
  return (
    <a
      href={URL_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      title="Escribinos por WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_24px_-6px_#0006] transition-transform hover:scale-105 focus-visible:scale-105 sm:right-6 sm:bottom-6"
    >
      <MessageCircle size={28} strokeWidth={2.2} aria-hidden="true" />
    </a>
  );
}

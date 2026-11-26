/*
 * Pantalla de carga: el pilar de Petra se arma de abajo hacia arriba mientras carga la página,
 * para que no se vea todo apareciendo por partes.
 * Las piezas son las del isotipo, tal cual (components/logo.tsx): solo se anima su aparición.
 *
 * Cómo funciona (sin depender de React, para que actúe antes que todo):
 * - En <head>, CARGA_INICIO marca <html> con "cargando". Solo con esa marca se ve la pantalla y se
 *   pausan las animaciones de la página. Sin JavaScript no hay marca: la web se ve normal.
 * - CARGA_FIN la saca apenas bajaron las dos tipografías (Fraunces y Manrope), para que el texto no
 *   "salte" al aparecer. No espera la foto de fondo ni el resto del código: aparecen cuando llegan.
 *   Tiene un mínimo de 0,4 s para que no parpadee y un máximo de 2,5 s por si algo tarda.
 *   Avisa con el evento "petra:lista".
 */

export const CARGA_INICIO = `document.documentElement.classList.add("cargando");`;

export const CARGA_FIN = `(function(){var h=document.documentElement,hecho=false;
function listo(){if(hecho)return;hecho=true;var falta=Math.max(0,400-performance.now());
setTimeout(function(){h.classList.add("carga-lista");setTimeout(function(){h.classList.remove("cargando","carga-lista");
window.dispatchEvent(new Event("petra:lista"));},300);},falta);}
try{var cs=getComputedStyle(h),fam=function(v){return cs.getPropertyValue(v).split(",")[0];};
Promise.all([document.fonts.load("600 40px "+fam("--font-fraunces")),document.fonts.load("400 16px "+fam("--font-manrope"))]).then(listo,listo);}catch(e){listo();}
setTimeout(listo,2500);})();`;

const AZUL = "#1C79A4";
const OLIVA = "#6B7A3A";

// Piezas de abajo hacia arriba (el orden en que se arman).
const PIEZAS = [
  <polygon key="base" points="28,103.5 92,101 93,109.5 27,111.5" fill={OLIVA} />,
  <polygon key="escalon-3" points="33,91.5 87,89 89,98.5 31,100.5" fill={AZUL} />,
  <polygon key="escalon-2" points="39,80 81,77.5 83,86.5 37,88.5" fill={AZUL} />,
  <rect key="escalon-1" x="46" y="72" width="28" height="4" fill={AZUL} />,
  <path key="columna" fillRule="evenodd" fill={AZUL} d="M50 43h20v29h-20zM54.5 46h3v23h-3zM62.5 46h3v23h-3z" />,
  <polygon key="capitel" points="46,37.5 74,37.5 71,42 49,42" fill={AZUL} />,
  <rect key="techo" x="42" y="30" width="36" height="6" fill={AZUL} />,
];

export function PantallaCarga() {
  return (
    <div id="pantalla-carga" role="status" aria-live="polite">
      <svg viewBox="25 28 70 86" width="84" height="103" aria-hidden="true" focusable="false">
        {PIEZAS.map((p, i) => (
          <g key={i} className="pieza-pilar" style={{ animationDelay: `${i * 0.12}s` }}>
            {p}
          </g>
        ))}
      </svg>
      <span className="sr-only">Cargando Petra…</span>
    </div>
  );
}

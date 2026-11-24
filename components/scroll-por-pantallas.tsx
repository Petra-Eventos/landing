"use client";

import { useEffect } from "react";

/*
 * Scroll de a una pantalla en la compu: cada giro de rueda (o gesto del touchpad) lleva a la sección
 * siguiente o a la anterior, con un desplazamiento suave. Si una sección es más alta que la pantalla,
 * la recorre de a una pantalla. Solo con mouse o touchpad en pantallas de compu (1024 px o más);
 * en el celular, con el teclado o con Ctrl + rueda (zoom) todo sigue igual que siempre.
 */

const DURACION_MS = 750;
// Después de llegar, espera a que el touchpad deje de mandar "inercia" antes de aceptar otro gesto.
const SILENCIO_MS = 160;

function suave(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Los lugares donde puede quedar la página: el principio de cada sección y, en las altas, cada pantalla. */
function paradas(): number[] {
  const alto = window.innerHeight;
  const cabecera = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
  const maximo = document.documentElement.scrollHeight - alto;
  const util = alto - cabecera;
  const lista: number[] = [0, maximo];
  document.querySelectorAll<HTMLElement>("main > section, body > footer").forEach((s) => {
    const arriba = s.getBoundingClientRect().top + window.scrollY - cabecera;
    const fin = arriba + s.offsetHeight;
    // Siempre para al principio de la sección. Si es alta, también de a una pantalla por dentro,
    // pero no en el pedacito que sobra al final.
    lista.push(arriba);
    for (let y = arriba + util; y < fin - util * 0.8; y += util) lista.push(y);
  });
  return [...new Set(lista.map((y) => Math.round(Math.min(Math.max(y, 0), maximo))))].sort((a, b) => a - b);
}

export function ScrollPorPantallas() {
  useEffect(() => {
    const compu = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    let ocupado = false;
    let ultimaRueda = 0;
    let liberar = 0;

    function irA(destino: number) {
      ocupado = true;
      const inicio = window.scrollY;
      const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duracion = reducido ? 0 : DURACION_MS;
      const t0 = performance.now();
      const paso = (ahora: number) => {
        const t = duracion ? Math.min(1, (ahora - t0) / duracion) : 1;
        // "instant": la página tiene scroll-behavior smooth (para los links #); acá el suave lo hacemos nosotros.
        window.scrollTo({ top: inicio + (destino - inicio) * suave(t), behavior: "instant" });
        if (t < 1) requestAnimationFrame(paso);
        else esperarSilencio();
      };
      requestAnimationFrame(paso);
    }

    // Se libera recién cuando la rueda queda quieta un momento (así un solo gesto = una pantalla).
    function esperarSilencio() {
      window.clearTimeout(liberar);
      const falta = SILENCIO_MS - (performance.now() - ultimaRueda);
      if (falta > 0) liberar = window.setTimeout(esperarSilencio, falta);
      else ocupado = false;
    }

    function rueda(e: WheelEvent) {
      if (!compu.matches || e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      // No se mete con lo que se desplaza por dentro (por ejemplo, una lista con su propia barra).
      const objetivo = e.target as Element | null;
      if (objetivo?.closest("[data-scroll-libre]")) return;
      e.preventDefault();
      ultimaRueda = performance.now();
      if (ocupado) return;
      const y = window.scrollY;
      const lista = paradas();
      const destino = e.deltaY > 0 ? lista.find((p) => p > y + 4) : [...lista].reverse().find((p) => p < y - 4);
      if (destino === undefined) return;
      irA(destino);
    }

    window.addEventListener("wheel", rueda, { passive: false });
    return () => {
      window.removeEventListener("wheel", rueda);
      window.clearTimeout(liberar);
    };
  }, []);

  return null;
}

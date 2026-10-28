/*
 * La cuenta del cotizador de la demo de la landing. Precios de ejemplo (no son de ningún salón):
 * sirven para mostrar cómo el total cambia con cada elección. No guarda nada.
 * El cotizador de verdad va a calcular el precio en la base del sistema.
 */

export type IdFestejo = "xv" | "casamiento" | "cumple" | "empresarial";
export type IdMenu = "clasico" | "premium" | "finger";
export type IdBarra = "sin" | "clasica" | "premium";
export type IdExtra = "invitacion" | "lista_mesas" | "camara" | "trivia";

export const FESTEJOS: { id: IdFestejo; nombre: string; corto: string }[] = [
  { id: "xv", nombre: "XV años", corto: "un XV" },
  { id: "casamiento", nombre: "Casamiento", corto: "un casamiento" },
  { id: "cumple", nombre: "Cumpleaños", corto: "un cumpleaños" },
  { id: "empresarial", nombre: "Empresarial", corto: "un evento de empresa" },
];

// Por invitado.
export const MENUS: { id: IdMenu; nombre: string; precio: number }[] = [
  { id: "clasico", nombre: "Clásico", precio: 62000 },
  { id: "premium", nombre: "Premium", precio: 78000 },
  { id: "finger", nombre: "Finger food", precio: 48000 },
];

// Por invitado.
export const BARRAS: { id: IdBarra; nombre: string; precio: number }[] = [
  { id: "sin", nombre: "Sin barra", precio: 0 },
  { id: "clasica", nombre: "Clásica", precio: 18000 },
  { id: "premium", nombre: "Premium", precio: 27000 },
];

// Productos de Petra que el salón ofrece como extra, con su precio fijo.
export const EXTRAS: { id: IdExtra; nombre: string; precio: number }[] = [
  { id: "invitacion", nombre: "Invitación digital", precio: 45000 },
  { id: "lista_mesas", nombre: "Lista y mesas", precio: 35000 },
  { id: "camara", nombre: "Cámara instantánea", precio: 60000 },
  { id: "trivia", nombre: "Trivia en pantalla", precio: 55000 },
];

/** Lo que trae el salón sin costo aparte. */
export const INCLUIDO = ["DJ y sonido", "Decoración"];

export const PRECIO_SALON = 3500000;
/** Recargo de los sábados sobre el precio del salón, en %. */
export const RECARGO_SABADO = 20;

export const INVITADOS_MIN = 50;
export const CAPACIDAD = 300;
export const INVITADOS_PASO = 10;

/*
 * El mes de la demo: marzo de 2027 (arranca un lunes). Días ocupados de ejemplo.
 * Se muestra un mes fijo a propósito: así el servidor y el navegador dibujan lo mismo.
 */
export const MES = { nombre: "Marzo 2027", dias: 31, primerDia: 0 };
export const OCUPADOS = new Set([6, 12, 20, 27]);
export const DIAS_SEMANA = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

/** 0 = lunes … 6 = domingo. */
export function diaDeSemana(dia: number): number {
  return (MES.primerDia + dia - 1) % 7;
}

export function esSabado(dia: number): boolean {
  return diaDeSemana(dia) === 5;
}

export type Seleccion = {
  festejo: IdFestejo;
  dia: number;
  invitados: number;
  menu: IdMenu;
  barra: IdBarra;
  extras: IdExtra[];
};

export const SELECCION_INICIAL: Seleccion = {
  festejo: "xv",
  dia: 13,
  invitados: 150,
  menu: "premium",
  barra: "clasica",
  extras: ["invitacion", "camara"],
};

/** El precio sugerido: salón (con recargo si es sábado) + menú y barra por invitado + extras. */
export function precioSugerido(s: Seleccion): number {
  const salon = esSabado(s.dia) ? Math.round(PRECIO_SALON * (1 + RECARGO_SABADO / 100)) : PRECIO_SALON;
  const menu = (MENUS.find((m) => m.id === s.menu)?.precio ?? 0) * s.invitados;
  const barra = (BARRAS.find((b) => b.id === s.barra)?.precio ?? 0) * s.invitados;
  const extras = EXTRAS.filter((e) => s.extras.includes(e.id)).reduce((t, e) => t + e.precio, 0);
  return salon + menu + barra + extras;
}

/** "$ 18.705.000". A mano y no con Intl, para que el servidor y el navegador escriban igual. */
export function pesos(n: number): string {
  return `$ ${Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

/** "Sábado 13 de marzo". */
export function fechaLarga(dia: number): string {
  return `${DIAS_SEMANA[diaDeSemana(dia)]} ${dia} de marzo`;
}

/** "Sáb 13/3". */
export function fechaCorta(dia: number): string {
  return `${DIAS_SEMANA[diaDeSemana(dia)].slice(0, 3)} ${dia}/3`;
}

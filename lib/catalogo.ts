/*
 * Planes que muestra la landing. Copiados del catálogo del sistema
 * (tabla planes): si allá cambia un nombre o lo que trae cada plan, se cambia acá.
 */

export type Plan = "Básico" | "Salón" | "Completo";

export type PlanLanding = {
  nombre: Plan;
  lema: string;
  trae: string[];
  destacado?: boolean;
};

/**
 * Los 3 planes pagos. Los lemas son los de Mi plan en el sistema.
 * Sin precio a propósito: los del sistema todavía son de ejemplo. Cuando Rodri los confirme, se agregan.
 */
export const PLANES: PlanLanding[] = [
  {
    nombre: "Básico",
    lema: "Lo esencial para que cada fiesta salga redonda.",
    trae: ["Invitación, lista de invitados y mesas", "Link para tus clientes", "Cobros y balance de cada fiesta"],
  },
  {
    nombre: "Salón",
    lema: "Para el salón que quiere sorprender en cada evento.",
    trae: ["Todo lo del Básico", "Juegos y momentos en pantalla", "Administración: cuotas y presupuestos"],
    destacado: true,
  },
  {
    nombre: "Completo",
    lema: "Todo Petra: la noche más completa y tu administración al día.",
    trae: ["Todo lo del Salón", "Todas las herramientas para invitados", "Soporte personalizado"],
  },
];

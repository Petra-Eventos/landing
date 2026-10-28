/*
 * Productos y planes que muestra la landing. Copiados del catálogo del sistema
 * (tabla herramientas y planes): si allá cambia un nombre, un plan o un estado, se cambia acá.
 * "ya" = disponible hoy; el resto dice "Próximamente".
 */

export type Plan = "Básico" | "Salón" | "Completo";

export type Producto = { id: string; nombre: string; texto: string; plan: Plan; ya?: boolean };

/** Los 3 que se prueban en el simulador. */
export const DESTACADOS: Producto[] = [
  { id: "invitacion", nombre: "Invitación digital", texto: "Con confirmación de asistencia en un toque.", plan: "Básico" },
  {
    id: "lista_invitados",
    nombre: "Lista de invitados",
    texto: "Los anfitriones cargan a sus invitados y ven quién confirma, desde un link.",
    plan: "Básico",
    ya: true,
  },
  {
    id: "armado_mesas",
    nombre: "Armado de mesas",
    texto: "Los anfitriones arman las mesas de su fiesta desde el celular.",
    plan: "Básico",
    ya: true,
  },
];

/** El resto de los productos para invitados, en tarjetas. */
export const OTROS: Producto[] = [
  { id: "camara", nombre: "Cámara instantánea", texto: "Un rollo de fotos por invitado que se revela al otro día.", plan: "Básico" },
  { id: "pedido_canciones", nombre: "Pedido de canciones", texto: "Los invitados le piden temas al DJ.", plan: "Básico" },
  { id: "libro_firmas", nombre: "Libro de firmas", texto: "Mensajes de los invitados para quien festeja.", plan: "Básico" },
  { id: "ruleta", nombre: "Ruleta", texto: "Sorteos y retos en la pantalla del salón.", plan: "Básico" },
  { id: "cronograma", nombre: "Cronograma de la noche", texto: "Qué pasa y a qué hora.", plan: "Básico" },
  { id: "trivia", nombre: "Trivia", texto: "Preguntas sobre quien festeja, con ranking en vivo.", plan: "Salón" },
  { id: "votaciones", nombre: "Votaciones", texto: "Votos en vivo: mejor look, mejor baile.", plan: "Salón" },
  { id: "historia_fotos", nombre: "Historia en fotos", texto: "La vida de quien festeja, en la pantalla.", plan: "Salón" },
  { id: "regalos", nombre: "Regalos", texto: "Lista de regalos o datos para transferir.", plan: "Salón" },
  { id: "muro_fotos", nombre: "Muro de fotos en vivo", texto: "Las fotos de la noche en la pantalla.", plan: "Completo" },
  { id: "bingo", nombre: "Bingo", texto: "El bingo de la fiesta en el celular.", plan: "Completo" },
  { id: "videosaludos", nombre: "Videosaludos", texto: "Saludos en video de los que no pudieron venir.", plan: "Completo" },
  { id: "bienvenida_pantalla", nombre: "Bienvenida en pantalla", texto: "El nombre de cada invitado al llegar.", plan: "Completo" },
  { id: "marco_historias", nombre: "Marco para historias", texto: "Un marco con la marca del evento para redes.", plan: "Completo" },
  { id: "aviso_padres", nombre: "Aviso a padres", texto: "Aviso a los padres cuando termina la fiesta.", plan: "Completo" },
  { id: "video_resumen", nombre: "Video resumen", texto: "Un video corto con lo mejor de la noche.", plan: "Completo" },
];

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
    trae: ["Invitación, lista de invitados y mesas", "Link para los anfitriones", "Cobros y balance de cada fiesta"],
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

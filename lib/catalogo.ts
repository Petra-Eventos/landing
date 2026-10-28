/*
 * Productos y planes que muestra la landing. Copiados del catálogo del sistema
 * (tabla herramientas y planes): si allá cambia un nombre, un plan o un estado, se cambia acá.
 * "ya" = disponible hoy; el resto dice "Próximamente".
 */

export type Plan = "Básico" | "Salón" | "Completo";

/** Para agrupar y colorear las apps en la landing. */
export type Categoria = "Organización" | "Fotos y video" | "Juegos" | "Pantalla" | "Recuerdos" | "Música";

export type Producto = { id: string; nombre: string; texto: string; plan: Plan; categoria: Categoria; ya?: boolean };

/** Las 3 apps principales: van primeras en la cuadrícula. */
export const DESTACADOS: Producto[] = [
  { id: "invitacion", nombre: "Invitación digital", texto: "Con confirmación de asistencia en un toque.", plan: "Básico", categoria: "Organización" },
  {
    id: "lista_invitados",
    nombre: "Lista de invitados",
    texto: "Tus clientes cargan a sus invitados y ven quién confirma, desde un link.",
    plan: "Básico",
    categoria: "Organización",
    ya: true,
  },
  {
    id: "armado_mesas",
    nombre: "Armado de mesas",
    texto: "Tus clientes arman las mesas de su fiesta desde el celular.",
    plan: "Básico",
    categoria: "Organización",
    ya: true,
  },
];

/** El resto de los productos para invitados (todos los del catálogo del sistema), agrupados por categoría. */
export const OTROS: Producto[] = [
  { id: "cronograma", nombre: "Cronograma de la noche", texto: "Qué pasa y a qué hora.", plan: "Básico", categoria: "Organización" },
  { id: "turnos_foto", nombre: "Turnos de foto", texto: "Cada mesa sabe cuándo le toca la foto.", plan: "Salón", categoria: "Organización" },
  { id: "carta_noche", nombre: "Carta de la noche", texto: "Menú y tragos de la fiesta en el celular.", plan: "Completo", categoria: "Organización" },
  { id: "mapa_salon", nombre: "Mapa del salón", texto: "Dónde está cada cosa: mesas, baños, guardarropa.", plan: "Completo", categoria: "Organización" },
  { id: "objetos_perdidos", nombre: "Objetos perdidos", texto: "Avisar y encontrar lo que se perdió.", plan: "Completo", categoria: "Organización" },
  { id: "aviso_padres", nombre: "Aviso a padres", texto: "Aviso a los padres cuando termina la fiesta.", plan: "Completo", categoria: "Organización" },
  { id: "camara", nombre: "Cámara instantánea", texto: "Un rollo de fotos por invitado que se revela al otro día.", plan: "Básico", categoria: "Fotos y video" },
  { id: "historia_fotos", nombre: "Historia en fotos", texto: "La vida de quien festeja, en la pantalla.", plan: "Salón", categoria: "Fotos y video" },
  { id: "muro_fotos", nombre: "Muro de fotos", texto: "Las fotos de la noche en la pantalla, en vivo.", plan: "Completo", categoria: "Fotos y video" },
  { id: "videosaludos", nombre: "Videosaludos", texto: "Saludos en video de los que no pudieron venir.", plan: "Completo", categoria: "Fotos y video" },
  { id: "marco_historias", nombre: "Marco para historias", texto: "Un marco con la marca del evento para redes.", plan: "Completo", categoria: "Fotos y video" },
  { id: "video_resumen", nombre: "Video resumen", texto: "Un video corto con lo mejor de la noche.", plan: "Completo", categoria: "Fotos y video" },
  { id: "ruleta", nombre: "Ruleta", texto: "Sorteos y retos en la pantalla del salón.", plan: "Básico", categoria: "Juegos" },
  { id: "trivia", nombre: "Trivia", texto: "Preguntas sobre quien festeja, con ranking en vivo.", plan: "Salón", categoria: "Juegos" },
  { id: "caza_tesoro", nombre: "Caza del tesoro", texto: "Figuritas escondidas en el salón con QR.", plan: "Salón", categoria: "Juegos" },
  { id: "votaciones", nombre: "Votaciones", texto: "Votos en vivo: mejor look, mejor baile.", plan: "Salón", categoria: "Juegos" },
  { id: "bingo", nombre: "Bingo", texto: "El bingo de la fiesta en el celular.", plan: "Completo", categoria: "Juegos" },
  { id: "prode", nombre: "Prode de la fiesta", texto: "Apuestas sin plata sobre lo que va a pasar.", plan: "Completo", categoria: "Juegos" },
  { id: "retos", nombre: "Retos", texto: "Desafíos para las mesas durante la noche.", plan: "Completo", categoria: "Juegos" },
  { id: "memotest", nombre: "Memotest", texto: "Juego de memoria con fotos de quien festeja.", plan: "Completo", categoria: "Juegos" },
  { id: "competencia_mesas", nombre: "Competencia de mesas", texto: "Las mesas suman puntos toda la noche.", plan: "Completo", categoria: "Juegos" },
  { id: "mensajes_pantalla", nombre: "Mensajes en pantalla", texto: "Mensajes de los invitados, con moderación.", plan: "Completo", categoria: "Pantalla" },
  { id: "bienvenida_pantalla", nombre: "Bienvenida en pantalla", texto: "El nombre de cada invitado al llegar.", plan: "Completo", categoria: "Pantalla" },
  { id: "estadisticas_pantalla", nombre: "Estadísticas en vivo", texto: "Datos curiosos de la noche en la pantalla.", plan: "Completo", categoria: "Pantalla" },
  { id: "pedido_canciones", nombre: "Pedido de canciones", texto: "Los invitados le piden temas al DJ.", plan: "Básico", categoria: "Música" },
  { id: "libro_firmas", nombre: "Libro de firmas", texto: "Mensajes de los invitados para quien festeja.", plan: "Básico", categoria: "Recuerdos" },
  { id: "regalos", nombre: "Regalos", texto: "Lista de regalos o datos para transferir.", plan: "Salón", categoria: "Recuerdos" },
  { id: "capsula_tiempo", nombre: "Cápsula del tiempo", texto: "Mensajes que se abren dentro de un año.", plan: "Completo", categoria: "Recuerdos" },
  { id: "tarjeta_agradecimiento", nombre: "Tarjeta de agradecimiento", texto: "Un gracias digital después de la fiesta.", plan: "Completo", categoria: "Recuerdos" },
];

/** Todas las apps para invitados: las 3 principales primero. */
export const APPS: Producto[] = [...DESTACADOS, ...OTROS];

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

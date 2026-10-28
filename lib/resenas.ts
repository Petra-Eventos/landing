/*
 * Reseñas y salones que trabajan con Petra. Solo datos REALES y con permiso del salón:
 * nunca inventar reseñas ni poner un salón sin su acuerdo.
 * Mientras las listas estén vacías, la landing invita a ser de los primeros.
 */

export type Resena = { texto: string; nombre: string; salon: string; ciudad?: string };

export const RESENAS: Resena[] = [];

/** Nombres de los salones que ya usan Petra (con su permiso). */
export const SALONES: string[] = [];

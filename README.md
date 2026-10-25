# Petra · Landing de acceso anticipado

Landing de una sola página para medir interés de salones de eventos.
Hecha con Next.js 16, TypeScript, Tailwind 4 y zod.

> ⚠️ **El formulario todavía no guarda datos.** Solo los muestra en los logs del servidor.
> No publicar hasta conectarlo a Supabase (ver abajo).

## Verla en tu compu

Necesitás Node.js 20 o más nuevo.

```bash
npm install
npm run dev
```

Y abrí http://localhost:3000. Cuando alguien se anota, los datos aparecen en la terminal con `[anotado]`.

## Dónde está cada cosa

| Archivo | Qué tiene |
|---|---|
| `app/page.tsx` | Todas las secciones y sus textos |
| `app/globals.css` | Tokens de marca (colores de la versión nocturna, tipografía, esquinas) |
| `components/cielo.tsx` | Cielo estrellado de fondo (estrellas, destellos y constelación) |
| `components/logo.tsx` | Isotipo, firma y recurso de las piedras (no modificar) |
| `components/formulario-acceso.tsx` | El formulario |
| `lib/schema.ts` | Validación de los campos y mensajes de error |
| `app/actions.ts` | Server Action que recibe el formulario (con campo trampa para bots) |
| `lib/anotados.ts` | `guardarAnotado()`: **acá se conecta Supabase** |
| `app/icon.svg` | Favicon |
| `app/fonts/` | Fraunces y Manrope, incluidas en el proyecto (licencia OFL) |

## Para conectar el formulario

Solo hay que cambiar `lib/anotados.ts` (está marcado con `// TODO: conectar a Supabase (tabla anotados)`).
El resto del formulario ya está listo. La tabla debería tener estas columnas:
`nombre`, `salon`, `localidad`, `whatsapp`, `email` (opcional), `eventos_por_mes`,
`herramientas` (lista), `acepta_charla` y la fecha.

## Notas

- **Versión nocturna:** fondo de noche con estrellas. Las estrellas titilan, salvo que la persona tenga activado "reducir movimiento" en su celular o compu. Los colores se cambian todos desde `app/globals.css`.

- Las fuentes están dentro del proyecto en vez de bajarse de Google Fonts: se ven igual y no dependen de Google.
- No hay variables de entorno ni conexiones a ninguna cuenta.

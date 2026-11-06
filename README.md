# Petra · Landing

La página de presentación de Petra (petraeventos.com). Una sola página que cuenta qué es Petra y lleva al sistema:
**"Crear mi cuenta gratis"** (`/registrarme`) y **"Entrar al sistema"** (`/entrar`).

Hecha con Next.js 16, TypeScript y Tailwind 4. No tiene base de datos ni variables secretas.

## Verla en tu compu

Necesitás Node.js 20 o más nuevo.

```bash
npm install
npm run dev
```

Y abrí http://localhost:3000.

## Dónde está cada cosa

| Archivo                | Qué tiene                                                                    |
| ---------------------- | ---------------------------------------------------------------------------- |
| `app/page.tsx`         | Todas las secciones y sus textos                                             |
| `app/layout.tsx`       | Título y descripción para Google y WhatsApp                                  |
| `app/globals.css`      | Tokens de marca (colores de la versión nocturna, tipografía, esquinas)       |
| `components/escena-noche.tsx` | El salón de noche con las lamparitas (primera pantalla y cierre)      |
| `components/cotizacion-en-linea.tsx` | La frase de la primera pantalla: tocás una palabra y cambia el precio |
| `components/historia.tsx` | Los tres pasos: el dibujo queda quieto y cambia al bajar                  |
| `components/riel.tsx`  | Las tarjetas de colores que se deslizan de costado                           |
| `components/cotizador-demo.tsx` | La demo del celular, con las dos vistas                             |
| `components/logo.tsx`  | Isotipo, firma y recurso de las piedras (no modificar)                       |
| `lib/enlaces.ts`       | Links al sistema (registrarme, entrar, términos, privacidad) y al WhatsApp   |
| `app/icon.svg`         | Favicon                                                                      |
| `app/fonts/`           | Fraunces y Manrope, incluidas en el proyecto (licencia OFL)                  |

## La dirección del sistema

Los botones apuntan a `https://app.petraeventos.com`. Si hace falta otra dirección (por ejemplo, una preview),
se cambia en Vercel con la variable `NEXT_PUBLIC_URL_SISTEMA`, sin tocar el código.

## Notas

- **Versión nocturna:** un salón de noche cuyas lamparitas se prenden al cargar, salvo que la persona tenga activado
  "reducir movimiento". Es el único movimiento que arranca solo. Los colores se cambian desde `app/globals.css`.
- **Una sola acción:** "Armá tu cotizador gratis" en toda la página. WhatsApp y el cotizador de ejemplo van como links.
- Las fuentes están dentro del proyecto en vez de bajarse de Google Fonts: se ven igual y no dependen de Google.
- El formulario de "acceso anticipado" se sacó: ahora cada salón se registra solo en el sistema.

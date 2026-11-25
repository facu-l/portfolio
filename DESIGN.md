# Sistema de diseño "Casebook"

Las decisiones completas (posicionamiento, jerarquía, dirección visual y
criterio de movimiento) están en el
[brief de diseño](docs/superpowers/specs/2026-11-14-portfolio-rebrand-design.md).
Los tokens viven en [app/globals.css](app/globals.css) con `@theme` de Tailwind v4.
Este archivo es el resumen para consultar rápido.

## Color: monocromo + un acento

| Token | Valor | Uso |
|---|---|---|
| `background` | `#0c0d0f` | fondo |
| `surface` | `#141518` | tarjetas de decisión, footer, botón de copiar |
| `border` | `#24262b` | líneas |
| `foreground` | `#eef0f2` | texto principal, botón primario |
| `muted` | `#8b9099` | texto secundario |
| `accent` | `#c8f03c` | **solo** lo verificable o clickeable: links a código, "Decision N", el punto final, el estado "Open to work", la etiqueta "En curso" de Formación, el foco |

**Si el lima aparece en algo decorativo, deja de significar algo.** El botón
primario es blanco a propósito: es el elemento más grande de la pantalla.

### Contraste medido (WCAG 2.1, 2026-11-24)

| Par | Ratio |
|---|---|
| foreground sobre background (botón primario invertido) | 17.0:1 |
| foreground sobre surface | 16.0:1 |
| accent sobre background | 14.8:1 |
| accent sobre surface | 13.9:1 |
| foreground al 80% sobre background | 11.0:1 |
| muted sobre background | 6.1:1 |
| muted sobre surface | 5.7:1 (el par más justo; AA pide 4.5) |

## Tipografía

- **Schibsted Grotesk** 400/600/800: titulares (800, tracking negativo) y texto.
- **JetBrains Mono** 400/500: solo datos técnicos (stack, rutas, tablas, links a código).
- Firma: punto final en lima en el nombre y en cada título.

## Forma

Superficies e imágenes a 4px; botones en píldora. Sin otros radios, sin glow,
sin gradientes ni patrones decorativos.

## Movimiento

Solo `transform` y `opacity`, nunca más de 400 ms, todo apagado con
`prefers-reduced-motion`. Entrada del hero (una vez), aparición de secciones al
scroll (8px), subrayado y flecha en los links de evidencia, `scale(0.98)` al
apretar un botón y el feedback de "copiado". Cada uno responde a "¿qué comunica?".

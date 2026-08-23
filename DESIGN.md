# Sistema de diseño — Portfolio

Los tokens viven en [app/globals.css](app/globals.css) con `@theme` de Tailwind v4.
Este documento explica **por qué** son esos valores. Si vas a cambiar uno, leé
primero la sección correspondiente.

Generado por `/plan-design-review` el 2026-08-22.

---

## Regla número uno

**Ningún hexadecimal ni número mágico en el JSX.** Si necesitás un valor que no
está en `globals.css`, agregalo ahí primero.

El costo de romper esta regla no se ve el primer día: se ve cuando el mismo gris
está escrito en 12 archivos con un typo en uno solo, y nadie encuentra cuál.

---

## Color

Los nombres están elegidos por la utilidad de Tailwind que generan, no por
descripción. `--color-background` produce `bg-background`; un `--color-bg`
habría producido `bg-bg`.

| Token | Utilidad | Valor | Uso |
|---|---|---|---|
| `--color-background` | `bg-background` | `#16181C` | Fondo principal |
| `--color-surface-sunken` | `bg-surface-sunken` | `#1D2025` | Footer |
| `--color-surface` | `bg-surface` | `#22262C` | Tarjetas de proyecto |
| `--color-accent` | `bg-accent` / `text-accent` | `#007FFF` | Acento. Poco y estratégico: título, CTAs, glow. Nunca dominante |
| `--color-foreground` | `text-foreground` | `#F5F7FA` | Texto principal |
| `--color-muted` | `text-muted` | `#9299A5` | Texto secundario |
| `--color-border` | `border-border` | `#30353D` | Bordes |

### Contraste verificado (WCAG 2.1)

| Combinación | Ratio | Veredicto |
|---|---|---|
| `foreground` sobre `background` | 16.56:1 | AAA |
| `foreground` sobre `surface` | 14.16:1 | AAA |
| `muted` sobre `background` | 6.20:1 | AA |
| `muted` sobre `surface-sunken` | 5.70:1 | AA |
| `accent` sobre `background` | 4.64:1 | AA |
| **`foreground` sobre `accent`** | **3.57:1** | **AA solo como texto grande** |
| `accent` sobre `surface` | 3.97:1 | Falla AA normal |

**Dos restricciones que salen de esta tabla:**

1. **El texto de los CTAs no puede bajar de 19px en bold** (`--text-cta`). A ese
   tamaño califica como "texto grande" de WCAG y el mínimo baja de 4.5:1 a 3:1.
   A 16px, el botón principal del sitio falla accesibilidad.
2. **El azul no se usa como texto sobre `surface`** (3.97:1). Sobre el fondo
   principal sí (4.64:1).

---

## Superficies: por qué casi no hay cards

La separación entre los tres fondos de la paleta es de **1.17:1 o menos**. Están
por debajo del umbral perceptual: en un monitor a oscuras se distinguen, en una
notebook con brillo alto no existen.

**Decisión: las superficies se separan con espacio y tipografía, no con color.**

- Las secciones se separan con `--spacing-section`, no con un cambio de fondo
- Skills, About y Currently Learning **no llevan cards**
- Las tarjetas de proyecto **sí**, porque ahí la tarjeta *es* la unidad de
  interacción: es lo que se clickea

**El principio general:** una card tiene que ganarse su existencia. Si solo
agrupa texto que ya estaba agrupado por su posición, es decoración.

---

## Tipografía

Inter variable en `--font-sans` (utilidad `font-sans`), cargada con `next/font`
en `app/layout.tsx`: un solo archivo cubre los pesos 100-900 y se auto-hospeda,
sin request a Google en runtime.

| Token | Tamaño | Peso | Uso |
|---|---|---|---|
| `text-display` | 40 → 96px | 900 | `FULL STACK DEVELOPER` |
| `text-h2` | 28 → 40px | 700 | Títulos de sección |
| `text-h3` | 20px | 700 | Títulos de proyecto |
| `text-lead` | 18px | 400 | Subtítulo del Hero |
| `text-body` | 16px | 400 | Párrafos |
| `text-cta` | **19px** | **700** | Botones. **No bajar** |
| `text-sm` | 14px | 400-600 | Microtexto, eyebrows |

Los tamaños fluidos usan `clamp()`: mínimo en mobile, escalado con el viewport,
máximo en desktop. Evita declarar un tamaño distinto por breakpoint y que se
desincronicen.

---

## Ritmo vertical

| Token | Valor | Uso |
|---|---|---|
| `spacing-section` | 80 → 128px | Entre secciones |
| `spacing-block` | 40px | Entre bloques dentro de una sección |
| `spacing-stack` | 20px | Entre elementos hermanos |

Como las superficies no separan por color, **el aire es la estructura**. Estos
tres valores no son ajustes estéticos: son lo que le dice al visitante dónde
termina una idea y empieza la otra.

---

## Radios

| Token | Utilidad | Valor | Uso |
|---|---|---|---|
| `--radius-sm` | `rounded-sm` | 4px | Inputs |
| `--radius-md` | `rounded-md` | 8px | Botones, tarjetas de proyecto |
| `--radius-lg` | `rounded-lg` | 12px | Foto del Hero |

Contenidos a propósito. Radios grandes y uniformes en todos los elementos son
uno de los patrones que delatan una interfaz generada. El tono del sitio es
técnico: esquinas precisas.

---

## Responsive

Breakpoints de Tailwind sin modificar: `sm 640` · `md 768` · `lg 1024` · `xl 1280`.

| Viewport | Comportamiento |
|---|---|
| **< 768px** | Hero en una columna, **foto abajo del contenido**. Con ratio 3:4 la foto mide ~427px de alto: puesta arriba empuja el titular abajo del fold en un teléfono chico, y el titular es el mensaje. Navbar solo con el wordmark, **sin links**: el sitio es una sola página, el scroll ya llega a todo y un menú hamburguesa es una máquina de estados entera (overlay, focus trap, cierre con Escape) para saltar entre 4 secciones |
| **≥ 768px** | Hero en dos columnas |
| **Puntero fino** | El glow de la foto se intensifica en hover |

### El hover no reemplaza al estado de reposo

El glow es visible en reposo (55%) y llega al 100% en hover. Esa base no es un
detalle: **en un teléfono no hay hover.** Un efecto que solo aparece al pasar el
mouse simplemente no existe para la mayoría del tráfico, que llega desde un link
compartido y se abre en mobile.

El SPEC pedía además "reacción leve al cursor". **Eso no está implementado:** el
glow reacciona a que el mouse esté encima, no sigue su posición. Seguir el
puntero exige un listener de `mousemove` y animación en JavaScript. Ver TODOS.md.

---

## Movimiento

| Token | Utilidad | Valor | Uso |
|---|---|---|---|
| `--duration-fast` | `duration-fast` | 150ms | Hover, foco |
| `--duration-base` | `duration-base` | 250ms | Cambios de estado |
| `--duration-slow` | `duration-slow` | 400ms | Entradas al scrollear |
| `--ease-out` | `ease-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | **Declarado y sin usar** |

> **`--ease-out` no lo usa nadie hoy.** La fila decía *"todas las transiciones"*
> y era falso: las transiciones del sitio usan el easing por defecto de Tailwind.
> Lo consumían las animaciones del efecto líquido, y ese efecto se descartó.
>
> Queda declarado porque la decisión de tener una sola curva sigue siendo la
> correcta; lo que falta es aplicarla. **Está escrito como pendiente y no como
> hecho a propósito:** documentar una intención como si fuera realidad es peor
> que no documentarla, porque el que lee asume que el sistema ya es consistente
> y no lo unifica.

Una sola familia de duraciones. Duraciones distintas por componente hacen que la
interfaz se sienta desprolija sin que se pueda señalar por qué.

`prefers-reduced-motion` está aplicado globalmente en `globals.css`, a **todo**
el sitio y no solo al Hero.

---

## Accesibilidad

- **Foco:** anillo de 2px en `accent` con 2px de offset, vía `:focus-visible`
  (aparece con teclado, no con click). 4.64:1 sobre el fondo, por encima del 3:1
  que WCAG pide para componentes de UI.
- **Touch targets:** mínimo 44x44px en todo lo clickeable en mobile.
- **Landmarks:** `<header>`, `<main>`, `<footer>` reales, y `<section>` con
  `aria-labelledby` apuntando a su título.
- **Skip link** al principio del `<body>`, visible al tabular.
- **Links externos:** `rel="noopener noreferrer"` y el destino anunciado.

---

## Jerarquía de Skills

Las 7 categorías del SPEC no pesan igual. Adelante y con jerarquía:

1. **Backend** — respalda la promesa del título
2. **Frontend** — respalda la promesa del título
3. **AI-assisted workflow** — el diferenciador

Languages, Databases, Tools y Concepts van como texto secundario.

**Por qué:** un recruiter escanea en 30 segundos. Con 7 bloques de igual peso no
elige ninguno y se lleva cero. Con 3, se lleva tres.


---

## Textura de fondo: el grid técnico

Una retícula de 1px cada 80px en `--color-border`, al 28% de opacidad, con una
máscara radial que la desvanece hacia los bordes.

**Va en `body::before` con `position: fixed`, no como background del body.** Fija
al viewport, la retícula no se mueve con el scroll: el contenido pasa por delante
de una grilla quieta, que es lo que da la sensación de plano técnico. Un
background en el body scrollearía junto con el texto y se leería como papel
cuadriculado.

`pointer-events: none` es obligatorio. Sin eso, una capa a pantalla completa se
come todos los clicks del sitio.

**El 28% no es un número al azar:** más arriba compite con el texto, más abajo
directamente no se percibe.

---

## Glow del Hero

Un resplandor azul que rodea el contorno de la foto y se intensifica al pasar
el mouse. **Puro CSS: cero JavaScript, cero dependencias.**

```
absolute -inset-6 -z-10 rounded-lg bg-accent/40
opacity-55 blur-2xl
transition-opacity duration-slow group-hover:opacity-100
```

| Decisión | Por qué |
|---|---|
| **`-inset-6` negativo** | El resplandor sale 24px por los **cuatro** lados. La versión anterior era `inset-4`: un círculo metido *adentro* de la caja de la foto, del que solo escapaba el desenfoque, así que no rodeaba nada |
| **`rounded-lg`** | Copia el radio de la foto. Un `rounded-full` detrás de un rectángulo deja las esquinas sin resplandor |
| **`blur-2xl`** | Es lo que lo convierte en glow. Sin desenfoque esto es un rectángulo azul, o sea una forma, no un resplandor |
| **55% en reposo, 100% en hover** | Un efecto que solo existe en hover no existe para nadie en mobile, y de ahí viene la mayoría del tráfico de un link compartido |
| **`overflow-x-clip` en el Hero** | El glow se extiende más allá de la caja y en mobile la foto tiene 24px de padding. `clip` y no `hidden`: `hidden` convierte la sección en contenedor de scroll y rompe `sticky` |
| **`bg-background` en la foto** | La máscara desvanece el 22% inferior de la imagen hasta volverlo transparente. Sin fondo propio, el azul se cuela por ese hueco y tiñe el hombro |

### Por qué se descartó `liquid-gooey`

Se implementó, se midió y **pasó el criterio de corte** (+12.1 KB gzip contra un
límite de 30, sin regresión de LCP, sin warnings de hidratación). Igual se
descartó, por una razón de diseño y no técnica:

**el efecto gooey produce bordes duros por definición.** Su segundo paso sube el
contraste del canal alfa para fusionar las formas, y eso convierte todo lo
semitransparente en opaco. Sirve para gotas que se juntan; es lo contrario de un
resplandor difuso. Lo que se buscaba alrededor de la foto era lo segundo.

Sacarla costó borrar un archivo y una línea del Hero, que es exactamente para lo
que estaba aislada detrás de un componente propio. El bundle volvió a 178.0 KB,
idéntico al baseline previo a instalarla.

**Lo que queda como pendiente:** el SPEC pedía "reacción leve al cursor" y el
glow reacciona al hover, no sigue al puntero. Seguir el cursor exige un listener
de `mousemove` y animación en JavaScript. Ver TODOS.md.

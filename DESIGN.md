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
| **`background` sobre `accent`** | **4.64:1** | **AA — el botón primario** |
| `foreground` sobre `accent` | 3.57:1 | Solo texto grande. **No usar** |
| `accent` sobre `surface` | 3.97:1 | Falla AA normal |

**Dos restricciones que salen de esta tabla:**

1. **El botón primario lleva texto OSCURO sobre el azul**, no claro. Texto claro
   da 3.57:1 y solo pasa como "texto grande" de WCAG (≥18.66px en bold), lo que
   obligaba a mantener los botones en 19px. Texto oscuro da 4.64:1 y pasa AA para
   texto normal, así que los botones pueden tener el tamaño que convenga al
   diseño. **La restricción ahora es el par de colores, no el tamaño de letra**,
   y hay un test en `Hero.test.tsx` que lo fija.
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
| `text-display` | 36 → 72px | 900 | El nombre en el Hero |
| `text-h2` | 28 → 40px | 700 | Títulos de sección, y el rol en el Hero |
| `text-h3` | 20px | 700 | Títulos de proyecto |
| `text-lead` | 18px | 400 | Tagline del Hero, bio de About |
| `text-body` | 16px | 400-600 | Párrafos y botones |
| `text-sm` | 14px | 400-600 | Microtexto, eyebrows |

### La jerarquía del Hero: saludo → nombre → rol

El h1 dice `Hi, I'm` chico y en gris, **`FACUNDO LAMBERTUCCI`** en display, y
`Full Stack Developer` en `text-h2` sobre acento.

**Por qué el nombre y no el puesto en el lugar más grande:** "Full Stack
Developer" lo comparten millones de personas. El nombre es lo único irrepetible
de la página, y es lo que tiene que quedar cuando alguien cierra la pestaña. El
puesto sigue estando primero en jerarquía de color, que es lo que un recruiter
escanea.

**Los tres van dentro del mismo `<h1>`**, en `<span>` de bloque. Un lector de
pantalla anuncia un solo encabezado — "Hi, I'm Facundo Lambertucci, Full Stack
Developer" — en vez de partir la frase en un encabezado y dos párrafos sueltos.

**`--text-display` bajó de 96px a 72px por esta decisión, no por gusto.** El
titular anterior se partía a mano en dos líneas de 10 caracteres. "LAMBERTUCCI"
son 11 caracteres que no se pueden cortar: a 96px medía 690px, y como una
columna de grid no baja de su contenido mínimo, empujaba a la foto hasta dejarla
en 200px de ancho. **El tamaño de la tipografía estaba decidiendo el layout.**
A 72px la foto vuelve a 373px y las dos columnas se equilibran.

---

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

El glow es visible en reposo (`--shadow-glow`) y se intensifica en hover
(`--shadow-glow-strong`). Esa base no es un detalle: **en un teléfono no hay
hover.** Un efecto que solo aparece al pasar el mouse simplemente no existe para
la mayoría del tráfico, que llega desde un link compartido y se abre en mobile.

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

Un resplandor azul que rodea la foto y se intensifica al pasar el mouse.
**Puro CSS: cero JavaScript, cero dependencias.** Los valores son tokens
(`--shadow-glow`, `--shadow-glow-strong`) construidos con `color-mix` sobre
`--color-accent`, así que si cambia el acento cambia el glow.

Son dos elementos y una máscara, y los tres se necesitan entre sí:

| Pieza | Qué hace |
|---|---|
| **Caja invisible que solo proyecta sombra**, terminando en `bottom-[20%]` | Es el glow |
| **Máscara en la imagen**, `black 74% → transparent 93%` | Desvanece el borde inferior |
| **Contenedor sin fondo** | Deja que ese desvanecimiento llegue hasta la página |

### Las tres decisiones, y qué se rompe si se cambian

**`box-shadow` y no un div relleno y desenfocado.** El navegador dibuja la
sombra exterior por fuera de la caja y **nunca por debajo**. Un div relleno
detrás de la foto se ve a través del hueco que deja la máscara y tiñe el hombro
de azul; taparlo obliga a ponerle fondo opaco al contenedor, y ahí se pierde el
desvanecimiento. Con `box-shadow` no hay nada detrás que tapar.

**La caja del glow termina al 80% de la altura, no abajo de todo.** Si llega
hasta el final, su sombra dibuja un contorno nítido justo donde la imagen se
está disolviendo: queda un rectángulo vacío marcado debajo de la foto. Cortada
antes, el glow se apaga en el mismo lugar donde la foto se desvanece. Los bordes
de esa caja no se ven nunca — no tiene fondo y está detrás de la parte opaca de
la imagen.

**La máscara cierra en 93%, no en 100%.** `scale-105` agranda la imagen un 5% y
el contenedor recorta el sobrante: lo último visible es el ~97.6% de la imagen.
Con el degradado terminando en 100%, el corte caía donde todavía quedaba ~11% de
opacidad, y ese 11% dibujaba una línea horizontal nítida — el desvanecimiento
existía y no se veía. Cerrando en 93%, para cuando llega el recorte ya no queda
nada que cortar. También aguanta el hover: con `scale-110` lo visible baja al
~95.2%, y sigue estando después del final.

### Reposo y hover

El glow es visible en reposo y se intensifica en hover. Esa base no es un
detalle: **en un teléfono no hay hover.** Un efecto que solo aparece al pasar el
mouse no existe para la mayoría del tráfico, que llega desde un link compartido.

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

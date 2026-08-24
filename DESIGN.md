# Sistema de diseño — Portfolio

Los tokens viven en [app/globals.css](app/globals.css) con `@theme` de Tailwind v4.
Este documento explica **por qué** son esos valores. Si vas a cambiar uno, leé
primero la sección correspondiente.

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

## Superficies: por qué una card no se rellena

La separación entre los tres fondos de la paleta es de **1.17:1 o menos**. Están
por debajo del umbral perceptual: en un monitor a oscuras se distinguen, en una
notebook con brillo alto no existen.

**Decisión: una card NO se separa del fondo con color.** Se separa con borde y
un glow tenue (`--shadow-panel` / `--shadow-panel-sm`, componente `Panel.tsx`).

Rellenar el panel con `bg-surface` es el instinto de todo el mundo y está mal
por dos razones distintas:

1. **No separaría nada.** 1.17:1 contra el fondo. Es el hallazgo de arriba.
2. **Rompería un contraste que hoy pasa.** El azul sobre `surface` da 3.97:1 y
   falla AA; sobre el fondo da 4.64:1 y pasa. El link "View the API" de las
   certificaciones vive adentro de un panel: rellenarlo lo dejaría fallando
   accesibilidad **sin verse distinto**. Hay un test en `Panel.test.tsx` que lo
   fija, justamente porque es un cambio que pasa cualquier review visual.

Efecto secundario deseable: sin fondo, el grid técnico de `body::before` sigue
pasando por detrás en lugar de quedar tapado justo donde el panel ocupa más
superficie.

Dónde se usa:

- **About** — la bio en un panel `md`, cada estudio en uno `sm`
- **Skills** — las tres categorías destacadas en paneles `md`, las otras cuatro
  en `sm`
- **Las tarjetas de proyecto** llevan `bg-surface`, y ahí sí corresponde: la
  tarjeta *es* la unidad de interacción, es lo que se clickea, y adentro no hay
  texto en acento

### La excepción: superficies chicas sí llevan fondo

`IconBadge` (44px) y las cápsulas de tecnología (28px de alto) **sí** tienen
fondo, y no contradice lo de arriba. La misma diferencia de color rinde distinto
según el tamaño de la superficie: en un panel que ocupa media pantalla, 1.17:1 no
separa de nada; en un parche de 44px, el ojo compara contra lo que tiene pegado
al lado y la diferencia se percibe.

La regla del acento no cambia: el badge usa acento diluido de fondo con el icono
en acento pleno (el fondo sigue siendo casi el de la página, 4.64:1); las
cápsulas usan `surface` con texto en `foreground` y **nunca en acento**, que
sobre `surface` cae a 3.97:1.

**El principio general:** una card tiene que ganarse su existencia. Si solo
agrupa texto que ya estaba agrupado por su posición, es decoración.

---

## Aparición de secciones al scrollear

Cada `<Section>` se envuelve sola en `Reveal` (opacidad 0 → 1 y 24px hacia
arriba, `--duration-slow`). Está en `Section.tsx` y no en cada sección por la
misma razón que el ritmo vertical: por construcción, no por memoria.

Tres decisiones que sostienen esto:

1. **El estado oculto vive en `@media (scripting: enabled)`**, no en una clase
   de Tailwind. Con JavaScript apagado la regla no aplica y se ve todo. Un
   `opacity-0` estático deja la página en blanco para un crawler.
2. **`prefers-reduced-motion` no oculta nunca.** El bloque general solo acorta
   transiciones, y eso dejaría el contenido invisible hasta que el observer lo
   revele de golpe. Hay una regla explícita que lo fuerza a visible.
3. **El `id` de la sección queda afuera del elemento animado.** Si el ancla del
   navbar apuntara al div que se traslada, el scroll aterrizaría desplazado
   mientras dura la animación.

---

## Glow: el blur escala con el texto, no con el sitio

Hay dos tokens: `--text-shadow-glow` para el `<h2>` de una sección y
`--text-shadow-glow-sm`, más débil, para sus etiquetas internas ("Education",
"More work", "Next up"). Con el mismo valor, la etiqueta interna pesa igual que
el título y la sección deja de tener adentro y afuera. Los dos salen del
componente `Eyebrow`, que existe porque esta receta tipográfica estaba copiada
en cinco archivos: el glow se agregó al `<h2>` y las otras cuatro etiquetas
quedaron sin él, no por decisión sino porque nadie fue a los otros archivos.

Las etiquetas internas pasaron de `text-muted` a `text-foreground` al recibir el
glow. Un halo azul sobre texto gris se lee como un error de renderizado: el
resplandor termina más brillante que la letra que lo genera.

`--text-shadow-glow` usa radios de 6px y 16px, mucho más chicos que los 46px del
glow de la foto. No es inconsistencia: **se midió**. Con 14px y 32px de blur, el
resplandor del título llegaba a una intensidad máxima de **8 sobre 255** contra
el fondo — invisible. El título mide 14px de alto, y un blur más ancho que la
letra reparte la misma tinta sobre tanta superficie que no queda nada. Con 6px y
16px sube a **34 sobre 255**: tenue, pero se ve.

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


---

## Iconos

Once SVG inline en `components/icons.tsx`, sin librería. Dos familias, y la
mezcla es deliberada: los logos de marca (GitHub, LinkedIn) van como silueta
rellena con los paths oficiales de Simple Icons (CC0), y los iconos de interfaz
van como contorno de 1.75px dibujados en el repo. Mezclar relleno y contorno
*dentro* de una familia se ve desprolijo; que un logo y un icono de UI se traten
distinto, no.

Todos llevan `aria-hidden`: al lado siempre hay un texto que dice lo mismo, así
que para un lector de pantalla el icono no es información, es una repetición.

**Education distingue por icono, no por estilo.** Birrete para el título de
grado, medalla para los cursos. Una carrera de cinco años y un curso de 80 horas
son cosas distintas y en una pila de recuadros iguales esa diferencia se pierde.
El icono no viaja en los datos: la distinción ya existe en la estructura
(`DEGREE` es un objeto, `CERTIFICATIONS` un array).

**Skills sí lo lleva en los datos, y por clave.** Cada categoría declara
`icon: "backend"`, no se mapea desde el título. Mapear por título parece más
simple hasta que alguien renombra "Backend" a "Backend & APIs" y el icono
desaparece en silencio: sin error de compilación y sin test roto. Con una clave
propia, el título es copy y el icono es estructura.

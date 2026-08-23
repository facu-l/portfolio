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

Inter variable, cargada con `next/font` en `app/layout.tsx` (un solo archivo
cubre los pesos 100-900 y se auto-hospeda, sin request a Google en runtime).

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

`4px` inputs · `8px` botones y tarjetas de proyecto · `12px` foto del Hero.

Contenidos a propósito. Radios grandes y uniformes en todos los elementos son
uno de los patrones que delatan una interfaz generada. El tono del sitio es
técnico: esquinas precisas.

---

## Responsive

Breakpoints de Tailwind sin modificar: `sm 640` · `md 768` · `lg 1024` · `xl 1280`.

| Viewport | Comportamiento |
|---|---|
| **< 768px** | Hero en una columna, foto arriba. Navbar solo con el wordmark, **sin links**: el sitio es una sola página, el scroll ya llega a todo y un menú hamburguesa es una máquina de estados entera (overlay, focus trap, cierre con Escape) para saltar entre 4 secciones |
| **≥ 768px** | Hero en dos columnas |
| **Puntero fino** | El efecto líquido se vuelve interactivo |

### El efecto líquido no se decide por ancho, se decide por puntero

El SPEC dice "desactivar por debajo de `md`". El ancho es un proxy impreciso: una
tablet de 1024px no tiene mouse, una notebook de 1280px sí. La pregunta real es
si hay cursor que seguir, y eso se consulta directamente:

```css
@media (pointer: fine) { /* efecto interactivo */ }
```

**En dispositivos táctiles el efecto no se apaga: se renderiza estático**, sin
seguimiento del puntero ni animación. Cero costo de batería, y el Hero conserva
su identidad en mobile, que es donde llega la mayoría del tráfico de un link
compartido.

---

## Movimiento

`150ms` hover y foco · `250ms` cambios de estado · `400ms` entradas.
Easing único: `cubic-bezier(0.4, 0, 0.2, 1)`.

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


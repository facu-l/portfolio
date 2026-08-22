# TODOS

Trabajo diferido conscientemente durante el `/plan-eng-review` del 2026-08-22.
Cada item es el reverso de una decisión que ya se tomó: no son ideas sueltas,
son la alternativa que se descartó y bajo qué condición volvería a estar sobre
la mesa.

## Contact

### Sumar hCaptcha al formulario de contacto

**What:** Agregar hCaptcha (gratis en el plan free de Web3Forms) al formulario de Contact.

**Why:** El honeypot `botcheck` filtra bots simples, pero la propia documentación de Web3Forms dice que el método honeypot "seems to be less effective" y recomienda un captcha para protección real. Si empieza a entrar spam, este es el siguiente escalón.

**Context:** En el review se eligió `botcheck` solo, a propósito. El razonamiento: hCaptcha le mete fricción al visitante justo en el momento en que decidió contactarte, y un portfolio recibe pocos mensajes por mes. Cambiar esa decisión tiene sentido únicamente con evidencia, no por precaución. **El disparador concreto: si te llegan más de ~5 mensajes de spam por semana.** Hasta entonces, el costo de conversión es mayor que el beneficio. Para implementarlo, Web3Forms documenta hCaptcha en su sección de spam protection; se agrega un widget al form y una key.

**Effort:** S
**Priority:** P4
**Depends on:** Que aparezca spam real. No implementar preventivamente.

### Mover el envío del form a un route handler propio

**What:** Crear `app/api/contact/route.ts` como intermediario entre el formulario y Web3Forms.

**Why:** Habilita rate limiting y validación del lado del servidor, y permite cambiar de proveedor de formularios sin tocar el componente cliente.

**Context:** El review eligió fetch directo desde el cliente. El argumento habitual a favor del route handler — "no exponer la API key" — no aplica: la key de Web3Forms es pública por diseño y su documentación lo dice explícitamente. Un intermediario no escondería nada. Lo que sí compraría es rate limiting, que hoy no necesitás. **El disparador: si el honeypot y/o hCaptcha ya no alcanzan, o si querés dejar de depender de Web3Forms.** Ojo con el efecto secundario: agregar un route handler convierte esa ruta en dinámica, así que dejás de tener un sitio 100% estático.

**Effort:** M
**Priority:** P4
**Depends on:** Que el spam sobreviva a hCaptcha, o cambio de proveedor.

## Projects

### Convertir el case study a ruta dinámica `[slug]`

**What:** Migrar `app/work/gym-management-system/page.tsx` a `app/work/[slug]/page.tsx`.

**Why:** Hoy hay un solo case study. Con dos o más, una ruta estática por proyecto duplica estructura y el contenido deja de estar centralizado.

**Context:** En el Step 0 del review se redujo el alcance de dinámica a estática justamente porque una ruta `[slug]` para exactamente una página obliga a escribir `generateStaticParams`, validación de slug y manejo de `notFound()` que no se usan. **El disparador: cuando exista un segundo case study.** La migración es barata porque el contenido ya vive en `content/projects.ts` con el campo `caseStudy.slug`: se crea la carpeta `[slug]`, se agrega `generateStaticParams` leyendo de `projects.ts`, y `notFound()` para slugs que no existan. **Cuidado con Next.js 16: `params` es una Promise**, hay que hacer `const { slug } = await params` y el componente tiene que ser `async`. Es el error más común al escribir rutas dinámicas en esta versión.

**Effort:** S
**Priority:** P3
**Depends on:** Que exista un segundo case study escrito.

### Sumar worldcup-predictions como tercer proyecto

**What:** Agregar el proyecto `worldcup-predictions` a la sección Projects.

**Why:** Amplía la evidencia de trabajo propio en el portfolio.

**Context:** El SPEC lo dejó afuera del portfolio inicial de forma deliberada, para no diluir los dos proyectos fuertes (cliente real + landing en producción). La estructura ya lo soporta: `content/projects.ts` es un array, así que sumarlo no requiere tocar componentes, solo agregar un objeto al array. **Antes de agregarlo, la pregunta a responder no es "¿puedo?" sino "¿suma o diluye?"** — tres proyectos donde el tercero es más flojo se lee peor que dos sólidos.

**Effort:** S
**Priority:** P4
**Depends on:** Decisión de contenido, no técnica.

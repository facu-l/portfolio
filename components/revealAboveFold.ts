/**
 * Marca los bloques de `Reveal` que ya estaban a la vista cuando la página
 * cargó, para que aparezcan de una y no se animen.
 *
 * ---
 *
 * QUE PROBLEMA RESUELVE (design review, hallazgo 003).
 *
 * `globals.css` oculta todos los `[data-reveal]` con `opacity: 0`, y la hoja de
 * estilos es render-blocking: está en el <head>, así que ese `opacity: 0` YA
 * ESTA APLICADO en el primer pintado. El contenido nunca llega a verse y después
 * desaparecer — el informe de diseño describía esa secuencia y es al revés.
 *
 * Lo que pasa de verdad es peor: el bloque solo se puede revelar cuando corre
 * JavaScript. Medido en producción, en un viewport de 1080px de alto, el primer
 * bloque arranca en y=806: entran 274px de la sección About DENTRO del primer
 * pantallazo, en blanco, desde el pintado (128ms) hasta que React hidrata. Y
 * cuando por fin aparece, lo hace con un fade de 400ms, que subraya el retraso
 * en vez de disimularlo. En un teléfono el bloque cae en y=1223 y ni se ve, así
 * que esto es un problema de pantallas altas.
 *
 * LA REGLA: una animación de entrada al hacer scroll solo tiene sentido para
 * algo que el visitante todavía no vio. Aplicarla a lo que ya está en pantalla
 * al cargar no es un efecto, es contenido que tarda en aparecer.
 *
 * POR QUE UN SCRIPT INLINE Y NO UN useEffect. Un efecto de React corre después
 * de hidratar, que es justo el momento del que estamos tratando de escapar:
 * llegaría tarde por definición. Este script va al final del <body>, así que
 * corre mientras el parser todavía está armando el documento — antes del
 * pintado — y para entonces todos los `[data-reveal]` ya existen y se pueden
 * medir.
 *
 * NO PUEDE EMPEORAR NADA. Si por lo que sea llegara a correr después de un
 * primer pintado, lo que se vio en ese pintado es el mismo hueco en blanco que
 * hay hoy. El script solo agrega un atributo que revela: no oculta nada.
 *
 * VA ENVUELTO EN try/catch a propósito. Es el primer JavaScript de la página, y
 * corre antes que React. Si tirara una excepción se llevaría puesta la
 * hidratación entera por un detalle decorativo. El costo de fallar en silencio
 * acá es que el bloque se anima como antes; el de no atajarlo es una página
 * muerta.
 *
 * ES ES5 A MANO (var, for indexado, sin flechas) porque este string se sirve tal
 * cual: no pasa por el compilador de TypeScript ni por el bundler, así que no
 * hay nadie que lo transpile para un navegador viejo.
 *
 * El CSS que lee el atributo está en globals.css; quien lo respeta del lado de
 * React es components/Reveal.tsx.
 */
export const REVEAL_ABOVE_FOLD_SCRIPT = `(function(){try{
var alto=window.innerHeight;
var bloques=document.querySelectorAll("[data-reveal]");
for(var i=0;i<bloques.length;i++){
if(bloques[i].getBoundingClientRect().top<alto){
bloques[i].setAttribute("data-reveal-instant","");
}}}catch(e){}})();`;

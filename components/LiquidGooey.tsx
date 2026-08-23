"use client";

import { Liquid } from "liquid-gooey";

/**
 * Efecto líquido detrás de la foto del Hero (SPEC §2).
 *
 * ESTE ARCHIVO ES LA FRONTERA. La directiva "use client" vive acá y en ningún
 * otro lado del Hero: el nombre, el título, la foto y los CTAs siguen
 * renderizándose en el servidor. Si "use client" subiera a Hero.tsx, todo eso
 * dejaría de existir en el HTML inicial.
 *
 * Y ES EL PUNTO DE CORTE. `liquid-gooey` tiene UNA sola versión publicada
 * (0.1.0). Si se rompe con una versión futura de React, no hay nadie que lo
 * arregle. Aislada acá, sacarla es borrar un archivo y cambiar una línea del
 * Hero; importada directo en el Hero, sería cirugía.
 *
 * ---
 *
 * CÓMO FUNCIONA EL EFECTO, en dos pasos:
 *
 *   1. `blur`     — desenfoca las formas, los bordes se difuminan
 *   2. `contrast` — sube el contraste del canal alfa: lo semitransparente
 *                   pasa a ser opaco o nada, sin término medio
 *
 * Cuando dos blobs se acercan, sus halos difuminados se superponen y el paso 2
 * convierte esa zona en opaca: se fusionan como dos gotas de mercurio. No hay
 * física ni simulación de fluidos, son círculos moviéndose y dos filtros.
 *
 * LAS BLOBS SE MUEVEN CON @keyframes DE CSS, NO CON JAVASCRIPT. La librería
 * está pensada para que vos posiciones los items ("omit x/y and animate the
 * child yourself") y ella sincroniza el líquido. Aprovecharlo significa que no
 * hay bucle de animación en el hilo principal: el compositor del navegador se
 * encarga, y `prefers-reduced-motion` lo apaga solo desde globals.css.
 *
 * Las duraciones son números primos distintos (13s, 17s, 19s) para que las tres
 * órbitas no vuelvan a alinearse: el ciclo completo tarda más de una hora en
 * repetirse. Con 12/15/18 el patrón se cerraría cada minuto y el ojo lo detecta.
 */
export function LiquidGooey() {
  return (
    /*
      aria-hidden y pointer-events-none: es decoración pura. No aporta
      información y no tiene que interceptar clicks de la foto que hay encima.
    */
    <div
      aria-hidden="true"
      /*
        -inset-16 (NEGATIVO), no inset-0.

        Con inset-0 el área del efecto coincide exactamente con la foto, que es
        opaca: las blobs existían, medían bien, y no se veía ninguna porque
        estaban todas tapadas. El SPEC pide formas ALREDEDOR de la foto.

        El negativo extiende la caja 64px para cada lado, así lo que asoma por
        fuera del borde es justo lo que se ve. La foto sigue siendo la
        protagonista: el líquido la rodea, no la cubre.

        opacity-45 NO ES AJUSTE FINO, ES LA REGLA DEL SISTEMA. DESIGN.md dice
        que el azul aparece poco y estratégico y nunca como color dominante. A
        opacidad completa esta mancha le ganaba a la foto Y competía con el
        botón azul, que es el único elemento que sí tiene que gritar. Bajada,
        pasa a ser ambiente.
      */
      className="pointer-events-none absolute -inset-16 -z-10 overflow-visible opacity-45"
    >
      <Liquid
        blur={16}
        contrast={22}
        fill="var(--color-accent)"
        /*
          Margen extra para el filtro. Sin esto, una blob que sale de la caja
          del grupo se corta con un borde recto — el defecto de 24px alcanza
          para elementos que casi no se mueven, no para órbitas como estas.
        */
        filterPadding={80}
        /*
          h-full w-full, NO `absolute inset-0`.

          La librería le mete `position: relative; isolation: isolate` por
          estilo inline, y un estilo inline le gana a cualquier clase. Con
          `absolute inset-0` el resultado era un div `relative` sin contenido en
          flujo: altura 0, y las blobs con `height: 48%` medían 48% de 0.

          Se veía el grid, no se veía el líquido, y en el DOM las tres blobs
          estaban ahí con 168px de ancho y 0 de alto. No se puede pelear contra
          un estilo inline: hay que dimensionar de una forma que funcione CON
          `relative`, y `height: 100%` lo hace.
        */
        className="h-full w-full"
      >
        <Liquid.Item className="gooey-blob gooey-blob-a" />
        <Liquid.Item className="gooey-blob gooey-blob-b" />
        <Liquid.Item className="gooey-blob gooey-blob-c" />
      </Liquid>
    </div>
  );
}

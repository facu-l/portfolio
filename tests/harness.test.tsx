import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

/**
 * Este test no prueba el portfolio: prueba que el harness de tests funciona.
 *
 * Verifica las tres piezas que tienen que estar bien para que cualquier
 * test posterior sea confiable:
 *   1. jsdom  -> existe un DOM donde renderizar
 *   2. RTL    -> React 19 renderiza y se puede consultar el resultado
 *   3. jest-dom -> los matchers extendidos estan cargados
 *
 * Si este test falla, ningun otro test del proyecto significa nada.
 */
describe('harness de tests', () => {
  it('renderiza un componente y encuentra su contenido', () => {
    render(<h1>FACUNDO LAMBERTUCCI</h1>);
    expect(
      screen.getByRole('heading', { name: 'FACUNDO LAMBERTUCCI' })
    ).toBeInTheDocument();
  });

  it('tiene cargados los matchers de jest-dom', () => {
    render(<button disabled>Send</button>);
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });
});

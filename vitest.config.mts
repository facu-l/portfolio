import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// import.meta.dirname es el equivalente ESM de __dirname.
// En un archivo .mts, __dirname no existe: hoy funciona por un shim de Vite
// que va a desaparecer.
const raiz = import.meta.dirname;

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    // Los tests unitarios viven junto al codigo o en tests/.
    // e2e/ queda afuera: eso lo corre Playwright, que tiene su propio runner.
    include: ['{app,components,content,lib,tests}/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'e2e'],
  },
  resolve: {
    alias: {
      '@': path.resolve(raiz, '.'),
    },
  },
});

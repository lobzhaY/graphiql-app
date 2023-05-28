import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    target: 'es2017',
    outDir: 'build',
    minify: false,
    sourcemap: true,
  },
  plugins: [react(), tsconfigPaths()],
});

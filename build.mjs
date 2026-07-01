import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

console.log('starting build...');
await build({
  configFile: false,
  root: process.cwd(),
  plugins: [react(), tailwindcss()],
  logLevel: 'info',
  build: { outDir: 'dist', emptyOutDir: true }
});
console.log('BUILD_COMPLETE');

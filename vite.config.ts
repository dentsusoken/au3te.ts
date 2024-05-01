import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'Au3te',
      fileName: 'index',
    },
  },
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: 'build',
        global: 'build',
        process: 'build',
      },
      // exclude: ['process'],
      overrides: {
        fs: 'memfs',
      },
    }),
  ],
});

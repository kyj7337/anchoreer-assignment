import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import path from 'path';

import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all')],
  server: {
    port: 3000,
    open: 'http://localhost:3000',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

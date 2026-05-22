import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Krafika/',
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    }
  }
});

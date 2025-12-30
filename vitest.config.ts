import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
    onConsoleLog(log, type) {
      if (type === 'stderr' && log.includes('Error: Network Error')) {
        return false;
      }
    },
  },
});

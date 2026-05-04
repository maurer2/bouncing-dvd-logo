import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  define: {
    global: 'globalThis', // needed for jest-styled-components snapshot serializer
  },
  plugins: [react(), svgrPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup-tests.ts'],
    clearMocks: true,
    browser: {
      enabled: true,
      provider: playwright(),
      screenshotFailures: false,
      instances: [
        {
          browser: 'chromium',
          headless: false,
        },
      ],
    },
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: [
        '**/*.spec.tsx',
        '**/*.spec.ts',
        '**/*.types.ts',
        '**/*.styles.ts',
        '**/setupTests.ts',
      ],
    },
    include: ['src/**/*.test.tsx', 'src/**/*.spec.tsx'],
    exclude: ['node_modules'],
  },
});

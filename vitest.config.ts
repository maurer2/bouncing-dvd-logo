import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import svgrPlugin from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    global: 'globalThis', // needed for jest-styled-components snapshot serializer
  },
  plugins: [react(), svgrPlugin()],
  test: {
    globals: true,
    setupFiles: ['./src/setup-tests.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      screenshotFailures: false,
      traceView: true,
      headless: true,
      instances: [
        {
          browser: 'chromium',
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

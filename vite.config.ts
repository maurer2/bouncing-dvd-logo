import { defineConfig } from 'vitest/config';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr'; // needed to import SVG as React components, e.g. import ReactComponent as X
import { visualizer } from 'rollup-plugin-visualizer';
import checker from 'vite-plugin-checker';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import babel from '@rolldown/plugin-babel';
import { playwright } from '@vitest/browser-playwright';
import type { Logger } from 'babel-plugin-react-compiler';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) =>
  defineConfig({
    base: '', // "/" is default
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
      global: 'globalThis',
    },
    server: {
      open: false,
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      react(),
      babel({
        presets: [reactCompilerPreset()],
        plugins: [
          [
            'babel-plugin-react-compiler',
            {
              logger: {
                logEvent(filename, event) {
                  switch (event.kind) {
                    case 'CompileSuccess': {
                      console.log(`✅ Compiled: ${filename}`);
                      break;
                    }
                    case 'CompileError': {
                      console.log(`❌ Compiler Error: ${filename}`);
                      console.error(`Reason: ${event.detail.reason}`);
                      break;
                    }
                    default: {
                      break; // eslint fix
                    }
                  }
                },
              } satisfies Logger,
            },
          ],
        ],
      }),
      checker({
        typescript: true,
      }),
      svgrPlugin(),
      visualizer({
        template: 'treemap',
        filename: 'statistics/statistics.html',
        gzipSize: true,
        brotliSize: true,
        open: true,
      }),
    ],
    // optimizeDeps: {
    //   // https://github.com/vitest-dev/vitest/issues/6345
    //   // snapshotSerializer
    //   esbuildOptions: {
    //     define: {
    //       global: 'globalThis',
    //     },
    //     plugins: [
    //       NodeGlobalsPolyfillPlugin({
    //         buffer: true,
    //       }),
    //     ],
    //   },
    // },
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

import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr'; // needed to import SVG as React components, e.g. import ReactComponent as X
import { visualizer } from 'rollup-plugin-visualizer';
import checker from 'vite-plugin-checker';
import babel from '@rolldown/plugin-babel';
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
        eslint: {
          lintCommand: 'eslint **/*.{ts,tsx,js}',
        },
        stylelint: {
          lintCommand: 'stylelint src/**/*.{css,styles.ts}',
        },
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
  });

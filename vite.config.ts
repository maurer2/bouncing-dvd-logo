import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import type { Logger } from 'babel-plugin-react-compiler';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import svgrPlugin from 'vite-plugin-svgr'; // needed to import SVG as React components, e.g. import ReactComponent as X

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
      presets: [
        reactCompilerPreset({
          // https://github.com/vitejs/vite-plugin-react/discussions/1208#discussioncomment-16922703
          logger: {
            logEvent(filename, event): void {
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
        }),
      ],
    }),
    checker({
      typescript: true,
      oxlint: {
        lintCommand: 'oxlint',
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
}));

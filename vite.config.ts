/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr'; // needed to import SVG as React components, e.g. import ReactComponent as X
import { visualizer } from 'rollup-plugin-visualizer';
import checker from 'vite-plugin-checker';
import type { PluginOption } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) =>
  defineConfig({
    server: {
      open: false,
    },
    plugins: [
      react(),
      checker({
        typescript: true,
      }),
      viteTsconfigPaths(),
      svgrPlugin(),
      visualizer({
        template: 'treemap',
        filename: 'statistics/statistics.html',
        gzipSize: true,
        brotliSize: true,
        open: true,
      }) as PluginOption,
    ],
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: 'src/setupTests.ts',
      clearMocks: true,
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
      exclude: [
        'node_modules',
        'src/Hooks/useCollisionDetection/useCollisionDetection.spec.tsx',
        'src/Hooks/useColour/useColour.spec.tsx',
        'src/Hooks/useChangeDelta/useChangeDelta.spec.tsx',
      ],
    },
  });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr'; // needed top import SVG as React components, e.g. import ReactComponent as X
import { visualizer } from 'rollup-plugin-visualizer';

import type { PluginOption } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: false,
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    visualizer({
      template: 'treemap',
      filename: 'statistics/statistics.html',
      gzipSize: true,
      brotliSize: true,
      open: true,
    }) as PluginOption
  ],
});

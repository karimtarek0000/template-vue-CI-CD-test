import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';
import { criticalCSSPlugin } from './plugins/vite-plugin-critical-css.js';

export default defineConfig({
  plugins: [
    vue(),
    criticalCSSPlugin({
      routes: [
        { path: '/', name: 'home' },
        { path: '/about', name: 'about' },
        { path: '/services', name: 'services' },
        { path: '/blog', name: 'blog' },
        { path: '/contact', name: 'contact' },
      ],
      viewports: [
        { name: 'desktop', width: 1300, height: 900 },
        { name: 'mobile', width: 375, height: 667 },
      ],
      generateInBuild: false, // Set to true if you want automatic generation during build
      smartOptimization: true, // Enable smart CSS analysis and optimization
      thresholds: {
        criticalSizeKB: 14, // CSS under 14KB might be critical
        largeSizeKB: 50, // CSS over 50KB gets lowest priority
        componentThreshold: 5, // Component usage threshold
      },
    }),
  ],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
  },
});

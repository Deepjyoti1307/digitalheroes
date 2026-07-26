import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
});

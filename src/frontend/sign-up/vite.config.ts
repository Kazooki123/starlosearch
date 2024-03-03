import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // Output directory for production build
    emptyOutDir: true, // Clear existing files in output directory
    rollupOptions: {
      input: "./index.html", // Entry point for building HTML
    },
  },
  // ... other Vite options
  base: "https://starlosearch.vercel.app/",
});

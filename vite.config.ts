import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  server: {
    port: 3000,
    hmr: false,
  },
  base: "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});

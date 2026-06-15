import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(new URL('.', import.meta.url).pathname, "src"),
    },
  },


  server: {
    proxy: {
      "/api": {
        target: "https://sobral-spasswords.somee.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

});
import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/App"),
      "@common": path.resolve(__dirname, "./src/App/common"),
      "@modules": path.resolve(__dirname, "./src/App/modules"),
    },
  },
});

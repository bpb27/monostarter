import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
  },
  test: {
    environment: "happy-dom",
    setupFiles: "./src/utils/test-utils/setup.js",
  },
});

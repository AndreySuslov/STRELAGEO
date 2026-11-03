import { copyFileSync, mkdirSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const base = process.env.PAGES_BASE_PATH || "/";

export default defineConfig({
  base,
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [
    react(),
    {
      name: "public-assets-base",
      enforce: "pre",
      transform(source, id) {
        if (!/[/\\]src[/\\].*\.[jt]sx?$/.test(id)) return;
        return source.replace(/(["'`])\/assets\//g, `$1${base}assets/`);
      },
    },
    {
      name: "privacy-static-entry",
      closeBundle() {
        mkdirSync(new URL("./dist/client/privacy/", import.meta.url), { recursive: true });
        copyFileSync(new URL("./dist/client/index.html", import.meta.url), new URL("./dist/client/privacy/index.html", import.meta.url));
      },
    },
  ],
});

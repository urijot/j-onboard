import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  build: {
    // Vite の初期設定は iOS 16.4 未満の Safari で動かない形に変換するので、古いスマホ（iOS 14 以降）でも開けるようにする
    target: ["es2020", "safari14", "chrome87", "firefox78", "edge88"],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    // SIM 契約前でも開けるように、1回開いたらアプリ一式を端末に保存してオフラインで表示する。
    // 新しい版が届いたらその場で再読み込みして切り替え、古い案内を表示し続けないようにする（登録は src/index.jsx）
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      manifest: false, // public/manifest.json をそのまま使う
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"],
      },
    }),
  ],
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

import * as path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      dts: path.resolve(pathSrc, "auto-imports.d.ts"),
    }),
  ],
  server: {
    // 允许通过 IP 访问
    host: "0.0.0.0",
    // 可选：自定义端口号，默认是 5173
    port: 8080,
    open: true,
    // proxy: {
    //   "/api": {
    //     target: "http://39.106.130.85:8082",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
  css: {
    preprocessorOptions: {
      preprocessorOptions: {
        scss: {
          // 这里可以添加额外的 SCSS 配置选项，例如添加全局变量等
          additionalData: `@import "@/styles/common.scss";`,
        },
      },
    },
  },
});

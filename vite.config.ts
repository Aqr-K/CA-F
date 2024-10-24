import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { fileURLToPath } from "node:url";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    vuetify({
      autoImport: true,
    }),
    AutoImport({
      imports: ["vue", "vue-router", "vuex", "@vueuse/core"],
      dts: "src/auto-imports.d.ts", // 生成 auto-imports.d.ts 文件的路径
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ['@import "@/styles/global.scss";'], // 全局公共样式
        charset: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@images": fileURLToPath(
        new URL("./src/assets/images/", import.meta.url)
      ),
      "@styles": fileURLToPath(new URL("./src/styles/", import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // 设置为 1000 kB
  },
});

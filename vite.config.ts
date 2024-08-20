import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { fileURLToPath } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import VueDevTools from "vite-plugin-vue-devtools";
import path from "path";

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    VueDevTools(),
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
      // less: {
      //   javascriptEnabled: true,
      //   modifyVars: {
      //     hack: 'true; @import "@/assets/global.less"',
      //   },
      // },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@resource": fileURLToPath(
        new URL("./src/assets/resource/", import.meta.url)
      ),
      "@styles": fileURLToPath(new URL("./src/styles/", import.meta.url)),
    },
  },
});

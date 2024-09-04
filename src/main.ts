import { createApp } from "vue";
import "./index.css";
import "./style.css";
import App from "./App.vue";
// Vuetify
import "vuetify/styles";
import router from "./router/index";
import vuetify from "@/plugins/vuetify";
import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/style.css";
import PathList from "./components/input/PathList.vue";
import PathInput from "./components/input/PathInput.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

// 注册全局组件
app.component("VPathList", PathList).component("VPathInput", PathInput);

app.use(vuetify).use(PerfectScrollbarPlugin).use(pinia).use(router); // 注册 Vuex 实例
app.mount("#app");

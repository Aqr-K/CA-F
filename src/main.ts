import { createApp } from "vue";
import "./index.css";
import "./style.css";
import App from "./App.vue";
// Vuetify
import "vuetify/styles";
import router from "./router/index";
import vuetify from "@/plugins/vuetify";
import Vuex from "vuex";
import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/style.css";

// 创建 Vuex 实例
const store = new Vuex.Store({
  state: {
    // 在这里定义应用的状态
  },
  mutations: {
    // 在这里定义修改状态的 mutations
  },
  actions: {
    // 在这里定义处理异步操作的 actions
  },
  getters: {
    // 在这里定义计算属性 getters
  },
});

const app = createApp(App);

app.use(vuetify).use(PerfectScrollbarPlugin).use(router).use(store); // 注册 Vuex 实例
app.mount("#app");

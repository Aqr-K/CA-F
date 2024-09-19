import { createApp } from "vue";
import "./index.css";
import "./style.css";
import App from "./App.vue";
// Vuetify
import "vuetify/styles";
import router from "./router/index";
import vuetify from "@/plugins/vuetify";
import ToastPlugin from "vue-toast-notification";
import VuetifyUseDialog from "vuetify-use-dialog";
import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/style.css";
import PathList from "./components/input/PathList.vue";
import PathInput from "./components/input/PathInput.vue";
import { createPinia } from "pinia";
import { VAceEditor } from "vue3-ace-editor";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "vue-toast-notification/dist/theme-bootstrap.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

// 注册全局组件
app
  .component("VPathList", PathList)
  .component("VPathInput", PathInput)
  .component("VAceEditor", VAceEditor);

app
  .use(pinia)
  .use(vuetify)
  .use(ToastPlugin, {
    position: "bottom-right",
  })
  .use(VuetifyUseDialog, {
    confirmDialog: {
      dialogProps: {
        maxWidth: "40rem",
      },
      confirmationButtonProps: {
        variant: "elevated",
        color: "primary",
        class: "me-3 px-5",
        "prepend-icon": "mdi-check",
      },
      cancellationButtonProps: {
        variant: "outlined",
        color: "secondary",
        class: "me-3",
      },
      confirmationText: "确认",
      cancellationText: "取消",
    },
  })
  .use(PerfectScrollbarPlugin)
  .use(router); // 注册 Vuex 实例
app.mount("#app");

import { defineStore } from "pinia";
import { ref } from "vue";

export const syncConfigStore = defineStore("buttonShow", () => {
  const isShow = ref(false);

  function hideButton() {
    isShow.value = false;
  }

  function showButton() {
    isShow.value = true;
  }

  return { isShow, hideButton, showButton };
});

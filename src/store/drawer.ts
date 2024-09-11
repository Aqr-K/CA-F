import { defineStore } from "pinia";
import { ref } from "vue";

export const useDrawerStore = defineStore("drawer", () => {
  const isOpen = ref(false);

  function toggleDrawer() {
    isOpen.value = !isOpen.value;
  }

  function openDrawer() {
    isOpen.value = true;
  }

  function closeDrawer() {
    isOpen.value = false;
  }

  return { isOpen, toggleDrawer, openDrawer, closeDrawer };
});

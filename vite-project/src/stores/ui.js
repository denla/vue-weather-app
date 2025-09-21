import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
  const isSidebarHidden = ref(false);

  const toggleSidebar = () => {
    isSidebarHidden.value = !isSidebarHidden.value;
  };

  return { isSidebarHidden, toggleSidebar };
});

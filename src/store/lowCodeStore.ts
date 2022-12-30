import { defineStore } from "pinia";
import { ComponentData } from "~/types/lowCode";

export const useLowCodeStore = defineStore("lowCode", () => {
  const count = ref(1);
  const editMode = ref(true);
  const currentComponent = ref<ComponentData>();
  const editComponentList = ref<ComponentData[]>([]);
  const editWidth = ref(1200)
  const editHeight = ref(740)

  function addComponent(component: ComponentData) {
    editComponentList.value.push({
      id: count.value++,
      ...component,
    });
  }

  function removeComponent(index: number) {
    editComponentList.value.splice(index, 1);
  }

  return {
    editMode,
    currentComponent,
    editComponentList,
    addComponent,
    removeComponent,
    editWidth,
    editHeight
  };
});

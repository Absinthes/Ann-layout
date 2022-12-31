import { merge } from "lodash-es";
import { defineStore } from "pinia";
import { ComponentData, ComponentStyle } from "~/types/lowCode";

export const useLowCodeStore = defineStore("lowCode", () => {
  const count = ref(1);
  const editMode = ref(true);
  const currentComponent = ref<ComponentData>();
  const editComponentList = ref<ComponentData[]>([]);
  const editWidth = ref(1200);
  const editHeight = ref(740);
  const editRatio = ref(100);
  const editorEl = ref<HTMLElement>();

  onMounted(() => {
    editorEl.value = document.getElementById("editor") as HTMLElement;
  });

  function getComponentById(id: number): ComponentData | undefined {
    return editComponentList.value.find((it) => it.id === id);
  }

  function setCurrentComponent(i: number) {
    currentComponent.value = editComponentList.value[i];
  }

  function setCurrentComponentById(id?: number) {
    currentComponent.value = editComponentList.value.find((it) => it.id == id);
  }

  function setComponentStyle(id: number, style: Partial<ComponentStyle>) {
    const target = editComponentList.value.find((it) => it.id == id);
    if (!target) return;
    target.style = merge(target.style, style);
  }

  function setCurComponentStyle(style: Partial<ComponentStyle>) {
    if (!currentComponent.value) return;
    currentComponent.value.style = merge(currentComponent.value.style, style);
  }

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
    editHeight,
    editRatio,
    editorEl,
    setCurrentComponent,
    setCurComponentStyle,
    getComponentById,
    setComponentStyle,
    setCurrentComponentById
  };
});

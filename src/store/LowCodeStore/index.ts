import { defineStore } from "pinia";
import {
  editorEl,
  editMode,
  editWidth,
  editHeight,
  editRatio,
  addComponent,
  currentComponent,
  localCanvasData,
  getComponentById,
  removeComponent,
  setComponentStyle,
  setCurComponentStyle,
  setCurrentComponent,
  setCurrentComponentById,
  zIndexUp,
  zIndexDown,
  revocation,
  recordStack,
  renewal,
  stack,
  stackIndex,
} from "./modules";

export const useLowCodeStore = defineStore("lowCode", () => {
  onMounted(() => {
    editorEl.value = document.getElementById("editor") as HTMLElement;
  });

  return {
    editMode,
    currentComponent,
    localCanvasData,
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
    setCurrentComponentById,
    zIndexUp,
    zIndexDown,
    revocation,
    renewal,
    recordStack,
    stack,
    stackIndex,
  };
});

import { merge } from "lodash-es";
import { swapArray } from "~/shared";
import { ComponentData, ComponentStyle } from "~/types";
import { count, recordStack } from ".";

export const currentComponent = ref<ComponentData>();
export const localCanvasData = ref<ComponentData[]>([]);

export function setComponentData(data: ComponentData[]) {
  localCanvasData.value = data;
}

export function getComponentById(id: number): ComponentData | undefined {
  return localCanvasData.value.find((it) => it.id === id);
}

export function setCurrentComponent(i: number) {
  currentComponent.value = localCanvasData.value[i];
}

export function setCurrentComponentById(id?: number) {
  currentComponent.value = localCanvasData.value.find((it) => it.id == id);
}

export function setComponentStyle(id: number, style: Partial<ComponentStyle>) {
  const target = localCanvasData.value.find((it) => it.id == id);
  if (!target) return;
  target.style = merge(target.style, style);
}

export function setCurComponentStyle(style: Partial<ComponentStyle>) {
  if (!currentComponent.value) return;
  currentComponent.value.style = merge(currentComponent.value.style, style);
}

export function addComponent(component: ComponentData) {
  localCanvasData.value.push({
    id: count.value++,
    ...component,
  });
  recordStack()
}

export function removeComponent(index: number) {
  localCanvasData.value.splice(index, 1);
  recordStack()
}

export function zIndexUp(index: number) {
  if (index - 1 < 0) {
    ElNotification({
      title: "Warning",
      message: "已到顶部，不可上移",
      type: "warning",
    });
    return;
  }
  swapArray(localCanvasData.value, index, index - 1);
  recordStack();
}

export function zIndexDown(index: number) {
  const len = localCanvasData.value.length;
  if (index + 1 >= len) {
    ElNotification({
      title: "Warning",
      message: "已到底部，不可下移",
      type: "warning",
    });
    return;
  }
  swapArray(localCanvasData.value, index, index + 1);
  recordStack();
}

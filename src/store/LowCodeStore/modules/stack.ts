import { cloneDeep } from "lodash-es";
import { ComponentData } from "~/types";
import { localCanvasData, setComponentData } from "./state";

export const stack = ref<ComponentData[][]>([]);
export const stackIndex = ref<number>(-1);

export function revocation() {
  if (stackIndex.value >= 0) {
    stackIndex.value--;
    setComponentData(cloneDeep(stack.value[stackIndex.value] || []));
  }
}

export function renewal() {
  if (stackIndex.value < stack.value.length - 1) {
    stackIndex.value++;
    setComponentData(cloneDeep(stack.value[stackIndex.value] || []));
  }
}

export function recordStack() {
  stack.value[++stackIndex.value] = cloneDeep(localCanvasData.value);
  if (stackIndex.value < stack.value.length - 1) {
    stack.value.splice(stackIndex.value);
  }
}

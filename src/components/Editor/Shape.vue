<template>
  <div
    border="~"
    :class="[active ? 'border-sky-4' : 'border-transparent']"
    @mousedown.prevent.stop="handlerMouseDown"
  >
    <div
      v-show="active"
      v-for="it in pointList"
      class="point-basic"
      w-2
      h-2
      rounded-full
      bg-white
      border="~ sky-4"
      @mousedown.prevent.stop="handlerMouseDownPoint($event, it)"
      :style="getPointStyle(it)"
    ></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { StyleValue } from "vue";
import { emitter } from "~/shared";
import { useLowCodeStore } from "~/store";
import { ComponentData, PointType } from "~/types";

const props = defineProps<{
  id: number;
  active: boolean;
  zIndex: number;
}>();
const lowCodeStore = useLowCodeStore();
const { currentComponent } = storeToRefs(lowCodeStore);
const { id } = toRefs(props);
const pointList: PointType[] = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"];
const bindComponent = lowCodeStore.getComponentById(id.value) as ComponentData;

function getPointStyle(point: PointType): StyleValue {
  const { width, height } = bindComponent.style;
  const hasT = /t/.test(point);
  const hasB = /b/.test(point);
  const hasL = /l/.test(point);
  const hasR = /r/.test(point);
  let left = 0;
  let top = 0;

  if (point.length == 2) {
    left = hasL ? 0 : width;
    top = hasT ? 0 : height;
  } else {
    if (hasT || hasB) {
      left = width / 2;
      top = hasT ? 0 : height;
    }

    if (hasL || hasR) {
      left = hasL ? 0 : width;
      top = Math.floor(height / 2);
    }
  }
  return {
    left: left + "px",
    top: top + "px",
  };
}

function handlerMouseDown(e: MouseEvent) {
  lowCodeStore.setCurrentComponentById(id.value);
  // @ts-ignore
  const { left, top } = currentComponent.value?.style;
  let { clientX: prevX, clientY: prevY } = e;

  const move = (e: MouseEvent) => {
    const { clientX: curX, clientY: curY } = e;
    lowCodeStore.setCurComponentStyle({
      left: left + curX - prevX,
      top: top + curY - prevY,
    });
    emitter.emit("move");
  };

  const up = (e: MouseEvent) => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    emitter.emit("unMove");
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

function handlerMouseDownPoint(e: MouseEvent, point: PointType) {
  const { width, height, left, top } = bindComponent.style;
  const { clientX: prevX, clientY: prevY } = e;

  const move = (e: MouseEvent) => {
    const { clientX: curX, clientY: curY } = e;
    const disX = curX - prevX;
    const disY = curY - prevY;
    const hasT = /t/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);
    const hasR = /r/.test(point);
    const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
    const newWidth = width + (hasL ? -disX : hasR ? disX : 0);
    const newLeft = left! + (hasL ? disX : 0);
    const newTop = top! + (hasT ? disY : 0);
    const { left: prevLeft, top: preTop } = bindComponent.style;
    lowCodeStore.setComponentStyle(id.value, {
      left: newWidth < 0 ? prevLeft : newLeft,
      top: newHeight < 0 ? preTop : newTop,
      width: Math.abs(newWidth),
      height: Math.abs(newHeight),
    });
  };

  const up = () => {
    lowCodeStore.recordStack();
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}
</script>

<style scoped lang="scss">
.point-basic {
  position: absolute;
  transform: translate(-50%, -50%);
}
</style>

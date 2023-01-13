<template>
  <div
    ref="shapeRef"
    border="~"
    :class="[active ? 'border-sky-4' : 'border-transparent']"
    @mousedown.prevent.stop="handlerMouseDown"
  >
    <div
      class="rataion-point"
      absolute
      v-show="currentComponent?.id == id"
      @mousedown.prevent.stop="handleRotation"
    >
      <i class="iconfont icon-xuanzhuan" color-blue-3 cursor-grab></i>
    </div>
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
import {
  calculateComponentGeometricInfo,
  emitter,
  getCenterPoint,
  getComponentGeometricInfo,
} from "~/shared";
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
const shapeRef = ref<HTMLElement>();

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

  if (!currentComponent.value) return;

  const { left, top } = getComponentGeometricInfo(currentComponent.value.style);

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
  if (!currentComponent.value) return;
  const { left, top, width, height } = getComponentGeometricInfo(
    currentComponent.value.style
  );

  // 组件中心点
  const center = {
    x: left + width / 2,
    y: top + height / 2,
  };

  // 获取画布位移信息
  const editorRectInfo = (
    document.querySelector("#editor") as HTMLElement
  ).getBoundingClientRect();

  // 当前点击坐标位置
  const curPoint = {
    x: e.clientX - editorRectInfo.left,
    y: e.clientY - editorRectInfo.top,
  };

  // 对称点
  const symmetricPoint = {
    x: center.x + (center.x - curPoint.x),
    y: center.y + (center.y - curPoint.y),
  };

  const move = (e: MouseEvent) => {
    if (!currentComponent.value) return;
    const curPosition = {
      x: e.clientX - editorRectInfo.left,
      y: e.clientY - editorRectInfo.top,
    };

    const newCenterPoint = getCenterPoint(curPosition, symmetricPoint);

    const newPostionStyle = calculateComponentGeometricInfo(
      point,
      currentComponent.value.style,
      curPosition,
      {
        curPoint,
        symmetricPoint,
        center,
        newCenter: newCenterPoint,
      }
    );

    lowCodeStore.setCurComponentStyle(newPostionStyle);
  };

  const up = () => {
    lowCodeStore.recordStack();
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

function handleRotation(e: MouseEvent) {
  if (!shapeRef.value || !currentComponent.value) return;
  const startY = e.clientY;
  const startX = e.clientX;
  const rect = shapeRef.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const { rotate: startRotate } = currentComponent.value.style;
  const rotateDegreeBefore =
    Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180);

  const move = (e: MouseEvent) => {
    const curX = e.clientX;
    const curY = e.clientY;
    const rotateDegreeAfter =
      Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180);
    lowCodeStore.setCurComponentStyle({
      rotate: Math.floor(startRotate + rotateDegreeAfter - rotateDegreeBefore),
    });
  };

  const up = () => {
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
.rataion-point {
  left: 50%;
  transform: translate(-50%, -150%);
}
</style>

<template>
  <el-scrollbar>
    <div
      id="editor"
      relative
      ma
      bg-white
      :style="getEditorStyleComputed"
      @mousedown.prevent.stop="handlerMouseDown"
    >
      <Grid />
      <Shape
        v-for="(it, index) in localCanvasData"
        :key="it.id"
        :id="it.id!"
        :active="currentComponent?.id == it.id"
        :style="wrapStyleComputed(it.style)"
        :zIndex="index"
      >
        <component
          w-full
          h-full
          :is="it.component()"
          :style="componentStyle(it.style)"
          v-bind="bindPropComputed(it)"
          :id="'component_' + it.id"
          :data-index="index"
        />
      </Shape>
      <Area v-bind="areaData" :is-show="isShowArea" />
      <MarkLine />
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ElScrollbar } from "element-plus";
import { storeToRefs } from "pinia";
import type { StyleValue } from "vue";
import { combineStyle, getComponentGeometricInfo } from "~/shared";
import { useLowCodeStore } from "~/store";
import { ComponentData, ComponentStyle } from "~/types";

const lowCodeStore = useLowCodeStore();
const {
  editWidth,
  editHeight,
  localCanvasData,
  currentComponent,
  areaData,
  isShowArea,
} = storeToRefs(lowCodeStore);

const componentStyle = (style: ComponentStyle): StyleValue => {
  const { width, height, left, top, ...rest } = style;
  return combineStyle(rest);
};

const wrapStyleComputed = (style: ComponentStyle): StyleValue => {
  const { width, height, left, top, rotate } = style;
  return {
    position: "absolute",
    left: left + "px",
    top: top + "px",
    width: width + "px",
    height: height + "px",
    rotate: rotate + "deg",
  };
};

const bindPropComputed = computed(() => {
  return (component: ComponentData) => {
    if (typeof component.propValue !== "object") {
      return {
        modelValue: component.propValue,
      };
    }
    return component.propValue;
  };
});

const getEditorStyleComputed = computed((): StyleValue => {
  return {
    width: `${editWidth.value}px`,
    height: `${editHeight.value}px`,
  };
});

function handlerMouseDown(e: MouseEvent) {
  const editorInfo = document.getElementById("editor")?.getBoundingClientRect();
  if (!editorInfo) return;

  lowCodeStore.setCurrentComponentById();
  lowCodeStore.setIsShowArea(true);

  const startX = e.clientX;
  const startY = e.clientY;
  const left = startX - editorInfo.x;
  const top = startY - editorInfo.y;
  const move = (e: MouseEvent) => {
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    lowCodeStore.setAreaData({
      left,
      top,
      width,
      height,
    });
  };
  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    const { components: targetComponents } = areaData.value;
    if (targetComponents.length > 1) {
      let left = Infinity;
      let right = -Infinity;
      let top = Infinity;
      let bottom = -Infinity;
      targetComponents.forEach((component) => {
        const {
          left: cLeft,
          right: cRight,
          top: cTop,
          bottom: cBottom,
        } = getComponentGeometricInfo(component.style);
        left = Math.min(left, cLeft);
        top = Math.min(top, cTop);
        right = Math.max(right, cRight);
        bottom = Math.max(bottom, cBottom);
      });
      lowCodeStore.setAreaData({
        left,
        top,
        width: right - left,
        height: bottom - top,
      });
    }
    console.log(targetComponents.length);
    lowCodeStore.setIsShowArea(targetComponents.length > 1);
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}
</script>

<style lang="scss" scoped></style>

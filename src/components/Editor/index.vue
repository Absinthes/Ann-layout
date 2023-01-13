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
      <MarkLine />
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ElScrollbar } from "element-plus";
import { storeToRefs } from "pinia";
import type { StyleValue } from "vue";
import { combineStyle } from "~/shared";
import { useLowCodeStore } from "~/store";
import { ComponentData, ComponentStyle } from "~/types";

const lowCodeStore = useLowCodeStore();
const { editWidth, editHeight, localCanvasData, currentComponent } =
  storeToRefs(lowCodeStore);

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
  lowCodeStore.setCurrentComponentById();
}
</script>

<style lang="scss" scoped></style>

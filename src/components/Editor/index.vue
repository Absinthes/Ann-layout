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
        :style="wrapStyleComputed(it)"
        :zIndex="index"
      >
        <component
          w-full
          h-full
          :is="it.component()"
          :style="componentStyleComputed(it)"
          v-bind="bindPropComputed(it)"
          :id="'component_' + it.id"
          :data-index="index"
        />
      </Shape>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import type { StyleValue } from "vue";
import { useLowCodeStore } from "~/store";
import { ComponentData } from "~/types/lowCode";

const lowCodeStore = useLowCodeStore();
const { editWidth, editHeight, localCanvasData, currentComponent } =
  storeToRefs(lowCodeStore);

const componentStyleComputed = computed(() => {
  return (component: ComponentData): StyleValue => {
    const { width, height, left, top, ...rest } = component.style;
    return {
      ...rest,
    };
  };
});

const wrapStyleComputed = computed(() => {
  return (component: ComponentData): StyleValue => {
    const { width, height, left, top } = component.style;
    return {
      position: "absolute",
      left: left + "px",
      top: top + "px",
      width: width + "px",
      height: height + "px",
    };
  };
});

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

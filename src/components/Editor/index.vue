<template>
  <el-scrollbar>
    <div
      id="editor"
      @drop="handleDrop"
      relative
      ma
      bg-white
      :style="getEditorStyleComputed"
    >
      <Grid />
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import type { StyleValue } from "vue";
import { useLowCodeStore } from "~/store";

const lowCodeStore = useLowCodeStore();

const { editWidth, editHeight } = storeToRefs(lowCodeStore);

const getEditorStyleComputed = computed((): StyleValue => {
  return {
    width: `${editWidth.value}px`,
    height: `${editHeight.value}px`,
  };
});

function handleDrop(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
}
</script>

<style lang="scss" scoped></style>

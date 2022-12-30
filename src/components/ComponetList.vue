<template>
  <div class="component-list" @dragstart="handlerDragStart">
    <div
      v-for="(it, i) in componentlist"
      draggable="true"
      :data-index="i"
      px-2
      py-2
      text-center
      border="~ gray-2"
      rounded-2
    >
      <Icon :modelValue="it.icon" text-2xl />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "./Icon";
import { componentlist } from "~/customComponents";

function handlerDragStart(e: DragEvent) {
  // @ts-ignore
  e.dataTransfer?.setData("index", e.target.dataset.index);
}
</script>

<style lang="scss" scoped>
.component-list {
  display: grid;
  // grid-template-columns: repeat(auto-fill, 70px);
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  justify-content: space-around;
  padding: 20px;
}
</style>

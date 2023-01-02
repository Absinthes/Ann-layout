<template>
  <el-scrollbar class="component-layout" border="t gray-2">
    <div
      v-for="(component, index) in localCanvasData"
      :key="component.id"
      flex
      justify-between
      items-center
      py-2
      px-3
      cursor-grab
      hover="bg-gray-2"
      select-none
      :class="{
        'bg-blue-1 color-blue-6': currentComponent?.id == component.id,
      }"
      @click="selectComponent(index)"
    >
      <div flex items-center>
        <Icon :modelValue="component.icon" text-xl mr-2 text-center lh-none />
        <span>{{ component.label }}</span>
      </div>
      <div>
        <i
          class="iconfont icon-shangfan"
          mr-1
          text-sm
          cursor-pointer
          @click.stop="handlerUp(index)"
        ></i>
        <i
          class="iconfont icon-xiafan"
          mr-1
          text-sm
          cursor-pointer
          @click.stop="handlerDown(index)"
        ></i>
        <i
          class="iconfont icon-shanchu"
          text-sm
          cursor-pointer
          @click.stop="handlerRemove(index)"
        ></i>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLowCodeStore } from "~/store";
import { Icon } from "./Icon";

const lowCodeStore = useLowCodeStore();
const { localCanvasData, currentComponent } = storeToRefs(lowCodeStore);

function handlerDown(index: number) {
  lowCodeStore.zIndexDown(index);
}

function handlerUp(index: number) {
  lowCodeStore.zIndexUp(index);
}

function handlerRemove(index: number) {
  lowCodeStore.removeComponent(index);
}

function selectComponent(index: number) {
  lowCodeStore.setCurrentComponent(index);
}
</script>

<style scoped></style>

<template>
  <div
    absolute
    border="~ blue-4"
    z-1
    cursor-move
    box-border
    :style="{
      left: left + 'px',
      top: top + 'px',
      width: width + 'px',
      height: height + 'px',
    }"
    v-show="isShow"
  ></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  left: number;
  top: number;
  width: number;
  height: number;
  isShow: boolean;
}>();
</script>

<style scoped></style>

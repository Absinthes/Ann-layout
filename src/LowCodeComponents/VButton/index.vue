<template>
  <button border="style-solid gray-2" bg-white>
    {{ modelValue }}
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  }
);

const { modelValue } = toRefs(props);
</script>

<style scoped></style>

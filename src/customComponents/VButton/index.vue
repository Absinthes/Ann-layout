<template>
  <el-button>
    {{ modelValue }}
  </el-button>
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

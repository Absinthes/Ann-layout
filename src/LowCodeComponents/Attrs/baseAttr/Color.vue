<template>
  <el-form-item :label="label">
    <div flex items-center p-2 gap-2 w-full border="~ gray-2">
      <el-color-picker
        :modelValue="modelValue"
        @update:model-value="emits('update:modelValue', $event as string)"
        show-alpha
        color-format="hex"
        size="small"
      />
      <span color-gray-4>{{ !modelValue ? 'None' : modelValue }}</span>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  modelValue: any;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<style scoped></style>

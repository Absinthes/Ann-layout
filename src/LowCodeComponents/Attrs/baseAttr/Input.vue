<template>
  <el-form-item :label="label">
    <el-input
      :type="type == 'inputNumber' ? 'number' : 'text'"
      :modelValue="modelValue"
      :placeholder="placeholder"
      @update:modelValue="handlerUpdate"
    ></el-input>
  </el-form-item>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type: "input" | "inputNumber";
    label: string;
    modelValue: any;
    placeholder?: string;
  }>(),
  {
    placeholder: "请输入内容",
  }
);

const emits = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();

function handlerUpdate(value: string) {
  emits("update:modelValue", props.type == "inputNumber" ? Number(value) : value);
}
</script>

<style scoped></style>

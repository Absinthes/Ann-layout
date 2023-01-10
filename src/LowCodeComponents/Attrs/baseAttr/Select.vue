<template>
  <el-form-item :label="label">
    <el-select
      :model-value="modelValue"
      @change="emits('update:modelValue', $event)"
      :placeholder="placeholder"
    >
      <el-option
        v-for="it in data"
        :label="it.label"
        :value="it.value"
      ></el-option>
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
type SelectItem = {
  label: string;
  value: any;
};

const props = withDefaults(
  defineProps<{
    label: string;
    modelValue: string;
    placeholder?: string;
    data: SelectItem[];
  }>(),
  {
    placeholder: "请输入内容",
  }
);

const emits = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();
</script>

<style scoped></style>

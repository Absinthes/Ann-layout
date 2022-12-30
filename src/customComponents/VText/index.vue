<template>
  <div v-if="lowCodeStore.editMode">
    <div
      ref="text"
      :contenteditable="canEdit"
      tabindex="0"
      v-html="modelValue"
      @dblclick="setEdit"
    ></div>
  </div>
  <div v-else>
    <div v-html="modelValue"></div>
  </div>
</template>

<script setup lang="ts">
  import { useLowCodeStore } from "~/store";
  const lowCodeStore = useLowCodeStore();
  const text = ref<HTMLElement>();
  const canEdit = ref(false);
  const props = withDefaults(
    defineProps<{
      modelValue?: string;
      isLock: boolean;
    }>(),
    {
      modelValue: "双击编辑文字",
    }
  );
  const { modelValue, isLock } = toRefs(props);

  function setEdit() {
    if (isLock) return;
    canEdit.value = true;
    // 全选
    selectText(text.value!);
  }

  function selectText(element: HTMLElement) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
</script>

<style scoped></style>

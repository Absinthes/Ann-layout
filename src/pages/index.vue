<template>
  <Toolbar />
  <main font-sans class="main">
    <section class="left">
      <ComponetList />
    </section>
    <section class="center bg-#f5f5f5" p5 overflow-auto>
      <div
        overflow-auto
        @drop.prevent.stop="handleDrop"
        @dragover.prevent="handleDragOver"
      >
        <Editor ref="editor" />
      </div>
    </section>
    <section class="right"></section>
  </main>
</template>

<script lang="ts" setup>
import { componentlist } from "~/LowCodeComponents";
import { useLowCodeStore } from "~/store";
import { cloneDeep } from "lodash-es";
import Editor from "~/components/Editor/index.vue";
import { storeToRefs } from "pinia";

const lowCodeStore = useLowCodeStore();
const { editorEl } = storeToRefs(lowCodeStore);

function handleDrop(e: DragEvent) {
  const { clientX, clientY } = e;
  const editorInfo = editorEl.value?.getBoundingClientRect();
  // @ts-ignore
  const index = e.dataTransfer.getData("index") as number;
  if (!index) return;
  const component = cloneDeep(componentlist[index]);
  component.style.left = clientX - (editorInfo?.x || 0);
  component.style.top = clientY - (editorInfo?.y || 0);
  lowCodeStore.addComponent(component);
}

function handleDragOver(e: DragEvent) {
  // @ts-ignore
  e.dataTransfer.dropEffect = "copy";
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  height: calc(100vh - 63px);

  .left {
    flex-shrink: 0;
    width: 200px;
  }

  .center {
    flex: 1 1 0;
  }

  .right {
    flex-shrink: 0;
    width: 288px;
  }
}
</style>

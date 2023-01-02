<template>
  <div flex="~ col" h-full >
    <Toolbar />
    <main font-sans class="main" flex-1  >
      <section class="left" relative>
        <ComponetList class="h-65%" box-border />
        <ComponentLayout class="h-35%" box-border />
      </section>
      <section class="center bg-#f5f5f5" p5 overflow-auto>
        <div
          h-full
          overflow-auto
          overflow-hidden
          @drop.prevent.stop="handleDrop"
          @dragover.prevent="handleDragOver"
        >
          <Editor ref="editor" />
        </div>
      </section>
      <section class="right"></section>
    </main>
  </div>
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
  overflow: hidden;
  .left {
    flex-shrink: 0;
    width: 200px;
    height: 100%;
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

<template>
  <el-tabs v-model="activeTab" class="demo-tabs">
    <el-tab-pane
      v-for="(attr, i) in Attrs"
      :key="attr.name"
      :label="attr.name"
      :name="i"
      h-full
    >
      <el-scrollbar>
        <el-collapse
          :model-value="currentComponent?.styleCollapse"
          @update:model-value="lowCodeStore.setCurComponentCollapse"
        >
          <el-form label-position="top" mx-4>
            <el-collapse-item
              v-for="it in attr.data"
              :title="it.title"
              :name="it.name"
              :key="it.name"
            >
              <template v-for="(c, i) in it.component" :key="i">
                <component
                  v-if="c.type !== AttrComponentTypeEnum.OTHER"
                  :is="c.component"
                  v-bind="c"
                  :modelValue="currentComponent![attr.prop][c.name]"
                  @update:modelValue="handlerChange(c.name as string, $event)"
                />
                <component v-else :is="c.component" v-bind="c" />
              </template>
            </el-collapse-item>
          </el-form>
        </el-collapse>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Attrs, useAttr } from "~/LowCodeComponents";
import { useLowCodeStore } from "~/store";
import { AttrComponentTypeEnum, Attr } from "~/types";

const lowCodeStore = useLowCodeStore();
const { currentComponent } = storeToRefs(lowCodeStore);
const { handlerChange } = useAttr();

const activeTab = ref(0);

function initAttrCollapse(attrs: Attr[]) {
  return attrs
    .map((it) =>
      it.data.map((c) => (Array.isArray(c.name) ? c.name.join() : c.name))
    )
    .flat(Infinity) as string[];
}

const initStyleCollapse = initAttrCollapse(Attrs);

watch(currentComponent, () => {
  if (
    !currentComponent.value ||
    currentComponent.value.styleCollapse.length > 0
  )
    return;
  currentComponent.value.styleCollapse = initStyleCollapse;
});
</script>

<style scoped lang="scss">
.demo-tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
  :deep(.el-tabs__header) {
    padding: 0 1rem;
  }
  :deep(.el-tabs__content) {
    flex: 1 1 0;
  }
}
</style>

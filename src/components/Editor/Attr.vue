<template>
  <div px-4>
    <el-tabs v-model="activeTab" class="demo-tabs">
      <el-tab-pane
        v-for="(attr, i) in Attrs"
        :key="attr.name"
        :label="attr.name"
        :name="i"
      >
        <el-collapse :model-value="currentComponent?.styleCollapse || []">
          <el-form label-position="top">
            <el-collapse-item
              v-for="it in attr.data"
              :title="it.title"
              :name="it.name.join()"
              :key="it.name.join()"
            >
              <template v-for="(c, i) in it.component" :key="i">
                <component
                  v-if="c.type !== AttrComponentTypeEnum.OTHER"
                  :is="c.component"
                  v-bind="c"
                  :modelValue="currentComponent?.[attr.prop][it.name[i]]"
                  @update:modelValue="handlerChange(it.name[i], $event)"
                />
                <component v-else :is="c.component" v-bind="c" />
              </template>
            </el-collapse-item>
          </el-form>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
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
    .map((it) => it.data.map((c) => c.name.join()))
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

<style scoped></style>

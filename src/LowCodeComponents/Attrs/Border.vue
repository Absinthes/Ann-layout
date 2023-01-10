<template>
  <el-form-item label="边框宽度">
    <el-input
      type="number"
      :model-value="currentComponent?.style.borderWidth"
      placeholder="请输入边框宽度"
      @update:model-value="handlerChange('borderWidth', +$event)"
    ></el-input>
  </el-form-item>
  <el-form-item label="边框圆角">
    <div class="radiusStyleWrapper" w-full items-start>
      <el-tooltip
        v-for="it in borderRadiusOptions"
        :content="it.title"
        placement="top"
      >
        <div
          w-5
          h-5
          border
          p2
          cursor-pointer
          hover="bg-gray-2"
          :class="[
            currentComponent?.style.borderRadius == it.value
              ? 'border-#090707'
              : 'border-gray-2',
          ]"
          @click="handlerChange('borderRadius', it.value)"
        >
          <div
            w-full
            h-full
            border="l-2 t-2 gray-5"
            :style="{
              borderTopLeftRadius: it.value + 'px',
            }"
          ></div>
        </div>
      </el-tooltip>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { borderRadiusOptions } from "./contact";
import { useAttr } from "./useAttr";

const { currentComponent, handlerChange } = useAttr();
</script>

<style scoped lang="scss">
.radiusStyleWrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 10px;
  aspect-ratio: 1;
}
</style>

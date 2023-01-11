<template>
  <el-form-item label="阴影">
    <div class="radiusStyleWrapper" w-full items-start>
      <el-tooltip
        v-for="it in shadowOptions"
        :content="it.title"
        placement="top"
      >
        <div
          flex
          items-center
          justify-center
          w-6
          h-6
          border
          cursor-pointer
          hover="bg-gray-2"
          class="p1.5"
          :class="[
            currentComponent?.style.boxShadow == it.value
              ? 'border-#090707'
              : 'border-gray-2',
            it.title == SizeEnum.NONE &&
              !currentComponent?.style.boxShadow &&
              'border-#090707!',
          ]"
          @click="handlerChange('boxShadow', it.value)"
        >
          <el-icon v-if="it.value == SizeEnum.NONE" text-xl><Close /></el-icon>
          <div
            v-else
            w-full
            h-full
            :style="{
              boxShadow: it.value,
            }"
          ></div>
        </div>
      </el-tooltip>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { shadowOptions, SizeEnum } from "./contact";
import { useAttr } from "./useAttr";
import { Close } from "@element-plus/icons-vue";

const { currentComponent, handlerChange } = useAttr();
</script>

<style scoped lang="scss">
.radiusStyleWrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 10px;
}
</style>

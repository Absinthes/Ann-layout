<template>
  <div flex items-center px-10px py-4 shadow>
    <el-button>JSON</el-button>
    <el-button>撤销</el-button>
    <el-button>重做</el-button>
    <el-button>插入图片</el-button>
    <el-button>预览</el-button>
    <el-button>保存</el-button>
    <el-button>清空画布</el-button>
    <el-button disabled>组合</el-button>
    <el-button disabled>拆分</el-button>
    <el-button disabled>锁定</el-button>
    <el-button disabled>解锁</el-button>
    <el-button>截图</el-button>
    <div flex items-center ml-3>
      <span white-nowrap mr-2>画布大小</span>
      <el-input v-model="editWidth" class="w-120px"></el-input>
      <span mx-2>*</span>
      <el-input v-model="editHeight" class="w-120px"></el-input>
    </div>
    <span ml-3 mr-2 white-nowrap >画布比例</span>
    <el-input :model-value="100" :max="100" :min="0" class="w-120px"></el-input>
    <span>%</span>
  </div>
</template>
  
<script lang='ts' setup>
import { storeToRefs } from 'pinia';
import { useLowCodeStore } from '~/store';

const lowCodeStore = useLowCodeStore()
const { editWidth, editHeight } = storeToRefs(lowCodeStore)

</script>
  
<style lang='stylus' scoped></style>
  
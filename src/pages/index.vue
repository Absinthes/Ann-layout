<template>
  <Toolbar />
  <main font-sans class="main">
    <section class="left">
      <ComponetList />
    </section>
    <section class="center bg-#f5f5f5" p5 overflow-auto>
      <div overflow-auto>
        <Editor />
      </div>
    </section>
    <section class="right">

    </section>
  </main>
</template>
  
<script lang='ts' setup>

</script>
  
<style lang='scss' scoped>
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
  
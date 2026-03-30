<template>
  <router-view />
</template>

<script setup>
// 根组件，由路由控制页面显示
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: $font-family;
  font-size: $font-size-base;
  color: #303133;
  background-color: #f5f7fa;
}

#app {
  height: 100vh;
  width: 100vw;
}
</style>
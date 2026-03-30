<template>
  <el-container class="main-layout">
    <el-aside width="200px" class="sidebar">
      <sidebar />
    </el-aside>
    <el-container class="right-container">
      <el-main class="editor-area">
        <editor-area />
      </el-main>
      <el-aside width="50%" class="preview-area">
        <preview-area />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import EditorArea from "./EditorArea.vue";
import PreviewArea from "./PreviewArea.vue";
</script>

<style scoped lang="scss">
.main-layout {
  height: 100vh;
  width: 100vw;

  .sidebar {
    background-color: #fff;
    border-right: 1px solid #e4e7ed;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  .right-container {
    display: flex;
    flex: 1;

    .editor-area {
      flex: 1;
      background-color: #fafafa;
      padding: 20px;
      overflow-y: auto;
      min-width: 0; // 防止 flex 项目溢出
    }

    .preview-area {
      flex: 1;
      background-color: #fff;
      border-left: 1px solid #e4e7ed;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
      min-width: 0; // 防止 flex 项目溢出
    }
  }
}
</style>

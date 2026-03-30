<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h2>简历快编</h2>
      <p class="subtitle">在线简历编辑平台</p>
    </div>

    <el-menu
      default-active="personal"
      class="sidebar-menu"
      @select="handleMenuSelect"
    >
      <el-menu-item index="personal">
        <el-icon><User /></el-icon>
        <span>个人信息</span>
      </el-menu-item>

      <el-menu-item index="education">
        <el-icon><School /></el-icon>
        <span>教育背景</span>
      </el-menu-item>

      <el-menu-item index="experience">
        <el-icon><Briefcase /></el-icon>
        <span>工作经验</span>
      </el-menu-item>

      <el-menu-item index="skills">
        <el-icon><Trophy /></el-icon>
        <span>技能特长</span>
      </el-menu-item>

      <el-menu-item index="projects">
        <el-icon><Folder /></el-icon>
        <span>项目经验</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { User, School, Briefcase, Trophy, Folder } from '@element-plus/icons-vue'
import { useResumeStore } from '../stores/resumeStore'

const resumeStore = useResumeStore()

const handleMenuSelect = (index) => {
  resumeStore.setActiveSection(index)
}
</script>

<style scoped lang="scss">
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;

  .sidebar-header {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #e4e7ed;

    h2 {
      color: $primary-color;
      font-size: 18px;
      margin-bottom: 5px;
    }

    .subtitle {
      color: $info-color;
      font-size: 12px;
      margin: 0;
    }
  }

  .sidebar-menu {
    flex: 1;
    border-right: none;

    .el-menu-item {
      display: flex;
      align-items: center;
      gap: 8px;

      &.is-active {
        background-color: mix(#fff, $primary-color, 90%);
      }
    }
  }
}
</style>
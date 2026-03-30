<template>
  <div class="editor-area">
    <div class="editor-header">
      <h1>编辑简历</h1>
      <el-button type="primary" @click="handleExportPDF">
        <el-icon><Download /></el-icon>
        导出 PDF
      </el-button>
    </div>

    <div class="editor-content">
      <component :is="currentEditorComponent" />
    </div>
  </div>
</template>

<script setup>
import { Download } from '@element-plus/icons-vue'
import { useResumeStore } from '../stores/resumeStore'
import { computed } from 'vue'
import PersonalEditor from '../components/editors/PersonalEditor.vue'
import EducationEditor from '../components/editors/EducationEditor.vue'
import ExperienceEditor from '../components/editors/ExperienceEditor.vue'
import SkillsEditor from '../components/editors/SkillsEditor.vue'
import ProjectsEditor from '../components/editors/ProjectsEditor.vue'
import { exportToPDF } from '../utils/pdfExport'

const resumeStore = useResumeStore()

const editorComponents = {
  personal: PersonalEditor,
  education: EducationEditor,
  experience: ExperienceEditor,
  skills: SkillsEditor,
  projects: ProjectsEditor
}

const currentEditorComponent = computed(() => {
  return editorComponents[resumeStore.activeSection] || PersonalEditor
})

const handleExportPDF = async () => {
  const previewElement = document.querySelector('.preview-content')
  if (previewElement) {
    await exportToPDF(previewElement)
  }
}
</script>

<style scoped lang="scss">
.editor-area {
  height: 100%;
  display: flex;
  flex-direction: column;

  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e4e7ed;

    h1 {
      color: #303133;
      font-size: 24px;
      margin: 0;
    }

    .el-button {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .editor-content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
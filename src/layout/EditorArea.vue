<template>
  <div class="editor-area">
    <div class="editor-header">
      <h1>编辑简历</h1>
      <el-button type="primary" @click="handleExportPDF" :loading="isExporting">
        <el-icon><Download /></el-icon>
        导出 PDF
      </el-button>
    </div>

    <div class="editor-content">
      <component :is="currentEditorComponent" />
    </div>

    <!-- PDF导出进度提示 -->
    <PDFExportProgress
      v-model:visible="showProgress"
      :progress="exportProgress"
      :message="exportMessage"
      :stage="exportStage"
      :can-cancel="true"
      @cancel="handleCancelExport"
    />
  </div>
</template>

<script setup>
import { Download, Loading } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useResumeStore } from '../stores/resumeStore'
import { computed, ref } from 'vue'
import PersonalEditor from '../components/editors/PersonalEditor.vue'
import EducationEditor from '../components/editors/EducationEditor.vue'
import ExperienceEditor from '../components/editors/ExperienceEditor.vue'
import SkillsEditor from '../components/editors/SkillsEditor.vue'
import ProjectsEditor from '../components/editors/ProjectsEditor.vue'
import { exportResumeWithProgress } from '../utils/pdfExport'
import PDFExportProgress from '../components/PDFExportProgress.vue'

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

// PDF导出状态
const isExporting = ref(false)
const showProgress = ref(false)
const exportProgress = ref(0)
const exportMessage = ref('准备中...')
const exportStage = ref('initializing')

const handleExportPDF = async () => {
  try {
    isExporting.value = true
    showProgress.value = true
    exportProgress.value = 0
    exportMessage.value = '准备中...'
    exportStage.value = 'initializing'

    // 进度回调函数
    const onProgress = (progressData) => {
      exportProgress.value = progressData.progress
      exportMessage.value = progressData.message
      exportStage.value = progressData.stage
    }

    // 使用带进度的PDF导出
    const result = await exportResumeWithProgress(onProgress, {
      filename: '简历.pdf'
    })

    if (result.success) {
      console.log('✅ PDF导出成功:', result.filename)
      // 进度提示会自动关闭（当progress达到100时）
    } else {
      throw new Error('PDF生成失败')
    }

  } catch (error) {
    console.error('❌ PDF导出失败:', error)

    // 错误分类处理
    let errorMessage = 'PDF导出失败'

    if (error.message.includes('字体')) {
      errorMessage = '字体加载失败，请检查网络连接或重启应用'
    } else if (error.message.includes('网络') || error.message.includes('fetch')) {
      errorMessage = '网络连接失败，请检查网络设置'
    } else if (error.message.includes('内存')) {
      errorMessage = '内存不足，请关闭其他应用后重试'
    } else {
      errorMessage = 'PDF导出失败：' + error.message
    }

    // 显示错误提示
    ElMessage.error(errorMessage)
  } finally {
    isExporting.value = false
    // 延迟关闭进度提示，让用户看到完成状态
    setTimeout(() => {
      showProgress.value = false
    }, 1000)
  }
}

const handleCancelExport = () => {
  console.log('🛑 用户取消PDF导出')
  isExporting.value = false
  showProgress.value = false
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
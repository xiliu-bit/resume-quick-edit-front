<template>
  <div v-if="visible" class="pdf-export-progress">
    <div class="progress-overlay">
      <div class="progress-dialog">
        <div class="progress-header">
          <el-icon class="loading-icon"><Loading /></el-icon>
          <h3>正在生成PDF...</h3>
        </div>

        <div class="progress-content">
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: progress + '%' }"
            ></div>
          </div>

          <div class="progress-text">
            <span class="progress-percent">{{ progress }}%</span>
            <span class="progress-message">{{ message }}</span>
          </div>

          <div class="progress-stages">
            <div
              v-for="(stage, index) in stages"
              :key="index"
              class="progress-stage"
              :class="{
                'stage-completed': index < currentStageIndex,
                'stage-current': index === currentStageIndex,
                'stage-pending': index > currentStageIndex
              }"
            >
              <el-icon v-if="index < currentStageIndex" class="stage-icon"><Check /></el-icon>
              <el-icon v-else-if="index === currentStageIndex" class="stage-icon"><Loading /></el-icon>
              <span v-else class="stage-number">{{ index + 1 }}</span>
              <span class="stage-label">{{ stage }}</span>
            </div>
          </div>
        </div>

        <div class="progress-actions">
          <el-button
            size="small"
            @click="handleCancel"
            :disabled="!canCancel"
          >
            取消
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Loading, Check } from '@element-plus/icons-vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  },
  message: {
    type: String,
    default: '准备中...'
  },
  stage: {
    type: String,
    default: 'initializing'
  },
  canCancel: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['cancel', 'update:visible'])

// 定义生成阶段
const stages = [
  '初始化PDF生成器',
  '转换简历数据',
  '优化页面布局',
  '生成PDF文档',
  '完成导出'
]

// 阶段映射
const stageMapping = {
  initializing: 0,
  converting: 1,
  optimizing: 2,
  generating: 3,
  completed: 4
}

// 当前阶段索引
const currentStageIndex = computed(() => {
  return stageMapping[props.stage] || 0
})

// 取消处理
const handleCancel = () => {
  emit('cancel')
  emit('update:visible', false)
}
</script>

<style scoped lang="scss">
.pdf-export-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;

  .progress-overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress-dialog {
    background: white;
    border-radius: 8px;
    padding: 30px;
    min-width: 400px;
    max-width: 500px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .progress-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;

    .loading-icon {
      font-size: 24px;
      color: #409EFF;
      animation: spin 1s linear infinite;
    }

    h3 {
      margin: 0;
      color: #303133;
      font-size: 18px;
    }
  }

  .progress-content {
    .progress-bar {
      width: 100%;
      height: 8px;
      background: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 15px;

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #409EFF, #67C23A);
        border-radius: 4px;
        transition: width 0.3s ease;
      }
    }

    .progress-text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .progress-percent {
        font-size: 16px;
        font-weight: bold;
        color: #409EFF;
      }

      .progress-message {
        color: #606266;
        font-size: 14px;
      }
    }

    .progress-stages {
      .progress-stage {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
        color: #909399;

        &.stage-completed {
          color: #67C23A;
        }

        &.stage-current {
          color: #409EFF;
          font-weight: bold;
        }

        .stage-icon {
          font-size: 16px;
        }

        .stage-number {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }

        .stage-label {
          font-size: 14px;
        }
      }
    }
  }

  .progress-actions {
    margin-top: 20px;
    text-align: center;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
}
</style>
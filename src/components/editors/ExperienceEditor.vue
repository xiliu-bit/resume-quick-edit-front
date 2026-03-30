<template>
  <div class="editor-form">
    <div class="section-header">
      <h3>工作经验</h3>
      <el-button type="primary" @click="addExperience" size="small">
        <el-icon><Plus /></el-icon>
        添加工作经验
      </el-button>
    </div>

    <div class="items-list">
      <div
        v-for="(exp, index) in resumeStore.experience"
        :key="exp.id"
        class="item-card"
      >
        <div class="item-header">
          <span>工作经验 {{ index + 1 }}</span>
          <el-button
            type="danger"
            size="small"
            @click="removeExperience(exp.id)"
          >
            删除
          </el-button>
        </div>

        <el-form :model="exp" label-width="80px" class="item-form">
          <el-form-item label="公司">
            <el-input v-model="exp.company" placeholder="请输入公司名称" />
          </el-form-item>

          <el-form-item label="职位">
            <el-input v-model="exp.position" placeholder="请输入职位名称" />
          </el-form-item>

          <el-form-item label="时间">
            <el-date-picker
              v-model="expDateRange[index]"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              @change="updateExperienceDate(index, $event)"
            />
          </el-form-item>

          <el-form-item label="描述">
            <el-input
              v-model="exp.description"
              type="textarea"
              rows="4"
              placeholder="请描述工作职责和成就"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useResumeStore } from '../../stores/resumeStore'

const resumeStore = useResumeStore()

// 计算日期范围
const expDateRange = ref([])

watch(
  () => resumeStore.experience,
  (experience) => {
    expDateRange.value = experience.map(exp => {
      if (exp.startDate && exp.endDate) {
        return [new Date(exp.startDate), new Date(exp.endDate)]
      }
      return null
    })
  },
  { immediate: true, deep: true }
)

const addExperience = () => {
  resumeStore.addExperience({
    id: Date.now(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  })
}

const removeExperience = (id) => {
  resumeStore.removeExperience(id)
}

const updateExperienceDate = (index, dates) => {
  if (dates && dates.length === 2) {
    const [start, end] = dates
    resumeStore.updateExperience(resumeStore.experience[index].id, {
      startDate: start.toISOString().substring(0, 7),
      endDate: end.toISOString().substring(0, 7)
    })
  }
}
</script>

<style scoped lang="scss">
.editor-form {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      margin: 0;
      color: #303133;
    }

    .el-button {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .items-list {
    .item-card {
      background: white;
      border: 1px solid #e4e7ed;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;

      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #f0f0f0;

        span {
          font-weight: bold;
          color: #303133;
        }
      }

      .item-form {
        .el-form-item {
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>
<template>
  <div class="editor-form">
    <div class="section-header">
      <h3>教育背景</h3>
      <el-button type="primary" @click="addEducation" size="small">
        <el-icon><Plus /></el-icon>
        添加教育经历
      </el-button>
    </div>

    <div class="items-list">
      <div
        v-for="(edu, index) in resumeStore.education"
        :key="edu.id"
        class="item-card"
      >
        <div class="item-header">
          <span>教育经历 {{ index + 1 }}</span>
          <el-button
            type="danger"
            size="small"
            @click="removeEducation(edu.id)"
          >
            删除
          </el-button>
        </div>

        <el-form :model="edu" label-width="80px" class="item-form">
          <el-form-item label="学校">
            <el-input v-model="edu.school" placeholder="请输入学校名称" />
          </el-form-item>

          <el-form-item label="专业">
            <el-input v-model="edu.major" placeholder="请输入专业" />
          </el-form-item>

          <el-form-item label="学历">
            <el-select v-model="edu.degree" placeholder="请选择学历">
              <el-option label="高中" value="高中" />
              <el-option label="大专" value="大专" />
              <el-option label="本科" value="本科" />
              <el-option label="硕士" value="硕士" />
              <el-option label="博士" value="博士" />
            </el-select>
          </el-form-item>

          <el-form-item label="时间">
            <el-date-picker
              v-model="eduDateRange[index]"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              @change="updateEducationDate(index, $event)"
            />
          </el-form-item>

          <el-form-item label="描述">
            <el-input
              v-model="edu.description"
              type="textarea"
              rows="3"
              placeholder="请输入相关描述"
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
const eduDateRange = ref([])

watch(
  () => resumeStore.education,
  (education) => {
    eduDateRange.value = education.map(edu => {
      if (edu.startDate && edu.endDate) {
        return [new Date(edu.startDate), new Date(edu.endDate)]
      }
      return null
    })
  },
  { immediate: true, deep: true }
)

const addEducation = () => {
  resumeStore.addEducation({
    id: Date.now(),
    school: '',
    major: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: ''
  })
}

const removeEducation = (id) => {
  resumeStore.removeEducation(id)
}

const updateEducationDate = (index, dates) => {
  if (dates && dates.length === 2) {
    const [start, end] = dates
    resumeStore.updateEducation(resumeStore.education[index].id, {
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
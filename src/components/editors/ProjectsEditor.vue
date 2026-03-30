<template>
  <div class="editor-form">
    <div class="section-header">
      <h3>项目经验</h3>
      <el-button type="primary" @click="addProject" size="small">
        <el-icon><Plus /></el-icon>
        添加项目
      </el-button>
    </div>

    <div class="items-list">
      <div
        v-for="(project, index) in resumeStore.projects"
        :key="project.id"
        class="item-card"
      >
        <div class="item-header">
          <span>项目 {{ index + 1 }}</span>
          <el-button
            type="danger"
            size="small"
            @click="removeProject(project.id)"
          >
            删除
          </el-button>
        </div>

        <el-form :model="project" label-width="80px" class="item-form">
          <el-form-item label="项目名称">
            <el-input v-model="project.name" placeholder="请输入项目名称" />
          </el-form-item>

          <el-form-item label="担任角色">
            <el-input v-model="project.role" placeholder="请输入担任的角色" />
          </el-form-item>

          <el-form-item label="时间">
            <el-date-picker
              v-model="projectDateRange[index]"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              @change="updateProjectDate(index, $event)"
            />
          </el-form-item>

          <el-form-item label="项目描述">
            <el-input
              v-model="project.description"
              type="textarea"
              rows="4"
              placeholder="请描述项目内容、技术栈和您的贡献"
            />
          </el-form-item>

          <el-form-item label="项目链接" v-if="project.link !== undefined">
            <el-input v-model="project.link" placeholder="项目链接（可选）" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useResumeStore } from '../../stores/resumeStore'

const resumeStore = useResumeStore()

// 计算日期范围
const projectDateRange = ref([])

watch(
  () => resumeStore.projects,
  (projects) => {
    projectDateRange.value = projects.map(project => {
      if (project.startDate && project.endDate) {
        return [new Date(project.startDate), new Date(project.endDate)]
      }
      return null
    })
  },
  { immediate: true, deep: true }
)

const addProject = () => {
  resumeStore.addProject({
    id: Date.now(),
    name: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
    link: ''
  })
}

const removeProject = (id) => {
  resumeStore.removeProject(id)
}

const updateProjectDate = (index, dates) => {
  if (dates && dates.length === 2) {
    const [start, end] = dates
    resumeStore.updateProject(resumeStore.projects[index].id, {
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
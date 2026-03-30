<template>
  <div class="editor-form">
    <div class="section-header">
      <h3>技能特长</h3>
      <el-button type="primary" @click="showAddSkill = true" size="small">
        <el-icon><Plus /></el-icon>
        添加技能
      </el-button>
    </div>

    <div class="skills-container">
      <el-tag
        v-for="skill in resumeStore.skills"
        :key="skill.id"
        closable
        @close="removeSkill(skill.id)"
        class="skill-tag"
      >
        {{ skill.name }}
      </el-tag>
    </div>

    <el-dialog v-model="showAddSkill" title="添加技能" width="400px">
      <el-form @submit.prevent="addSkill">
        <el-form-item>
          <el-input
            v-model="newSkillName"
            placeholder="请输入技能名称"
            @keyup.enter="addSkill"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddSkill = false">取消</el-button>
        <el-button type="primary" @click="addSkill">添加</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useResumeStore } from '../../stores/resumeStore'

const resumeStore = useResumeStore()
const showAddSkill = ref(false)
const newSkillName = ref('')

const addSkill = () => {
  if (newSkillName.value.trim()) {
    resumeStore.addSkill({
      id: Date.now(),
      name: newSkillName.value.trim()
    })
    newSkillName.value = ''
    showAddSkill.value = false
  }
}

const removeSkill = (id) => {
  resumeStore.removeSkill(id)
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

  .skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    min-height: 100px;
    padding: 20px;
    background: white;
    border: 1px solid #e4e7ed;
    border-radius: 8px;

    .skill-tag {
      font-size: 14px;
      padding: 8px 16px;

      &:hover {
        .el-tag__close {
          color: $danger-color;
        }
      }
    }

    &:empty {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #909399;
      font-style: italic;
    }
  }
}
</style>
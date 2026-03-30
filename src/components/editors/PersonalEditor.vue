<template>
  <div class="editor-form">
    <el-form :model="form" label-width="100px" class="resume-form">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item label="电话">
        <el-input v-model="form.phone" placeholder="请输入电话号码" />
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱地址" />
      </el-form-item>

      <el-form-item label="地址">
        <el-input v-model="form.location" placeholder="请输入居住地址" />
      </el-form-item>

      <el-form-item label="个人简介">
        <el-input
          v-model="form.summary"
          type="textarea"
          rows="4"
          placeholder="请输入个人简介"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useResumeStore } from '../../stores/resumeStore'

const resumeStore = useResumeStore()

const form = computed({
  get: () => resumeStore.personalInfo,
  set: (value) => resumeStore.updatePersonalInfo(value)
})
</script>

<style scoped lang="scss">
.editor-form {
  .resume-form {
    max-width: 600px;

    .el-form-item {
      margin-bottom: 20px;
    }
  }
}
</style>
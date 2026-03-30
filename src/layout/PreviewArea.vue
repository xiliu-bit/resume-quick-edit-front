<template>
  <div class="preview-area">
    <div class="preview-header">
      <h2>简历预览</h2>
    </div>

    <div class="preview-content" ref="previewContent">
      <div class="resume-preview">
        <!-- 个人信息 -->
        <div class="resume-section">
          <h1 class="resume-name">{{ resumeStore.personalInfo.name || '姓名' }}</h1>
          <div class="resume-contact">
            <span v-if="resumeStore.personalInfo.phone">{{ resumeStore.personalInfo.phone }}</span>
            <span v-if="resumeStore.personalInfo.email">{{ resumeStore.personalInfo.email }}</span>
            <span v-if="resumeStore.personalInfo.location">{{ resumeStore.personalInfo.location }}</span>
          </div>
        </div>

        <!-- 教育背景 -->
        <div class="resume-section" v-if="resumeStore.education.length > 0">
          <h3>教育背景</h3>
          <div v-for="edu in resumeStore.education" :key="edu.id" class="resume-item">
            <div class="item-header">
              <span class="item-title">{{ edu.school }}</span>
              <span class="item-date">{{ edu.startDate }} - {{ edu.endDate }}</span>
            </div>
            <div class="item-subtitle">{{ edu.major }} | {{ edu.degree }}</div>
            <div class="item-description">{{ edu.description }}</div>
          </div>
        </div>

        <!-- 工作经验 -->
        <div class="resume-section" v-if="resumeStore.experience.length > 0">
          <h3>工作经验</h3>
          <div v-for="exp in resumeStore.experience" :key="exp.id" class="resume-item">
            <div class="item-header">
              <span class="item-title">{{ exp.company }}</span>
              <span class="item-date">{{ exp.startDate }} - {{ exp.endDate }}</span>
            </div>
            <div class="item-subtitle">{{ exp.position }}</div>
            <div class="item-description">{{ exp.description }}</div>
          </div>
        </div>

        <!-- 技能特长 -->
        <div class="resume-section" v-if="resumeStore.skills.length > 0">
          <h3>技能特长</h3>
          <div class="skills-list">
            <span v-for="skill in resumeStore.skills" :key="skill.id" class="skill-tag">
              {{ skill.name }}
            </span>
          </div>
        </div>

        <!-- 项目经验 -->
        <div class="resume-section" v-if="resumeStore.projects.length > 0">
          <h3>项目经验</h3>
          <div v-for="project in resumeStore.projects" :key="project.id" class="resume-item">
            <div class="item-header">
              <span class="item-title">{{ project.name }}</span>
              <span class="item-date">{{ project.startDate }} - {{ project.endDate }}</span>
            </div>
            <div class="item-subtitle">{{ project.role }}</div>
            <div class="item-description">{{ project.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useResumeStore } from '../stores/resumeStore'

const resumeStore = useResumeStore()
const previewContent = ref(null)
</script>

<style scoped lang="scss">
.preview-area {
  height: 100%;
  display: flex;
  flex-direction: column;

  .preview-header {
    padding: 15px 20px;
    border-bottom: 1px solid #e4e7ed;

    h2 {
      color: #303133;
      font-size: 18px;
      margin: 0;
    }
  }

  .preview-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;

    .resume-preview {
      background: white;
      padding: 30px;
      min-height: 297mm; // A4 height
      width: 210mm; // A4 width
      margin: 0 auto;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      .resume-section {
        margin-bottom: 25px;

        &:last-child {
          margin-bottom: 0;
        }

        h1.resume-name {
          font-size: 28px;
          color: #303133;
          margin-bottom: 10px;
          text-align: center;
        }

        .resume-contact {
          text-align: center;
          color: #606266;
          font-size: 14px;
          margin-bottom: 20px;

          span {
            margin: 0 10px;

            &:not(:last-child)::after {
              content: '|';
              margin-left: 20px;
              color: #dcdfe6;
            }
          }
        }

        h3 {
          font-size: 18px;
          color: #303133;
          border-bottom: 2px solid $primary-color;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }

        .resume-item {
          margin-bottom: 15px;

          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;

            .item-title {
              font-weight: bold;
              color: #303133;
            }

            .item-date {
              color: #909399;
              font-size: 12px;
            }
          }

          .item-subtitle {
            color: #606266;
            font-style: italic;
            margin-bottom: 5px;
          }

          .item-description {
            color: #606266;
            line-height: 1.5;
          }
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;

          .skill-tag {
            background-color: mix(#fff, $primary-color, 90%);
            color: $primary-color;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
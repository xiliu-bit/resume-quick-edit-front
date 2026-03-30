<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">简历快编</h1>
        <p class="hero-subtitle">专业的在线简历编辑与导出平台</p>
        <p class="hero-description">
          简洁高效的简历制作工具，支持实时预览和一键导出 PDF。
          让您的简历制作变得简单而专业。
        </p>
        <el-button type="primary" size="large" @click="goToEditor" class="start-button">
          <el-icon><Edit /></el-icon>
          开始制作简历
        </el-button>
      </div>
    </div>

    <div class="features-section">
      <div class="container">
        <h2 class="section-title">核心功能</h2>
        <div class="features-grid">
          <div class="feature-card">
            <el-icon class="feature-icon"><Edit /></el-icon>
            <h3>智能编辑</h3>
            <p>直观的表单编辑器，支持个人信息、教育背景、工作经验、技能特长等完整模块</p>
          </div>

          <div class="feature-card">
            <el-icon class="feature-icon"><View /></el-icon>
            <h3>实时预览</h3>
            <p>编辑内容即时同步到右侧预览区，所见即所得的编辑体验</p>
          </div>

          <div class="feature-card">
            <el-icon class="feature-icon"><Download /></el-icon>
            <h3>一键导出</h3>
            <p>支持导出高质量 PDF 文件，保持原有格式和样式</p>
          </div>

          <div class="feature-card">
            <el-icon class="feature-icon"><DataAnalysis /></el-icon>
            <h3>数据管理</h3>
            <p>基于 Pinia 的状态管理，确保数据的一致性和可靠性</p>
          </div>
        </div>
      </div>
    </div>

    <div class="cta-section">
      <div class="container">
        <h2>准备开始了吗？</h2>
        <p>立即体验专业的简历制作工具</p>
        <el-button type="primary" size="large" @click="goToEditor">
          立即开始
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Edit, View, Download, DataAnalysis } from '@element-plus/icons-vue'

const router = useRouter()

const goToEditor = () => {
  router.push('/editor')
}
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  .hero-section {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    padding: 60px 20px;
    text-align: center;

    .hero-content {
      max-width: 800px;

      .hero-title {
        font-size: 48px;
        font-weight: bold;
        color: #303133;
        margin-bottom: 20px;
      }

      .hero-subtitle {
        font-size: 24px;
        color: #606266;
        margin-bottom: 15px;
      }

      .hero-description {
        font-size: 16px;
        color: #909399;
        line-height: 1.6;
        margin-bottom: 30px;
      }

      .start-button {
        font-size: 16px;
        padding: 12px 30px;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 auto;
      }
    }
  }

  .features-section {
    padding: 80px 20px;
    background: white;

    .container {
      max-width: 1200px;
      margin: 0 auto;

      .section-title {
        text-align: center;
        font-size: 32px;
        color: #303133;
        margin-bottom: 50px;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;

        .feature-card {
          text-align: center;
          padding: 30px 20px;
          border-radius: 12px;
          background: #f8f9fa;
          transition: transform 0.3s ease, box-shadow 0.3s ease;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .feature-icon {
            font-size: 48px;
            color: $primary-color;
            margin-bottom: 20px;
          }

          h3 {
            font-size: 20px;
            color: #303133;
            margin-bottom: 15px;
          }

          p {
            color: #606266;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .cta-section {
    padding: 80px 20px;
    text-align: center;
    background: linear-gradient(135deg, $primary-color 0%, #53a8ff 100%);
    color: white;

    .container {
      max-width: 600px;
      margin: 0 auto;

      h2 {
        font-size: 32px;
        margin-bottom: 15px;
      }

      p {
        font-size: 18px;
        margin-bottom: 30px;
        opacity: 0.9;
      }

      .el-button {
        font-size: 16px;
        padding: 12px 30px;
        background: white;
        color: $primary-color;
        border: none;

        &:hover {
          background: #f8f9fa;
          transform: translateY(-2px);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home-page {
    .hero-section {
      .hero-content {
        .hero-title {
          font-size: 36px;
        }

        .hero-subtitle {
          font-size: 20px;
        }
      }
    }

    .features-section {
      .container {
        .features-grid {
          grid-template-columns: 1fr;
        }
      }
    }
  }
}
</style>
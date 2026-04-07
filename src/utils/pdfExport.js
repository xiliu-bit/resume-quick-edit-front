/**
 * PDF导出工具函数 (兼容层)
 * 为了保持向后兼容性，保留原有的导出接口
 * 内部调用新的pdfmake生成器
 */

import { generateResumePDF, pdfGenerator } from './pdf-generator'
import { useResumeStore } from '../stores/resumeStore'

/**
 * 原有的exportToPDF函数 - 现在作为兼容层
 * @param {HTMLElement} element - 要导出的HTML元素（此参数在新版本中不再使用）
 * @param {string} filename - 导出的文件名
 */
export const exportToPDF = async (element, filename = 'resume.pdf') => {
  try {
    console.log('📄 使用pdfmake生成文本型PDF...')

    // 获取简历数据
    const resumeStore = useResumeStore()

    // 使用新的pdfmake生成器
    const result = await generateResumePDF(resumeStore, {
      title: filename.replace('.pdf', ''),
      author: resumeStore.personalInfo.name || '简历快编用户'
    })

    if (result.success && result.generator) {
      // 下载PDF
      result.generator.download(filename)
      console.log('✅ 文本型PDF导出成功')
      return true
    } else {
      throw new Error(result.error || 'PDF生成失败')
    }

  } catch (error) {
    console.error('❌ PDF导出失败:', error)
    throw new Error('PDF导出失败: ' + error.message)
  }
}

/**
 * 新的PDF导出函数 - 推荐使用
 */
export const exportResumeAsPDF = async (options = {}) => {
  try {
    const resumeStore = useResumeStore()

    const result = await generateResumePDF(resumeStore, {
      title: options.filename || '简历',
      author: resumeStore.personalInfo.name || '简历快编用户',
      ...options
    })

    if (result.success && result.generator) {
      const filename = options.filename || '简历.pdf'
      result.generator.download(filename)
      return { success: true, filename }
    } else {
      throw new Error(result.error || 'PDF生成失败')
    }

  } catch (error) {
    console.error('❌ 简历PDF导出失败:', error)
    throw error
  }
}

/**
 * 带进度提示的PDF导出
 */
export const exportResumeWithProgress = async (onProgress, options = {}) => {
  try {
    const resumeStore = useResumeStore()

    // 开始生成PDF
    onProgress({ stage: 'generating', progress: 10, message: '开始生成PDF...' })

    const pdfDocGenerator = await pdfGenerator.generatePDFWithProgress(
      resumeStore,
      options,
      (progressData) => {
        // 调整进度：从10%开始到100%
        const adjustedProgress = 10 + Math.floor((progressData.progress * 0.9))
        onProgress({
          ...progressData,
          progress: adjustedProgress,
          message: progressData.message
        })
      }
    )

    if (pdfDocGenerator) {
      const filename = options.filename || '简历.pdf'
      pdfDocGenerator.download(filename)
      onProgress({ stage: 'completed', progress: 100, message: 'PDF生成完成' })
      return { success: true, filename }
    } else {
      throw new Error('PDF生成器创建失败')
    }

  } catch (error) {
    console.error('❌ 带进度的PDF导出失败:', error)
    throw error
  }
}

/**
 * 优化简历预览区域的样式以便PDF导出（兼容性函数）
 */
export const optimizeForPDFExport = () => {
  console.log('📝 pdfmake直接生成文本，无需优化HTML样式')
  // 在pdfmake方案中，这个函数不再需要
  // 保留是为了兼容性
}

/**
 * 恢复预览区域的正常样式（兼容性函数）
 */
export const restorePreviewStyles = () => {
  console.log('📝 pdfmake直接生成文本，无需恢复样式')
  // 在pdfmake方案中，这个函数不再需要
  // 保留是为了兼容性
}

/**
 * 获取PDF生成状态信息
 */
export const getPDFGenerationStatus = () => {
  return {
    engine: 'pdfmake',
    type: 'text-based',
    features: [
      '文字可选中复制',
      '支持文本搜索',
      '专业排版',
      '多页自动分页',
      '使用默认字体'
    ],
    isReady: pdfGenerator.isInitialized
  }
}

export default {
  exportToPDF,
  exportResumeAsPDF,
  exportResumeWithProgress,
  optimizeForPDFExport,
  restorePreviewStyles,
  getPDFGenerationStatus
}
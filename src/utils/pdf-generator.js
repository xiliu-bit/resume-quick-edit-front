/**
 * PDF生成器核心实现
 * 集成数据转换器、模板系统和pdfmake
 */

// 不直接导入，使用动态导入确保使用全局实例
import { createResumeTemplate } from './pdf-templates'
import { smartPageBreak, previewPagination } from './pdf-pagination'

/**
 * PDF生成器类
 */
class PDFGenerator {
  constructor() {
    this.isInitialized = false
    this.generationQueue = []
    this.isGenerating = false
  }

  /**
   * 初始化PDF生成器
   */
  async initialize() {
    if (this.isInitialized) return

    try {
      console.log('🔧 初始化PDF生成器（使用华文楷体）...')

      // 验证pdfmake是否可用
      const pdfMakeModule = await import('pdfmake/build/pdfmake')
      const pdfMake = pdfMakeModule.default

      if (!pdfMake) {
        throw new Error('pdfmake库未正确加载')
      }

      this.isInitialized = true
      console.log('✅ PDF生成器初始化完成（使用华文楷体）')

    } catch (error) {
      console.error('❌ PDF生成器初始化失败:', error)
      throw error
    }
  }

  /**
   * 创建pdfmake实例配置
   */
  async createPDFConfig(docDefinition, options = {}) {
    // 使用华文楷体
    const fontName = 'STKAITI'

    const defaultConfig = {
      // 页面设置
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [40, 60, 40, 60],

      // 默认样式
      defaultStyle: {
        fontSize: 11,
        lineHeight: 1.4,
        font: fontName
      },

      // 样式定义
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
          font: fontName
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          margin: [0, 15, 0, 10],
          font: fontName
        },
        itemTitle: {
          fontSize: 12,
          bold: true,
          font: fontName
        },
        itemSubtitle: {
          fontSize: 11,
          bold: true,
          color: '#3498db',
          font: fontName
        },
        itemDate: {
          fontSize: 10,
          color: '#7f8c8d',
          italics: true,
          font: fontName
        },
        itemDescription: {
          fontSize: 10,
          margin: [0, 5, 0, 10],
          lineHeight: 1.4,
          font: fontName
        }
      },

      // 元数据
      info: {
        Title: options.title || '简历',
        Author: options.author || '简历快编',
        Subject: '个人简历',
        Keywords: '简历,求职,简历制作',
        Creator: '简历快编 - 在线简历编辑平台',
        Producer: 'pdfmake',
        CreationDate: new Date()
      }
    }

    return {
      ...defaultConfig,
      ...docDefinition,
      content: docDefinition.content || [],
      styles: {
        ...defaultConfig.styles,
        ...(docDefinition.styles || {})
      }
    }
  }


  /**
   * 开发PDF生成主函数
   */
  async generatePDF(resumeData, options = {}) {
    if (!this.isInitialized) {
      await this.initialize()
    }


    try {
      console.log('📄 开始生成PDF...')

      // 创建简历模板
      const docDefinition = createResumeTemplate(resumeData)

      // 应用分页优化
      const optimizedDefinition = smartPageBreak(docDefinition)

      // 创建PDF配置
      const pdfConfig = await this.createPDFConfig(optimizedDefinition, options)

      // 生成分页预览（开发模式）
      if (options.debug) {
        previewPagination(pdfConfig.content)
      }

      // 创建PDF实例 - 动态导入确保使用正确的实例
      const pdfMakeModule = await import('pdfmake/build/pdfmake')
      const pdfMake = pdfMakeModule.default
      const pdfDocGenerator = pdfMake.createPdf(pdfConfig)

      console.log('✅ PDF文档生成器创建成功')
      return pdfDocGenerator

    } catch (error) {
      console.error('❌ PDF生成失败:', error)
      throw new Error(`PDF生成失败: ${error.message}`)
    }
  }

  /**
   * 集成数据转换器和模板系统
   */
  async generateResumePDF(resumeStore, options = {}) {
    try {
      // 验证输入数据
      if (!resumeStore) {
        throw new Error('简历数据不能为空')
      }

      // 生成PDF
      const pdfDocGenerator = await this.generatePDF(resumeStore, options)

      return {
        success: true,
        generator: pdfDocGenerator,
        timestamp: new Date().toISOString()
      }

    } catch (error) {
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }
    }
  }

  /**
   * 实现文本型PDF生成逻辑
   */
  async createTextPDF(content, styles = {}) {
    try {
      // 确保内容是文本类型，不是图片
      const textContent = this.ensureTextContent(content)

      const docDefinition = {
        content: textContent,
        styles: styles,
        defaultStyle: {
          fontSize: 11,
          lineHeight: 1.4,
          font: 'Roboto'
        }
      }

      const pdfDocGenerator = pdfMake.createPdf(docDefinition)

      // 验证生成的PDF包含文本
      return new Promise((resolve, reject) => {
        pdfDocGenerator.getBlob((blob) => {
          // 检查blob是否包含文本内容（简单验证）
          const reader = new FileReader()
          reader.onload = () => {
            const content = reader.result
            const hasTextContent = content.includes('/Text') || content.includes('/Font')

            resolve({
              success: true,
              blob: blob,
              isTextPDF: hasTextContent,
              size: blob.size
            })
          }
          reader.onerror = () => reject(new Error('PDF验证失败'))
          reader.readAsText(blob)
        })
      })

    } catch (error) {
      throw new Error(`文本型PDF生成失败: ${error.message}`)
    }
  }

  /**
   * 确保内容是文本类型
   */
  ensureTextContent(content) {
    if (Array.isArray(content)) {
      return content.map(item => this.ensureTextContent(item))
    }

    if (content && typeof content === 'object') {
      // 确保文本属性是字符串
      if (content.text !== undefined && typeof content.text !== 'string') {
        content.text = String(content.text)
      }

      // 递归处理子元素
      if (content.columns) {
        content.columns = content.columns.map(col => this.ensureTextContent(col))
      }

      return content
    }

    return content
  }

  /**
   * 添加生成进度提示功能
   */
  async generatePDFWithProgress(resumeData, options = {}, onProgress) {
    const progressCallback = onProgress || (() => {})

    try {
      progressCallback({ stage: 'initializing', progress: 10, message: '初始化PDF生成器...' })
      await this.initialize()

      progressCallback({ stage: 'converting', progress: 30, message: '转换简历数据...' })
      const docDefinition = createResumeTemplate(resumeData)

      progressCallback({ stage: 'optimizing', progress: 50, message: '优化页面布局...' })
      const optimizedDefinition = smartPageBreak(docDefinition)

      progressCallback({ stage: 'generating', progress: 70, message: '生成PDF文档...' })
      const pdfConfig = await this.createPDFConfig(optimizedDefinition, options)
      // 动态导入pdfmake确保使用正确的实例
      const pdfMakeModule = await import('pdfmake/build/pdfmake')
      const pdfMake = pdfMakeModule.default
      const pdfDocGenerator = pdfMake.createPdf(pdfConfig)

      progressCallback({ stage: 'completed', progress: 100, message: 'PDF生成完成' })

      return pdfDocGenerator

    } catch (error) {
      progressCallback({ stage: 'error', progress: 0, message: `生成失败: ${error.message}` })
      throw error
    }
  }

  /**
   * 实现错误处理和异常捕获
   */
  async safeGeneratePDF(resumeData, options = {}) {
    try {
      return await this.generateResumePDF(resumeData, options)
    } catch (error) {
      console.error('PDF生成错误:', error)

      // 错误分类处理
      if (error.message.includes('字体')) {
        throw new Error('字体配置错误，请检查字体文件')
      } else if (error.message.includes('数据')) {
        throw new Error('简历数据格式错误')
      } else if (error.message.includes('内存')) {
        throw new Error('文档过大，请减少内容后重试')
      } else {
        throw new Error('PDF生成失败，请重试')
      }
    }
  }


  /**
   * 添加取消生成功能
   */
  cancelGeneration() {
    // 由于pdfmake的限制，这里提供取消的框架
    // 实际取消需要在前端UI层面实现
    console.log('🛑 PDF生成已取消')
    return true
  }
}

// 创建全局PDF生成器实例
export const pdfGenerator = new PDFGenerator()

// 导出便捷函数
export const generateResumePDF = async (resumeData, options = {}) => {
  return await pdfGenerator.generateResumePDF(resumeData, options)
}

export const generatePDFWithProgress = async (resumeData, options = {}, onProgress) => {
  return await pdfGenerator.generatePDFWithProgress(resumeData, options, onProgress)
}

export const createTextPDF = async (content, styles = {}) => {
  return await pdfGenerator.createTextPDF(content, styles)
}

export default pdfGenerator
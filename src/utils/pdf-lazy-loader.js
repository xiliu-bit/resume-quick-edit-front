/**
 * PDF生成器懒加载优化
 * 延迟加载pdfmake库以提升页面初始加载性能
 */

/**
 * PDF生成器懒加载器
 */
class PDFLazyLoader {
  constructor() {
    this.pdfMakePromise = null
    this.isLoaded = false
    this.isLoading = false
    this.loadCallbacks = []
  }

  /**
   * 动态导入pdfmake
   */
  async loadPDFMaker() {
    if (this.isLoaded) {
      return Promise.resolve(window.pdfMake)
    }

    if (this.isLoading) {
      // 如果正在加载，返回现有的Promise
      return this.pdfMakePromise
    }

    this.isLoading = true
    console.log('🔄 开始懒加载pdfmake...')

    try {
      // 动态导入pdfmake
      const pdfMakeModule = await import('pdfmake/build/pdfmake')
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts')

      const pdfMake = pdfMakeModule.default

      // 设置字体
      pdfMake.vfs = pdfFontsModule.pdfMake ? pdfFontsModule.pdfMake.vfs : pdfFontsModule.vfs

      // 保存到全局
      window.pdfMake = pdfMake

      this.isLoaded = true
      this.isLoading = false

      console.log('✅ pdfmake懒加载完成')

      // 通知所有等待的回调
      this.loadCallbacks.forEach(callback => callback(pdfMake))
      this.loadCallbacks = []

      return pdfMake

    } catch (error) {
      this.isLoading = false
      console.error('❌ pdfmake懒加载失败:', error)
      throw error
    }
  }

  /**
   * 确保pdfmake已加载
   */
  async ensureLoaded() {
    if (this.isLoaded) {
      return window.pdfMake
    }

    this.pdfMakePromise = this.loadPDFMaker()
    return this.pdfMakePromise
  }

  /**
   * 注册加载完成回调
   */
  onLoaded(callback) {
    if (this.isLoaded) {
      callback(window.pdfMake)
    } else {
      this.loadCallbacks.push(callback)
    }
  }

  /**
   * 预加载pdfmake（可选）
   */
  preload() {
    if (!this.isLoaded && !this.isLoading) {
      console.log('🔄 预加载pdfmake...')
      return this.loadPDFMaker()
    }
  }

  /**
   * 获取加载状态
   */
  getStatus() {
    return {
      isLoaded: this.isLoaded,
      isLoading: this.isLoading,
      hasCallbacks: this.loadCallbacks.length > 0
    }
  }
}

// 创建全局懒加载器实例
export const pdfLazyLoader = new PDFLazyLoader()

/**
 * 懒加载的PDF生成函数
 */
export const generatePDFLazy = async (resumeData, options = {}) => {
  try {
    // 确保pdfmake已加载
    const pdfMake = await pdfLazyLoader.ensureLoaded()

    // 动态导入其他必要的模块
    const { createResumeTemplate } = await import('./pdf-templates')
    const { smartPageBreak } = await import('./pdf-pagination')

    // 创建简历模板
    const docDefinition = createResumeTemplate(resumeData)

    // 应用分页优化
    const optimizedDefinition = smartPageBreak(docDefinition)

    // 创建PDF配置
    const pdfConfig = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      defaultStyle: {
        fontSize: 11,
        lineHeight: 1.4,
        font: 'Roboto'
      },
      ...optimizedDefinition,
      info: {
        Title: options.title || '简历',
        Author: options.author || '简历快编',
        Subject: '个人简历',
        Creator: '简历快编 - 在线简历编辑平台',
        CreationDate: new Date()
      }
    }

    // 创建PDF生成器
    const pdfDocGenerator = pdfMake.createPdf(pdfConfig)

    console.log('✅ 懒加载PDF生成成功')
    return {
      success: true,
      generator: pdfDocGenerator,
      lazyLoaded: true
    }

  } catch (error) {
    console.error('❌ 懒加载PDF生成失败:', error)
    return {
      success: false,
      error: error.message,
      lazyLoaded: false
    }
  }
}

/**
 * 字体文件懒加载优化
 */
export const lazyLoadFonts = async (fontConfigs = {}) => {
  try {
    console.log('🔄 开始懒加载字体文件...')

    const loadedFonts = {}

    // 并行加载所有字体
    const fontPromises = Object.entries(fontConfigs).map(async ([fontName, fontFiles]) => {
      const fontData = {}

      // 并行加载字体文件
      const filePromises = Object.entries(fontFiles).map(async ([style, url]) => {
        try {
          const response = await fetch(url)
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer()
            fontData[style] = arrayBuffer
          }
        } catch (error) {
          console.warn(`字体文件加载失败 ${fontName}.${style}:`, error)
        }
      })

      await Promise.all(filePromises)
      loadedFonts[fontName] = fontData
    })

    await Promise.all(fontPromises)

    console.log('✅ 字体文件懒加载完成:', Object.keys(loadedFonts))
    return loadedFonts

  } catch (error) {
    console.error('❌ 字体懒加载失败:', error)
    return {}
  }
}

/**
 * 性能监控
 */
export const performanceMonitor = {
  /**
   * 测量PDF生成性能
   */
  async measurePDFGeneration(generator, resumeData, options = {}) {
    const startTime = performance.now()
    const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0

    try {
      const result = await generator(resumeData, options)

      const endTime = performance.now()
      const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0

      const metrics = {
        generationTime: endTime - startTime,
        memoryUsage: endMemory - startMemory,
        success: result.success,
        timestamp: new Date().toISOString()
      }

      console.log('📊 PDF生成性能指标:')
      console.log(`  ⏱️  生成时间: ${metrics.generationTime.toFixed(2)}ms`)
      console.log(`  💾 内存使用: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`)

      return { ...result, metrics }

    } catch (error) {
      const endTime = performance.now()
      console.error(`❌ PDF生成失败，耗时: ${(endTime - startTime).toFixed(2)}ms`)
      throw error
    }
  },

  /**
   * 监控加载性能
   */
  measureLoadPerformance() {
    const navigation = performance.getEntriesByType('navigation')[0]
    const pdfLoadTime = performance.now()

    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      pdfLibraryLoaded: pdfLoadTime,
      totalTime: navigation.loadEventEnd - navigation.fetchStart
    }
  },

  /**
   * 性能优化建议
   */
  generateOptimizationSuggestions(metrics) {
    const suggestions = []

    if (metrics.generationTime > 5000) {
      suggestions.push('⚠️ PDF生成时间过长，建议优化简历内容或分页逻辑')
    }

    if (metrics.memoryUsage > 50 * 1024 * 1024) { // 50MB
      suggestions.push('⚠️ 内存使用过高，建议减少简历内容或分块处理')
    }

    if (suggestions.length === 0) {
      suggestions.push('✅ 性能表现良好')
    }

    return suggestions
  }
}

/**
 * 优化的PDF导出函数
 */
export const optimizedExportPDF = async (resumeData, options = {}) => {
  try {
    // 使用懒加载生成器
    const result = await generatePDFLazy(resumeData, options)

    if (result.success) {
      // 测量性能
      const finalResult = await performanceMonitor.measurePDFGeneration(
        () => Promise.resolve(result),
        resumeData,
        options
      )

      // 生成性能建议
      const suggestions = performanceMonitor.generateOptimizationSuggestions(finalResult.metrics)
      console.log('💡 性能优化建议:', suggestions)

      return finalResult
    } else {
      return result
    }

  } catch (error) {
    console.error('❌ 优化PDF导出失败:', error)
    throw error
  }
}

export default {
  pdfLazyLoader,
  generatePDFLazy,
  lazyLoadFonts,
  performanceMonitor,
  optimizedExportPDF
}
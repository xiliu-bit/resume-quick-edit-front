/**
 * PDFMake初始化配置
 * 在应用启动时调用，确保pdfmake正确配置
 */

/**
 * 初始化PDFMake配置
 */
export const initializePDFMake = async () => {
  try {
    console.log('🔧 初始化PDFMake（使用默认字体）...')

    // 动态导入pdfmake
    const pdfMakeModule = await import('pdfmake/build/pdfmake')
    const pdfMakeVfsModule = await import('pdfmake/build/vfs_fonts')
    const pdfMake = pdfMakeModule.default

    // 设置pdfmake的vfs（包含默认字体）
    if (pdfMakeVfsModule && pdfMakeVfsModule.pdfMake && pdfMakeVfsModule.pdfMake.vfs) {
      pdfMake.vfs = pdfMakeVfsModule.pdfMake.vfs
      console.log('✅ 已加载pdfmake内置字体vfs')
    }

    console.log('✅ PDFMake初始化完成（使用默认字体）')
    return true
  } catch (error) {
    console.error('❌ PDFMake初始化失败:', error)
    return false
  }
}

/**
 * 获取PDFMake状态
 */
export const getPDFMakeStatus = async () => {
  try {
    const pdfMakeModule = await import('pdfmake/build/pdfmake')
    const pdfMake = pdfMakeModule.default

    return {
      isInitialized: !!pdfMake.vfs,
      fonts: Object.keys(pdfMake.fonts || {}),
      usingDefaultFonts: true
    }
  } catch (error) {
    console.error('获取PDFMake状态失败:', error)
    return {
      error: error.message
    }
  }
}

// 默认导出
export default {
  initializePDFMake,
  getPDFMakeStatus
}
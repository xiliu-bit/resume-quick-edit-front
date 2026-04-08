/**
 * PDFMake初始化配置
 * 在应用启动时调用，确保pdfmake正确配置并使用华文楷体
 */

/**
 * 初始化PDFMake配置
 */
export const initializePDFMake = async () => {
  try {
    console.log('🔧 初始化PDFMake（使用华文楷体）...')

    // 动态导入pdfmake
    const pdfMakeModule = await import('pdfmake/build/pdfmake')
    const pdfMake = pdfMakeModule.default

    // 导入自定义字体文件
    const customFonts = await import('../assets/fonts/custom-vfs_fonts.js')

    // 设置自定义vfs
    pdfMake.vfs = customFonts.pdfMake ? customFonts.pdfMake.vfs : customFonts.vfs

    // 配置华文楷体字体（使用STKAITI.TTF）
    pdfMake.fonts = {
      STKAITI: {  // 华文楷体
        normal: 'STKAITI.TTF',
        bold: 'STKAITI.TTF',      // 使用同一字体文件
        italics: 'STKAITI.TTF',   // 使用同一字体文件
        bolditalics: 'STKAITI.TTF' // 使用同一字体文件
      }
    }

    console.log('✅ 已加载华文楷体vfs')
    console.log('✅ PDFMake初始化完成（使用华文楷体）')
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
      usingCustomFonts: true,
      customFontName: 'STKAITI'
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
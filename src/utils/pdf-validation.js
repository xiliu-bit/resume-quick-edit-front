/**
 * PDF特性验证工具
 * 验证生成的PDF是否具备文本特性
 */

import { createTextPDF } from '../pdf-generator'

/**
 * 验证文本型PDF特性
 */
export const validateTextPDF = async (content) => {
  try {
    console.log('🔍 开始验证文本型PDF特性...')

    // 生成PDF
    const result = await createTextPDF(content)

    if (!result.success) {
      throw new Error('PDF生成失败')
    }

    // 验证结果
    const validation = {
      isTextPDF: result.isTextPDF,
      size: result.size,
      features: {
        selectable: false,
        copyable: false,
        searchable: false
      },
      analysis: {
        hasTextElements: false,
        hasFontDefinitions: false,
        isImageBased: false
      }
    }

    // 分析PDF内容
    const reader = new FileReader()
    reader.onload = () => {
      const pdfContent = reader.result

      // 检查是否包含文本元素
      validation.analysis.hasTextElements = pdfContent.includes('/Text')

      // 检查是否包含字体定义
      validation.analysis.hasFontDefinitions = pdfContent.includes('/Font')

      // 检查是否基于图片（包含大量二进制数据）
      validation.analysis.isImageBased = pdfContent.includes('/Image') ||
                                        pdfContent.includes('/XObject')

      // 推断特性
      validation.features.selectable = validation.analysis.hasTextElements
      validation.features.copyable = validation.analysis.hasTextElements
      validation.features.searchable = validation.analysis.hasFontDefinitions
    }

    reader.readAsText(result.blob)

    // 等待分析完成
    await new Promise(resolve => setTimeout(resolve, 100))

    console.log('📊 PDF特性分析结果:')
    console.log(`  🔤 文本型PDF: ${validation.isTextPDF ? '✅' : '❌'}`)
    console.log(`  ✋ 可选中: ${validation.features.selectable ? '✅' : '❌'}`)
    console.log(`  📋 可复制: ${validation.features.copyable ? '✅' : '❌'}`)
    console.log(`  🔍 可搜索: ${validation.features.searchable ? '✅' : '❌'}`)

    return validation

  } catch (error) {
    console.error('❌ PDF验证失败:', error)
    throw error
  }
}

/**
 * 测试文本可选中特性
 */
export const testSelectableText = async () => {
  const testContent = [
    {
      text: '可选中文本测试',
      style: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] }
    },
    {
      text: '这是一段应该可以被鼠标选中的文本内容。用户应该能够用鼠标拖动选择这段文字。',
      style: { fontSize: 12, margin: [0, 0, 0, 20] }
    },
    {
      text: 'Selectable Text Test',
      style: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] }
    },
    {
      text: 'This is a text content that should be selectable with mouse. Users should be able to drag and select this text.',
      style: { fontSize: 12, margin: [0, 0, 0, 20] }
    }
  ]

  console.log('🧪 测试文本可选中特性...')
  const validation = await validateTextPDF(testContent)

  const testResult = {
    name: '文本可选中测试',
    passed: validation.features.selectable && validation.isTextPDF,
    details: validation
  }

  console.log(`  结果: ${testResult.passed ? '✅ 通过' : '❌ 失败'}`)
  return testResult
}

/**
 * 测试文本可复制特性
 */
export const testCopyableText = async () => {
  const testContent = [
    {
      text: '可复制文本测试',
      style: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] }
    },
    {
      text: '这段文本应该可以被复制到剪贴板。尝试右键点击并选择复制，或使用Ctrl+C快捷键。',
      style: { fontSize: 12, margin: [0, 0, 0, 20] }
    },
    {
      text: 'Copyable Text Test',
      style: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] }
    },
    {
      text: 'This text should be copyable to clipboard. Try right-click and copy, or use Ctrl+C shortcut.',
      style: { fontSize: 12, margin: [0, 0, 0, 20] }
    }
  ]

  console.log('🧪 测试文本可复制特性...')
  const validation = await validateTextPDF(testContent)

  const testResult = {
    name: '文本可复制测试',
    passed: validation.features.copyable && validation.isTextPDF,
    details: validation
  }

  console.log(`  结果: ${testResult.passed ? '✅ 通过' : '❌ 失败'}`)
  return testResult
}

/**
 * 测试文本可搜索特性
 */
export const testSearchableText = async () => {
  const testContent = [
    {
      text: '可搜索文本测试',
      style: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] }
    },
    {
      text: 'PDF阅读器应该支持搜索功能。用户可以按Ctrl+F搜索关键词，如"前端"、"JavaScript"、"React"等。',
      style: { fontSize: 12, margin: [0, 0, 0, 20] }
    },
    {
      text: '关键词: 前端开发 JavaScript React Vue Node.js',
      style: { fontSize: 14, bold: true, margin: [0, 0, 0, 10] }
    },
    {
      text: 'Searchable Text Test',
      style: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] }
    },
    {
      text: 'PDF readers should support search functionality. Users can press Ctrl+F to search for keywords like "frontend", "JavaScript", "React", etc.',
      style: { fontSize: 12, margin: [0, 0, 0, 20] }
    }
  ]

  console.log('🧪 测试文本可搜索特性...')
  const validation = await validateTextPDF(testContent)

  const testResult = {
    name: '文本可搜索测试',
    passed: validation.features.searchable && validation.analysis.hasFontDefinitions,
    details: validation
  }

  console.log(`  结果: ${testResult.passed ? '✅ 通过' : '❌ 失败'}`)
  return testResult
}

/**
 * 测试放大后文字清晰度
 */
export const testTextClarity = async () => {
  const testContent = [
    {
      text: '文字清晰度测试',
      style: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] }
    },
    {
      text: '文字型PDF在放大后应该保持清晰锐利的边缘，不会出现模糊或像素化现象。',
      style: { fontSize: 12, margin: [0, 0, 0, 20] }
    },
    {
      text: 'Text Clarity Test',
      style: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] }
    },
    {
      text: 'Text-based PDF should maintain clear and sharp edges when zoomed, without blurring or pixelation.',
      style: { fontSize: 12, margin: [0, 0, 0, 20] }
    }
  ]

  console.log('🧪 测试文字放大清晰度...')
  const validation = await validateTextPDF(testContent)

  // 文字型PDF应该不会出现模糊问题
  const testResult = {
    name: '文字清晰度测试',
    passed: validation.isTextPDF && !validation.analysis.isImageBased,
    details: validation
  }

  console.log(`  结果: ${testResult.passed ? '✅ 通过' : '❌ 失败'}`)
  console.log('  💡 提示: 请在PDF阅读器中放大查看文字是否清晰')
  return testResult
}

/**
 * 运行所有文本特性测试
 */
export const runTextFeaturesTests = async () => {
  console.log('🚀 开始文本型PDF特性验证...')

  const tests = [
    testSelectableText,
    testCopyableText,
    testSearchableText,
    testTextClarity
  ]

  const results = []

  for (const test of tests) {
    const result = await test()
    results.push(result)
  }

  console.log('\n📊 文本特性测试结果汇总:')
  results.forEach(result => {
    console.log(`${result.passed ? '✅' : '❌'} ${result.name}`)
  })

  const passedTests = results.filter(r => r.passed).length
  console.log(`\n🎯 测试完成: ${passedTests}/${results.length} 通过`)

  return results
}

/**
 * 生成测试报告
 */
export const generateTestReport = (testResults) => {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: testResults.length,
      passedTests: testResults.filter(r => r.passed).length,
      failedTests: testResults.filter(r => !r.passed).length
    },
    details: testResults,
    recommendations: []
  }

  // 生成建议
  if (report.summary.passedTests === report.summary.totalTests) {
    report.recommendations.push('✅ 所有测试通过，PDF文本特性正常')
  } else {
    report.recommendations.push('⚠️ 部分测试失败，需要检查字体配置和PDF生成设置')
  }

  console.log('📋 测试报告:')
  console.log(JSON.stringify(report, null, 2))

  return report
}

export default {
  validateTextPDF,
  testSelectableText,
  testCopyableText,
  testSearchableText,
  testTextClarity,
  runTextFeaturesTests,
  generateTestReport
}
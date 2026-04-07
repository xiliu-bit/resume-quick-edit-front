/**
 * PDF分页优化
 * 处理多页简历的智能分页逻辑
 */

/**
 * 分页配置
 */
export const PAGINATION_CONFIG = {
  // A4页面可用高度（减去页边距）
  maxPageHeight: 792, // points (297mm - 上下边距)

  // 最小段落高度（避免孤行）
  minSectionHeight: 50,

  // 分页阈值（剩余空间小于此值时强制分页）
  pageBreakThreshold: 100,

  // 需要保持在一起的元素
  keepTogether: [
    'sectionHeader',     // 章节标题
    'itemTitle',         // 项目标题
    'itemSubtitle'       // 项目副标题
  ],

  // 分页前需要添加的元素
  pageBreakBefore: [
    'sectionHeader'      // 章节标题前加分页
  ]
}

/**
 * 计算元素高度估算
 */
export const estimateElementHeight = (element, styles) => {
  if (!element) return 0

  let height = 0

  // 基础高度计算
  if (typeof element === 'string') {
    height = 15 // 文本行高度估算
  } else if (element.text) {
    const fontSize = element.fontSize || 12
    const lineHeight = element.lineHeight || 1.2
    height = fontSize * lineHeight

    // 考虑margin
    if (element.margin) {
      height += (element.margin[1] || 0) + (element.margin[3] || 0)
    }
  } else if (element.columns) {
    // columns元素取最高列
    const columnHeights = element.columns.map(col => estimateElementHeight(col, styles))
    height = Math.max(...columnHeights)
  } else if (Array.isArray(element)) {
    // 数组元素累加高度
    height = element.reduce((total, item) => total + estimateElementHeight(item, styles), 0)
  }

  return height
}

/**
 * 检查元素是否需要分页
 */
export const shouldPageBreak = (element, currentHeight, styles) => {
  const elementHeight = estimateElementHeight(element, styles)
  const remainingHeight = PAGINATION_CONFIG.maxPageHeight - currentHeight

  // 剩余空间不足
  if (remainingHeight < PAGINATION_CONFIG.pageBreakThreshold) {
    return true
  }

  // 元素太大，无法在当前页容纳
  if (elementHeight > remainingHeight && remainingHeight < PAGINATION_CONFIG.minSectionHeight) {
    return true
  }

  // 检查是否需要在前加分页
  if (element.style && PAGINATION_CONFIG.pageBreakBefore.includes(element.style)) {
    return currentHeight > PAGINATION_CONFIG.minSectionHeight
  }

  return false
}

/**
 * 优化简历内容分页
 */
export const optimizePagination = (content) => {
  const optimizedContent = []
  let currentPageHeight = 0

  const processElement = (element) => {
    if (!element) return

    // 检查是否需要分页
    if (shouldPageBreak(element, currentPageHeight)) {
      optimizedContent.push({ pageBreak: 'before' })
      currentPageHeight = 0
    }

    // 添加元素
    optimizedContent.push(element)

    // 更新当前页高度
    currentPageHeight += estimateElementHeight(element)

    // 检查是否需要保持元素在一起
    if (element.style && PAGINATION_CONFIG.keepTogether.includes(element.style)) {
      // 确保相关元素在同一页
      const relatedElements = findRelatedElements(content, element)
      const relatedHeight = relatedElements.reduce((total, el) => total + estimateElementHeight(el), 0)

      if (relatedHeight > PAGINATION_CONFIG.maxPageHeight - currentPageHeight) {
        // 如果放不下，整体移到下一页
        optimizedContent.pop() // 移除刚添加的元素
        optimizedContent.push({ pageBreak: 'before' })
        optimizedContent.push(element)
        currentPageHeight = estimateElementHeight(element)
      }
    }
  }

  // 处理所有内容元素
  content.forEach(processElement)

  return optimizedContent
}

/**
 * 查找相关联的元素
 */
export const findRelatedElements = (content, targetElement) => {
  const related = [targetElement]
  const targetIndex = content.indexOf(targetElement)

  if (targetIndex === -1) return related

  // 查找同一段落的其他元素
  for (let i = targetIndex + 1; i < content.length; i++) {
    const element = content[i]

    // 如果遇到新的章节标题，停止查找
    if (element.style === 'sectionHeader') break

    // 添加相关元素
    if (element.style && ['itemTitle', 'itemSubtitle', 'itemDescription'].includes(element.style)) {
      related.push(element)
    } else {
      break
    }
  }

  return related
}

/**
 * 智能分页处理
 */
export const smartPageBreak = (docDefinition) => {
  if (!docDefinition.content) return docDefinition

  const optimizedContent = optimizePagination(docDefinition.content)

  return {
    ...docDefinition,
    content: optimizedContent
  }
}

/**
 * 分页预览工具
 */
export const previewPagination = (content) => {
  let pageCount = 1
  let currentHeight = 0

  console.log('📄 分页预览:')

  content.forEach((element, index) => {
    if (element.pageBreak === 'before') {
      pageCount++
      currentHeight = 0
      console.log(`  第${pageCount}页开始:`)
    } else {
      const height = estimateElementHeight(element)
      currentHeight += height

      if (element.text) {
        const preview = typeof element.text === 'string'
          ? element.text.substring(0, 30) + '...'
          : `[${element.style || 'unknown'}]`
        console.log(`    ${preview} (${height.toFixed(1)}pt)`)
      }

      if (currentHeight > PAGINATION_CONFIG.maxPageHeight) {
        console.log(`    ⚠️  第${pageCount}页超出高度限制!`)
      }
    }
  })

  console.log(`  📊 总页数: ${pageCount}`)
  return pageCount
}

/**
 * 动态分页调整
 */
export const adjustPagination = (content, options = {}) => {
  const config = { ...PAGINATION_CONFIG, ...options }

  // 压缩内容以适应页面
  const compressContent = (element) => {
    if (!element) return element

    // 减小字体大小
    if (options.reduceFontSize && element.fontSize) {
      element.fontSize = Math.max(element.fontSize - 1, 8)
    }

    // 减小行高
    if (options.reduceLineHeight && element.lineHeight) {
      element.lineHeight = Math.max(element.lineHeight - 0.1, 1.1)
    }

    // 减小margin
    if (options.reduceMargin && element.margin) {
      element.margin = element.margin.map(m => Math.max(m - 2, 0))
    }

    return element
  }

  return content.map(compressContent)
}

export default {
  optimizePagination,
  smartPageBreak,
  previewPagination,
  adjustPagination,
  PAGINATION_CONFIG
}
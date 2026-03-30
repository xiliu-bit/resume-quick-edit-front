import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * 将 HTML 元素导出为 PDF 文件
 * @param {HTMLElement} element - 要导出的 HTML 元素
 * @param {string} filename - 导出的文件名
 */
export const exportToPDF = async (element, filename = 'resume.pdf') => {
  try {
    // 配置 html2canvas 选项
    const canvas = await html2canvas(element, {
      scale: 2, // 提高清晰度
      useCORS: true, // 允许跨域图片
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight
    })

    // 获取图片数据
    const imgData = canvas.toDataURL('image/png')

    // 计算 PDF 尺寸（A4）
    const imgWidth = 210 // A4 宽度（mm）
    const pageHeight = 297 // A4 高度（mm）
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    // 创建 PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    let position = 0

    // 添加第一页
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // 如果内容超过一页，添加新页面
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // 下载 PDF
    pdf.save(filename)

    return true
  } catch (error) {
    console.error('PDF 导出失败:', error)
    throw new Error('PDF 导出失败，请重试')
  }
}

/**
 * 优化简历预览区域的样式以便 PDF 导出
 */
export const optimizeForPDFExport = () => {
  const previewElement = document.querySelector('.resume-preview')
  if (previewElement) {
    // 临时调整样式以优化 PDF 输出
    previewElement.style.transform = 'none'
    previewElement.style.boxShadow = 'none'
    previewElement.style.border = 'none'
  }
}

/**
 * 恢复预览区域的正常样式
 */
export const restorePreviewStyles = () => {
  const previewElement = document.querySelector('.resume-preview')
  if (previewElement) {
    // 恢复原始样式
    previewElement.style.transform = ''
    previewElement.style.boxShadow = ''
    previewElement.style.border = ''
  }
}
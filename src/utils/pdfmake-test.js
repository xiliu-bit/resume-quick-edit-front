// pdfmake基础功能测试
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

// 设置内置字体
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs

/**
 * 测试pdfmake基础功能
 */
export const testPdfmake = async () => {
  try {
    // 简单的测试文档定义
    const docDefinition = {
      content: [
        { text: 'Hello World!', style: 'header' },
        { text: '这是一个pdfmake基础功能测试。', style: 'subheader' },
        { text: '如果这个测试能正常生成PDF，说明pdfmake安装成功。', margin: [0, 20, 0, 0] }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        }
      },
      defaultStyle: {
        fontSize: 12,
        font: 'Roboto'
      }
    }

    console.log('开始测试pdfmake...')

    // 创建PDF实例
    const pdfDocGenerator = pdfMake.createPdf(docDefinition)

    // 测试数据生成（不实际下载）
    pdfDocGenerator.getBlob((blob) => {
      console.log('✅ pdfmake测试成功！PDF blob大小:', blob.size, 'bytes')
      console.log('✅ pdfmake可以正常生成PDF文件')
    })

    return true
  } catch (error) {
    console.error('❌ pdfmake测试失败:', error)
    return false
  }
}

// 自动运行测试
console.log('pdfmake版本:', pdfMake ? '已加载' : '未加载')
if (pdfMake) {
  console.log('✅ pdfmake库加载成功')
  testPdfmake()
} else {
  console.error('❌ pdfmake库加载失败')
}
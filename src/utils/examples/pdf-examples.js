/**
 * pdfmake使用示例和模板
 * 提供常见使用场景的代码示例
 */

import { createTextPDF, generateResumePDF } from '../pdf-generator'
import { convertToPDFData } from '../pdf-data-converter'

/**
 * 示例1: 基础文本PDF生成
 */
export const basicTextExample = async () => {
  const content = [
    {
      text: '基础文本PDF示例',
      style: 'header'
    },
    {
      text: '这是一个简单的文本PDF生成示例。',
      style: 'normal'
    }
  ]

  const styles = {
    header: {
      fontSize: 18,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 20]
    },
    normal: {
      fontSize: 12,
      margin: [0, 0, 0, 10]
    }
  }

  const result = await createTextPDF(content, styles)
  if (result.success) {
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '基础示例.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return result
}

/**
 * 示例2: 中英文混合内容
 */
export const chineseEnglishExample = async () => {
  const content = [
    {
      text: '中英文混合内容示例',
      style: 'header'
    },
    {
      text: '中文内容测试 / Chinese-English Mixed Content',
      style: 'title'
    },
    {
      text: '这是一段包含中英文混合的内容。This is a mixed Chinese and English content. 文字应该可以被选中、复制和搜索。Text should be selectable, copyable and searchable.',
      style: 'content'
    }
  ]

  const styles = {
    header: {
      fontSize: 16,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 20]
    },
    title: {
      fontSize: 14,
      bold: true,
      margin: [0, 0, 0, 15]
    },
    content: {
      fontSize: 12,
      lineHeight: 1.5,
      margin: [0, 0, 0, 10]
    }
  }

  const result = await createTextPDF(content, styles)
  if (result.success) {
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '中英文示例.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return result
}

/**
 * 示例3: 多列布局
 */
export const multiColumnExample = async () => {
  const content = [
    {
      text: '多列布局示例',
      style: 'header'
    },
    {
      columns: [
        {
          width: '50%',
          text: '左侧内容区域，显示简历的个人信息部分。',
          style: 'columnContent'
        },
        {
          width: '50%',
          text: '右侧内容区域，显示简历的技能特长部分。',
          style: 'columnContent'
        }
      ],
      margin: [0, 0, 0, 20]
    },
    {
      text: '多列布局适用于简历中的并列信息展示。',
      style: 'note'
    }
  ]

  const styles = {
    header: {
      fontSize: 16,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 20]
    },
    columnContent: {
      fontSize: 12,
      margin: [0, 0, 10, 0]
    },
    note: {
      fontSize: 10,
      italics: true,
      color: '#666',
      margin: [0, 0, 0, 10]
    }
  }

  const result = await createTextPDF(content, styles)
  if (result.success) {
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '多列布局示例.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return result
}

/**
 * 示例4: 技能标签展示
 */
export const skillsTagExample = async () => {
  const skills = ['JavaScript', 'Vue.js', 'React', 'Node.js', 'TypeScript', '微信小程序', 'Python', 'Java']

  const content = [
    {
      text: '技能标签展示示例',
      style: 'header'
    },
    {
      text: '技能特长',
      style: 'sectionTitle'
    },
    {
      columns: skills.map(skill => ({
        text: skill,
        style: 'skillTag'
      })),
      margin: [0, 0, 0, 20]
    }
  ]

  const styles = {
    header: {
      fontSize: 16,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 20]
    },
    sectionTitle: {
      fontSize: 14,
      bold: true,
      margin: [0, 0, 0, 15]
    },
    skillTag: {
      fontSize: 10,
      color: '#fff',
      background: '#3498db',
      margin: [0, 5, 10, 5],
      padding: [5, 10, 5, 10],
      alignment: 'center'
    }
  }

  const result = await createTextPDF(content, styles)
  if (result.success) {
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '技能标签示例.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return result
}

/**
 * 示例5: 完整的简历模板
 */
export const completeResumeExample = async () => {
  // 模拟简历数据
  const mockResumeData = {
    personalInfo: {
      name: '李小明',
      phone: '138-0013-8000',
      email: 'lixiaoming@example.com',
      location: '北京市朝阳区',
      summary: '具有3年开发经验的前端工程师，专注于现代Web技术栈开发。'
    },
    education: [
      {
        school: '北京理工大学',
        major: '计算机科学与技术',
        degree: '本科',
        startDate: '2016-09',
        endDate: '2020-06',
        description: '主修课程：数据结构、算法、软件工程、数据库原理等。'
      }
    ],
    experience: [
      {
        company: '创新科技有限公司',
        position: '前端开发工程师',
        startDate: '2020-07',
        endDate: '2024-03',
        description: '负责公司核心产品的前端开发，使用Vue.js、React等现代前端框架。'
      }
    ],
    skills: [
      { id: '1', name: 'JavaScript' },
      { id: '2', name: 'Vue.js' },
      { id: '3', name: 'React' },
      { id: '4', name: 'TypeScript' }
    ],
    projects: [
      {
        name: '企业管理系统',
        role: '前端开发',
        startDate: '2023-01',
        endDate: '2023-12',
        description: '基于Vue3开发的企业级管理系统，包含用户管理、权限控制等功能模块。'
      }
    ]
  }

  const result = await generateResumePDF(mockResumeData, {
    title: '李小明简历',
    author: '李小明'
  })

  if (result.success && result.generator) {
    result.generator.download('完整简历示例.pdf')
  }

  return result
}

/**
 * 示例6: 带时间线的经历展示
 */
export const timelineExample = async () => {
  const content = [
    {
      text: '时间线展示示例',
      style: 'header'
    },
    {
      text: '工作经历',
      style: 'sectionTitle'
    },
    {
      columns: [
        {
          text: '2020.07 - 2024.03',
          style: 'timeline',
          width: 120
        },
        {
          text: '创新科技有限公司\n前端开发工程师',
          style: 'timelineContent',
          width: '*'
        }
      ],
      margin: [0, 0, 0, 15]
    },
    {
      columns: [
        {
          text: '2018.09 - 2020.06',
          style: 'timeline',
          width: 120
        },
        {
          text: '科技有限公司\n实习生',
          style: 'timelineContent',
          width: '*'
        }
      ],
      margin: [0, 0, 0, 15]
    }
  ]

  const styles = {
    header: {
      fontSize: 16,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 20]
    },
    sectionTitle: {
      fontSize: 14,
      bold: true,
      margin: [0, 0, 0, 15]
    },
    timeline: {
      fontSize: 10,
      color: '#7f8c8d',
      alignment: 'right',
      margin: [0, 0, 10, 0]
    },
    timelineContent: {
      fontSize: 12,
      lineHeight: 1.4
    }
  }

  const result = await createTextPDF(content, styles)
  if (result.success) {
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '时间线示例.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return result
}

/**
 * 示例7: 响应式布局
 */
export const responsiveLayoutExample = async () => {
  const content = [
    {
      text: '响应式布局示例',
      style: 'header'
    },
    {
      columns: [
        {
          width: 100,
          text: '个人信息',
          style: 'sidebarTitle'
        },
        {
          width: '*',
          stack: [
            { text: '姓名：李小明', style: 'infoItem' },
            { text: '电话：138-0013-8000', style: 'infoItem' },
            { text: '邮箱：lixiaoming@example.com', style: 'infoItem' }
          ]
        }
      ],
      margin: [0, 0, 0, 20]
    },
    {
      text: '这种布局方式可以更好地利用页面空间。',
      style: 'note'
    }
  ]

  const styles = {
    header: {
      fontSize: 16,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 20]
    },
    sidebarTitle: {
      fontSize: 12,
      bold: true,
      color: '#3498db'
    },
    infoItem: {
      fontSize: 11,
      margin: [0, 0, 0, 5]
    },
    note: {
      fontSize: 10,
      italics: true,
      color: '#666'
    }
  }

  const result = await createTextPDF(content, styles)
  if (result.success) {
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '响应式布局示例.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return result
}

/**
 * 运行所有示例
 */
export const runAllExamples = async () => {
  console.log('🚀 开始运行pdfmake示例...')

  const examples = [
    { name: '基础文本示例', func: basicTextExample },
    { name: '中英文混合示例', func: chineseEnglishExample },
    { name: '多列布局示例', func: multiColumnExample },
    { name: '技能标签示例', func: skillsTagExample },
    { name: '完整简历示例', func: completeResumeExample },
    { name: '时间线示例', func: timelineExample },
    { name: '响应式布局示例', func: responsiveLayoutExample }
  ]

  const results = []

  for (let i = 0; i < examples.length; i++) {
    const example = examples[i]
    console.log(`\n📋 运行示例 ${i + 1}/${examples.length}: ${example.name}`)

    try {
      const result = await example.func()
      results.push({ name: example.name, success: result.success, error: null })

      if (result.success) {
        console.log(`✅ ${example.name} - 成功生成PDF`)
      } else {
        console.log(`❌ ${example.name} - 生成失败`)
      }

      // 添加延迟，避免同时下载多个文件
      if (i < examples.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

    } catch (error) {
      console.error(`❌ ${example.name} - 异常:`, error.message)
      results.push({ name: example.name, success: false, error: error.message })
    }
  }

  console.log('\n📊 示例运行结果汇总:')
  results.forEach(result => {
    console.log(`${result.success ? '✅' : '❌'} ${result.name}`)
  })

  const successCount = results.filter(r => r.success).length
  console.log(`\n🎯 示例运行完成: ${successCount}/${results.length} 成功`)

  return results
}

/**
 * 示例配置模板
 */
export const EXAMPLE_TEMPLATES = {
  basic: {
    name: '基础模板',
    description: '简单的文本PDF模板',
    func: basicTextExample
  },
  resume: {
    name: '简历模板',
    description: '完整的简历PDF模板',
    func: completeResumeExample
  },
  timeline: {
    name: '时间线模板',
    description: '适合展示经历的时间线布局',
    func: timelineExample
  },
  skills: {
    name: '技能展示模板',
    description: '技能标签展示布局',
    func: skillsTagExample
  }
}

export default {
  basicTextExample,
  chineseEnglishExample,
  multiColumnExample,
  skillsTagExample,
  completeResumeExample,
  timelineExample,
  responsiveLayoutExample,
  runAllExamples,
  EXAMPLE_TEMPLATES
}
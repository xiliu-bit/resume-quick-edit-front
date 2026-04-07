/**
 * PDF数据转换器单元测试
 */

import { convertToPDFData, convertPersonalInfo, convertEducation, convertExperience, convertSkills, convertProjects } from '../pdf-data-converter'

// 模拟Pinia Store数据
const mockResumeStore = {
  personalInfo: {
    name: '张三',
    phone: '13800138000',
    email: 'zhangsan@example.com',
    location: '北京市朝阳区',
    summary: '具有5年开发经验的前端工程师'
  },
  education: [
    {
      id: '1',
      school: '北京大学',
      major: '计算机科学',
      degree: '本科',
      startDate: '2015-09',
      endDate: '2019-06',
      description: '主修课程：数据结构、算法、软件工程等'
    }
  ],
  experience: [
    {
      id: '1',
      company: '科技有限公司',
      position: '前端开发工程师',
      startDate: '2019-07',
      endDate: '2024-03',
      description: '负责前端项目开发，使用Vue.js、React等技术栈'
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript' },
    { id: '2', name: 'Vue.js' },
    { id: '3', name: 'React' },
    { id: '4', name: 'Node.js' }
  ],
  projects: [
    {
      id: '1',
      name: '企业管理系统',
      role: '前端负责人',
      startDate: '2023-01',
      endDate: '2023-12',
      description: '基于Vue3 + Element Plus的企业级管理系统'
    }
  ]
}

describe('PDF数据转换器测试', () => {
  test('convertPersonalInfo - 转换个人信息', () => {
    const result = convertPersonalInfo(mockResumeStore.personalInfo)

    expect(result.name).toBe('张三')
    expect(result.contact).toEqual(['13800138000', 'zhangsan@example.com', '北京市朝阳区'])
    expect(result.summary).toBe('具有5年开发经验的前端工程师')
  })

  test('convertPersonalInfo - 处理空数据', () => {
    const emptyInfo = {
      name: '',
      phone: '',
      email: '',
      location: '',
      summary: ''
    }

    const result = convertPersonalInfo(emptyInfo)

    expect(result.name).toBe('姓名') // 默认值
    expect(result.contact).toEqual([])
    expect(result.summary).toBe('')
  })

  test('convertEducation - 转换教育背景', () => {
    const result = convertEducation(mockResumeStore.education)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      school: '北京大学',
      major: '计算机科学',
      degree: '本科',
      startDate: '2015-09',
      endDate: '2019-06',
      description: '主修课程：数据结构、算法、软件工程等'
    })
  })

  test('convertExperience - 转换工作经验', () => {
    const result = convertExperience(mockResumeStore.experience)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      company: '科技有限公司',
      position: '前端开发工程师',
      startDate: '2019-07',
      endDate: '2024-03',
      description: '负责前端项目开发，使用Vue.js、React等技术栈'
    })
  })

  test('convertSkills - 转换技能特长', () => {
    const result = convertSkills(mockResumeStore.skills)

    expect(result).toEqual(['JavaScript', 'Vue.js', 'React', 'Node.js'])
  })

  test('convertSkills - 过滤空技能', () => {
    const skillsWithEmpty = [
      { id: '1', name: 'JavaScript' },
      { id: '2', name: '' },
      { id: '3', name: 'Vue.js' },
      { id: '4', name: '   ' }
    ]

    const result = convertSkills(skillsWithEmpty)

    expect(result).toEqual(['JavaScript', 'Vue.js'])
  })

  test('convertProjects - 转换项目经验', () => {
    const result = convertProjects(mockResumeStore.projects)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      name: '企业管理系统',
      role: '前端负责人',
      startDate: '2023-01',
      endDate: '2023-12',
      description: '基于Vue3 + Element Plus的企业级管理系统'
    })
  })

  test('convertToPDFData - 完整数据转换', () => {
    const result = convertToPDFData(mockResumeStore)

    expect(result).toHaveProperty('personalInfo')
    expect(result).toHaveProperty('sections')
    expect(result.sections).toHaveProperty('education')
    expect(result.sections).toHaveProperty('experience')
    expect(result.sections).toHaveProperty('skills')
    expect(result.sections).toHaveProperty('projects')

    // 验证数据结构完整性
    expect(result.personalInfo.name).toBe('张三')
    expect(result.sections.education).toHaveLength(1)
    expect(result.sections.experience).toHaveLength(1)
    expect(result.sections.skills).toHaveLength(4)
    expect(result.sections.projects).toHaveLength(1)
  })

  test('convertToPDFData - 处理空数组', () => {
    const storeWithEmptyArrays = {
      ...mockResumeStore,
      education: [],
      experience: [],
      skills: [],
      projects: []
    }

    const result = convertToPDFData(storeWithEmptyArrays)

    expect(result.sections.education).toHaveLength(0)
    expect(result.sections.experience).toHaveLength(0)
    expect(result.sections.skills).toHaveLength(0)
    expect(result.sections.projects).toHaveLength(0)
  })
})
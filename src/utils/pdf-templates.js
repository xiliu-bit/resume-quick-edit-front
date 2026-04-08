/**
 * 简历PDF模板定义
 * 基于pdfmake的声明式模板系统
 */

import { convertToPDFData } from './pdf-data-converter'

/**
 * A4页面配置
 */
export const PAGE_CONFIG = {
  pageSize: 'A4',                    // A4纸张
  pageMargins: [40, 60, 40, 60],    // 左右40mm，上下60mm
  defaultStyle: {
    fontSize: 11,
    lineHeight: 1.4,
    font: 'STKAITI'  // 使用华文楷体
  }
}

/**
 * 样式定义
 */
export const STYLES = {
  // 标题样式
  header: {
    fontSize: 24,
    bold: true,
    alignment: 'center',
    margin: [0, 0, 0, 10],
    color: '#2c3e50'
  },

  // 联系信息样式
  contact: {
    fontSize: 10,
    alignment: 'center',
    margin: [0, 0, 0, 20],
    color: '#7f8c8d'
  },

  // 个人简介样式
  summary: {
    fontSize: 11,
    margin: [0, 0, 0, 20],
    lineHeight: 1.5,
    color: '#34495e'
  },

  // 章节标题样式
  sectionHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 15, 0, 10],
    color: '#2c3e50',
    decoration: 'underline'
  },

  // 项目标题样式
  itemTitle: {
    fontSize: 12,
    bold: true,
    color: '#2c3e50'
  },

  // 项目副标题样式（公司/学校名）
  itemSubtitle: {
    fontSize: 11,
    bold: true,
    color: '#3498db',
    margin: [0, 2, 0, 2]
  },

  // 时间样式
  itemDate: {
    fontSize: 10,
    color: '#7f8c8d',
    italics: true
  },

  // 描述文本样式
  itemDescription: {
    fontSize: 10,
    margin: [0, 5, 0, 10],
    lineHeight: 1.4,
    color: '#555'
  },

  // 技能标签样式
  skillTag: {
    fontSize: 10,
    color: '#fff',
    background: '#3498db',
    margin: [0, 2, 5, 2],
    padding: [3, 6, 3, 6]
  }
}

/**
 * 个人信息模块模板
 */
export const createPersonalInfoTemplate = (personalInfo) => {
  const contactText = personalInfo.contact.join(' | ')

  return [
    {
      text: personalInfo.name,
      style: 'header'
    },
    {
      text: contactText,
      style: 'contact'
    },
    ...(personalInfo.summary ? [{
      text: personalInfo.summary,
      style: 'summary'
    }] : [])
  ]
}

/**
 * 教育背景模块模板
 */
export const createEducationTemplate = (education) => {
  if (!education || education.length === 0) return []

  const items = education.map(edu => [
    {
      columns: [
        {
          text: `${edu.school} | ${edu.major}`,
          style: 'itemSubtitle',
          width: '*'
        },
        {
          text: `${edu.startDate} - ${edu.endDate}`,
          style: 'itemDate',
          width: 100,
          alignment: 'right'
        }
      ]
    },
    {
      text: `${edu.degree}`,
      style: 'itemTitle'
    },
    ...(edu.description ? [{
      text: edu.description,
      style: 'itemDescription'
    }] : [])
  ])

  return [
    {
      text: '教育背景',
      style: 'sectionHeader'
    },
    ...items
  ]
}

/**
 * 工作经验模块模板
 */
export const createExperienceTemplate = (experience) => {
  if (!experience || experience.length === 0) return []

  const items = experience.map(exp => [
    {
      columns: [
        {
          text: exp.company,
          style: 'itemSubtitle',
          width: '*'
        },
        {
          text: `${exp.startDate} - ${exp.endDate}`,
          style: 'itemDate',
          width: 100,
          alignment: 'right'
        }
      ]
    },
    {
      text: exp.position,
      style: 'itemTitle'
    },
    ...(exp.description ? [{
      text: exp.description,
      style: 'itemDescription'
    }] : [])
  ])

  return [
    {
      text: '工作经验',
      style: 'sectionHeader'
    },
    ...items
  ]
}

/**
 * 技能特长模块模板
 */
export const createSkillsTemplate = (skills) => {
  if (!skills || skills.length === 0) return []

  // 将技能分成多行显示，每行3-4个技能
  const skillsPerRow = 3
  const skillRows = []
  for (let i = 0; i < skills.length; i += skillsPerRow) {
    const rowSkills = skills.slice(i, i + skillsPerRow)
    skillRows.push({
      columns: rowSkills.map(skill => ({
        text: skill,
        style: 'skillTag',
        alignment: 'center'
      })),
      margin: [0, 0, 0, 5]
    })
  }

  return [
    {
      text: '技能特长',
      style: 'sectionHeader'
    },
    ...skillRows
  ]
}

/**
 * 项目经验模块模板
 */
export const createProjectsTemplate = (projects) => {
  if (!projects || projects.length === 0) return []

  const items = projects.map(project => [
    {
      columns: [
        {
          text: project.name,
          style: 'itemSubtitle',
          width: '*'
        },
        {
          text: `${project.startDate} - ${project.endDate}`,
          style: 'itemDate',
          width: 100,
          alignment: 'right'
        }
      ]
    },
    {
      text: project.role,
      style: 'itemTitle'
    },
    ...(project.description ? [{
      text: project.description,
      style: 'itemDescription'
    }] : [])
  ])

  return [
    {
      text: '项目经验',
      style: 'sectionHeader'
    },
    ...items
  ]
}

/**
 * 创建完整的简历PDF模板
 */
export const createResumeTemplate = (resumeData) => {
  const pdfData = convertToPDFData(resumeData)

  const content = [
    // 个人信息
    ...createPersonalInfoTemplate(pdfData.personalInfo),

    // 教育背景
    ...createEducationTemplate(pdfData.sections.education),

    // 工作经验
    ...createExperienceTemplate(pdfData.sections.experience),

    // 技能特长
    ...createSkillsTemplate(pdfData.sections.skills),

    // 项目经验
    ...createProjectsTemplate(pdfData.sections.projects)
  ]

  return {
    ...PAGE_CONFIG,
    content,
    styles: STYLES,
    defaultStyle: PAGE_CONFIG.defaultStyle
  }
}

export default {
  createResumeTemplate,
  createPersonalInfoTemplate,
  createEducationTemplate,
  createExperienceTemplate,
  createSkillsTemplate,
  createProjectsTemplate,
  PAGE_CONFIG,
  STYLES
}
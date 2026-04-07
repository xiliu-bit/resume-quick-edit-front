/**
 * PDF数据转换器
 * 将Pinia Store中的简历数据转换为pdfmake格式
 */

/**
 * pdfmake简历数据格式接口定义
 */
export const PDFResumeFormat = {
  /**
   * 个人信息
   */
  personalInfo: {
    name: '',           // 姓名
    contact: [],        // 联系方式数组
    summary: ''         // 个人简介
  },

  /**
   * 简历模块
   */
  sections: {
    education: [],      // 教育背景
    experience: [],     // 工作经验
    skills: [],         // 技能特长
    projects: []        // 项目经验
  }
}

/**
 * 将Pinia Store数据转换为pdfmake格式
 * @param {Object} resumeStore - Pinia Store实例
 * @returns {Object} pdfmake格式的简历数据
 */
export const convertToPDFData = (resumeStore) => {
  const { personalInfo, education, experience, skills, projects } = resumeStore

  // 转换个人信息
  const pdfPersonalInfo = {
    name: personalInfo.name || '姓名',
    contact: [
      ...(personalInfo.phone ? [personalInfo.phone] : []),
      ...(personalInfo.email ? [personalInfo.email] : []),
      ...(personalInfo.location ? [personalInfo.location] : [])
    ],
    summary: personalInfo.summary || ''
  }

  // 转换教育背景
  const pdfEducation = education.map(edu => ({
    school: edu.school || '',
    major: edu.major || '',
    degree: edu.degree || '',
    startDate: edu.startDate || '',
    endDate: edu.endDate || '',
    description: edu.description || ''
  }))

  // 转换工作经验
  const pdfExperience = experience.map(exp => ({
    company: exp.company || '',
    position: exp.position || '',
    startDate: exp.startDate || '',
    endDate: exp.endDate || '',
    description: exp.description || ''
  }))

  // 转换技能特长
  const pdfSkills = skills.map(skill => skill.name || '')

  // 转换项目经验
  const pdfProjects = projects.map(project => ({
    name: project.name || '',
    role: project.role || '',
    startDate: project.startDate || '',
    endDate: project.endDate || '',
    description: project.description || ''
  }))

  return {
    personalInfo: pdfPersonalInfo,
    sections: {
      education: pdfEducation,
      experience: pdfExperience,
      skills: pdfSkills,
      projects: pdfProjects
    }
  }
}

/**
 * 个人信息转换函数
 */
export const convertPersonalInfo = (personalInfo) => {
  return {
    name: personalInfo.name || '姓名',
    contact: [
      ...(personalInfo.phone ? [personalInfo.phone] : []),
      ...(personalInfo.email ? [personalInfo.email] : []),
      ...(personalInfo.location ? [personalInfo.location] : [])
    ],
    summary: personalInfo.summary || ''
  }
}

/**
 * 教育背景转换函数
 */
export const convertEducation = (education) => {
  return education.map(edu => ({
    school: edu.school || '',
    major: edu.major || '',
    degree: edu.degree || '',
    startDate: edu.startDate || '',
    endDate: edu.endDate || '',
    description: edu.description || ''
  }))
}

/**
 * 工作经验转换函数
 */
export const convertExperience = (experience) => {
  return experience.map(exp => ({
    company: exp.company || '',
    position: exp.position || '',
    startDate: exp.startDate || '',
    endDate: exp.endDate || '',
    description: exp.description || ''
  }))
}

/**
 * 技能特长转换函数
 */
export const convertSkills = (skills) => {
  return skills.map(skill => skill.name || '').filter(name => name.trim() !== '')
}

/**
 * 项目经验转换函数
 */
export const convertProjects = (projects) => {
  return projects.map(project => ({
    name: project.name || '',
    role: project.role || '',
    startDate: project.startDate || '',
    endDate: project.endDate || '',
    description: project.description || ''
  }))
}

export default {
  convertToPDFData,
  convertPersonalInfo,
  convertEducation,
  convertExperience,
  convertSkills,
  convertProjects
}
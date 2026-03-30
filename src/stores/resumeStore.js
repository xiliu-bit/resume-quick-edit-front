import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useResumeStore = defineStore('resume', () => {
  // 个人信息
  const personalInfo = ref({
    name: '',
    phone: '',
    email: '',
    location: '',
    summary: ''
  })

  // 教育背景
  const education = ref([])

  // 工作经验
  const experience = ref([])

  // 技能特长
  const skills = ref([])

  // 项目经验
  const projects = ref([])

  // 当前活跃的编辑部分
  const activeSection = ref('personal')

  // Actions
  const updatePersonalInfo = (info) => {
    personalInfo.value = { ...personalInfo.value, ...info }
  }

  const setActiveSection = (section) => {
    activeSection.value = section
  }

  // 教育背景操作
  const addEducation = (edu) => {
    education.value.push(edu)
  }

  const removeEducation = (id) => {
    const index = education.value.findIndex(edu => edu.id === id)
    if (index !== -1) {
      education.value.splice(index, 1)
    }
  }

  const updateEducation = (id, updates) => {
    const index = education.value.findIndex(edu => edu.id === id)
    if (index !== -1) {
      education.value[index] = { ...education.value[index], ...updates }
    }
  }

  // 工作经验操作
  const addExperience = (exp) => {
    experience.value.push(exp)
  }

  const removeExperience = (id) => {
    const index = experience.value.findIndex(exp => exp.id === id)
    if (index !== -1) {
      experience.value.splice(index, 1)
    }
  }

  const updateExperience = (id, updates) => {
    const index = experience.value.findIndex(exp => exp.id === id)
    if (index !== -1) {
      experience.value[index] = { ...experience.value[index], ...updates }
    }
  }

  // 技能操作
  const addSkill = (skill) => {
    skills.value.push(skill)
  }

  const removeSkill = (id) => {
    const index = skills.value.findIndex(skill => skill.id === id)
    if (index !== -1) {
      skills.value.splice(index, 1)
    }
  }

  // 项目操作
  const addProject = (project) => {
    projects.value.push(project)
  }

  const removeProject = (id) => {
    const index = projects.value.findIndex(project => project.id === id)
    if (index !== -1) {
      projects.value.splice(index, 1)
    }
  }

  const updateProject = (id, updates) => {
    const index = projects.value.findIndex(project => project.id === id)
    if (index !== -1) {
      projects.value[index] = { ...projects.value[index], ...updates }
    }
  }

  // 导出简历数据
  const exportResumeData = () => {
    return {
      personalInfo: personalInfo.value,
      education: education.value,
      experience: experience.value,
      skills: skills.value,
      projects: projects.value
    }
  }

  // 导入简历数据
  const importResumeData = (data) => {
    if (data.personalInfo) personalInfo.value = data.personalInfo
    if (data.education) education.value = data.education
    if (data.experience) experience.value = data.experience
    if (data.skills) skills.value = data.skills
    if (data.projects) projects.value = data.projects
  }

  // 清空所有数据
  const clearAllData = () => {
    personalInfo.value = {
      name: '',
      phone: '',
      email: '',
      location: '',
      summary: ''
    }
    education.value = []
    experience.value = []
    skills.value = []
    projects.value = []
  }

  return {
    // State
    personalInfo,
    education,
    experience,
    skills,
    projects,
    activeSection,

    // Actions
    updatePersonalInfo,
    setActiveSection,
    addEducation,
    removeEducation,
    updateEducation,
    addExperience,
    removeExperience,
    updateExperience,
    addSkill,
    removeSkill,
    addProject,
    removeProject,
    updateProject,
    exportResumeData,
    importResumeData,
    clearAllData
  }
})
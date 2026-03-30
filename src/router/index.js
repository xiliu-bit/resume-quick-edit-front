import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ResumeEditor from '../pages/ResumeEditor.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editor',
    name: 'ResumeEditor',
    component: ResumeEditor
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
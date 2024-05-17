import { createRouter, createWebHistory } from 'vue-router'
import LoginUser from '@/shared/views/LoginUser.vue'
import { newsRouter } from '@/news/router/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginUser
    },
    newsRouter
  ]
})

export default router

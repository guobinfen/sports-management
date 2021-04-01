import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/pages/login/Login'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

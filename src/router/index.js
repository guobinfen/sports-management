import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/pages/login/Login'
import Type from '@/pages/type/Type'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/type',
    name: 'Type',
    component: Type
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

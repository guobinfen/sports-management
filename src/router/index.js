import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/pages/login/Login'
import Type from '@/pages/type/Type'
import Competition from '@/pages/competition/Competition'
import Plog from '@/pages/plog/Plog'
import Player from '@/pages/player/Player'
import Admin from '@/pages/admin/Admin'


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
  },
  {
    path: '/competition',
    name: 'Competition',
    component: Competition
  },
  {
    path: '/plog',
    name: 'Plog',
    component: Plog
  },
  {
    path: '/player',
    name: 'Player',
    component: Player
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

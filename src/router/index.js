import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ticket',
    name: 'ticket',
    component: ()=>import('../views/viewTicket/ViewTicket.vue')
  },
  // {
  //   path: '/ticket:id',
  //   name: 'success',
  //   component: ()=>import('../components/SuccessTicket.vue')
  // },
  {
    path: '/departmentticket',
    name: 'departmentticket',
    component: ()=>import('../views/departmentTicket/DepartmentTicket.vue')
  },
  {
    path: '/contentticket',
    name: 'contentTicket',
    component: ()=>import('../views/contentTicket/ContentTicket.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

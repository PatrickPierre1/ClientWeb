import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Clientes from '@/pages/clientes/ClienteList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/clientes',
    },
    {
      path: '/clientes',
      component: Clientes,
    },
  ],
})

export default router

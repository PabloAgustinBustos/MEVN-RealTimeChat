import { createRouter, createWebHistory } from 'vue-router'
import Register from "../views/Register.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'Chat',
    //   component: HomeView
    // },

    {
      path: "/register",
      name: "Register",
      component: Register
    }
  ]
})

export default router

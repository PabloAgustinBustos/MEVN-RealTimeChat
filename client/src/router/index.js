import { createRouter, createWebHistory } from 'vue-router'
import Register from "../views/Register.vue"
import ChatZone from "../views/ChatZone.vue"
import Login from "../views/Login.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: ChatZone
    },

    {
      path: "/register",
      name: "Register",
      component: Register
    },

    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
})

export default router

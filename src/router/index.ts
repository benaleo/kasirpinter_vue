import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import LandingPage from '../views/LandingPage.vue'
import Register from '../views/Register.vue'
import { useAuth } from '@/services/AuthService'
import { watch } from 'vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  // cms
  {
    path: '/v1/dashboard',
    name: 'Dashboard',
    component: () => import('../views/cms/Dashboard.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  const auth = useAuth()
  const publicRoutes = ['/', '/login', '/register']
  
  // Wait for auth to initialize
  if (!auth.isInitialized.value) {
    await new Promise((resolve) => {
      const unwatch = watch(() => auth.isInitialized.value, (initialized) => {
        if (initialized) {
          unwatch()
          resolve(true)
        }
      })
    })
  }

  // Redirect logic
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    return '/login'
  }

  if ((to.path === '/login' || to.path === '/register') && auth.isLoggedIn()) {
    return '/v1/dashboard'
  }
})

export default router
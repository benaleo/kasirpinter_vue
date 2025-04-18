import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import LandingPage from '../views/LandingPage.vue'
import Register from '../views/Register.vue'
import { useAuth } from '@/services/AuthService'
import { watch } from 'vue'
import Dashboard from '@/views/cms/Dashboard.vue'
import ProductCategory from '@/views/cms/ProductCategory.vue'
import FormProductCategory from '@/components/forms/FormProductCategory.vue'
import Company from '@/views/cms/Company.vue'
import FormRegister from '@/components/forms/FormRegister.vue'

const routes = [
  { path: '/', name: 'Landing', component: LandingPage, meta: { isPublic: true } },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { isPublic: true, preventAuthed: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { isPublic: true, preventAuthed: true },
  },
  { path: '/v1/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  {
    path: '/v1/product-category',
    meta: { requiresAuth: true },
    children: [
      {
        path: '', // empty path will render when parent route is matched
        name: 'Product Category',
        component: ProductCategory, // if you want something to show by default
      },
      {
        path: 'create',
        name: 'Product Category Create',
        component: FormProductCategory,
      },
    ],
  },
  {
    path: '/v1/company',
    name: 'Company',
    component: Company,
    children: [{ path: 'create', name: 'Company Create', component: FormRegister }],
    meta: { requiresAuth: true },
  },

  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
    meta: { isPublic: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const auth = useAuth()

  // Wait for auth to initialize
  if (!auth.isInitialized.value) {
    await new Promise((resolve) => {
      const unwatch = watch(
        () => auth.isInitialized.value,
        (initialized) => {
          if (initialized) {
            unwatch()
            resolve(true)
          }
        },
      )
    })
  }

  // Redirect authed users away from auth pages
  if (to.meta.preventAuthed && auth.isLoggedIn()) {
    return '/v1/dashboard'
  }

  // Block non-public routes for unauthed users
  if (!to.meta.isPublic && !auth.isLoggedIn()) {
    return '/login'
  }
})

export default router

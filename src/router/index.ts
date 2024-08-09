import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Login from '../views/LoginPage.vue'
import Home from '../views/HomeView.vue'
import Summary from '../views/ReportSummary.vue'
import Input from '../views/ReportInput.vue'
import { isAuthenticated } from '../services/authSeavice'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true } // 認証が必要なページ
  },
  {
    path: '/summary',
    name: 'Summary',
    component: Summary,
    meta: { requiresAuth: true } // 認証が必要なページ
  },
  {
    path: '/input',
    name: 'Input',
    component: Input,
    meta: { requiresAuth: true } // 認証が必要なページ
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ナビゲーションガードの追加
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next() // 認証されている場合は、次のページへ進む
    } else {
      next('/login') // 認証されていない場合はログインページへリダイレクト
    }
  } else {
    next() // 認証が不要なページはそのまま進む
  }
})

export default router

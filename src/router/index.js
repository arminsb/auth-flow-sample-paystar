import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        authRequired: true,
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: {
        authRequired: true,
      }
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("@/views/auth/Login.vue"),
      meta: {
        authRequired: false,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired===true) {
    if (!!window.localStorage.getItem('access_token')) {
      next()
    }else{
      next('/auth/login')
    }
  }else{
    next()
  }
})

export default router

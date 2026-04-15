import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/setup' },
    { path: '/setup', component: () => import('@/views/SetupView.vue') },
    { path: '/ref', component: () => import('@/views/RefView.vue') },
    { path: '/reactive', component: () => import('@/views/ReactiveView.vue') },
    { path: '/computed', component: () => import('@/views/ComputedView.vue') },
    { path: '/watch', component: () => import('@/views/WatchView.vue') },
    { path: '/lifecycle', component: () => import('@/views/LifecycleView.vue') },
    { path: '/hooks', component: () => import('@/views/HooksView.vue') },
    { path: '/router', component: () => import('@/views/RouterView.vue') },
    { path: '/pinia', component: () => import('@/views/PiniaView.vue') },
    { path: '/components', component: () => import('@/views/ComponentsView.vue') },
  ]
})

export default router

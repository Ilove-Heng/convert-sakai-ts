import AppLayout from "@/layout/AppLayout.vue";
import { authMiddleware } from "@/middleware/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/',
            redirect: '/dashboard',
            component: AppLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import("@/views/Dashboard.vue")
                },
                {
                    path: '/live_entry_result',
                    name: 'liveEntryResult',
                    component: () => import("@/views/result/LiveEntryResult.vue")
                },
                {
                    path: '/tracking/report',
                    name: 'trackingReport',
                    component: () => import('@/views/tracking/TrackingReport.vue')
                },
                {
                    path: '/result/auto-entry',
                    name: 'resultAuthEntry',
                    component: () => import('@/views/result/ResultAutoEntry.vue')
                },
                {
                    path: '/result/entry',
                    name: 'resultEntry',
                    component: () => import('@/views/result/ResultEntry.vue')
                },
            ],
        },
    ]
})

router.beforeEach(authMiddleware)


export default router;
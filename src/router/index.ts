import AppLayout from "@/layout/AppLayout.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import("@/views/Dashboard.vue")
                },
                {
                    path: '/tracking/report',
                    name: 'trackingReport',
                    component: () => import('@/views/tracking/TrackingReport.vue')
                },
                {
                    path: '/result/entry',
                    name: 'resultEntry',
                    component: () => import('@/views/result/ResultEntry.vue')
                },
            ],
        },
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
    ]
})


export default router;
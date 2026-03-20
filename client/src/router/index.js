import { createRouter, createWebHistory } from 'vue-router';
import mypage_index from '@/router/mypage_index';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...mypage_index,
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        }
    ]
});

export default router;

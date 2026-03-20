import AppLayout from '@/layout/AppLayout.vue';

const mypage_index = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: 'pages/mypage',
                name: 'userMyPage',
                component: () => import('@/views/pages/mypage/MyPage.vue')
            }
        ]
    }
];

export default mypage_index;

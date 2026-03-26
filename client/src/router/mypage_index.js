// export default [
//     {
//         path: '/',
//         component: AppLayout,
//         children: [
//             {
//                 path: 'pages/mypage',
//                 name: 'userMyPage',
//                 component: () => import('@/views/pages/mypage/MyPage.vue')
//             }
//         ]
//     }
// ];

export default [
    {
        path: '/pages/mypage',
        name: 'userMyPage',
        component: () => import('@/views/pages/mypage/MyPage.vue')
    },
    {
        path: '/info/manager',
        name: 'managerInfo',
        component: () => import('@/views/pages/info/ManagerInfo.vue')
    },
    {
        path: '/admin/mypage',
        name: 'admin-mypage',
        component: () => import('@/views/pages/mypage_e3/InstitutionInfo.vue')
    },
    {
        path: '/admin/mypage/edit',
        name: 'admin-mypage-edit',
        component: () => import('@/views/pages/mypage_e3/AdminMyInfoEdit.vue')
    }
];

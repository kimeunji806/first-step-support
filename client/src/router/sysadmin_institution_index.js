export default [
    {
        path: '/sysadmin/institutions',
        name: 'sysadmin-institutions',
        component: () => import('@/views/pages/sysadmin_institution/SysAdminInstitutionList.vue'),
        meta: { roles: ['e4'] }
    }
];

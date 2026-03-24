<script setup>
import { computed } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

// localStorage에서 로그인 사용자 정보 가져오기
const loginUser = JSON.parse(localStorage.getItem('user'));

// 사용자 권한 코드
const userRole = loginUser?.role || null;

// 권한별 마이페이지 경로
const myPageRouteMap = {
    e1: '/pages/mypage', // 일반사용자
    e2: '/mypage/institution', // 기관담당자
    e3: '/institutioninfo', // 기관관리자
    e4: '/admin/mypage' // 시스템관리자
};

// 메뉴 목록
const model = computed(() => [
    {
        items: [
            {
                label: '지원신청내역',
                icon: 'pi pi-fw pi-home',
                to: '/'
            },
            {
                label: '마이페이지',
                icon: 'pi pi-fw pi-user',
                // 우선순위에 따라 하나의 경로만 지정 (배열은 사용 불가)
                to: '/pages/mypage'
            },
            // 기관관리자(e3) 전용 메뉴 통합
            ...(userStore.role === 'e3'
                ? [{
                    label: '담당자 조회',
                    icon: 'pi pi-fw pi-users',
                    to: '/info/manager'
                }, {
                        label: '회원가입 승인',
                        icon: 'pi pi-fw pi-verified',
                        to: '/auth/approval'
                    }
                ]: []),
            {
                label: '공지사항',
                icon: 'pi pi-fw pi-bell',
                to: '/notice' // 공지사항 경로가 있다면 수정하세요
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="i">
            <template v-if="!item.separator">
                <AppMenuItem :item="item" :index="i" />
            </template>
            <li v-else class="menu-separator"></li>
        </template>
    </ul>
</template>

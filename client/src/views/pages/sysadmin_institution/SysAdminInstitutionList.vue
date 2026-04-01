<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getInstitutionList } from '@/service/SysAdminInstitutionService';

const router = useRouter();

/* =========================
   기본 상태
========================= */
// 기관 전체 목록 저장
const institutionList = ref([]);

/* =========================
   기관 전체조회
========================= */
// 시스템관리자 기관 목록 조회
const loadInstitutionList = async () => {
    try {
        const result = await getInstitutionList();

        if (result.retCode === 'OK') {
            institutionList.value = result.data || [];
        } else {
            alert(result.message || '기관 목록 조회 실패');
        }
    } catch (err) {
        console.error('기관 목록 조회 실패:', err);
        alert('기관 목록을 불러오지 못했습니다.');
    }
};

/* =========================
   상세조회 페이지 이동
========================= */
// 목록 행 클릭 시 상세조회 페이지로 이동
const openDetail = (institutionNo) => {
    router.push(`/sysadmin/institutions/${institutionNo}`);
};

/* =========================
   수정 페이지 이동
========================= */
// 수정 버튼 클릭 시 수정 페이지로 이동
const goEdit = (institutionNo) => {
    router.push(`/sysadmin/institutions/${institutionNo}/edit`);
};

/* =========================
   등록 페이지 이동
========================= */
// 등록 버튼 클릭 시 등록 페이지로 이동
const goCreate = () => {
    router.push('/sysadmin/institutions/create');
};

onMounted(() => {
    loadInstitutionList();
});
</script>

<template>
    <div class="w-full mt-4">
        <!-- =========================
             화면 제목
        ========================== -->
        <div class="mb-5">
            <div class="text-surface-900 dark:text-surface-0 text-2xl font-medium mb-1">기관 정보</div>
            <span class="text-muted-color">시스템관리자가 기관 목록을 조회할 수 있습니다.</span>
        </div>

        <!-- =========================
             기관 목록
        ========================== -->
        <DataTable :value="institutionList" class="w-full institution-table" paginator :rows="10" :totalRecords="institutionList.length" @row-click="(event) => openDetail(event.data.institution_no)">
            <!-- 기관번호 -->
            <Column field="institution_no">
                <template #header>
                    <div class="w-full text-center">기관번호</div>
                </template>
                <template #body="slotProps">
                    {{ slotProps.data.institution_no }}
                </template>
            </Column>

            <!-- 기관명 -->
            <Column field="name">
                <template #header>
                    <div class="w-full text-center">기관명</div>
                </template>
                <template #body="slotProps">
                    {{ slotProps.data.name || '-' }}
                </template>
            </Column>

            <!-- 연락처 -->
            <Column field="tel">
                <template #header>
                    <div class="w-full text-center">연락처</div>
                </template>
                <template #body="slotProps">
                    {{ slotProps.data.tel || '-' }}
                </template>
            </Column>

            <!-- 이메일 -->
            <Column field="institution_email">
                <template #header>
                    <div class="w-full text-center">이메일</div>
                </template>
                <template #body="slotProps">
                    {{ slotProps.data.institution_email || '-' }}
                </template>
            </Column>

            <!-- 가입일 -->
            <Column field="created_at">
                <template #header>
                    <div class="w-full text-center">가입일</div>
                </template>
                <template #body="slotProps">
                    {{ slotProps.data.created_at || '-' }}
                </template>
            </Column>

            <!-- 운영여부 -->
            <Column>
                <template #header>
                    <div class="w-full text-center">운영여부</div>
                </template>
                <template #body="slotProps">
                    <Tag :value="Number(slotProps.data.operation) === 1 ? '운영' : '종료'" :severity="Number(slotProps.data.operation) === 1 ? null : 'secondary'" rounded />
                </template>
            </Column>

            <!-- 수정 -->
            <Column>
                <template #header>
                    <div class="w-full text-center">수정</div>
                </template>
                <template #body="slotProps">
                    <Button label="수정" size="small" @click.stop="goEdit(slotProps.data.institution_no)" />
                </template>
            </Column>

            <!-- 빈 목록 안내 -->
            <template #empty>
                <div class="py-6 text-center text-muted-color">조회된 기관이 없습니다.</div>
            </template>
        </DataTable>

        <!-- =========================
             등록 버튼
        ========================== -->
        <div class="flex justify-end mt-4">
            <Button label="등록" @click="goCreate" />
        </div>
    </div>
</template>

<style scoped>
/* =========================
   본문 셀 기본 정렬
========================= */
:deep(.institution-table .p-datatable-tbody > tr > td) {
    text-align: center;
    vertical-align: middle;
    padding: 0.9rem 0.75rem;
    border-bottom: 1px solid var(--p-content-border-color);
}

/* =========================
   행 hover 효과
========================= */
:deep(.institution-table .p-datatable-tbody > tr) {
    cursor: pointer;
    transition: background-color 0.2s ease;
}

:deep(.institution-table .p-datatable-tbody > tr:hover > td) {
    background-color: var(--p-surface-100);
}

/* =========================
   페이지네이터 중앙 정렬
========================= */
:deep(.institution-table .p-paginator) {
    justify-content: center;
}

/* =========================
   컬럼 폭 조정
========================= */
:deep(.institution-table .p-datatable-thead > tr > th:nth-child(1)),
:deep(.institution-table .p-datatable-tbody > tr > td:nth-child(1)) {
    width: 90px;
}

:deep(.institution-table .p-datatable-thead > tr > th:nth-child(3)),
:deep(.institution-table .p-datatable-tbody > tr > td:nth-child(3)) {
    width: 170px;
}

:deep(.institution-table .p-datatable-thead > tr > th:nth-child(4)),
:deep(.institution-table .p-datatable-tbody > tr > td:nth-child(4)) {
    width: 230px;
}

:deep(.institution-table .p-datatable-thead > tr > th:nth-child(5)),
:deep(.institution-table .p-datatable-tbody > tr > td:nth-child(5)) {
    width: 130px;
}

:deep(.institution-table .p-datatable-thead > tr > th:nth-child(6)),
:deep(.institution-table .p-datatable-tbody > tr > td:nth-child(6)) {
    width: 110px;
}

:deep(.institution-table .p-datatable-thead > tr > th:nth-child(7)),
:deep(.institution-table .p-datatable-tbody > tr > td:nth-child(7)) {
    width: 110px;
}
</style>

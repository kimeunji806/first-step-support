<script setup>
import { ref, onMounted } from 'vue';
import { getInstitutionList } from '@/service/SysAdminInstitutionService';

const institutionList = ref([]);

// 기관 전체조회
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

// 수정 버튼 클릭
const goEdit = (institutionNo) => {
    console.log('수정 대상 기관번호:', institutionNo);
    // 나중에 수정 기능 연결 예정
};

onMounted(() => {
    loadInstitutionList();
});
</script>

<template>
    <div class="p-6">
        <div class="mb-5">
            <div class="text-surface-900 dark:text-surface-0 text-2xl font-medium mb-1">기관 정보</div>
            <span class="text-muted-color"> 시스템관리자가 기관 목록을 조회할 수 있습니다. </span>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl p-4 lg:p-6">
            <table class="w-full border-collapse">
                <thead>
                    <tr class="border-b border-surface-200 dark:border-surface-700 text-center">
                        <th class="py-3">기관번호</th>
                        <th class="py-3">기관명</th>
                        <th class="py-3">연락처</th>
                        <th class="py-3">이메일</th>
                        <th class="py-3">가입일</th>
                        <th class="py-3">운영여부</th>
                        <th class="py-3">수정</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in institutionList" :key="item.institution_no" class="border-b border-surface-200 dark:border-surface-700 text-center cursor-pointer hover:bg-surface-200" @click="openDetail(item.institution_no)">
                        <td class="py-3">{{ item.institution_no }}</td>
                        <td class="py-3">{{ item.name }}</td>
                        <td class="py-3">{{ item.tel || '-' }}</td>
                        <td class="py-3">{{ item.email || '-' }}</td>
                        <td class="py-3">{{ item.created_at || '-' }}</td>
                        <td class="py-3 text-center">
                            <Tag :value="Number(item.operation) === 1 ? '운영' : '종료'" :severity="Number(item.operation) === 1 ? 'primary' : 'secondary'" rounded />
                        </td>
                        <td class="py-3">
                            <Button label="수정" size="small" @click="goEdit(item.institution_no)" />
                        </td>
                    </tr>

                    <tr v-if="institutionList.length === 0">
                        <td colspan="7" class="py-6 text-center text-muted-color">조회된 기관이 없습니다.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

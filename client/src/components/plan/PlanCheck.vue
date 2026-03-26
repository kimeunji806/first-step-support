<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

console.log('PlanCheck 들어옴');

const route = useRoute();
const surveyNo = Number(route.params.no);
const list = ref([]);

const plan = async () => {
    console.log('plan 함수 시작, surveyNo:', surveyNo);

    try {
        const resp = await fetch(`/api/plan/${surveyNo}`);
        console.log('응답 status:', resp.status);

        const text = await resp.text();
        console.log('응답 원문:', text);

        const data = text ? JSON.parse(text) : [];
        list.value = Array.isArray(data) ? data : [data];
    } catch (err) {
        console.log('plan 에러:', err);
    }
};

onBeforeMount(() => {
    console.log('onBeforeMount 실행');
    plan();
});
</script>

<template>
    <div class="p-4 bg-[#ffffff] h-screen">
        <!-- 스크롤 영역 -->
        <div class="h-full overflow-y-auto pr-2">
            <!-- 데이터 없을 때 -->
            <div v-if="list.length === 0" class="text-center text-gray-500 py-10">등록된 지원계획이 없습니다.</div>

            <!-- 반복 영역 -->
            <div v-else>
                <div v-for="(item, index) in list" :key="index" class="mb-6 border-b pb-4">
                    <!-- 상단 -->
                    <div class="flex justify-between items-center mb-2">
                        <div class="font-semibold flex items-center gap-2">
                            <span
                                class="text-xs px-2 py-1 rounded"
                                :class="{
                                    'bg-yellow-100 text-yellow-700': item.approval === 'a0',
                                    'bg-green-100 text-green-700': item.approval === 'a1',
                                    'bg-red-100 text-red-700': item.approval === 'a2'
                                }"
                            >
                                {{ item.approval_name }}
                            </span>

                            <div>지원계획 {{ index + 1 }}</div>
                        </div>

                        <div class="text-sm text-gray-600">작성자 {{ item.name }} &nbsp; 작성일 {{ item.created_at }}</div>
                    </div>

                    <!-- 제목 -->
                    <div class="border-t border-b py-2 mb-2">
                        <span class="mr-2 font-medium">제목</span>
                        <span>{{ item.title }}</span>
                    </div>

                    <!-- 내용 -->
                    <div class="border-b py-2 mb-2">
                        <span class="mr-2 font-medium">내용</span>
                        <span>{{ item.content }}</span>
                    </div>

                    <!-- 첨부 -->
                    <div class="border-b py-2 mb-2">
                        <span v-if="item.filename">
                            <span v-for="(file, i) in item.filename.split(', ')" :key="i" class="mr-2">
                                {{ file }}
                            </span>
                        </span>
                        <span v-else>첨부파일 없음</span>
                    </div>

                    <!-- 반려사유 -->
                    <div class="py-2" v-if="item.approval === 'a2'">
                        <span class="mr-2 font-medium">반려사유</span>
                        <span>{{ item.rejection_reason }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

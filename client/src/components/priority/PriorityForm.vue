<script setup>
import { onBeforeMount, ref } from 'vue';
import { useBeneStore } from '@/stores/surBene';
import { useRoute } from 'vue-router';

const userbeneStore = useBeneStore();
const route = useRoute();
const selectNo = Number(route.params.no);
const priority = ref(null);
const priorityAlert = ref('미지정');
const isVisible = ref(false);

const clickPriority = async (role_name) => {
    console.log(role_name);
    priority.value = role_name;
    console.log(`우선순위 ${priority.value}`);

    if (priority.value === 'd1') {
        priorityAlert.value = '계획';
    } else if (priority.value === 'd2') {
        priorityAlert.value = '중점';
    } else if (priority.value === 'd3') {
        priorityAlert.value = '긴급';
    }
};

onBeforeMount(async () => {
    await userbeneStore.fetchUsers(selectNo);
});
</script>
<template>
    <div class="p-6 bg-slate-100 min-h-full">
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
            <h2 class="text-lg font-bold mb-4 border-b pb-2">우선순위 입력</h2>

            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                <button class="w-40 h-40 rounded-full flex items-center justify-center text-lg font-bold bg-gray-400 text-white" @click="clickPriority('d1')">계획</button>
                <button class="w-40 h-40 rounded-full flex items-center justify-center text-lg font-bold bg-green-500 text-white" @click="clickPriority('d2')">중점</button>
                <button class="w-40 h-40 rounded-full flex items-center justify-center text-lg font-bold bg-red-500 text-white" @click="clickPriority('d3')">긴급</button>
            </div>
            <h2 class="text-lg font-bold mb-4 border-b pb-2">우선순위가 {{ priorityAlert }}입니다.</h2>

            <div class="text-right">
                <button @click="submit" class="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-full">등록</button>
            </div>
        </div>
    </div>
</template>

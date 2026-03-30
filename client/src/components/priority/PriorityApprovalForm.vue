<script setup>
import { onBeforeMount, ref } from 'vue';
import { useBeneStore } from '@/stores/surBene';
import { useRoute } from 'vue-router';

const userbeneStore = useBeneStore();
const route = useRoute();
const selectNo = Number(route.params.no);

const priority = ref(null);
const priorityAlert = ref(null);

onBeforeMount(async () => {
    await userbeneStore.fetchUsers(selectNo);
});
</script>
<template>
    <div class="p-6 bg-slate-100 min-h-full">
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
            <h2 class="text-lg font-bold mb-4 border-b pb-2">우선순위 승인요청</h2>

            <h2 class="text-lg font-bold mb-4 border-b pb-2">우선순위 {{ priorityAlert }}을 선택하셨습니다.</h2>

            <div class="text-right">
                <button @click="submit" class="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-full">등록</button>
            </div>
        </div>
    </div>
</template>

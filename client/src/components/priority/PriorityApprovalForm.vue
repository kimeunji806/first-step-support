<script setup>
import { reactive, ref } from 'vue';

const priority = ref(null);
const priorityAlert = ref(null);
const isVisible = ref(false);

const clickPriority = async (role_name) => {
    console.log(role_name);
    info.role = role_name;

    if (priority == 'd1') {
        priorityAlert.value = '계획';
    } else if (priority == 'd2') {
        priorityAlert.value = '중점';
    } else if (priority == 'd3') {
        priorityAlert.value = '긴급';
    }
    isVisible = !isVisible;
};
</script>
<template>
    <div class="p-6 bg-slate-100 min-h-full">
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
            <h2 class="text-lg font-bold mb-4 border-b pb-2">우선순위 입력</h2>

            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                <Button label="일반사용자" class="w-40 h-40 rounded-full flex items-center justify-center text-lg font-bold" @click="clickPriority('d1')" />
                <Button label="일반사용자" class="w-40 h-40 rounded-full flex items-center justify-center text-lg font-bold" @click="clickPriority('d2')" />
                <Button label="일반사용자" class="w-40 h-40 rounded-full flex items-center justify-center text-lg font-bold" @click="clickPriority('d3')" />
            </div>
            <div v-if="isVisible">
                <h2 class="text-lg font-bold mb-4 border-b pb-2">우선순위 {{ priorityAlert }}을 선택하셨습니다.</h2>
            </div>

            <div class="text-right">
                <button @click="submit" class="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-full">등록</button>
            </div>
        </div>
    </div>
</template>

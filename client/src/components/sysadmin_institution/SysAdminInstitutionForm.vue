<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
    mode: {
        type: String,
        default: 'create'
    },
    institutionData: {
        type: Object,
        default: () => ({})
    }
});

const emit = defineEmits(['save', 'cancel']);

const form = reactive({
    name: '',
    business_number: '',
    tel: '',
    address: '',
    email: '',
    operation: 1
});

watch(
    () => props.institutionData,
    (newValue) => {
        form.name = newValue?.name || '';
        form.business_number = newValue?.business_number || '';
        form.tel = newValue?.tel || '';
        form.address = newValue?.address || '';
        form.email = newValue?.email || '';
        form.operation = newValue?.operation ?? 1;
    },
    { immediate: true }
);

const submitForm = () => {
    if (!form.name.trim()) {
        alert('기관명을 입력하세요.');
        return;
    }

    emit('save', { ...form });
};
</script>

<template>
    <div class="p-4 border rounded">
        <h3 class="text-lg font-semibold mb-4">
            {{ mode === 'create' ? '기관 등록' : '기관 수정' }}
        </h3>

        <div class="grid gap-3">
            <input v-model="form.name" class="border rounded px-3 py-2" placeholder="기관명" />
            <input v-model="form.business_number" class="border rounded px-3 py-2" placeholder="사업자번호" />
            <input v-model="form.tel" class="border rounded px-3 py-2" placeholder="대표번호" />
            <input v-model="form.address" class="border rounded px-3 py-2" placeholder="주소" />
            <input v-model="form.email" class="border rounded px-3 py-2" placeholder="이메일" />

            <select v-model="form.operation" class="border rounded px-3 py-2">
                <option :value="1">운영중</option>
                <option :value="0">운영종료</option>
            </select>
        </div>

        <div class="flex justify-end gap-2 mt-4">
            <button class="border rounded px-4 py-2" @click="emit('cancel')">취소</button>
            <button class="bg-blue-500 text-white rounded px-4 py-2" @click="submitForm">저장</button>
        </div>
    </div>
</template>

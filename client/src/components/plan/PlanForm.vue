<script setup>
import { reactive } from 'vue';

const props = defineProps({
    surveyNo: Number
});

const form = reactive({
    plan_title: '',
    plan_content: '',
    file: null
});

const handleFile = (e) => {
    form.file = e.target.files;
};

const submit = async () => {
    try {
        const loginUser = JSON.parse(localStorage.getItem('user'));
        const writerNo = loginUser?.user_no;

        const resp = await fetch('/api/plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                survey_no: props.surveyNo,
                plan_title: form.plan_title,
                plan_content: form.plan_content,
                writer_no: writerNo
            })
        });

        const text = await resp.text();
        const data = text ? JSON.parse(text) : {};

        if (resp.ok) {
            alert('지원계획 저장 및 승인요청이 완료되었습니다.');
            form.plan_title = '';
            form.plan_content = '';
            form.file = null;
        } else {
            alert(data.message || '저장에 실패했습니다.');
        }
    } catch (err) {
        console.error(err);
        alert('에러 발생');
    }
};
</script>

<template>
    <div class="p-6 bg-slate-100 min-h-screen">
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
            <h2 class="text-lg font-bold mb-4 border-b pb-2">지원계획 입력</h2>

            <div class="mb-4">
                <label class="block mb-1 text-sm">제목</label>
                <input type="text" v-model="form.plan_title" class="w-full border rounded px-3 py-2 bg-gray-100" />
            </div>

            <div class="mb-4">
                <label class="block mb-1 border-t pt-2 text-sm">내용</label>
                <textarea v-model="form.plan_content" class="w-full border rounded px-3 py-2 bg-gray-100 h-32"></textarea>
            </div>

            <div class="mb-6 flex border-t pt-2 items-center gap-3">
                <input type="file" multiple @change="handleFile" />
            </div>

            <div class="text-right">
                <button @click="submit" class="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-full">승인요청</button>
            </div>
        </div>
    </div>
</template>

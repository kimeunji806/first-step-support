<script setup>
defineProps({
    detail: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="p-4 border rounded">
        <h3 class="text-lg font-semibold mb-4">기관 상세정보</h3>

        <div class="grid gap-2">
            <div><strong>기관명:</strong> {{ detail.name }}</div>
            <div><strong>사업자번호:</strong> {{ detail.business_number }}</div>
            <div><strong>대표번호:</strong> {{ detail.tel }}</div>
            <div><strong>주소:</strong> {{ detail.address }}</div>
            <div><strong>이메일:</strong> {{ detail.email }}</div>
            <div><strong>운영여부:</strong> {{ Number(detail.operation) === 1 ? '운영중' : '운영종료' }}</div>
        </div>
    </div>
</template>

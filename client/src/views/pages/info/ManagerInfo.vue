<script setup>
import { ref, onBeforeMount } from 'vue';

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const managerList = ref([]);
const selectedUser = ref(null);
const ins_no = userStore.institution;


const managerFetch = async (ins_no) => {
  const resp = await fetch(`/api/managerList/${ins_no}`);
  const data = await resp.json();
  managerList.value = data;

  if (data.length > 0) {
    selectedUser.value = data[0]; // 첫 값 자동 선택
  }
};

// 클릭 시 상세 변경
const selectUser = (user) => {
  selectedUser.value = user;
};

onBeforeMount(() => {
  managerFetch(ins_no);
});
</script>

<template>
  <div class="flex h-screen">

    <!-- 좌측 담당자 목록 -->
    <div class="w-64 bg-green-100 p-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-semibold">담당자 목록</h3>
        <span class="text-sm text-gray-500">총 {{ managerList.length }}명</span>
      </div>

      <!-- 리스트 -->
      <div
        v-for="user in managerList"
        :key="user.user_id"
        class="flex justify-between items-center p-3 border-b cursor-pointer hover:bg-green-200"
        @click="selectUser(user)"
      >
        <span>{{ user.name }}</span>
        <span class="text-gray-400">›</span>
      </div>

      <!-- 버튼 -->
      <button class="mt-4 w-full bg-green-400 text-white py-2 rounded-full">
        기관담당자 등록
      </button>
    </div>

    <!-- 우측 상세 정보 -->
    <div class="flex-1 bg-gray-100 p-10">
      <div class="bg-white p-8 rounded-lg shadow">

        <h2 class="text-xl font-semibold mb-6">
          {{ selectedUser?.userName || '담당자 정보' }}
        </h2>

        <!-- 정보 리스트 -->
        <div class="space-y-4">

          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">아이디</span>
            <span>{{ selectedUser?.user_id }}</span>
          </div>

          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">이름</span>
            <span>{{ selectedUser?.name }}</span>
          </div>

          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">전화번호</span>
            <span>{{ selectedUser?.tel }}</span>
          </div>

          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">이메일</span>
            <span>{{ selectedUser?.email }}</span>
          </div>

          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">주소</span>
            <span>{{ selectedUser?.address }}</span>
          </div>

          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">기관</span>
            <span>{{ selectedUser?.ins }}</span>
          </div>

          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">가입일</span>
            <span>{{ selectedUser?.created_at }}</span>
          </div>

        </div>

        <!-- 버튼 -->
        <div class="flex justify-end mt-6">
          <button class="bg-green-400 text-white px-6 py-2 rounded-full">
            수정
          </button>
        </div>

      </div>
    </div>

  </div>
</template>


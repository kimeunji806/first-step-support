<script setup></script>
<template>
    <div class="card h-5/10 flex flex-col gap 4">
        <div class="overflow-y-auto">
            <div v-if="list.length === 0" class="text-center text-gray-500 py-10">등록된 상담기록이 없습니다.</div>
            <div v-else></div>
            <div v-for="(item, index) in list" :key="index" class="mb-6 border-b pb-4">
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <div class="font-semibold" :data-no="item.no">상담기록 {{ index + 1 }}</div>

                        <div class="text-sm text-gray-600">작성자 {{ item.name }} &nbsp; 작성일 {{ item.created_at }}</div>
                    </div>

                    <div class="border-t border-b py-2 mb-2">
                        <span class="mr-2 font-medium">제목</span>
                        <span v-if="!item.isEditing">{{ item.title }}</span>
                        <InputText v-if="item.isEditing" v-model="item.title" class="w-full md:w-[13rem]" />
                    </div>

                    <div class="border-b py-2 mb-2">
                        <span class="mr-2 font-medium">내용</span>
                        <span v-if="!item.isEditing">{{ item.content }}</span>
                        <InputText v-if="item.isEditing" v-model="item.content" class="w-full md:w-[13rem]" />
                    </div>

                    <div class="border-b py-2 mb-2">
                        <span class="mr-2 font-medium">첨부</span>
                        <span v-for="(filename, i) in item.filename" :key="i">
                            {{ filename }}
                        </span>
                    </div>

                    <div class="py-2">
                        <span class="mr-2 font-medium">상담일자</span>
                        <span>{{ item.counseldate }}</span>
                    </div>
                </div>
                <div class="mt-auto flex justify-end gap-2">
                    <Button type="button" class="w-24" :label="item.isEditing ? '저장' : '수정'" @click="handleClick(item)" />
                    <Button type="submit" label="삭제" class="w-24" @click="counselDelete(item)" />
                </div>
            </div>
        </div>
    </div>
</template>

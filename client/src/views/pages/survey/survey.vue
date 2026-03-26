<script setup>
import { ref, onBeforeMount } from 'vue';
const main = ref([]);
const sub = ref([]);
const question = ref([]);

const subList = async (mainNo) => {
    console.log(mainNo);
    await fetch(`/api/sub/${mainNo}`)
        .then((resp) => resp.json())
        .then((data) => {
            sub.value = data;
        })
        .catch((err) => console.log(err));
};

const questionList = async () => {
    await fetch(`/api/question/${questionNo}`)
        .then((resp) => resp.json())
        .then((data) => {
            question.value = data;
        })
        .catch((err) => console.log(err));
};

onBeforeMount(async () => {
    await fetch(`/api/main`)
        .then((resp) => resp.json())
        .then((data) => {
            main.value = data;
        })
        .catch((err) => console.log(err));
});

const main_isVisible = ref(false);
const sub_isVisible = ref(false);
</script>

<template>
    <div class="flex flex-col md:flex-row gap-8 h-screen">
        <div class="md:w-1/5 h-full">
            <div class="card h-full flex flex-col gap-4">
                <div class="font-semibold text-xl mb-4">지원서 항목</div>
                <div class="overflow-y-auto">
                    <ul v-for="value in main">
                        <li class="font-semibold text-xl mb-4" v-on:click="subList(value.main_no)">{{ value.main_title }}</li>
                    </ul>
                </div>
                <div v-if="main_isVisible">
                    <InputText type="text" id="myInput" placeholder="지원서 항목 추가" class="w-full md:w-[13rem]" v-model="content" />
                    <Button type="submit" label="저장" @click="main_isVisible = !main_isVisible" />
                </div>
                <div class="mt-auto" v-if="!main_isVisible"><Button type="submit" label="항목추가" class="w-full" @click="main_isVisible = !main_isVisible"></Button></div>
            </div>
        </div>
        <div class="md:w-1/5 h-full">
            <div class="card h-full flex flex-col gap-4">
                <div class="font-semibold text-xl mb-4">지원서 항목</div>
                <ul class="overflow-y-auto" v-for="value in sub">
                    <li class="font-semibold text-l mb-4">{{ value.sub_title }}</li>
                </ul>
                <div v-if="sub_isVisible">
                    <InputText type="text" id="myInput" placeholder="지원서 항목 추가" class="w-full md:w-[13rem]" v-model="content" />

                    <Button type="submit" label="저장" @click="sub_isVisible = !sub_isVisible" />
                </div>

                <div class="mt-auto" v-if="!sub_isVisible"><Button type="submit" label="항목추가" class="w-full" @click="sub_isVisible = !sub_isVisible"></Button></div>
            </div>
        </div>
        <div class="md:w-3/5 h-full">
            <div class="card h-full flex flex-col gap-4">
                <div class="font-semibold text-xl mb-4">지원서 항목</div>
                <div class="font-semibold text-xl mb-4">지원신청내역</div>
                <DataTable :value="question" :paginator="true" :rows="5" dataKey="id" :rowHover="true" showGridlines>
                    <!-- 못찾았을떄 -->
                    <template #empty> No customers found. </template>

                    <Column header="지원자명" style="min-width: 8rem">
                        <template #body="{ data }">
                            <div class="flex items-center gap-2">
                                <span>{{ data.beneficiaries_name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="보호자명" style="min-width: 8rem">
                        <template #body="{ data }">
                            {{ data.guardian_name }}
                        </template>
                    </Column>
                    <Column header="지원신청일" style="min-width: 10rem">
                        <template #body="{ data }">
                            <div class="flex items-center gap-2">
                                <span>{{ data.created_at }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="지원신청서" style="min-width: 8rem">
                        <template #body="{ data }">
                            <Button type="submit" label="보기" v-on:click="goToDetail(data.survey_no)" />
                        </template>
                    </Column>
                    <Column header="담당자" style="min-width: 8rem">
                        <template #body="{ data }">
                            <div class="flex items-center gap-2">
                                <span>{{ data.manager_name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="상담내역" style="min-width: 8rem">
                        <template #body="{ data }">
                            <Button type="submit" label="보기" v-on:click="goToDetail(data.survey_no)" />
                        </template>
                    </Column>
                    <Column header="우선순위" style="min-width: 8rem">
                        <template #body="{ data }">
                            <div class="flex items-center gap-2">
                                <span>{{ data.priority_id }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="계획/결과 진행" style="min-width: 8rem">
                        <template #body="{ data }">
                            <div class="flex items-center gap-2">
                                <span>NULL</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="지원계획" style="min-width: 8rem">
                        <template #body="{ data }">
                            <div class="flex items-center gap-2">
                                <Button type="submit" label="보기" v-on:click="goToDetail(data.survey_no)" />
                            </div>
                        </template>
                    </Column>
                    <Column header="지원결과" style="min-width: 8rem">
                        <template #body="{ data }">
                            <div class="flex items-center gap-2">
                                <Button type="submit" label="보기" v-on:click="goToDetail(data.survey_no)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
                <div class="flex justify-end">
                    <Button type="submit" label="항목저장" class="w-24" v-on:click="" />
                </div>

                <div class="mt-auto flex justify-end gap-2">
                    <Button type="submit" label="수정이력" class="w-24" v-on:click="" />
                    <Button type="submit" label="전체보기" class="w-24" v-on:click="" />
                    <Button type="submit" label="항목저장" class="w-24" v-on:click="" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>

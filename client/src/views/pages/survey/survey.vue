<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { ref } from 'vue';

const user_name = ref('');
const user_id = ref('');
const user_pw = ref('');
const user_pwd = ref('');
const user_email = ref('');
const user_account = ref('');
const tel = ref('');
const address = ref('');
const institution = ref('');


const checked = ref(false);
</script>

<template>
<div class="flex flex-col  md:flex-row gap-8 mt-6 h-screen ">
        <div class="md:w-1/5 ">
            <div class="card h-9/10">
                <div class="font-semibold text-xl mb-4">지원서 항목</div>
 
            </div>
        </div>
        <div class="md:w-1/5 ">
            <div class="card h-9/10">
                <div class="font-semibold text-xl mb-4">세부 항목</div>

            </div>
        </div>
        <div class="md:w-3/5">
            <div class="card h-9/10">
                <div class="font-semibold text-xl mb-4">지원 사유</div>

            </div>
        </div>
    </div>
</template>
<style scoped>
</style>

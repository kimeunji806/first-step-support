<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logoImage from '@/assets/logo/the_first_logo2.png';

const router = useRouter();

const findForm = ref({
    user_id: '',
    email: '',
    auth_code: ''
});

// 이메일 인증번호 발송(이메일 인증)
const sendCode = async () => {
    try {
        const res = await fetch('/api/mail', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: findForm.value.email,
                user_id: findForm.value.user_id
            })
        });
        const data = await res.json();

        if (data.retCode === 'OK') {
            alert('인증번호가 발송되었습니다.');
            startTimer();
        } else {
            alert('메일 발송 실패');
        }
    } catch (err) {
        console.log(err);
    }
};

// 타이머
const timer = ref(180);
let interval = null;
const startTimer = () => {
    timer.value = 180;

    clearInterval(interval);
    interval = setInterval(() => {
        timer.value--;

        if (timer.value <= 0) {
            clearInterval(interval);
            alert('인증시간이 만료되었습니다.');
        }
    }, 1000);
};

// 인증 완료(인증하기)
const verifyAuthCode = () => {};

const goToResetPassword = () => {
    router.push('/sing/reset-password');
};

const goToFindId = () => {
    router.push('/sing/find-Id');
};

const goToRegister = () => {
    router.push('/sign/register');
};

const goToLogin = () => {
    router.push('/sign/login');
};
</script>

<template>
    <div class="flex h-screen m-0">
        <!-- 왼쪽: 로고 영역 -->
        <div class="flex-1 flex flex-col items-center justify-center bg-yellow-50 gap-4">
            <img :src="logoImage" alt="The_first 로고" class="w-72 max-w-4/5 object-contain" />
        </div>

        <!-- 오른쪽: 폼 영역 -->
        <div class="flex-1 flex items-center justify-center bg-white">
            <div class="w-96 xl:w-[480px] flex flex-col gap-5">
                <h2 class="text-2xl font-bold text-center text-surface-800">비밀번호 찾기</h2>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold text-surface-700">아이디</label>
                    <InputText v-model="findForm.user_id" placeholder="아이디를 입력하세요" size="large" fluid />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold text-surface-700">이메일</label>
                    <InputGroup>
                        <InputText v-model="findForm.email" placeholder="이메일을 입력하세요" size="large" />
                        <Button label="인증하기" severity="success" size="large" class="font-bold auth-btn" @click="sendCode" />
                    </InputGroup>
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-semibold text-surface-700">인증번호</label>

                    <InputGroup>
                        <InputText v-model="findForm.auth_code" placeholder="인증번호를 입력하세요" size="large" class="pr-20" />
                        <InputGroupAddon class="timer-addon">
                            <span>03:00</span>
                        </InputGroupAddon>
                        <Button label="확인하기" severity="success" size="large" class="font-bold auth-btn" @click="verifyAuthCode" />
                    </InputGroup>
                    <span class="text-red-500 text-sm">* 이메일 인증을 진행해주세요.</span>
                </div>
                <div class="flex justify-end items-center gap-2 text-sm">
                    <span class="link-text" @click="goToFindId">아이디 찾기</span>
                    <Divider layout="vertical" class="!mx-0 !h-3" />
                    <span class="link-text" @click="goToRegister">회원가입</span>
                    <Divider layout="vertical" class="!mx-0 !h-3" />
                    <span class="link-text" @click="goToLogin">로그인</span>
                </div>
                <Button label="이메일 인증" severity="success" size="large" fluid class="font-bold" @click="goToResetPassword" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.auth-btn {
    width: 100px !important;
    flex-shrink: 0;
}

.timer-addon {
    background: transparent !important;
    border-left: none !important;
    border-right: none !important;
    color: #22c55e;
    font-weight: 600;
}

.p-inputgroup .p-inputtext {
    border-right: none !important;
}

.p-inputgroup .p-button {
    border-left: none !important;
}

.link-text {
    cursor: pointer;
    color: var(--p-text-muted-color);
    font-weight: 500;
}
.link-text:hover {
    color: var(--p-green-500);
    text-decoration: underline;
}
</style>

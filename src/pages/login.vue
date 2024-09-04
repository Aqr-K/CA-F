<template>
    <template v-if="backgroundImageUrl">
        <div class="absolute inset-0">
            <VImg :src="backgroundImageUrl" class="w-full h-full" cover position="center top" @load="handleImageLoad">
                <template #placeholder>
                    <VSkeletonLoader v-if="!isImageLoaded" class="object-cover" />
                </template>
                <div class="absolute inset-0"
                    style="background-image: linear-gradient(rgba(45, 55, 72, 33%) 0%, rgb(26, 32, 46) 100%)" />
            </VImg>
        </div>
    </template>

    <div class="main d-flex justify-center align-center">
        <v-card class="v-theme--dark px-7 py-3 rounded-lg" :class="{ 'opacity-85': isImageLoaded }" min-width="380"
            max-width="380">
            <v-card-text>
                <v-form @submit.prevent="login">>
                    <div class="d-flex justify-center align-center">
                        <img src="@/assets/logo.png" class="logo" />
                        <div class="text-2xl title font-weight-semibold text-uppercase">Cloud Asst</div>
                    </div>

                    <v-text-field v-model="form.username" label="用户名" required class="my-5"></v-text-field>

                    <v-text-field v-model="form.password" label="密码" :type="showPassword ? 'text' : 'password'"
                        :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                        @click:append-inner="showPassword = !showPassword" />

                    <v-btn type="submit" color="primary" block :loading="loading" class="my-8">
                        登录
                    </v-btn>
                    <div v-if="errorMessage" class="text-error mt-2 text-shadow">
                        {{ errorMessage }}
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import api from '@/api';
import { SaveResponse } from '@/api/types';

// 表单
const form = ref({
    username: '',
    password: '',
})
const loading = ref(false);
const showPassword = ref(false);  // 控制密码显示与隐藏

const authStore = useAuthStore();
const router = useRouter();
// 背景图片
const backgroundImageUrl = ref('')
// Interval定时器
let intervalTimer: NodeJS.Timeout | null = null

// 背景图片加载状态
const isImageLoaded = ref(false)
const errorMessage = ref("")

// 登录获取token事件
function login() {
    errorMessage.value = ''

    // 进行表单校验
    if (!form.value.username || !form.value.password) {
        errorMessage.value = '请输入完整信息'
        return
    }
    // 用户名密码
    const formData = new FormData()

    formData.append('username', form.value.username)
    formData.append('password', form.value.password)

    // 请求token
    api
        .post('/login/access-token', formData, {
            headers: {
                Accept: 'application/json', // 设置 Accept 类型
            },
        })
        .then((response: any) => {
            // 获取token
            const token = response.access_token
            const userName = response.user_name
            authStore.token = token
            authStore.user = userName
            router.push("/")
        })
        .catch((error: any) => {
            // 登录失败，显示错误提示
            if (!error.response) errorMessage.value = '登录失败，请检查网络连接'
            else if (error.response.status === 401) errorMessage.value = '登录失败，请检查用户名、密码是否正确'
            else if (error.response.status === 403) errorMessage.value = '登录失败，您没有权限访问'
            else if (error.response.status === 500) errorMessage.value = '登录失败，服务器错误'
            else errorMessage.value = `登录失败 ${error.response.status}，请检查用户名、密码是否正确`
        })
}


// 获取背景图片
async function fetchBackgroundImage() {
    try {
        const data: SaveResponse = await api.get('/login/wallpapers')
        if (data.success) {
            backgroundImageUrl.value = data.message
        }
    } catch (e) {
        console.log(e)
    }
}

// 监听 backgroundImageUrl 的变化
watch(backgroundImageUrl, () => {
    isImageLoaded.value = false;
});

// 当图片加载完成时调用
function handleImageLoad() {
    isImageLoaded.value = true;
}

// 在 beforeMount 钩子中初始化认证状态
onMounted(async () => {
    if (authStore.token) {
        router.push('/')
    } else {
        // 获取背景图片
        await fetchBackgroundImage()
        // 每隔5秒更换一次背景图片
        intervalTimer = setInterval(fetchBackgroundImage, 10000)
    }
});
onUnmounted(() => {
    if (intervalTimer) clearInterval(intervalTimer)
})
</script>
<style scoped>
.main {
    width: 100%;
    /* 宽度撑满父容器 */
    height: 100%;
    /* 高度撑满父容器 */
}

.logo {
    width: 3.5rem;
    object-fit: contain;
}

.title {
    padding: 1rem;
}
</style>
<template>
    <div>
        <!-- 其他内容 -->

        <v-snackbar v-model="isShow" :timeout="snackbarTimeout" :color="isSuccess ? '#D4EDDA' : '#F8D7DA'"
            :text-color="isSuccess ? '#155724' : '#6C2325'">
            <span class="text-[15px]">
                {{ snackbarMessage }}
            </span>
            <template v-slot:action="{ attrs }">
                <v-btn color="black" text v-bind="attrs" @click="closeSnackBar">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isShow = ref(false)
const snackbarMessage = ref('')
const snackbarTimeout = ref(3000)
const isSuccess = ref(false)

const showSnackBar = (status = true, message, timeout = 3000) => {
    snackbarMessage.value = message
    snackbarTimeout.value = timeout
    isSuccess.value = status
    isShow.value = true
}

const closeSnackBar = () => {
    isShow.value = false
}
// 将需要在模板中使用的变量和方法暴露出去
defineExpose({
    showSnackBar
})
</script>
<template>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const showToast = (isSuccess, message) => {
    const path = '/some/path'; // 示例路径
    const fullMessage = `${path} ${message}`;

    if (isSuccess) {
        toast.success(fullMessage, {
            position: 'bottom',
            duration: 2000,
        });
    } else {
        toast.error(fullMessage, {
            position: 'bottom',
            duration: 2000,
        });
    }
};

</script>

<style></style>
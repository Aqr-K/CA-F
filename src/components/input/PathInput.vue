<template>
    <VPathList @update:modelValue="updatePath">
        <template #activator="{ menuprops }">
            <VTextField v-model="selectedPath" v-bind="menuprops" variant="underlined" :label="label" />
        </template>
    </VPathList>
</template>

<script setup lang="ts" name="PathInput">
import { ref } from 'vue'
const selectedPath = ref("")

import { defineProps } from 'vue'

const props = defineProps({
    label: {
        type: String,
        required: true
    }
})


// 定义触发的自定义事件
const emit = defineEmits(['close', 'changed', 'update:modelValue'])


const path = defineModel('path')

// 路径更新
function updatePath(value: string) {
    selectedPath.value = value
    emit('update:modelValue', value)
    path.value = value
}
</script>

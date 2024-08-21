<template>
    <VPathList v-model="path" @update:modelValue="updatePath">
        <template #activator="{ menuprops }">
            <VTextField v-model="props.modelValue" @input="handleInput" v-bind="menuprops" variant="underlined"
                :label="label" />
        </template>
    </VPathList>
</template>

<script setup lang="ts" name="PathInput">
import { ref } from 'vue'


// 输入参数
const props = defineProps({
    type: String, // download/library
    label: {
        type: String,
        required: true
    },
    modelValue: {
        type: String,
        required: true, // 必填参数
    },
})
const path = ref(props.modelValue)

// 定义触发的自定义事件
const emit = defineEmits(['close', 'changed', 'update:modelValue', 'update:directory'])


// const path = defineModel('path')

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}

// 路径更新
function updatePath(value: string) {
    emit('update:modelValue', value)
    // path.value = value
}
</script>

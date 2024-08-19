<template>
    <v-menu :close-on-content-click="false" content-class="cursor-default">
        <template v-slot:activator="{ props }">
            <slot name="activator" :menuprops="props" />
        </template>
        <VTreeview v-model:activated="activedDirs" v-model:opened="openedDirs" :items="treeItems" class="tree-node"
            :load-children="fetchDirs" item-key="path" item-title="name" item-value="path" item-type="unknown"
            activatable return-object max-height="20rem" expand-icon="mdi-folder" collapse-icon="mdi-folder-open">
        </VTreeview>
    </v-menu>
</template>
<script setup lang="ts">
import api from '@/api'

// 输入变量为默认路径
const props = defineProps({
    root: {
        type: String,
        default: '',
    }
})

// update:modelValue 事件
const emit = defineEmits(['update:modelValue'])

// 激活的目录
const activedDirs = ref<string[]>([])

// 打开的目录
const openedDirs = ref<string[]>([])

// 目录列表
const treeItems = ref([])

async function fetchDirs(item: any) {
    return api
        .get('/local/listdir?path=' + item.path)
        .then((data: any) => {
            item.children.push(...data)
        })
        .catch(err => console.warn(err))
}

async function initialDirs() {
    let data = await api.get('/local/listdir?path=/')
    treeItems.value = data
}

// 获取选择的目录路径
const selectedPath = computed(() => {
    if (activedDirs.value.length > 0) {
        return activedDirs.value[0]
    }
    return ''
})

// 监听目录变化
watch(activedDirs, newVal => {

    if (!newVal.length) return
    emit('update:modelValue', selectedPath.value)
})

onMounted(() => {
    initialDirs()
})
</script>

<style scoped>
.tree-node .v-list-item--active {
    background: rgba(var(--v-theme-tree-node-active), 0.5) !important;
    color: #6593ED !important;
}
</style>
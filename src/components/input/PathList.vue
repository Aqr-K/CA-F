<template>
    <v-menu :close-on-content-click="false" content-class="cursor-default">
        <template v-slot:activator="{ props }">
            <slot name="activator" :menuprops="props" />
        </template>
        <VTreeview v-model:activated="activedDirs" v-model:opened="openedDirs" :items="treeItems" class="tree-node"
            :load-children="fetchDirs" item-key="path" item-title="name" item-value="path" item-type="unknown"
            activatable return-object max-height="20rem" expand-icon="mdi-folder" collapse-icon="mdi-folder-open">
            <template v-slot:prepend="{ item, isOpen }">
                <v-icon v-if="item.file">
                    {{ files[item.file] }}
                </v-icon>
            </template>
        </VTreeview>
    </v-menu>
</template>
<script setup lang="ts">
import api from '@/api'

// 输入变量为默认路径
const props = defineProps({
    modelValue: {
        type: String,
        default: '/',
    },
    //是否需要罗列文件
    fileRequired: {
        type: Boolean,
        require: false,
        default: false
    },
    //是否需要罗列文件
    currentDir: {
        type: String,
        require: false,
        default: "/",
    },
})

const files = ref({
    html: 'mdi-language-html5',
    js: 'mdi-nodejs',
    json: 'mdi-code-json',
    md: 'mdi-language-markdown',
    pdf: 'mdi-file-pdf-box',
    jpg: 'mdi-file-image',
    jpeg: 'mdi-file-image',
    png: 'mdi-file-image',
    gif: 'mdi-file-image',
    bmp: 'mdi-file-image',
    svg: 'mdi-file-image',
    py: 'mdi-file-document-outline',
    strm: 'mdi-file-document-outline',
    txt: 'mdi-file-document-outline',
    nfo: 'mdi-file-document-outline',
    xls: 'mdi-file-excel',
    xlsx: 'mdi-file-excel',
    doc: 'mdi-file-word',
    docx: 'mdi-file-word',
    ppt: 'mdi-file-powerpoint',
    pptx: 'mdi-file-powerpoint',
    zip: 'mdi-file-zip',
    rar: 'mdi-file-zip',
    '7z': 'mdi-file-zip',
    mp3: 'mdi-music',
    wav: 'mdi-music',
    mp4: 'mdi-video',
    mov: 'mdi-video',
    avi: 'mdi-video',
    mkv: 'mdi-video',
    flv: 'mdi-video',
    webm: 'mdi-video',
});
// update:modelValue 事件
const emit = defineEmits(['update:modelValue', 'update:currentDir'])

// 激活的目录
const activedDirs = ref<string[]>([])

// 打开的目录
const openedDirs = ref<string[]>([])

// 目录列表
const treeItems = ref([])

async function fetchDirs(item: any) {
    return api
        .get(props.fileRequired ? '/local/listfile?path=' + item.path : '/local/listdir?path=' + item.path)
        .then((data: any) => {
            item.children.push(...data)
        })
        .catch(err => console.warn(err))
}

async function initialDirs() {
    let data: [] = await api.get(props.fileRequired ? '/local/listfile?path=' + props.currentDir : '/local/listdir?path=' + props.currentDir);
    treeItems.value = data
    // let data = await api.get('/local/listdir?path=' + (props.modelValue ? props.modelValue : '/'));
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

const { currentDir } = toRefs(props);
// 监听目录变化
watch(currentDir, newVal => {
    initialDirs()
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
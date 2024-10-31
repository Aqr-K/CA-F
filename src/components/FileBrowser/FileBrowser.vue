<template>
    <div v-if="!isLoading" class="file-browser">
        <v-card class="mx-auto">
            <v-toolbar>
                <template v-for="(segment, index) in pathSegments" :key="index">
                    <VBtn v-if="display.mdAndUp.value || index === 0" variant="text"
                        :input-value="index === pathSegments.length - 1" class="px-1" style="height: inherit;"
                        color="on-primary" @click="changePath(segment, index)">
                        <VIcon v-if="segment.path === '/'" icon=" mdi-folder-multiple-outline" class="mx-3" size="24" />
                        <VIcon v-else icon=" mdi-chevron-right" />
                        {{ segment.name }}
                    </VBtn>
                </template>
                <div class="flex-grow-1"></div>
                <!-- <VTooltip text="调整排序">
                    <template #activator="{ props }">
                        <IconBtn v-bind="props" @click="changeSort">
                            <VIcon :icon="sortIcon" />
                        </IconBtn>
                    </template>
                </VTooltip> -->
                <VTooltip text="返回上一级" v-if="pathSegments.length > 1">
                    <template #activator="{ props }">
                        <IconBtn v-bind="props" @click="goUp">
                            <VIcon icon="mdi-arrow-up-bold-outline" />
                        </IconBtn>
                    </template>
                </VTooltip>
                <VDialog v-model="newFolderPopper" max-width="50rem">
                    <template #activator="{ props }">
                        <IconBtn v-bind="props">
                            <VTooltip text="新建文件夹">
                                <template #activator="{ props: _props }">
                                    <VIcon v-bind="_props" icon="mdi-folder-plus-outline" />
                                </template>
                            </VTooltip>
                        </IconBtn>
                    </template>
                    <VCard title="新建文件夹">
                        <DialogCloseBtn @click="newFolderPopper = false" />
                        <VDivider />
                        <VCardText>
                            <VTextField v-model="newFolderName" label="名称" />
                        </VCardText>
                        <VCardActions>
                            <div class="flex-grow-1" />
                            <VBtn :disabled="!newFolderName" variant="elevated" @click="mkdir" prepend-icon="mdi-check"
                                class="px-5 me-3">
                                新建
                            </VBtn>
                        </VCardActions>
                    </VCard>
                </VDialog>
            </v-toolbar>
            <v-divider />
            <v-toolbar class="batch-toolbar" style="border-radius: 5px;">
                <IconBtn @click="refresh">
                    <VIcon color="primary"> mdi-refresh </VIcon>
                </IconBtn>
                <VSpacer />
                <IconBtn @click="changeSelectMode">
                    <VIcon color="primary" v-if="selectMode"> mdi-selection-remove </VIcon>
                    <VIcon color="primary" v-else>mdi-select</VIcon>
                </IconBtn>
                <span v-if="selected.length > 0">
                    <IconBtn @click.stop="batchScrape">
                        <VIcon color="primary" icon="mdi-auto-fix" />
                    </IconBtn>
                    <IconBtn @click.stop="showBatchTransfer">
                        <VIcon color="primary" icon="mdi-folder-arrow-right" />
                    </IconBtn>
                    <IconBtn @click.stop="batchDelete">
                        <VIcon icon="mdi-delete-outline" color="error" />
                    </IconBtn>
                </span>
            </v-toolbar>
            <!-- 文件列表 -->
            <v-virtual-scroll :items="treeItems" :style="scrollStyle" :key="virtualScrollKey">
                <template #default="{ item }">
                    <VHover>
                        <template #default="hover">
                            <VListItem v-bind="hover.props" class="px-[1rem] pe-1" @click="listItemClick(item)">
                                <template #prepend>
                                    <VListItemAction v-if="selectMode">
                                        <VCheckbox v-model="selected" :value="item" />
                                    </VListItemAction>
                                    <template v-else>
                                        <VIcon v-if="FileIconVar && item.extension"
                                            :icon="FileIconVar[item.extension.toLowerCase()] || FileIconVar?.other" />
                                        <VIcon v-else icon="mdi-folder" />
                                    </template>
                                </template>
                                <VListItemTitle v-text="item.name" />
                                <VListItemSubtitle v-if="item.size">
                                    {{ formatBytes(item.size) }}
                                </VListItemSubtitle>
                                <template #append>
                                    <IconBtn v-if="display.smAndDown.value && !selectMode">
                                        <VIcon icon="mdi-dots-vertical" />
                                        <VMenu activator="parent" close-on-content-click>
                                            <VList>
                                                <template v-for="(menu, i) in dropdownItems" :key="i">
                                                    <VListItem v-if="menu.show" variant="plain"
                                                        :base-color="menu.props.color" @click="menu.props.click(item)">
                                                        <template #prepend>
                                                            <VIcon :icon="menu.props.prependIcon" />
                                                        </template>
                                                        <VListItemTitle v-text="menu.title" />
                                                    </VListItem>
                                                </template>
                                            </VList>
                                        </VMenu>
                                    </IconBtn>
                                    <span v-if="hover.isHovering && display.mdAndUp.value && !selectMode" class="flex">
                                        <VTooltip text="识别">
                                            <template #activator="{ props }">
                                                <IconBtn v-bind="props" @click.stop="recognize(item.path)">
                                                    <VIcon icon="mdi-text-recognition" />
                                                </IconBtn>
                                            </template>
                                        </VTooltip>
                                        <VTooltip text="刮削">
                                            <template #activator="{ props }">
                                                <IconBtn v-bind="props" @click.stop="scrape(item)">
                                                    <VIcon icon="mdi-auto-fix" />
                                                </IconBtn>
                                            </template>
                                        </VTooltip>
                                        <VTooltip text="重命名">
                                            <template #activator="{ props }">
                                                <IconBtn v-bind="props" @click.stop="showRename(item)">
                                                    <VIcon icon="mdi-rename" />
                                                </IconBtn>
                                            </template>
                                        </VTooltip>
                                        <VTooltip text="整理">
                                            <template #activator="{ props }">
                                                <IconBtn v-bind="props" @click.stop="showTransfer(item)">
                                                    <VIcon icon="mdi-folder-arrow-right" />
                                                </IconBtn>
                                            </template>
                                        </VTooltip>
                                        <VTooltip text="删除">
                                            <template #activator="{ props }">
                                                <IconBtn v-bind="props" @click.stop="deleteItem(item, true)">
                                                    <VIcon icon="mdi-delete-outline" color="error" />
                                                </IconBtn>
                                            </template>
                                        </VTooltip>
                                    </span>
                                </template>
                            </VListItem>
                        </template>
                    </VHover>
                </template>
            </v-virtual-scroll>
        </v-card>
        <VDialog v-if="renamePopper" v-model="renamePopper" max-width="50rem">
            <VCard title="重命名">
                <DialogCloseBtn @click="renamePopper = false" />
                <VDivider />
                <VCardText>
                    <VRow>
                        <VCol cols="12">
                            <VTextField v-model="newName" label="新名称" :loading="renameLoading" />
                        </VCol>

                    </VRow>
                </VCardText>
                <VCardActions>
                    <VBtn :disabled="!newName" variant="elevated" @click="rename" prepend-icon="mdi-check"
                        class="px-5 me-3">
                        确定
                    </VBtn>
                </VCardActions>
            </VCard>
        </VDialog>
        <FileTransferDialog v-if="transferPopper" v-model="transferPopper" :items="transferItems"
            @close="transferPopper = false" />
        <ProgressDialog v-if="progressDialog" v-model="progressDialog" :text="progressText" :value="progressValue" />
        <!-- 识别结果对话框 -->
        <VDialog v-if="nameTestDialog" v-model="nameTestDialog" width="50rem">
            <VCard>
                <DialogCloseBtn @click="nameTestDialog = false" />
                <VCardItem>
                    <MediaInfoCard :context="nameTestResult" />
                </VCardItem>
            </VCard>
        </VDialog>
    </div>
</template>
<script setup lang="ts">
import api from '@/api'
import { useDisplay } from 'vuetify';
import { FileIconVar } from '@/api/variable';
import { formatBytes } from '@/@core/utils/formatters';
import { useConfirm } from 'vuetify-use-dialog'
import { useToast } from 'vue-toast-notification'
import { FileItem } from '@/api/types';
import FileTransferDialog from '@/components/Dialog/FileTransferDialog.vue';
import DialogCloseBtn from '@/components/Dialog/DialogCloseBtn.vue'
import ProgressDialog from '@/components/Dialog/ProgressDialog.vue';
import MediaInfoCard from '@/components/Card/MediaInfoCard.vue';
import { MediaInfo } from '@/api/types';
import { SaveResponse } from '@/api/types';
import { log } from 'console';
const display = useDisplay()

// 目录列表
const treeItems = ref([])
const virtualScrollKey = ref(0)


const pathSegment: FileItem = {
    name: "根目录",
    path: "/",
    type: "dir",
    size: 0,
    extension: "",
    children: [],
}


const pathSegments = ref<FileItem[]>([pathSegment])

// 确认框
const createConfirm = useConfirm()

// 提示框
const $toast = useToast()

// 是否选择模式
const selectMode = ref(false)

// 是否正在加载
const isLoading = ref(true)

// 重命名loading
const renameLoading = ref(false)

// 识别进度条
const progressDialog = ref(false)

// 识别进度文本
const progressText = ref('请稍候 ...')

// 识别进度
const progressValue = ref(0)

// 内容列表
const items = ref<FileItem[]>([])

// 过滤条件
const filter = ref('')

// 重命名弹窗
const renamePopper = ref(false)

// 整理弹窗
const transferPopper = ref(false)

// 新名称
const newName = ref('')

// 当前操作项
const currentItem = ref<FileItem>()

// 选中的项目
const selected = ref<FileItem[]>([])

// 定义 MediaInfo 类型
interface nameTestResultType {
    media_info: MediaInfo;
    new_filename: string;
}

// 识别结果
const nameTestResult = ref<nameTestResultType>()

// 识别结果对话框
const nameTestDialog = ref(false)

// 监视 nameTestDialog 的变化
watch(nameTestDialog, (newValue) => {
    if (!newValue) {
        // 如果为 false，则清空 nameTestResult
        nameTestResult.value = undefined; // 或者可以设置为 { media_info: { title: "", year: "", resolution: "" }, new_filename: "" }
    }
});


// 弹出菜单
const dropdownItems = ref<{ [key: string]: any }[]>([
    {
        title: '识别',
        value: 1,
        show: true,
        props: {
            prependIcon: 'mdi-text-recognition',
            click: (_item: FileItem) => {
                recognize(_item.path || '')
            },
        },
    },
    {
        title: '刮削',
        value: 2,
        show: true,
        props: {
            prependIcon: 'mdi-auto-fix',
            click: (_item: FileItem) => {
                scrape(_item)
            },
        },
    },
    {
        title: '重命名',
        value: 3,
        show: true,
        props: {
            prependIcon: 'mdi-rename',
            click: showRename,
        },
    },
    {
        title: '整理',
        value: 4,
        show: true,
        props: {
            prependIcon: 'mdi-folder-arrow-right',
            click: showTransfer,
        },
    },
    {
        title: '删除',
        value: 5,
        show: true,
        props: {
            prependIcon: 'mdi-delete-outline',
            color: 'error',
            click: deleteItem,
        },
    },
])



// 需要整理的文件项
const transferItems = ref<FileItem[]>([])


// 新建文件夹名称
const newFolderPopper = ref(false)

// 新建文件名称
const newFolderName = ref('')

// 排序方式
const sort = ref('name')

// 调整排序方式
function changeSort() {
    if (sort.value === 'name') sort.value = 'time'
    else sort.value = 'name'
}


// 返回上一级
function goUp() {
    const segments = pathSegments.value ?? []
    changePath(segments[segments.length - 2], segments.length - 2)
}

// 调整选择模式
function changeSelectMode() {
    selectMode.value = !selectMode.value
    if (!selectMode.value) selected.value = []
}
// 调用API识别
async function recognize(path: string) {
    try {
        // 显示进度条
        progressDialog.value = true
        progressText.value = `正在识别: ${path.split('/').pop()} ...`
        progressValue.value = 0

        try {
            nameTestResult.value = await api.get('media/recognize_file', {
                params: {
                    path,
                },
            })
        }
        catch (e) {
            console.log(e);
        }
        // 关闭进度条
        progressDialog.value = false
        if (!nameTestResult.value) $toast.error(`${path} 识别失败！`)
        nameTestDialog.value = !!nameTestResult.value?.media_info?.title
    } catch (error) {
        console.error(error)
    }
}

// 调用API刮削


function scrape(item: FileItem) {

}


function showRename(item: FileItem) {
    currentItem.value = item
    newName.value = item.name
    renamePopper.value = true
}

function rename() {
    if (currentItem.value.name == newName.value) {
        console.log("名称没有发生更改");
    }
    else {
        api.get("/local/rename", {
            params: {
                path: currentItem.value.path,
                new_name: newName.value
            }
        })
        refresh()
    }
    renamePopper.value = false;
}

function showTransfer(item: FileItem) {
    transferItems.value = [item]
    transferPopper.value = true
}


async function deleteItem(item: FileItem, confirm: boolean) {
    if (confirm) {
        const confirmed = await createConfirm({
            title: '确认',
            content: `是否确认删除${item.type === 'dir' ? '目录' : '文件'} ${item.name}？`,
        })
        if (!confirmed) return
    }
    try {
        api.get("/local/delete", {
            params: {
                path: item.path,
            }
        })
        refresh();
    }
    catch (error) {
        console.log(error);
    }
}

async function batchScrape() {
}

// 显示批量整理对话框
function showBatchTransfer() {
    transferItems.value = selected.value
    transferPopper.value = true
}


// 批量删除
async function batchDelete() {
    const confirmed = await createConfirm({
        title: '确认',
        content: `是否确认删除选中的 ${selected.value.length} 个项目？`,
    })

    if (!confirmed) return

    // 显示进度条
    progressDialog.value = true
    progressValue.value = 0

    // 删除选中的项目
    selected.value.every(async item => {
        progressText.value = `正在删除 ${item.name} ...`
        await deleteItem(item, false)
    })
    // 关闭进度条
    progressDialog.value = false

    // 重新加载
    refresh()
}


function changePath(item: FileItem, index: number) {
    fetchFiles(item);
    pathSegments.value.splice(index + 1); // 从 index + 1 开始删除所有后续元素
}

// 使用 computed 创建 lastSegment
const lastSegment = computed(() => {
    return pathSegments.value[pathSegments.value.length - 1];
});


// 创建目录
async function mkdir() {
    try {
        api.get("/local/mkdir", {
            params: {
                path: `${lastSegment.value.path}/${newFolderName.value}`,
            }
        })
    }
    catch (error) {
        console.log(error);
    }
    newFolderPopper.value = false
    newFolderName.value = ''
    refresh()
}


// 点击列表项
function listItemClick(item: FileItem) {
    if (item.type === "file") {
        return
    }
    if (selectMode.value) {
        if (selected.value.includes(item)) {
            selected.value = selected.value.filter(i => i !== item)
        } else {
            selected.value.push(item)
        }
        // 去重
        selected.value = Array.from(new Set(selected.value))
        return false
    }
    fetchFiles(item)
    console.log(item);
    for (let i = 0; i < pathSegments.value.length; i++) {
        console.log(pathSegments.value[i]);
    }

    if (!pathSegments.value.includes(item)) {
        pathSegments.value.push(item)
    }
}


async function fetchFiles(item: any) {
    try {
        const data: any = await api.get('/local/listfile?path=' + item.path)
        treeItems.value = data
        // 强制虚拟滚动组件重新渲染
        nextTick(() => {
            virtualScrollKey.value++
        })
    } catch (err) {
        console.warn(err)
    }
}


function refresh() {
    if (pathSegments.value.length > 0) {
        fetchFiles(pathSegments.value[pathSegments.value.length - 1])
    }
    else {
        fetchFiles(pathSegment)
    }
    // 强制虚拟滚动组件重新渲染
    nextTick(() => {
        virtualScrollKey.value++
    })
}

async function initialDirs() {
    try {
        let response: SaveResponse = await api.get('/local/initial_dirs');
        treeItems.value = response.data.files
        for (let i = 0; i < response.data.segments.length; i++) {
            pathSegments.value.push(response.data.segments[i])
        }
        isLoading.value = false
    }
    catch (error) {
        console.log(error);
    }
}
// 大小控制
const scrollStyle = ref<string>('height: calc(100vh - 14.5rem - env(safe-area-inset-bottom)')
// 计算排序图标
const sortIcon = computed(() => {
    if (sort.value === 'time') return 'mdi-sort-clock-ascending-outline'
    else return 'mdi-sort-alphabetical-ascending'
})
onMounted(() => {
    initialDirs()
})
</script>

<style lang="scss" scoped>
.v-list-item {
    min-height: 3.5rem !important;
    padding-top: 4px !important;
    padding-bottom: 4px !important;
}

.v-list-item__prepend {
    color: #496ece !important;
}

.v-card {
    block-size: 100%;
    padding: 0 !important;
}

.v-list-item-action {
    margin-right: 0.75rem;
}
</style>
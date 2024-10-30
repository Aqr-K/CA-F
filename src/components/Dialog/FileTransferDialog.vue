<template>
    <VDialog scrollable max-width="50rem" :fullscreen="!display.mdAndUp.value">
        <VCard :title="dialogTitle" class="rounded-t">
            <DialogCloseBtn @click="emit('close')" />
            <v-divider></v-divider>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="8">
                            <VCombobox v-if="useLibrary" v-model="transferForm.dest_dir" :items="targetDirectories"
                                label="目的路径" placeholder="留空自动" hint="整理目的路径，留空将自动匹配" persistent-hint />
                            <VPathInput v-else label="目的路径" v-model="transferForm.dest_dir" currentDir="/"
                                hint="整理目的路径，留空将自动匹配" />
                        </v-col>
                        <v-col v-if="props.storage == 'local'" cols="12" md="4">
                            <VSelect v-model="transferForm.transfer_type" label="整理方式" :items="[
                                { title: '默认', value: '' },
                                { title: '移动', value: 'move' },
                                { title: '复制', value: 'copy' },
                                { title: '硬链接', value: 'link' },
                                { title: '软链接', value: 'symlink' },
                            ]" hint="文件操作整理方式" persistent-hint />
                        </v-col>
                    </v-row>
                    <VRow>
                        <VCol cols="12" md="4">
                            <VSelect v-model="transferForm.media_type" label="类型" :items="[
                                { title: '自动', value: '' },
                                { title: '电影', value: 'movie' },
                                { title: '电视剧', value: 'tv' },
                            ]" hint="文件媒体类型" persistent-hint />
                        </VCol>
                        <VCol cols="12" md="4">
                            <VTextField v-if="mediaSource === 'themoviedb'" v-model="transferForm.tmdbid"
                                :disabled="transferForm.media_type === ''" label="TheMovieDb编号" placeholder="留空自动识别"
                                :rules="[numberValidator]" append-inner-icon="mdi-magnify" hint="按名称查询媒体编号，留空自动识别"
                                persistent-hint @click:append-inner="mediaSelectorDialog = true" />
                            <VTextField v-else v-model="transferForm.doubanid"
                                :disabled="transferForm.media_type === ''" label="豆瓣编号" placeholder="留空自动识别"
                                :rules="[numberValidator]" append-inner-icon="mdi-magnify" hint="按名称查询媒体编号，留空自动识别"
                                persistent-hint @click:append-inner="mediaSelectorDialog = true" />
                        </VCol>
                        <VCol cols="12" md="4">
                            <VSelect v-show="transferForm.media_type === 'tv'" v-model.number="transferForm.season"
                                label="季" :items="seasonItems" hint="指定季数" persistent-hint />
                        </VCol>
                    </VRow>
                    <VRow v-if="transferForm.media_type === 'tv'">
                        <VCol cols="12" md="8">
                            <VTextField v-model="transferForm.episode_format" label="集数定位" placeholder="使用{ep}定位集数"
                                hint="使用{ep}定位文件名中的集数部分以辅助识别" persistent-hint />
                        </VCol>
                        <VCol cols="12" md="4">
                            <VTextField v-model="transferForm.episode_part" label="指定Part" placeholder="如part1"
                                hint="指定Part，如part1" persistent-hint />
                        </VCol>
                        <VCol cols="12" md="6">
                            <VTextField v-model="transferForm.episode_detail" label="指定集数" placeholder="起始集,终止集，如1或1,2"
                                hint="指定集数或范围，如1或1,2" persistent-hint />
                        </VCol>
                        <VCol cols="12" md="6">
                            <VTextField v-model.number="transferForm.episode_offset" label="集数偏移" placeholder="如-10"
                                hint="集数偏移运算，如-9或+9" persistent-hint />
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="12" md="8">
                            <VTextField v-model="transferForm.suffix" label="自定义后缀" hint="指定整理后的文件名后缀,如指定制作组为ADWeb"
                                persistent-hint />
                        </VCol>
                        <VCol cols="12" md="4">
                            <VTextField v-model.number="transferForm.min_filesize" label="文件大小（MB）"
                                :rules="[numberValidator]" placeholder="0" hint="只整理大于指定值的文件" persistent-hint />
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="12" md="4">
                            <VSwitch v-model="transferForm.scrape" label="刮削元数据" hint="整理完成后自动刮削元数据" persistent-hint />
                        </VCol>
                        <VCol cols="12" md="4">
                            <VSwitch v-model="transferForm.auto_category" label="自动分类" hint="自动进行二级分类"
                                persistent-hint />
                        </VCol>
                        <VCol cols="12" md="4">
                            <VSwitch v-model="useLibrary" label="选择媒体库" hint="开启后目的路径会显示媒体文件夹列表" persistent-hint />
                        </VCol>
                    </VRow>
                </v-form>
            </v-card-text>
            <VCardActions class="pt-3">
                <VSpacer />
                <VBtn variant="elevated" @click="transfer" prepend-icon="mdi-arrow-right-bold" class="px-5"> 开始整理
                </VBtn>
            </VCardActions>
        </VCard>
        <VDialog v-model="mediaSelectorDialog" width="40rem" scrollable max-height="85vh">
            <MediaIdSelector v-if="mediaSource === 'themoviedb'" v-model:mediaId="transferForm.tmdbid"
                @close="mediaSelectorDialog = false" :type="mediaSource" :mediaType="transferForm.media_type" />
            <MediaIdSelector v-else v-model:mediaId="transferForm.doubanid" @close="mediaSelectorDialog = false"
                :type="mediaSource" />
        </VDialog>
    </VDialog>
</template>

<script lang="ts" setup>
import api from '@/api';
import { useDisplay } from 'vuetify'
import { FileItem } from '@/api/types';
import { MediaDirectory } from '@/api/types';
import MediaIdSelector from '@/components/Selector/MediaIdSelector.vue';
import DialogCloseBtn from '@/components/Dialog/DialogCloseBtn.vue';
import { numberValidator } from '@/@core/@validators'
import { useToast } from 'vue-toast-notification';

const $toast = useToast()

const useLibrary = ref(true)

const display = useDisplay()
// 定义事件
const emit = defineEmits(['done', 'close'])

// 输入参数
const props = defineProps({
    storage: {
        type: String,
        default: () => 'local',
    },
    history_ids: Array<number>, //整理历史记录里的项id
    items: Array<FileItem>,
    target: String,
})
// 标题
const dialogTitle = computed(() => {
    if (props.items) {
        if (props.items.length > 1) return `整理 - 共 ${props.items.length} 项`
        return `整理 - ${props.items[0].path}`
    } else if (props.history_ids) {
        return `整理 - 共 ${props.history_ids.length} 项`
    }
    return '手动整理'
})

// 表单
const transferForm = reactive({
    dest_dir: props.target ?? "",
    tmdbid: null,
    doubanid: null,
    season: null,
    media_type: '',
    transfer_type: '',
    episode_format: '',
    episode_detail: '',
    episode_part: '',
    episode_offset: null,
    min_filesize: 0,
    suffix: "",
    scrape: true,
    auto_category: true,
})

// 生成1到100季的下拉框选项
const seasonItems = ref(
    Array.from({ length: 101 }, (_, i) => i).map(item => ({
        title: `第 ${item} 季`,
        value: item,
    })),
)


// 当前识别类型
const mediaSource = ref('themoviedb')

// TMDB选择对话框
const mediaSelectorDialog = ref(false)

// 所有媒体库目录
const libraryDirectories = ref<MediaDirectory[]>([])

// 目的目录下拉框
const targetDirectories = computed(() => {
    const directories = libraryDirectories.value.map(item => item.path)
    return [...new Set(directories)]
})


// 整理文件
async function transfer() {
    if (!props.history_ids && !props.items) return
    // 文件整理
    if (props.items) {
        await handleTransfer(props.items)
    }
    // 历史记录整理
    if (props.history_ids) {
        handleTransferLog(props.history_ids)
    }
    emit('close')
}

// 整理文件
async function handleTransfer(items: FileItem[]) {
    try {
        const result: { [key: string]: any } = await api.post('transfer/manual', { items: items, history_ids: null, transferForm: transferForm, })
        // 关闭当前对话框
        $toast.success("已添加整理任务")
    } catch (e) {
        console.log(e)
    }
}

// 整理日志
async function handleTransferLog(history_ids: number[]) {
    try {
        const result: { [key: string]: any } = await api.post('transfer/manual', { items: null, history_ids: history_ids, transferForm: transferForm })
        $toast.success("已添加整理任务")

    } catch (e) {
        console.log(e)
    }
}
// 查询媒体库目录
async function loadLibraryDirectories() {
    try {
        const response: any = await api.get('system/settings/media_directory')
        // console.log(response);
        libraryDirectories.value = response
    } catch (error) {
        console.log(error)
    }
}
onMounted(() => {
    loadLibraryDirectories()
});
</script>

<style></style>
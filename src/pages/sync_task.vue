<template>
    <div v-if="currentConfig.id">
        <v-card class="px-5 mb-5" title="目录配置">
            <v-row class="p-5">
                <v-col cols="7">
                    <v-select label="选择配置" :items="selects" v-model="selectedConfig"
                        @update:modelValue="handleConfigChange"></v-select>
                </v-col>
                <v-col cols="7">
                    <VPathInput label="选择文件夹" v-model="currentConfig.media_dir" :currentDir="initialMediaDir" />
                </v-col>
            </v-row>
        </v-card>
        <v-card class="px-5 mb-5" title="同步功能">
            <v-row class="p-5">
                <v-col cols="7">
                    <v-row>
                        <v-col v-for="(swite, index) in switches" cols="12" md="6">
                            <v-switch :label="swite.label" v-model="currentConfig[swite.key]"
                                class="p-0 m-0"></v-switch>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col v-for="item in configList" cols="7">
                    <v-select v-if="'options' in item" :id="item.label" :label="item.label" :items="item.options"
                        v-model="currentConfig[item.key]"></v-select>
                    <v-text-field
                        v-else-if="typeof currentConfig[item.key] === 'string' || typeof currentConfig[item.key] === 'number'"
                        :id="item.label" :label="item.label" v-model="currentConfig[item.key]"></v-text-field>
                </v-col>
            </v-row>
        </v-card>
        <div class="btn-settings">
            <v-btn @click="startTask">开始同步</v-btn>
        </div>
    </div>
    <SnackBar ref="snackbarRef" />
</template>

<script lang="ts" setup>
import SnackBar from '@/layouts/components/SnackBar.vue'
import api from '@/api';
import { SyncItem, SaveResponse } from '@/api/types';
import { SyncItemVar } from '@/api/variable';

const snackbarRef = ref(null)
const isLoading = ref(true)
const currentConfig = ref<SyncItem>({ ...SyncItemVar })

const initialMediaDir = ref("");

const syncList = ref(<SyncItem[]>[{
    task_name: "",
}])
const selects = computed(() => {
    return syncList.value.map(item => item.task_name);
});
const selectedConfig = ref(syncList[0])

const switches = ref([{ key: "symlink_creator", label: "更新软链接" },
{ key: "metadata_copyer", label: "更新元数据" },
{ key: "metadata_covered", label: "元数据覆盖" },
{ key: "metadata_skipped", label: "元数据跳过" },
{ key: "symlink_dir_checker", label: "无效文件夹" },
{ key: "symlink_checker", label: "无效软链接" },
{ key: "metadata_checker", label: "无效元数据" },])

const configList = ref([
    { key: "metadata_copyer_mode", label: "元数据模式", options: ["下载模式", "本地模式"] },
    { key: "num_threads", label: "同步线程数", value: 2 }
])

async function fetchSyncConfig() {
    try {
        const data: SyncItem[] = await api.get(`/autosymlink/sync_list`)
        syncList.value = data
        currentConfig.value = syncList.value[0]
        selectedConfig.value = currentConfig.value.task_name
        initialMediaDir.value = currentConfig.value.media_dir
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function startTask() {
    try {
        const response: SaveResponse = await api.post(`/autosymlink/start_task`, currentConfig.value)
        snackbarRef.value?.showSnackBar(response.success, response.message)

    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

//根据template找到对应的配置
function handleConfigChange(name) {
    const config = syncList.value.find(item => item.task_name === name);

    if (config) {
        //深度复制,取消响应式
        currentConfig.value = JSON.parse(JSON.stringify(config));
        initialMediaDir.value = currentConfig.value.media_dir
    } else {
        console.log('Template config not found');
    }
}

onMounted(fetchSyncConfig);
</script>

<style scoped>
:deep(.v-field__input) {
    color: rgba(var(--v-theme-input-grey)) !important;
}
</style>
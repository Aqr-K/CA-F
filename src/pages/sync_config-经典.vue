<template>
    <div v-if="configList.length > 0">
        <v-card v-for="config in configList" class="pl-5 mb-5" style="width: auto;">
            <v-card-item class="pt-3 justify-start category">
                <span class="text-[25px] font-bold">{{ config.title }}</span>
            </v-card-item>
            <v-card-text class="pt-3 justify-start settings">
                <v-form>
                    <v-row>
                        <v-col v-for="item in config.items" cols="7">
                            <div class="flex items-center flex-left">
                                <span v-if="typeof item.value === 'boolean'"
                                    class="text-[14px] font-bold w-[95px] text-left">
                                    {{ item.label }}：
                                </span>
                                <v-select v-if="'options' in item" :id="item.label" :label="item.label"
                                    :items="item.options" v-model="item.value"></v-select>
                                <VPathInput
                                    v-else-if="item.key === ('symlink_dir') || item.key === ('media_dir') || item.key === ('exclude_folder')"
                                    :label="item.label" v-model="item.value" />
                                <v-text-field
                                    v-else-if="typeof item.value === 'string' || typeof item.value === 'number'"
                                    :id="item.label" :label="item.label" v-model="item.value"></v-text-field>
                                <v-switch v-else-if="typeof item.value === 'boolean'" :id="item.label"
                                    v-model="item.value"></v-switch>
                            </div>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
        <div class="mb-15">
            <v-btn color="red" @click="deleteConfig">删除</v-btn>
            <span class="mx-3"></span>
            <v-btn @click="saveConfig">保存</v-btn>
        </div>
    </div>
    <SnackBar ref="snackbarRef" />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import SnackBar from '@/layouts/components/SnackBar.vue'
import api from '@/api/index'
import { SyncItem, SaveResponse } from '@/api/types';
const route = useRoute()
const { id } = route.params


const configList = ref([])

const snackbarRef = ref(null)


let syncConfigId = ""

async function fetchSyncConfig() {
    try {
        const data: SyncItem = await api.post(`/autosymlink/sync_config/${id}`)
        syncConfigId = data.id
        updateConfigList(data)

    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function saveConfig() {
    let syncConfig = {};
    for (let config of configList.value) {
        for (let item of config.items) {
            syncConfig[item.key] = item.value;
        }
    }

    syncConfig["id"] = syncConfigId
    try {
        const response: SaveResponse = await api.post(`/save_sync_config`, syncConfig)
        snackbarRef.value?.showSnackBar(response.save_status, response.message)

    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function deleteConfig() {
}

function updateConfigList(configs: SyncItem) {
    configList.value = [
        {
            title: "任务配置",
            items: [
                { key: "task_name", label: "任务名称", value: configs.task_name }
            ]
        },
        {
            title: "文件夹设置",
            items: [
                { key: "media_dir", label: "媒体目录", value: configs.media_dir },
                { key: "symlink_dir", label: "本地目录", value: configs.symlink_dir },
                { key: "exclude_folder", label: "排除目录", value: configs.exclude_folder }
            ]
        },
        {
            title: "同步开关",
            items: [
                { key: "sync_enabled", label: "同步状态", value: configs.sync_enabled },
                { key: "restart_sync_enabled", label: "重启全同步", value: configs.restart_sync_enabled }
            ]
        },
        {
            title: "同步功能",
            items: [
                { key: "symlink_creator", label: "更新软链接", value: configs.symlink_creator },
                { key: "metadata_copyer", label: "更新元数据", value: configs.metadata_copyer },
                { key: "metadata_covered", label: "元数据覆盖", value: configs.metadata_covered },
                { key: "metadata_skipped", label: "元数据跳过", value: configs.metadata_skipped },
                { key: "metadata_copyer_mode", label: "元数据模式", value: configs.metadata_copyer_mode, options: ["下载模式", "本地模式"] },
                { key: "num_threads", label: "同步线程数", value: configs.num_threads }
            ]
        },
        {
            title: "清除功能",
            items: [
                { key: "symlink_dir_checker", label: "无效文件夹", value: configs.symlink_dir_checker },
                { key: "symlink_checker", label: "无效软链接", value: configs.symlink_checker },
                { key: "metadata_checker", label: "无效元数据", value: configs.metadata_checker }
            ]
        },
        {
            title: "定时任务",
            items: [
                { key: "sync_scheduled", label: "定时同步", value: configs.sync_scheduled },
                { key: "sync_time", label: "同步时间", value: configs.sync_time },
                { key: "backup_scheduled", label: "定时备份", value: configs.backup_scheduled },
                { key: "backup_time", label: "备份时间", value: configs.backup_time },
                { key: "backup_ext", label: "备份后缀名", value: configs.backup_ext }
            ]
        },
        {
            title: "实时监控",
            items: [
                { key: "observer_enabled", label: "实时监控", value: configs.observer_enabled },
                { key: "observer_symlink_creator", label: "更新软链接", value: configs.observer_symlink_creator },
                { key: "observer_metadata_copyer", label: "复制元数据", value: configs.observer_metadata_copyer },
                { key: "observer_symlink_checker", label: "删除软链接", value: configs.observer_symlink_checker },
                { key: "observer_metadata_checker", label: "删除元数据", value: configs.observer_metadata_checker }
            ]
        },
        {
            title: "软链接配置",
            items: [
                { key: "symlink_mode", label: "软链接模式", value: configs.symlink_mode, options: ["symlink", "strm"] },
                { key: "strm_mode", label: "strm模式", value: configs.strm_mode, options: ["cloud", "local"] },
                { key: "symlink_size", label: "软链接大小", value: configs.symlink_size },
                { key: "cloud_type", label: "挂载类型", value: configs.cloud_type, options: ["cd2", "alist"] },
                { key: "cloud_url", label: "云端地址", value: configs.cloud_url },
                { key: "clouddrive2_path", label: "cd2根目录", value: configs.clouddrive2_path },
                { key: "alist_path", label: "alist根目录", value: configs.alist_path }
            ]
        },
        {
            title: "同步后缀名",
            items: [
                { key: "symlink_ext", label: "软链接后缀", value: configs.symlink_ext },
                { key: "metadata_ext", label: "元数据后缀", value: configs.metadata_ext }
            ]
        }
    ];

}
onMounted(fetchSyncConfig)

</script>

<style scoped></style>
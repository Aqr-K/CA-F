<template>
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
                            <v-text-field v-else-if="typeof item.value === 'string' || typeof item.value === 'number'"
                                :id="item.label" :label="item.label" v-model="item.value"></v-text-field>
                            <v-switch v-else-if="typeof item.value === 'boolean'" :id="item.label"
                                v-model="item.value"></v-switch>
                        </div>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const { id } = route.params

import api from '@/api'

const configList = ref([])

async function fetchSyncConfig() {
    try {
        const response = await api.post(`/sync_config/${id}`)
        updateConfigList(response.sync_config)
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

function updateConfigList(configs: any[]) {
    configList.value = [
        {
            title: "任务配置",
            items: [
                { label: "任务名称", value: configs.task_name }
            ]
        },
        {
            title: "文件夹设置",
            items: [
                { label: "媒体目录", value: configs.media_dir },
                { label: "本地目录", value: configs.symlink_dir },
                { label: "排除目录", value: configs.exclude_folder }
            ]
        },
        {
            title: "同步开关",
            items: [
                { label: "同步状态", value: configs.sync_enabled },
                { label: "重启全同步", value: configs.restart_sync_enabled }
            ]
        },
        {
            title: "同步功能",
            items: [
                { label: "更新软链接", value: configs.symlink_creator },
                { label: "更新元数据", value: configs.metadata_copyer },
                { label: "元数据覆盖", value: configs.metadata_covered },
                { label: "元数据跳过", value: configs.metadata_skipped },
                { label: "元数据模式", value: configs.metadata_copyer_mode, options: ["下载模式", "本地模式"] },
                { label: "同步线程数", value: configs.num_threads }
            ]
        },
        {
            title: "清除功能",
            items: [
                { label: "无效文件夹", value: configs.symlink_dir_checker },
                { label: "无效软链接", value: configs.symlink_checker },
                { label: "无效元数据", value: configs.metadata_checker }
            ]
        },
        {
            title: "定时任务",
            items: [
                { label: "定时同步", value: configs.sync_scheduled },
                { label: "同步时间", value: configs.sync_time },
                { label: "定时备份", value: configs.backup_scheduled },
                { label: "备份时间", value: configs.backup_time },
                { label: "备份后缀名", value: configs.backup_ext }
            ]
        },
        {
            title: "实时监控",
            items: [
                { label: "实时监控", value: configs.observer_enabled },
                { label: "更新软链接", value: configs.observer_symlink_creator },
                { label: "复制元数据", value: configs.observer_metadata_copyer },
                { label: "删除软链接", value: configs.observer_symlink_checker },
                { label: "删除元数据", value: configs.observer_metadata_checker }
            ]
        },
        {
            title: "软链接配置",
            items: [
                { label: "软链接模式", value: configs.symlink_mode },
                { label: "strm模式", value: configs.strm_mode },
                { label: "软链接大小", value: configs.symlink_size },
                { label: "挂载类型", value: configs.cloud_type },
                { label: "云端地址", value: configs.cloud_url },
                { label: "cd2根目录", value: configs.clouddrive2_path },
                { label: "alist根目录", value: configs.alist_path }
            ]
        },
        {
            title: "同步后缀名",
            items: [
                { label: "软链接后缀", value: configs.symlink_ext },
                { label: "元数据后缀", value: configs.metadata_ext }
            ]
        }
    ];

}

onMounted(fetchSyncConfig)

</script>

<style scoped></style>
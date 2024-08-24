<template>
    <div v-if="configList.length > 0">
        <v-card v-for="config in configList" class="px-5 mb-5" style="width: auto;">
            <v-card-item class="pt-3 justify-start">
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
            <v-btn @click="saveConfig">保存</v-btn>
        </div>
    </div>
    <SnackBar ref="snackbarRef" />
</template>

<script lang="ts" setup>
import SnackBar from '@/layouts/components/SnackBar.vue'
import api from '@/api';

const snackbarRef = ref(null)


const configList = ref([
    {
        title: "任务配置",
        items: [
            { key: "task_name", label: "任务名称", value: "" }
        ]
    },
    {
        title: "文件夹设置",
        items: [
            { key: "media_dir", label: "媒体目录", value: "" },
            { key: "symlink_dir", label: "本地目录", value: "" },
            { key: "exclude_folder", label: "排除目录", value: "" }
        ]
    },
    {
        title: "同步功能",
        items: [
            { key: "symlink_creator", label: "更新软链接", value: false },
            { key: "metadata_copyer", label: "更新元数据", value: false },
            { key: "metadata_covered", label: "元数据覆盖", value: false },
            { key: "metadata_skipped", label: "元数据跳过", value: false },
            { key: "metadata_copyer_mode", label: "元数据模式", value: "下载模式", options: ["下载模式", "本地模式"] },
            { key: "num_threads", label: "同步线程数", value: 2 }
        ]
    },
    {
        title: "清除功能",
        items: [
            { key: "symlink_dir_checker", label: "无效文件夹", value: false },
            { key: "symlink_checker", label: "无效软链接", value: false },
            { key: "metadata_checker", label: "无效元数据", value: false }
        ]
    },
    {
        title: "定时任务",
        items: [
            { key: "sync_scheduled", label: "定时同步", value: false },
            { key: "sync_time", label: "同步时间", value: "30 2 * * *" },
            { key: "backup_scheduled", label: "定时备份", value: false },
            { key: "backup_time", label: "备份时间", value: "30 2 * * *" },
            { key: "backup_ext", label: "备份后缀名", value: "*.*" }
        ]
    },
    {
        title: "实时监控",
        items: [
            { key: "observer_enabled", label: "实时监控", value: false },
            { key: "observer_symlink_creator", label: "更新软链接", value: false },
            { key: "observer_metadata_copyer", label: "复制元数据", value: false },
            { key: "observer_symlink_checker", label: "删除软链接", value: false },
            { key: "observer_metadata_checker", label: "删除元数据", value: false }
        ]
    },
    {
        title: "软链接配置",
        items: [
            { key: "symlink_mode", label: "软链接模式", value: "symlink", options: ["symlink", "strm"] },
            { key: "strm_mode", label: "strm模式", value: "cloud", options: ["cloud", "local"] },
            { key: "symlink_size", label: "软链接大小", value: 0 },
            { key: "cloud_type", label: "挂载类型", value: "cd2", options: ["cd2", "alist"] },
            { key: "cloud_url", label: "云端地址", value: "ip:19798" },
            { key: "clouddrive2_path", label: "cd2根目录", value: "", placeholder: "你添加的网盘的上级目录" },
            { key: "alist_path", label: "alist根目录", value: "", placeholder: "alist通过webdav添加后生成的文件夹的上级目录" }
        ]
    },
    {
        title: "同步后缀名",
        items: [
            { key: "symlink_ext", label: "软链接后缀", value: "" },
            { key: "metadata_ext", label: "元数据后缀", value: "" }
        ]
    }
])

async function saveConfig() {
    let syncConfig = {};
    for (let config of configList.value) {
        for (let item of config.items) {
            syncConfig[item.key] = item.value;
        }
    }

    try {
        const response = await api.post(`/autosymlink/save_sync_config`, syncConfig)
        snackbarRef.value?.showSnackBar(response.success, response.message)

    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}


</script>

<style scoped>
:deep(.v-field__input) {
    color: rgba(var(--v-theme-input-grey)) !important;
}
</style>
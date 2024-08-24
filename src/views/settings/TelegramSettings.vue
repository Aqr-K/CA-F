<template>
    <div v-if="configList.length > 0">
        <v-form>
            <v-card v-for="config in configList" class="px-5 mb-5" style="width: auto;">
                <v-card-item class="pt-3 justify-start category my-5">
                    <span class="text-[25px] font-bold">{{ config.title }}</span>
                </v-card-item>
                <v-row>
                    <v-col v-for="item in config.items" cols="7" class="pb-10 ml-2">
                        <div class="flex items-center flex-left">
                            <v-select v-if="'options' in item" :id="item.label" :label="item.label"
                                :items="item.options" v-model="settings[item.key]"></v-select>
                            <VPathInput v-else-if="item.key === ('backup_dir')" :label="item.label"
                                v-model="settings[item.key]" />
                            <v-text-field
                                v-else-if="typeof settings[item.key] === 'string' || typeof settings[item.key] === 'number'"
                                :id="item.label" :label="item.label" v-model="settings[item.key]"></v-text-field>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
            <div class="mb-15">
                <v-btn color="red" @click="deleteConfig">删除</v-btn>
                <span class="mx-3"></span>
                <v-btn @click="saveConfig">保存</v-btn>
            </div>
        </v-form>

    </div>
    <SnackBar ref="snackbarRef" />
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import SnackBar from '@/layouts/components/SnackBar.vue'
import api from '@/api/index'
import { TelegramSettings, SaveResponse } from '@/api/types';
const route = useRoute()

const configList = ref([{
    title: "通知工具",
    items: [
        { key: "switch", label: "延时启动" },
        { key: "bot_token", label: "备份文件夹" },
        { key: "chat_id", label: "http代理" },
        { key: "user_id", label: "备份文件夹" },
        { key: "admin_id", label: "http代理" },
    ]
},
{
    title: "推送设置",
    items: [
        { key: "observer_started", label: "监控状态" },
        { key: "observer_enabled", label: "监控事件" },
        { key: "cloud_watcher_enabled", label: "转存监控" },
        { key: "sync_completed", label: "同步完成" },
        { key: "backup_completed", label: "备份完成" },
        { key: "cloud_path_unmount", label: "掉盘通知" },
        { key: "filetrans_enbaled", label: "刮削完成" },
    ]
}
])


const snackbarRef = ref(null)

const settings = ref(<TelegramSettings>{
    switch: false,
    bot_token: "",
    chat_id: "",
    user_id: "",
    admin_id: "",
    observer_started: false,
    observer_enabled: false,
    cloud_watcher_enabled: false,
    sync_completed: false,
    backup_completed: false,
    cloud_path_unmount: false,
    filetrans_enbaled: false
})


async function fetchSyncConfig() {
    try {
        const response = await api.get('/system/settings/' + 'notify_config')
        console.log(response)
        updateConfigList(response.telegram)
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function saveConfig() {
    try {
        let data = { settings: settings.value, name: "notify_config" }
        const response: SaveResponse = await api.post(`/system/save_settings`, data)
        snackbarRef.value?.showSnackBar(response.success, response.message)

    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function deleteConfig() {
}

function updateConfigList(configs: TelegramSettings) {
    settings.value = configs
}
onMounted(fetchSyncConfig)

</script>

<style scoped></style>
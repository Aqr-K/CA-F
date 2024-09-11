<template>
    <div v-if="!isLoading">
        <v-form>
            <v-row>
                <v-col cols="12">
                    <v-card :title="normalSettings.title">
                        <v-switch label="启用通知" v-model="settings.switch" class="ml-3"></v-switch>
                        <v-row class="pb-5 px-3">
                            <v-col v-for="item in normalSettings.items" cols="12" md="6" class="mb-5">
                                <v-text-field :id="item.label" :label="item.label" v-model="settings[item.key]"
                                    :hint="item.hint" persistent-hint></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card :title="notifyTypes.title">
                        <v-row class="pb-5">
                            <v-col v-for="item in notifyTypes.items" cols="12" sm="4" md="3" lg="2" class="ml-5">
                                <v-switch :label="item.label" v-model="settings[item.key]"></v-switch>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <div class="btn-settings">
                <v-btn @click="saveConfig">保存</v-btn>
            </div>
        </v-form>
    </div>
    <SnackBar ref="snackbarRef" />
</template>

<script lang="ts" setup>
import SnackBar from '@/layouts/components/SnackBar.vue'
import api from '@/api/index'
import { TelegramSettings, SaveResponse } from '@/api/types';
const isLoading = ref(true)

const normalSettings = ref({
    title: "通知工具",
    items: [
        {
            key: "bot_token", label: "Bot Token", hint: "Telegram机器人token，格式：789598:EGV-KOI56ghOkP-adx57W2v1u598ew1"
        },
        {
            key: "chat_id", label: "Chat ID", hint: "接受消息通知的用户、群组或频道Chat ID"
        },
        { key: "user_id", label: "用户白名单", hint: "可使用Telegram机器人的用户ID清单，多个用户用,分隔，不填写则所有用户都能使用" },
        { key: "admin_id", label: "管理员白名单", hint: "可使用管理菜单及命令的用户ID列表，多个ID使用,分隔" },
    ]
})

const notifyTypes = ref({
    title: "推送设置",
    items: [
        { key: "symlink_observer", label: "监控状态" },
        { key: "observer_enabled", label: "监控事件" },
        { key: "cloud_wathcer", label: "转存监控" },
        { key: "sync_task", label: "同步完成" },
        { key: "backup_task", label: "备份完成" },
        { key: "cloud_status", label: "掉盘通知" },
        { key: "filetrans_enbaled", label: "刮削完成" },
    ]
})


const snackbarRef = ref(null)

const settings = ref(<TelegramSettings>{
    switch: false,
    bot_token: "",
    chat_id: "",
    user_id: "",
    admin_id: "",
    symlink_watcher: false,
    cloud_wathcer: false,
    sync_task: false,
    backup_task: false,
    cloud_status: false,
    filetrans_task: false
})



// 定义类型
interface NotificationOption {
    telegram: TelegramSettings
}


async function fetchSyncConfig() {
    try {
        const response: NotificationOption = await api.get('/system/settings/' + 'notify_config')
        updateConfigList(response.telegram)
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function saveConfig() {
    try {
        let data = { settings: { telegram: settings.value }, name: "notify_config" }
        const response: SaveResponse = await api.post(`/system/save_settings`, data)
        snackbarRef.value?.showSnackBar(response.success, response.message)

    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}


function updateConfigList(configs: TelegramSettings) {
    settings.value = configs
}
onMounted(fetchSyncConfig)

</script>

<style scoped></style>
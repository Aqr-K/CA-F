<template>
    <div v-if="!isLoading">
        <v-form>
            <v-card class="px-5 mb-5" title="常用设置">
                <v-row>
                    <v-col cols="12" class="pb-5 ml-3">
                        <div class="flex items-center flex-left">
                            <v-text-field v-model="settings.start_delay" label="延时启动" />
                        </div>
                    </v-col>
                    <v-col cols="12" class="pb-5 ml-3">
                        <VPathInput v-model="settings.backup_dir" label="备份文件夹" />
                    </v-col>
                    <v-col cols="12" class="pb-5 ml-3">
                        <v-text-field v-model="settings.http_proxy" label="http代理" />
                    </v-col>
                    <v-col cols="12" class="pb-5 ml-3">
                        <v-switch v-model="settings.debug_mode" label="调试模式" />
                    </v-col>
                </v-row>
            </v-card>
            <v-card class="px-5 mb-5" title="登录设置">
                <v-row>
                    <v-col cols="12" class="pb-5 ml-3">
                        <v-text-field v-model="settings.username" label="用户名" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="pb-5 ml-3">
                        <v-text-field v-model="settings.password" label="密码" type="password" />
                    </v-col>
                </v-row>
            </v-card>
            <div class="btn-settings">
                <v-btn @click="saveConfig">保存</v-btn>
            </div>
        </v-form>

    </div>
</template>

<script lang="ts" setup name="GlobalSettings">
import api from '@/api/index'
import { GlobalSettings, SaveResponse } from '@/api/types';
const isLoading = ref(true)
import { useToast } from 'vue-toast-notification';
const $toast = useToast();
// 定义每个设置项的类型
interface SettingItem {
    key: string;
    label?: string;
    switches?: SettingItem[]; // 可选属性，用于包含开关项
    options?: string[];
}

// 定义每个配置组的类型
interface ConfigGroup {
    title: string;
    items: SettingItem[];
}

const settings = ref(<GlobalSettings>{
    start_delay: 0,
    debug_mode: false,
    config_file_watcher: false,
    backup_dir: "",
    username: "",
    password: "",
    http_proxy: "",
})


async function fetchSyncConfig() {
    try {
        const response: GlobalSettings = await api.get('/system/settings/' + 'global_settings')
        updateConfigList(response)
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function saveConfig() {
    try {
        let data = { settings: settings.value, name: "global_settings" }
        const response: SaveResponse = await api.post(`/system/save_settings`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.success) {
            $toast.success(response.message);
        } else {
            $toast.error(response.message);
        }

    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}


function updateConfigList(configs: GlobalSettings) {
    settings.value = configs
}
onMounted(fetchSyncConfig)

</script>

<style scoped></style>
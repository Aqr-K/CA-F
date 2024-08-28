<template>
    <div v-if="!isLoading">
        <v-form>
            <v-card v-for="config in configList" class="px-5 mb-5" :title="config.title">
                <v-row>
                    <v-col v-for="item in config.items" cols="12" class="pb-10 ml-2">
                        <div class="flex items-center flex-left">
                            <v-select v-if="'options' in item" :id="item.label" :label="item.label"
                                :items="item.options" v-model="settings[item.key]"></v-select>
                            <VPathInput v-else-if="item.key === ('backup_dir')" :label="item.label"
                                v-model="settings[item.key]" />
                            <v-text-field
                                v-else-if="typeof settings[item.key] === 'string' || typeof settings[item.key] === 'number'"
                                :id="item.label" :label="item.label" v-model="settings[item.key]"
                                :type="item.key === 'password' ? 'password' : 'text'"></v-text-field>
                            <v-row v-else-if="item.key == 'switch_group'">
                                <v-col v-for="(swite, index) in item.switches" cols="12" sm="6" md="4" lg="4">
                                    <v-switch :label="swite.label" v-model="settings[swite.key]"></v-switch>
                                </v-col>
                            </v-row>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
            <div class="btn-settings">
                <v-btn @click="saveConfig">保存</v-btn>
            </div>
        </v-form>

    </div>
    <SnackBar ref="snackbarRef" />
</template>

<script lang="ts" setup name="GlobalSettings">
import { useRoute } from 'vue-router'
import SnackBar from '@/layouts/components/SnackBar.vue'
import api from '@/api/index'
import { GlobalSettings, SaveResponse } from '@/api/types';
import { title } from 'process';
const isLoading = ref(true)

const configList = ref([{
    title: "常用设置",
    items: [
        { key: "start_delay", label: "延时启动" },
        { key: "backup_dir", label: "备份文件夹" },
        { key: "http_proxy", label: "http代理" },
        {
            key: "switch_group", switches: [{ key: "debug_mode", label: "调试模式" },
            ]
        },

    ]
},
{
    title: "登录设置",
    items: [
        { key: "username", label: "用户名" },
        { key: "password", label: "密码" },
    ]
}])

const snackbarRef = ref(null)

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
        snackbarRef.value?.showSnackBar(response.success, response.message)

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
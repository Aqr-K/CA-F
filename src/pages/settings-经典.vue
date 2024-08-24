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
                    <v-col cols="7" class="pb-10">
                        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-1 ml-3">
                            <div v-for="(swite, index) in switches" class="flex items-center flex-left">
                                <span class="text-[14px] font-bold w-[95px] text-left">
                                    {{ swite.label }}
                                </span>
                                <v-switch v-model="settings[swite.key]"></v-switch>
                            </div>
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

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import SnackBar from '@/layouts/components/SnackBar.vue'
import api from '@/api/index'
import { GlobalSettings, SaveResponse } from '@/api/types';
const route = useRoute()

const configList = ref([{
    title: "常用设置",
    items: [
        { key: "start_delay", label: "延时启动" },
        { key: "backup_dir", label: "备份文件夹" },
        { key: "http_proxy", label: "http代理" },
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

const switches = ref([
    { key: "debug_mode", label: "调试模式", value: settings.value.debug_mode },
    { key: "config_file_watcher", label: "配置监测", value: settings.value.config_file_watcher },
])


async function fetchSyncConfig() {
    try {
        const data: GlobalSettings = await api.get(`/system/global_settings`)
        updateConfigList(data)
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function saveConfig() {
    try {
        const response: SaveResponse = await api.post(`/system/save_global_settings`, settings.value)
        snackbarRef.value?.showSnackBar(response.success, response.message)

    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function deleteConfig() {
}

function updateConfigList(configs: GlobalSettings) {
    settings.value = configs
}
onMounted(fetchSyncConfig)

</script>

<style scoped></style>
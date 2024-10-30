<template>
    <div v-if="!isLoading">
        <v-row>
            <v-col cols="12" md="4">
                <v-card title="挂载监测">
                    <v-card-item class="mb-5">
                        <VSwitch v-model="settings.switch" label="启用" />
                        <VPathInput label="文件路径" v-model="settings.cloud_dir" hint="cd2挂载点路径" />
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <div class="btn-settings">
            <v-btn @click="saveConfig">保存</v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
import api from '@/api/index'
import { CloudMountWatcher, SaveResponse } from '@/api/types';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();
const isLoading = ref(true)

const settings = ref<CloudMountWatcher>(
    { switch: false, cloud_dir: "" }
)

async function fetchSyncConfig() {
    try {
        const response: CloudMountWatcher = await api.get('/system/settings/' + 'cloud_mount_watcher')
        settings.value = response
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function saveConfig() {
    try {
        let data = { settings: settings.value, name: "cloud_mount_watcher" }
        const response: SaveResponse = await api.post(`/system/save_settings`, data)
        if (response.success) {
            $toast.success(response.message);
        } else {
            $toast.error(response.message);
        }
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}


onMounted(fetchSyncConfig)

</script>

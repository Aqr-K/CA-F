<template>
    <v-row>
        <v-col cols="12" md="6" v-for="item in syncList" :key="item.id" class="my-5">
            <v-card class="py-5 pr-5">
                <v-card-item class="pt-3 justify-start task-name">
                    <RouterLink class=" text-[36px] text-[#2f94c3]"
                        :to="{ name: 'sync_config', params: { id: item.id } }">
                        <v-icon icon="mdi-cloud-sync-outline" class="mb-6"></v-icon>
                        <span class="ml-2">{{ item.task_name }}</span>
                    </RouterLink>
                </v-card-item>
                <v-card-text v-for="(dir, index) in dirs" class="text-left ml-5 p-0 truncate">
                    <span class="text-[14px] font-bold" :title="item[dir.key]">
                        {{ dir.label }}{{ item[dir.key] }}
                    </span>
                </v-card-text>
                <v-row class="ml-5">
                    <v-col v-for="(swite, index) in switches" cols="12" md="6">
                        <v-switch :label="swite.label" v-model="item[swite.key]" @input="saveConfig(item)"></v-switch>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>

</template>
<script setup lang="ts">
import { ref } from "vue"
import api from '@/api'
import { SyncList } from '@/api/types'
import { SaveResponse } from "@/api/types";
const syncList = ref<SyncList>([]);
const dirs = [{ label: '媒体目录：', key: 'media_dir' }, { label: '本地目录：', key: 'symlink_dir' }]
const switches = ref([
    { label: '实时监控', key: 'observer_enabled' },
    { label: '定时同步', key: 'sync_scheduled' },
    { label: '定时备份', key: 'backup_scheduled' },
]);

async function fetchSyncList() {
    try {
        const data: SyncList = await api.get('/autosymlink/sync_list')
        syncList.value = data

    } catch (error) {
        console.error('Error fetching sync list:', error)
    }
}

async function saveConfig(data: {}) {
    try {
        const response: SaveResponse = await api.post(`/autosymlink/save_config`, data)
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }

}

onMounted(fetchSyncList)
</script>
<style scoped>
.task-name a:hover {
    color: #44aada;
}
</style>

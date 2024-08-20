<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in syncList" :key="item.id" class="my-5">
            <v-card class="py-5">
                <v-card-item class="pt-3 justify-start task-name">
                    <RouterLink class=" text-[36px] text-[#2f94c3]"
                        :to="{ name: 'SyncConfig', params: { id: item.id } }">
                        <v-icon icon="mdi-cloud-sync-outline" class="mb-6"></v-icon>
                        <span class="ml-2">{{ item.task_name }}</span>
                    </RouterLink>
                </v-card-item>
                <v-card-text v-for="(dir, index) in dirs" class="text-left ml-5 p-0 truncate">
                    <span class="text-[14px] font-bold" :title="item[dir.key]">
                        {{ dir.label }}{{ item[dir.key] }}
                    </span>
                </v-card-text>
                <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 ml-9">
                    <div v-for="(swite, index) in switches" class="flex items-center flex-left">
                        <span class="text-[14px] font-bold w-[90px] text-left">
                            {{ swite.label }}
                        </span>
                        <v-switch v-model="item[swite.key]"></v-switch>
                    </div>
                </div>
            </v-card>
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref } from "vue"
import api from '@/api'
import { SyncList } from '@/api/types'

const syncList = ref<SyncList>([]);
const dirs = [{ label: '媒体目录：', key: 'media_dir' }, { label: '本地目录：', key: 'symlink_dir' }]
const switches = ref([
    { label: '同步状态：', key: 'sync_enabled' },
    { label: '实时监控：', key: 'observer_enabled' },
    { label: '重启全同步：', key: 'restart_sync_enabled' },
    { label: '定时同步：', key: 'sync_scheduled' },
    { label: '定时备份：', key: 'backup_scheduled' },
]);

async function fetchSyncList() {
    try {
        const data: SyncList = await api.get('/autosymlink/sync_list')
        syncList.value = data

    } catch (error) {
        console.error('Error fetching sync list:', error)
    }
}

onMounted(fetchSyncList)
</script>
<style scoped>
.task-name a:hover {
    color: #44aada;
}
</style>

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
                <v-card-text class="text-left ml-5 p-0 truncate">
                    <span class="text-[14px] font-bold" :title="item.media_dir">
                        媒体目录：{{ item.media_dir }}
                    </span>
                </v-card-text>
                <v-card-text class="text-left ml-5 p-0 truncate">
                    <span class="text-[14px] font-bold" :title="item.symlink_dir">
                        本地目录：{{ item.symlink_dir }}
                    </span>
                </v-card-text>
                <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 ml-8">
                    <div class="flex items-center flex-left">
                        <span class="text-[14px] font-bold w-[90px] text-left">
                            同步状态：
                        </span>
                        <v-switch v-model="item.sync_enabled"></v-switch>
                    </div>
                    <div class="flex items-center flex-left">
                        <span class="text-[14px] font-bold w-[90px] text-left">
                            实时监控：
                        </span>
                        <v-switch v-model="item.observer_enabled"></v-switch>
                    </div>
                    <div class="flex items-center flex-left">
                        <span class="text-[14px] font-bold w-[90px] text-left">
                            重启全同步：
                        </span>
                        <v-switch v-model="item.restart_sync_enabled"></v-switch>
                    </div>
                    <div class="flex items-center flex-left">
                        <span class="text-[14px] font-bold w-[90px] text-left">
                            定时同步：
                        </span>
                        <v-switch v-model="item.sync_scheduled"></v-switch>
                    </div>
                    <div class="flex items-center flex-left">
                        <span class="text-[14px] font-bold w-[90px] text-left">
                            定时备份：
                        </span>
                        <v-switch v-model="item.backup_scheduled"></v-switch>
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

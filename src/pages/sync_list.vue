<template>
    <draggable :list="syncList" handle=".cursor-move" delay="100" @end="orderSyncList" item-key="id" tag="v-row">
        <template #item="{ element }">
            <v-col cols="12" md="4" class="my-5">
                <v-card class="py-5 pr-5">
                    <v-card-item class="pt-3 justify-start task-name">
                        <RouterLink class="text-[36px] text-[#2f94c3]"
                            :to="{ name: 'sync_config', params: { id: element.id } }">
                            <v-icon icon="mdi-cloud-sync-outline" class="mb-6"></v-icon>
                            <span class="ml-2">{{ element.task_name }}</span>
                        </RouterLink>
                        <span class="absolute top-4 right-1">
                            <VTooltip text="同步">
                                <template #activator="{ props }">
                                    <IconBtn v-bind="props" @click.stop="startTask(element)">
                                        <VIcon icon="mdi-cloud-sync" />
                                    </IconBtn>
                                </template>
                            </VTooltip>
                            <VTooltip text="排序">
                                <template #activator="{ props }">
                                    <IconBtn>
                                        <VIcon class="cursor-move" icon="mdi-drag" />
                                    </IconBtn>
                                </template>
                            </VTooltip>
                        </span>
                    </v-card-item>
                    <v-card-text v-for="(dir, index) in dirs" :key="index" class="text-left ml-5 p-0 truncate">
                        <span class="text-[14px] font-bold" :title="element[dir.key]">
                            {{ dir.label }}{{ element[dir.key] }}
                        </span>
                    </v-card-text>
                    <v-row class="ml-5">
                        <v-col v-for="(swite, index) in switches" :key="index" cols="12" md="6">
                            <v-switch :label="swite.label" v-model="element[swite.key]"
                                @input="saveConfig(element)"></v-switch>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </template>

    </draggable>
</template>
<script setup lang="ts">
import { ref } from "vue"
import api from '@/api'
import { SyncList } from '@/api/types'
import { SaveResponse } from "@/api/types";
import { useToast } from 'vue-toast-notification';
import draggable from 'vuedraggable'
const $toast = useToast();
const drag = ref(true)
const syncList = ref<SyncList>([]);
const dirs = [{ label: '媒体目录：', key: 'media_dir' }, { label: '本地目录：', key: 'symlink_dir' }]
const switches = ref([
    { label: '实时监控', key: 'observer_enabled' },
    { label: '定时同步', key: 'sync_scheduled' },
    { label: '定时备份', key: 'backup_scheduled' },
]);

async function orderSyncList() {
    const data: SyncList = await api.post('/system/save_settings', { name: "sync_list", settings: syncList.value })
}

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


async function startTask(item) {
    try {
        const response: SaveResponse = await api.post(`/autosymlink/start_task`, item)
        if (response.success) {
            $toast.success(response.message);
        } else {
            $toast.error(response.message);
        }
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

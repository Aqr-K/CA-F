<template>
    <div v-if="settings.length > 0">
        <v-form>
            <v-row>
                <v-col cols="12" md="6" title="掉盘检测">
                    <v-card class="sync-config">
                        <v-card-item class="pt-3">
                            <v-switch label="启用检测" v-model="syncConfig.cloud_status_enabled" class="p-0 m-0"></v-switch>
                        </v-card-item>
                        <v-card-item class="pt-3 mb-6">
                            <v-select label="配置组" :items="settings" v-model="syncConfig.cloud_status_group" hint=""
                                persistent-hint></v-select>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>
        <slot name="footer"></slot>

    </div>
</template>

<script lang="ts" setup>
import { SyncItem, CloudStatus } from '@/api/types';
import { ref } from 'vue';
import api from '@/api';
const syncConfig = defineModel<SyncItem>('syncConfig');
const settings = ref([]);

async function fetchConfig() {
    try {
        const response: CloudStatus[] = await api.get('/system/settings/' + 'cloud_status')
        settings.value = response.map(item => item.name);
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}
onMounted(() => {
    fetchConfig()
});
</script>
<style></style>
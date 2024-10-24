<template>
    <div v-if="selects.length > 0">
        <v-form>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card class="sync-config" title="目录树同步" subtitle='同步模式选择 "目录树同步" 后此项生效'>
                        <v-card-item>
                            <v-select label="选择配置" :items="selects" v-model="syncConfig.settings_115" hint="选择对应的115配置"
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
import { SyncItem } from '@/api/types';
import { ref } from 'vue';
import api from '@/api';
import { Settings115, SaveResponse } from '@/api/types';
const selects = ref([])
async function fetch115Settings() {
    try {
        const response: Settings115[] = await api.get('/system/settings/' + '115_settings')
        selects.value = response.map(item => item.name);
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

const syncConfig = defineModel<SyncItem>('syncConfig');


onMounted(() => {
    fetch115Settings()
});
</script>
<style></style>
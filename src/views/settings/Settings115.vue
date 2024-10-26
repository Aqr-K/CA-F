<template>
    <div v-if="!isLoading">
        <v-card title="115设置" subtitle="用于115的目录树同步,也可与cd2的115ck保持一致,程序可以自动检测ck是否失效">
            <v-card-text>
                <draggable :list="settings" handle=".cursor-move" delay="100" item-key="id" tag="div"
                    :component-data="{ 'class': 'grid gap-3 grid-directory' }">
                    <template #item="{ element, index }">
                        <v-card color="card">
                            <v-card-title class="py-3">
                                <span class="absolute top-0 right-3">
                                    <IconBtn @click="addConfig">
                                        <v-icon icon="mdi-plus" />
                                    </IconBtn>
                                    <IconBtn @click="deleteConfig(index)">
                                        <v-icon icon="mdi-minus" />
                                    </IconBtn>
                                    <IconBtn>
                                        <VIcon class="cursor-move" icon="mdi-drag" />
                                    </IconBtn>
                                </span>
                            </v-card-title>
                            <v-card-item class="mb-5">
                                <v-text-field label="名称" v-model="element.name" hint="自定义该配置的名称,用于识别不同的账户,该名称不可重复"
                                    persistent-hint></v-text-field>
                            </v-card-item>
                            <v-card-item class="my-5">
                                <v-text-field label="Cookies" v-model="element.cookies"
                                    hint="115账户的cookies,推荐抓取小程序的cookies" persistent-hint></v-text-field>
                            </v-card-item>
                            <v-card-item>
                                <VSwitch v-model="element.status" label="风控检测" hint="判断ck对应的账号是否发生风控并自动解除验证风控"
                                    persistent-hint />
                            </v-card-item>
                        </v-card>
                    </template>
                </draggable>
                <div class="flex flex-row btn-settings">
                    <v-btn @click="saveConfig" class="me-3">保存</v-btn>
                    <v-btn color="success" variant="tonal" @click="addConfig">
                        <VIcon icon="mdi-plus" />
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import api from '@/api/index'
import { Settings115, SaveResponse } from '@/api/types';
import { useToast } from 'vue-toast-notification';
import draggable from 'vuedraggable'

const $toast = useToast();
const isLoading = ref(true)


const settings = ref<Settings115[]>([
    { name: "", cookies: "", status: true }
]);

function addConfig() {
    settings.value.push({ name: "", cookies: "", status: true })
}

function deleteConfig(index: number) {
    settings.value.splice(index, 1);
}


async function fetchSyncConfig() {
    try {
        const response: Settings115[] = await api.get('/system/settings/' + '115_settings')
        updateConfigList(response)
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function saveConfig() {
    try {
        let data = { settings: settings.value, name: "115_settings" }
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


function updateConfigList(configs: Settings115[]) {
    settings.value = configs
}
onMounted(fetchSyncConfig)

</script>
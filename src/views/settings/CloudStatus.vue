<template>
    <div v-if="!isLoading">
        <v-card title="掉盘检测" subtitle="通过判断指定的文件是否可以下载判断是否发生掉盘/ck失效">
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
                            <v-card-item>
                                <v-text-field label="名称" v-model="element.name" hint="自定义该配置的名称,用于识别不同的网盘账户,该名称不可重复"
                                    persistent-hint></v-text-field>
                            </v-card-item>
                            <v-card-item class="mb-5">
                                <!-- 选择显示文件后,下拉列表的宽度会根据文件名的大小进行变化 -->
                                <VPathInput label="文件路径" v-model="element.sign_file" hint="掉盘检测的文件路径"
                                    :fileRequired="true" />
                            </v-card-item>
                            <v-card-item class="mb-3">
                                <v-text-field label="文件链接" v-model="element.sign_file_url" hint="掉盘检测的文件在网盘中的下载链接"
                                    persistent-hint>
                                </v-text-field>
                            </v-card-item>

                        </v-card>
                    </template>
                </draggable>
                <div class="btn-settings">
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
import { CloudStatus, SaveResponse } from '@/api/types';
import { useToast } from 'vue-toast-notification';
import draggable from 'vuedraggable'

const $toast = useToast();
const isLoading = ref(true)

const settings = ref<CloudStatus[]>(
    [{ name: "", sign_file: "", sign_file_url: "" }]
)

function addConfig() {
    settings.value.push({ name: "", sign_file: "", sign_file_url: "" })
}

function deleteConfig(index: number) {
    settings.value.splice(index, 1);
}


async function fetchSyncConfig() {
    try {
        const response: any = await api.get('/system/settings/' + 'cloud_status')
        updateConfigList(response)
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function saveConfig() {
    try {
        let data = { settings: settings.value, name: "cloud_status" }
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


function updateConfigList(configs: any) {
    settings.value = configs
}
onMounted(fetchSyncConfig)

</script>

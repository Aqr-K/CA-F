<template>
    <div v-if="!isLoading">
        <v-form>
            <v-row>
                <v-col v-for="(item, index) in settings" cols="12" md="4">
                    <v-card title="掉盘检测" class="h-[450px]">
                        <span class="absolute top-3 right-8">
                            <IconBtn @click="addConfig">
                                <v-icon icon="mdi-plus" />
                            </IconBtn>
                            <IconBtn @click="deleteConfig(index)">
                                <v-icon icon="mdi-minus" />
                            </IconBtn>
                        </span>
                        <v-card-item>
                            <v-text-field label="名称" v-model="item.name" hint="自定义该配置的名称,用于识别不同的网盘账户,该名称不可重复"
                                persistent-hint></v-text-field>
                        </v-card-item>
                        <v-card-item class="mb-3">
                            <VPathInput label="文件路径" v-model="item.sign_file" hint="掉盘检测的文件路径" :fileRequired="true" />
                        </v-card-item>
                        <v-card-item>
                            <v-text-field label="文件链接" v-model="item.sign_file_url" hint="掉盘检测的文件在网盘中的下载链接"
                                persistent-hint>
                            </v-text-field>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
            <div class="btn-settings">
                <v-btn @click="saveConfig">保存</v-btn>
            </div>
        </v-form>
    </div>
    <SnackBar ref="snackbarRef" />
</template>

<script lang="ts" setup>
import SnackBar from '@/layouts/components/SnackBar.vue'
import api from '@/api/index'
import { CloudStatusSettings, SaveResponse } from '@/api/types';
const isLoading = ref(true)


const snackbarRef = ref(null)

const settings = ref<CloudStatusSettings[]>(
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
        const response: CloudStatusSettings[] = await api.get('/system/settings/' + 'cloud_status_settings')
        updateConfigList(response)
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function saveConfig() {
    try {
        let data = { settings: settings.value, name: "cloud_status_settings" }
        const response: SaveResponse = await api.post(`/system/save_settings`, data)
        snackbarRef.value?.showSnackBar(response.success, response.message)
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}


function updateConfigList(configs: CloudStatusSettings[]) {
    settings.value = configs
}
onMounted(fetchSyncConfig)

</script>

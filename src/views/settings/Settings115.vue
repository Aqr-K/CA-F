<template>
    <div v-if="!isLoading">
        <v-form>
            <v-row>
                <v-col v-for="(item, index) in settings" cols="12" md="4">
                    <v-card title="115设置" class="h-[450px]">
                        <span class="absolute top-3 right-8">
                            <IconBtn @click="addConfig">
                                <v-icon icon="mdi-plus" />
                            </IconBtn>
                            <IconBtn @click="deleteConfig(index)">
                                <v-icon icon="mdi-minus" />
                            </IconBtn>
                        </span>
                        <v-card-item class="my-5">
                            <v-text-field label=" 名称" v-model="item.name" hint="自定义该配置的名称,用于识别不同的账户"
                                persistent-hint></v-text-field>
                        </v-card-item>
                        <v-card-item class="my-5">
                            <v-text-field label="Cookies" v-model="item.cookies" hint="115账户的cookies,推荐抓取小程序的cookies"
                                persistent-hint></v-text-field>
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
import { Settings115, SaveResponse } from '@/api/types';
const isLoading = ref(true)


const snackbarRef = ref(null)

const settings = ref(<Settings115[]>
    [{ name: "", cookies: "" }]
)

function addConfig() {
    settings.value.push({ name: "", cookies: "" })
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
        snackbarRef.value?.showSnackBar(response.success, response.message)

    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}


function updateConfigList(configs: Settings115[]) {
    settings.value = configs
}
onMounted(fetchSyncConfig)

</script>

<style scoped></style>
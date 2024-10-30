<template>
    <div v-if="!isLoading">
        <v-card title="目录同步" subtitle="实时监控目录,自动进行整理转移">
            <v-card-text>
                <draggable :list="settings" handle=".cursor-move" delay="100" item-key="id" tag="v-row">
                    <template #item="{ element, index }">
                        <v-col cols="12" md="6">
                            <v-card title="" color="card">
                                <span class="absolute top-0 right-3">
                                    <IconBtn @click="addConfig">
                                        <v-icon icon="mdi-plus" />
                                    </IconBtn>
                                    <IconBtn @click="deleteConfig(index)">
                                        <v-icon icon="mdi-minus" />
                                    </IconBtn>
                                    <VTooltip text="同步">
                                        <template #activator="{ props }">
                                            <IconBtn v-bind="props" @click.stop="mannualTransfer(element)">
                                                <VIcon icon="mdi-cloud-sync-outline" />
                                            </IconBtn>
                                        </template>
                                    </VTooltip>
                                    <IconBtn>
                                        <VIcon class="cursor-move" icon="mdi-drag" />
                                    </IconBtn>
                                </span>
                                <v-card-item class="path-input">
                                    <VPathInput label="源目录" v-model="element.source_dir" />
                                </v-card-item>
                                <v-card-item class="path-input">
                                    <VPathInput label="目的目录" v-model="element.dest_dir" />
                                </v-card-item>
                                <v-card-item>
                                    <v-select label="转移方式" :items="[
                                        { title: '默认', value: '' },
                                        { title: '移动', value: 'move' },
                                        { title: '复制', value: 'copy' },
                                        { title: '硬链接', value: 'link' },
                                        { title: '软链接', value: 'symlink' }]" v-model="element.transfer_type" hint=""
                                        persistent-hint></v-select>
                                </v-card-item>
                                <v-card-item>
                                    <v-select label="监控模式" :items="['事件通知', '轮询模式']" v-model="element.watch_mode"
                                        hint="监控本地文件夹推荐事件通知,网盘文件夹推荐轮询模式" persistent-hint></v-select>
                                </v-card-item>
                                <v-card-item>
                                    <v-text-field label="屏蔽词" v-model="element.exclude_words" hint=""
                                        persistent-hint></v-text-field>
                                </v-card-item>
                                <v-card-item>
                                    <v-row>
                                        <v-col cols="12" md="4">
                                            <v-switch label="刮削元数据" v-model="element.scrape" class="p-0 m-0"></v-switch>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-switch label="自动分类" v-model="element.auto_category"
                                                class="p-0 m-0"></v-switch>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-switch label="启用" v-model="element.switch" class="p-0 m-0"></v-switch>
                                        </v-col>
                                    </v-row>
                                </v-card-item>
                            </v-card>
                        </v-col>
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
import { SaveResponse } from '@/api/types';
import { useToast } from 'vue-toast-notification';
import draggable from 'vuedraggable'
import { TransferWatcher } from '@/api/types';
const $toast = useToast();
const isLoading = ref(true)

const transferWatcher: TransferWatcher = {
    source_dir: "",
    dest_dir: "",
    transfer_type: "move",
    watch_mode: "observer",
    scrape: false,
    switch: false,
    auto_category: true,
    exclude_words: "",
    interval: 10,
    scheduled_time: "",
    id: "",
}

const category = ref({})

const settings = ref<TransferWatcher[]>([
    transferWatcher
]);



function addConfig() {
    settings.value.push({ ...transferWatcher })
}

function deleteConfig(index: number) {
    settings.value.splice(index, 1);
}

async function mannualTransfer(element: TransferWatcher) {

}

async function fetchConfig() {
    try {
        const response: TransferWatcher[] = await api.get('/system/settings/' + 'transfer_watcher')
        updateConfigList(response)
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching transfer_watcher:', error)
    }
}

async function saveConfig() {
    try {
        let data = { settings: settings.value, name: "transfer_watcher" }
        const response: SaveResponse = await api.post(`/system/save_settings`, data)
        if (response.success) {
            $toast.success(response.message);
        } else {
            $toast.error(response.message);
        }
    } catch (error) {
        console.error('Error fetching  saveConfig:', error)
    }
}


function updateConfigList(configs: TransferWatcher[]) {
    settings.value = configs
}
onMounted(() => {
    fetchConfig()
});

</script>
<style scoped>
.path-input {
    margin-top: -1rem !important;
}
</style>
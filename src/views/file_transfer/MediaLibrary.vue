<template>
    <div v-if="!isLoading">
        <v-card title="媒体目录" subtitle="设置媒体文件整理后存储目录和分类，智能匹配">
            <v-card-text>
                <draggable :list="settings" handle=".cursor-move" delay="100" item-key="id" tag="div"
                    :component-data="{ 'class': 'grid gap-3 grid-directory' }">
                    <template #item="{ element, index }">
                        <v-card title="" color="card">
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
                            <v-card-item class="mt-3">
                                <v-text-field label="名称" v-model="element.name"></v-text-field>
                            </v-card-item>
                            <v-card-item class="path-input">
                                <VPathInput label="路径" v-model="element.path" />
                            </v-card-item>
                            <v-card-item class="mb-3">
                                <v-row>
                                    <v-col cols="5">
                                        <v-select label="媒体类型" :items="[{ title: '电影', value: 'movie' }, { title: '电视剧', value: 'tv' }
                                        ]" v-model="element.media_type" class="t-select"
                                            @update:modelValue:="updateCategory(index)"></v-select>
                                    </v-col>
                                    <v-col cols="7">
                                        <v-select label="媒体类别" :items="category[element.media_type]"
                                            v-model="element.category" class="t-select"></v-select>
                                    </v-col>
                                </v-row>
                            </v-card-item>
                        </v-card>
                    </template>
                </draggable>
            </v-card-text>
            <div class="btn-settings">
                <v-btn @click="saveConfig">保存</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import api from '@/api/index'
import { SaveResponse } from '@/api/types';
import { useToast } from 'vue-toast-notification';
import draggable from 'vuedraggable'
import { MediaDirectory } from '@/api/types';
const $toast = useToast();
const isLoading = ref(true)

const mediaDirectory = {
    type: "library",
    name: "媒体库目录",
    path: "",
    media_type: "all",
    category: "all",

}

const category = ref({})

const settings = ref<MediaDirectory[]>([
    mediaDirectory
]);

function updateCategory(index: number) {
    settings.value[index].category = category.value[settings.value[index].media_type][0]
}

function addConfig() {
    settings.value.push(mediaDirectory)
}

function deleteConfig(index: number) {
    settings.value.splice(index, 1);
}

async function fetchCategory() {
    try {
        const response = await api.get('/transfer/media_category')
        category.value = response
    } catch (error) {
        console.error('Error fetching category:', error)
    }
}


async function fetchConfig() {
    try {
        const response: MediaDirectory[] = await api.get('/system/settings/' + 'media_directory')
        updateConfigList(response)
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching media_directory:', error)
    }
}

async function saveConfig() {
    try {
        let data = { settings: settings.value, name: "media_directory" }
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


function updateConfigList(configs: MediaDirectory[]) {
    settings.value = configs
}
onMounted(() => {
    fetchConfig(), fetchCategory()
});

</script>
<style scoped>
.path-input {
    margin-top: -1rem !important;
}
</style>
<template>
    <div v-if="!isLoading">
        <v-row>
            <v-col cols="12">
                <v-card title="自定义识别词" subtitle="整理时先进行预处理以加强识别效果">
                    <v-card-text>
                        <v-textarea v-model="settings.replace_words" hint="支持正则表达式，特殊字符需要\转义，一行为一组"
                            placeholder="支持正则表达式，特殊字符需要\转义，一行为一组" persistent-hint auto-grow outlined></v-textarea>
                    </v-card-text>
                    <v-card-text>
                        <v-alert type="info" variant="tonal" title="支持的配置格式（注意空格）：">
                            <span v-html="`
              屏蔽词<br>
              被替换词 => 替换词
              `
                                " />
                        </v-alert>
                    </v-card-text>
                    <div class="btn-settings">
                        <v-btn @click="saveConfig">保存</v-btn>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card title="自定义制作组" subtitle="添加无法识别的制作组/字幕组">
                    <v-card-text>
                        <v-textarea v-model="settings.replace_words" hint="支持正则表达式，特殊字符需要\转义，一行为一组"
                            placeholder="支持正则表达式，特殊字符需要\转义，一行为一组" persistent-hint auto-grow outlined></v-textarea>
                    </v-card-text>
                    <div class="btn-settings">
                        <v-btn @click="saveConfig">保存</v-btn>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card title="整理屏蔽词" subtitle="目录名或文件名中包含屏蔽词时不进行整理">
                    <v-card-text>
                        <v-textarea v-model="settings.replace_words" hint="支持正则表达式，特殊字符需要\转义，一行为一组"
                            placeholder="支持正则表达式，特殊字符需要\转义，一行为一组" persistent-hint auto-grow outlined></v-textarea>
                    </v-card-text>
                    <div class="btn-settings">
                        <v-btn @click="saveConfig">保存</v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>

</template>

<script lang="ts" setup>
import { CustomWords, SaveResponse } from '@/api/types';
import { ref } from 'vue';
import api from '@/api';
import { useToast } from 'vue-toast-notification';
const $toast = useToast();
const isLoading = ref(true);
const settings = ref<CustomWords>({
    replace_words: "",
    release_group: "",
    exclude_words: ""
});



async function fetchConfig() {
    try {
        const response: CustomWords = await api.get('/system/settings/' + 'custom_words')
        settings.value = response;
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}
async function saveConfig() {
    try {
        let data = { settings: settings.value, name: "custom_words" }
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

onMounted(() => {
    fetchConfig()
});
</script>
<style></style>
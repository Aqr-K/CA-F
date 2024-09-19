<template>
    <div v-if="!isLoading">
        <VAceEditor v-model:value="content" lang="yaml" theme="monokai" :options="options"
            class="vue-ace-editor mx-5" />
        <div class="btn-settings">
            <v-btn @click="saveConfig">保存</v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import api from "@/api";
import type { Ace } from "ace-builds";
import { useToast } from 'vue-toast-notification';
import { SaveResponse } from "@/api/types";
const $toast = useToast();
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

const content = ref(''); // 显示的内容
const isLoading = ref(true)
const options: Partial<Ace.EditorOptions> = reactive({
    useWorker: true, // 启用语法检查,必须为true
    enableBasicAutocompletion: true, // 自动补全
    enableLiveAutocompletion: true, // 智能补全
    enableSnippets: true, // 启用代码段
    showPrintMargin: false, // 去掉灰色的线，printMarginColumn
    highlightActiveLine: true, // 高亮行
    highlightSelectedWord: true, // 高亮选中的字符
    tabSize: 2, // tab锁进字符
    fontSize: 14, // 设置字号
    wrap: false, // 是否换行
    readonly: false, // 是否可编辑
    // minLines: 10, // 最小行数，minLines和maxLines同时设置之后，可以不用给editor再设置高度
    // maxLines: 50, // 最大行数
});

async function fetchConfig() {
    isLoading.value = false

    try {
        const response: any = await api.get('/media/get_category_config')
        content.value = response;
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function saveConfig() {
    try {
        const response: SaveResponse = await api.post(`/media/save_category_config`, { settings: content.value })
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

<style scoped>
.vue-ace-editor {
    /* ace-editor默认没有高度，所以必须设置高度，或者同时设置最小行和最大行使编辑器的高度自动增高 */
    height: 75vh !important;
}
</style>
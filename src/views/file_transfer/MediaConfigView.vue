<template>
    <div v-if="!isLoading">
        <v-row>
            <v-col cols="12" md="10">
                <v-card title="刮削选项" subtitle="此选项是全局设置,适用于用于设置刮削和整理的规则">
                    <v-card-item>
                        <v-select label="转移方式" :items="[
                            { title: '移动', value: 'move' },
                            { title: '复制', value: 'copy' },
                            { title: '硬链接', value: 'link' },
                            { title: '软链接', value: 'symlink' }]" v-model="settings.transfer_type" hint=""
                            persistent-hint></v-select>
                    </v-card-item>
                    <v-card-item>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field label="定时同步" v-model="settings.scheduled_time"
                                    hint="5位cron表达式，留空关闭，如果想要5分钟同步一次，就填*/5 * * * *" persistent-hint></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field label="入库消息延迟" v-model="settings.interval" hint="目录同步时入库消息延迟推送，默认10s"
                                    persistent-hint></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <v-card-text class="mt-3">
                        <v-alert type="info" variant="tonal">
                            <span class="text-[16px]">
                                定时同步：定时全量同步监控目录，若目录同步开关关闭则不会进行定时同步
                            </span>
                        </v-alert>
                        <v-alert type="info" variant="tonal" class="mt-3">
                            <span class="text-[16px]">
                                入库消息延迟：目录同步时入库消息延迟推送，默认10s，如网络较慢可酌情调大，有助于发送统一入库消息。
                            </span>
                        </v-alert>
                    </v-card-text>
                    <v-card-item>
                        <v-textarea label="电影命名规则" v-model="settings.movie_name_rule" auto-grow outlined hint=""
                            persistent-hint></v-textarea>
                    </v-card-item>
                    <v-card-item>
                        <v-textarea label="电视剧命名规则" v-model="settings.tv_name_rule" auto-grow outlined hint=""
                            persistent-hint></v-textarea>
                    </v-card-item>
                    <v-card-item>
                        <v-text-field label="最小文件大小（MB）" v-model="settings.min_filesize" hint="只整理大于最小文件大小的文件"
                            persistent-hint></v-text-field>
                    </v-card-item>
                    <v-card-item>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-switch label="刮削元数据" v-model="settings.scrape" class="p-0 m-0"></v-switch>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-switch label="Fanart刮削" v-model="settings.fanart_enable" class="p-0 m-0"></v-switch>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <div class="btn-settings">
                        <v-btn @click="saveConfig" class="me-3">保存</v-btn>
                        <v-btn @click="reset" color="success" variant="tonal">重置</v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>

</template>

<script lang="ts" setup>
import { SaveResponse } from '@/api/types';
import { ref } from 'vue';
import api from '@/api';
import { useToast } from 'vue-toast-notification';
const $toast = useToast();
const isLoading = ref(true);
const defaultSettings = ref({
    transfer_type: "move",
    fanart_enable: true,
    scrape: true,
    min_filesize: 0,
    movie_name_rule: "{{title}}{% if year %} ({{year}}) {% endif %}{% if tmdbid %}{tmdbid={{tmdbid}}}{% endif %}/{{title}}{% if year %} ({{year}}) - {% endif %}{% if part %}-{{part}}{% endif %}{% if videoFormat %}{{videoFormat}}{% endif %}{% if edition %}.{{edition}}{% endif %}{% if videoCodec %}.{{videoCodec}}{% endif %}{% if audioCodec %}.{{audioCodec}}{% endif %}{% if releaseGroup %}-{{releaseGroup}}{% endif %}{{fileExt}}",
    tv_name_rule: "{{title}}{% if year %} ({{year}}) {% endif %}{% if tmdbid %}{tmdbid={{tmdbid}}}{% endif %}/Season {{season}}/{{title}}{% if year %}.{{year}}{% endif %}.{{season_episode}}{% if part %}-{{part}}{% endif %}{% if episode %}.第{{episode}}集{% endif %}{% if videoFormat %}.{{videoFormat}}{% endif %}{% if edition %}.{{edition}}{% endif %}{% if videoCodec %}.{{videoCodec}}{% endif %}{% if audioCodec %}.{{audioCodec}}{% endif %}{% if releaseGroup %}-{{releaseGroup}}{% endif %}{{fileExt}}",
    interval: 10,
    scheduled_time: ""
});

type MediaConfigType = typeof defaultSettings.value

const settings = ref<MediaConfigType>({ ...defaultSettings.value })

async function reset() {
    settings.value = { ...defaultSettings.value }
}

async function fetchConfig() {
    try {
        const response: any = await api.get('/system/settings/' + 'media_config')
        settings.value = response;
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}
async function saveConfig() {
    try {
        let data = { settings: settings.value, name: "media_config" }
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
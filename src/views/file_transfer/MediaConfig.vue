<template>
    <div v-if="!isLoading">
        <v-row>
            <v-col cols="12" md="10" title="掉盘检测">
                <v-card>
                    <v-card-item class="mt-5">
                        <v-select label="转移方式" :items="[
                            { title: '移动', value: 'move' },
                            { title: '复制', value: 'copy' },
                            { title: '硬链接', value: 'link' },
                            { title: '软链接', value: 'symlink' }]" v-model="settings.transfer_type" hint=""
                            persistent-hint></v-select>
                    </v-card-item>
                    <v-card-item>
                        <v-row>
                            <v-col cols="6">
                                <v-switch label="刮削元数据" v-model="settings.scrape" class="p-0 m-0"></v-switch>
                            </v-col>
                            <v-col cols="6">
                                <v-switch label="Fanart刮削" v-model="settings.fanart_enable" class="p-0 m-0"></v-switch>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <v-card-item>
                        <v-textarea label="电视剧命名规则" v-model="settings.tv_name_rule" auto-grow outlined hint=""
                            persistent-hint></v-textarea>
                    </v-card-item>
                    <v-card-item>
                        <v-textarea label="电影命名规则" v-model="settings.movie_name_rule" auto-grow outlined hint=""
                            persistent-hint></v-textarea>
                    </v-card-item>
                    <v-card-item class="mb-5">
                        <v-text-field label="最小文件大小（MB）" v-model="settings.min_filesize" hint="只整理大于最小文件大小的文件"
                            persistent-hint></v-text-field>
                    </v-card-item>
                    <div class="btn-settings">
                        <v-btn @click="saveConfig">保存</v-btn>
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
const settings = ref({
    transfer_type: "move",
    fanart_enable: false,
    scrape: true,
    min_filesize: 0,
    movie_name_rule: "{% if title %}{{ title }}{% endif %}{% if year %} ({{ year }}){% endif %}{% if tmdbid %} {tmdb-{{ tmdbid }}}{% endif %}/{% if title %}{{ title }}{% endif %}{% if year %} ({{ year }}){% endif %}{% if resolution %} - {{ resolution }}{% endif %}{% if source %}.{{ source }}{% endif %}{% if dolby_vision %}.{{ dolby_vision }}{% endif %}{% if color_space %}.{{ color_space }}{% endif %}{% if video_codec %}.{{ video_codec }}{% endif %}{% if audio_codec %}.{{ audio_codec }}{% endif %}{% if release_group %}-{{ release_group }}{% endif %}{{ext}}",
    tv_name_rule: "{% if title %}{{ title }}{% endif %}{% if year %} ({{ year }}){% endif %}{% if tmdbid %} {tmdb-{{ tmdbid }}}{% endif %}/{% if season %}Season {{ season  }}{% endif %}/{% if title %}{{ title }}{% endif %}{% if year %} ({{ year }}){% endif %}}{% if resolution %} - {{ resolution }}{% endif %}{% if season_episode %}.{{ season_episode  }}{% endif %}{% if part %}-{{ part }}{% endif %}{% if episode %}.第{{ episode  }}集{% endif %}{% if source %}.{{ source }}{% endif %}{% if dolby_vision %}.{{ dolby_vision }}{% endif %}{% if color_space %}.{{ color_space }}{% endif %}{% if video_codec %}.{{ video_codec }}{% endif %}{% if audio_codec %}.{{ audio_codec }}{% endif %}{% if release_group %}-{{ release_group }}{% endif %}{{ext}}"
});



async function fetchConfig() {
    try {
        const response: any = await api.get('/system/settings/' + 'media_config')
        settings.value = response;
        console.log(settings.value);
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
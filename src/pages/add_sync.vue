<template>
    <!-- 只有当syncConfig.id不为空时再呈现页面 -->
    <div>
        <v-tabs v-model="activeTab" show-arrows class="v-tabs-pill">
            <v-tab v-for="item in tabs" :key="item.icon" :value="item.tab"
                selected-class="v-slide-group-item--active v-tab--selected" @click="jumpTab(item.tab)">
                <div>
                    <v-icon size="20" start :icon="item.icon" />
                    {{ item.title }}
                </div>
            </v-tab>
        </v-tabs>
        <v-window v-model="activeTab" class="mt-5 disable-tab-transition" :touch="false">
            <!-- 用户 -->
            <v-window-item value="symlink">
                <transition name="fade-slide" appear>
                    <div>
                        <SymlinkSettings v-model:syncConfig="syncConfig" v-model:syncTemplate="syncTemplate"
                            :isNew="true" />
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="scheduled_task">
                <transition name="fade-slide" appear>
                    <div>
                        <ScheduledSettings v-model:syncConfig="syncConfig" />
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="sync_observer">
                <transition name="fade-slide" appear>
                    <div>
                        <ObserverSettings v-model:syncConfig="syncConfig" />
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="cloud_status">
                <transition name="fade-slide" appear>
                    <div>
                        <CloudStatus v-model:syncConfig="syncConfig" />
                    </div>
                </transition>
            </v-window-item>
        </v-window>
        <div class="btn-settings">
            <v-btn @click="saveConfig">保存</v-btn>
        </div>
        <SnackBar ref="snackbarRef" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import SnackBar from '@/layouts/components/SnackBar.vue'
import api from '@/api/index'
import { SyncItem, SaveResponse } from '@/api/types';
import SymlinkSettings from '@/views/sync_config/SymlinkSettings.vue'
import ScheduledSettings from '@/views/sync_config/ScheduledSettings.vue'
import ObserverSettings from '@/views/sync_config/ObserverSettings.vue'
import CloudStatus from '@/views/sync_config/CloudStatus.vue'
const route = useRoute()
const snackbarRef = ref(null)

const syncConfig = ref(<SyncItem>{
    id: "",
    task_name: "",
    media_dir: "",
    symlink_dir: "",
    exclude_folder: "",
    sync_scheduled: false,
    sync_time: "30 2 * * *",
    symlink_creator: false,
    metadata_copyer: false,
    metadata_covered: false,
    metadata_skipped: false,
    metadata_copyer_mode: "下载模式",
    num_threads: 2,
    symlink_dir_checker: false,
    symlink_checker: false,
    metadata_checker: false,
    observer_enabled: false,
    observer_symlink_creator: false,
    observer_metadata_copyer: false,
    observer_symlink_checker: false,
    observer_metadata_checker: false,
    observer_time: 0,
    backup_scheduled: false,
    backup_time: "30 2 * * *",
    backup_ext: "*.*",
    symlink_mode: "symlink",
    strm_mode: "cloud",
    symlink_size: 0,
    cloud_type: "cd2",
    cloud_url: "ip:19798",
    clouddrive2_path: "",
    alist_path: "",
    symlink_ext: ".mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov",
    metadata_ext: ".nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac",
    sign_file: "",
    sign_file_url: "",
    cloud_status: false,
})

const activeTab = ref(route.query.tab)

const tabs = [{ tab: "symlink", icon: "mdi-link-variant", title: "软链接" }, { tab: "scheduled_task", icon: "mdi-calendar-clock", title: "定时任务" }, { tab: "sync_observer", icon: "mdi-eye", title: "实时监控" }, { tab: "cloud_status", icon: "mdi-weather-cloudy", title: "掉盘检测" }]

const syncTemplate = ref(<SyncItem[]>[{
    id: "",
    task_name: "默认模板",
    media_dir: "",
    symlink_dir: "",
    exclude_folder: "",
    sync_scheduled: false,
    sync_time: "30 2 * * *",
    symlink_creator: false,
    metadata_copyer: false,
    metadata_covered: false,
    metadata_skipped: false,
    metadata_copyer_mode: "下载模式",
    num_threads: 2,
    symlink_dir_checker: false,
    symlink_checker: false,
    metadata_checker: false,
    observer_enabled: false,
    observer_symlink_creator: false,
    observer_metadata_copyer: false,
    observer_symlink_checker: false,
    observer_metadata_checker: false,
    observer_time: 0,
    backup_scheduled: false,
    backup_time: "30 2 * * *",
    backup_ext: "*.*",
    symlink_mode: "symlink",
    strm_mode: "cloud",
    symlink_size: 0,
    cloud_type: "cd2",
    cloud_url: "ip:19798",
    clouddrive2_path: "",
    alist_path: "",
    symlink_ext: ".mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov",
    metadata_ext: ".nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac",
    sign_file: "",
    sign_file_url: "",
    cloud_status: false,
}])

async function fetchSyncTemplate() {
    try {
        const data: SyncItem[] = await api.get(`/autosymlink/sync_list`)
        if (data.length > 0) {
            syncTemplate.value = data
        }
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function saveConfig() {
    try {
        const response: SaveResponse = await api.post(`/autosymlink/add_sync/save_config`, syncConfig.value)
        snackbarRef.value?.showSnackBar(response.success, response.message)
        setTimeout(() => {
            router.push('/sync_list')
        }, 1000); // 2 秒后执行 greet 函数
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

function jumpTab(tab: string) {
    router.push('/add_sync?tab=' + tab)
}

onMounted(() => {
    fetchSyncTemplate();
});
</script>

<style scoped>
.v-tab-item--selected {
    background: rgba(var(--v-theme-primary));
    color: white !important;
}

:deep(.v-tab__slider) {
    display: none !important;
}

/* .v-window-item {
    transition: none !important;
} */
</style>
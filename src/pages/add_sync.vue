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
                        <SymlinkSettings v-model:sync-config="syncConfig" />
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="scheduled_task">
                <transition name="fade-slide" appear>
                    <div>
                        <ScheduledSettings v-model:sync-config="syncConfig" />
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="sync_observer">
                <transition name="fade-slide" appear>
                    <div>
                        <ObserverSettings v-model:sync-config="syncConfig" />
                    </div>
                </transition>
            </v-window-item>
        </v-window>
        <div class="my-10">
            <v-btn color="#6b6e73" @click="resetConfig">重置</v-btn>
            <span class="mx-3"></span>
            <v-btn @click="saveConfig">保存</v-btn>
        </div>
        <SnackBar ref="snackbarRef" />
    </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import SnackBar from '@/layouts/components/SnackBar.vue'
import api from '@/api/index'
import { SyncItem, SaveResponse } from '@/api/types';
import SymlinkSettings from '@/views/sync_config/SymlinkSettings.vue'
import ScheduledSettings from '@/views/sync_config/ScheduledSettings.vue'
import ObserverSettings from '@/views/sync_config/ObserverSettings.vue'
const route = useRoute()
const snackbarRef = ref(null)

const syncConfig = ref(<SyncItem>{
    id: "",
    task_name: "",
    media_dir: "",
    symlink_dir: "",
    exclude_folder: "",
    sync_enabled: false,
    restart_sync_enabled: false,
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
})

const activeTab = ref(route.query.tab)

const tabs = [{ tab: "symlink", icon: "mdi-link-variant", title: "软链接" }, { tab: "scheduled_task", icon: "mdi-calendar-clock", title: "定时任务" }, { tab: "sync_observer", icon: "mdi-eye", title: "实时监控" },]

function resetConfig() {
    syncConfig.value = {
        task_name: "",
        media_dir: "",
        symlink_dir: "",
        exclude_folder: "",
        sync_enabled: false,
        restart_sync_enabled: false,
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
        id: "",

    }
}

async function saveConfig() {
    try {
        const response: SaveResponse = await api.post(`/autosymlink/add_sync/save_config`, syncConfig.value)
        snackbarRef.value?.showSnackBar(response.success, response.message)

    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

function jumpTab(tab: string) {
    router.push('/add_sync?tab=' + tab)
}
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
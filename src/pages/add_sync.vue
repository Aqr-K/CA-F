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
                        <SymlinkSettingsView v-model:syncConfig="syncConfig" v-model:syncTemplate="syncTemplate"
                            :isNew="true">
                            <template #footer>
                                <div class="btn-settings">
                                    <v-btn @click="saveConfig">保存</v-btn>
                                </div>
                            </template>
                        </SymlinkSettingsView>
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="scheduled_task">
                <transition name="fade-slide" appear>
                    <div>
                        <ScheduledSettingsView v-model:syncConfig="syncConfig">
                            <template #footer>
                                <div class="btn-settings">
                                    <v-btn @click="saveConfig">保存</v-btn>
                                </div>
                            </template>
                        </ScheduledSettingsView>
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="sync_observer">
                <transition name="fade-slide" appear>
                    <div>
                        <ObserverSettingsView v-model:syncConfig="syncConfig">
                            <template #footer>
                                <div class="btn-settings">
                                    <v-btn @click="saveConfig">保存</v-btn>
                                </div>
                            </template>
                        </ObserverSettingsView>
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="cloud_status">
                <transition name="fade-slide" appear>
                    <div>
                        <CloudStatusView v-model:syncConfig="syncConfig">
                            <template #footer>
                                <div class="btn-settings">
                                    <v-btn @click="saveConfig">保存</v-btn>
                                </div>
                            </template>
                        </CloudStatusView>
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="115_settings">
                <transition name="fade-slide" appear>
                    <div>
                        <Setting115View v-model:syncConfig="syncConfig">
                            <template #footer>
                                <div class="btn-settings">
                                    <v-btn @click="saveConfig">保存</v-btn>
                                </div>
                            </template>
                        </Setting115View>
                    </div>
                </transition>
            </v-window-item>
        </v-window>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import api from '@/api/index'
import { SyncItem, SaveResponse } from '@/api/types';
import { SyncItemVar, SyncTemplateVar } from '@/api/variable'
import SymlinkSettingsView from '@/views/sync_config/SymlinkSettingsView.vue'
import ScheduledSettingsView from '@/views/sync_config/ScheduledSettingsView.vue'
import ObserverSettingsView from '@/views/sync_config/ObserverSettingsView.vue'
import CloudStatus from '@/views/sync_config/CloudStatusView.vue'
import Setting115 from '@/views/sync_config/Setting115View.vue'
import { useToast } from 'vue-toast-notification';
const $toast = useToast()
const route = useRoute()

const syncConfig = ref(<SyncItem>{ ...SyncItemVar })

const activeTab = ref(route.query.tab)

const tabs = [{ tab: "symlink", icon: "mdi-link-variant", title: "软链接" }, { tab: "scheduled_task", icon: "mdi-calendar-clock", title: "定时任务" }, { tab: "sync_observer", icon: "mdi-eye", title: "实时监控" }, { tab: "cloud_status", icon: "mdi-weather-cloudy", title: "掉盘检测" }, { tab: "115_settings", icon: "mdi-sync", title: "115配置" }]

const syncTemplate = ref(<SyncItem[]>[{ ...SyncTemplateVar }])

async function fetchSyncTemplate() {
    try {
        const data: SyncItem[] = await api.get(`/autosymlink/sync_list`)
        if (data.length > 0) {
            syncTemplate.value = data
        }
    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
    try {
        const data: SyncItem = await api.get(`/autosymlink/sync_template`)
        syncConfig.value = data

    } catch (error) {
        console.error('Error fetching sync config:', error)
    }
}

async function saveConfig() {
    if (syncConfig.value.task_name.trim() === '') {
        $toast.error('任务名称不能为空')
        return
    }
    try {
        const response: SaveResponse = await api.post(`/autosymlink/add_sync/save_config`, syncConfig.value)
        if (response.success) {
            $toast.success(response.message)
        }
        else (
            $toast.error(response.message)
        )
        setTimeout(() => {
            router.push('/sync_list')
        }, 1000); // 2 秒后执行 greet 函数
        window.location.reload()

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
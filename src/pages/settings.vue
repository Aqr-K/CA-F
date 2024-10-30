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
            <v-window-item value="global_settings">
                <transition name="fade-slide" appear>
                    <div>
                        <GlobalSettingsView />
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="notification">
                <transition name="fade-slide" appear>
                    <div>
                        <NotificationView />
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="115_settings">
                <transition name="fade-slide" appear>
                    <div>
                        <Settings115View />
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="cloud_status">
                <transition name="fade-slide" appear>
                    <div>
                        <CloudStatusView />
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="cloud_mount_watcher">
                <transition name="fade-slide" appear>
                    <div>
                        <CloudMountWatcherView />
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
import GlobalSettingsView from '@/views/settings/GlobalSettingsView.vue'
import NotificationView from '@/views/settings/NotificationView.vue'
import Settings115View from '@/views/settings/Settings115View.vue'
import CloudStatusView from '@/views/settings/CloudStatusView.vue'
import CloudMountWatcherView from '@/views/settings/CloudMountWatcherView.vue'
const route = useRoute()


const activeTab = ref(route.query.tab)

const tabs = [
    { tab: "global_settings", icon: "mdi-cog", title: "全局设置" },
    { tab: "notification", icon: "mdi-bell", title: "通知" },
    { tab: "115_settings", icon: "mdi-cookie", title: "115设置" },
    { tab: "cloud_status", icon: "mdi-eye", title: "掉盘检测" },
    { tab: "cloud_mount_watcher", icon: "mdi-eye", title: "挂载监测" }

]

function jumpTab(tab: string) {
    router.push('/settings?tab=' + tab)
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
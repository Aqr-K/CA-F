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
                        <GlobalSettings />
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="notification">
                <transition name="fade-slide" appear>
                    <div>
                        <Notification />
                    </div>
                </transition>
            </v-window-item>
            <v-window-item value="115_settings">
                <transition name="fade-slide" appear>
                    <div>
                        <Settings115 />
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
import GlobalSettings from '@/views/settings/GlobalSettings.vue'
import Notification from '@/views/settings/Notification.vue'
import Settings115 from '@/views/settings/Settings115.vue'
const route = useRoute()


const activeTab = ref(route.query.tab)

const tabs = [
    { tab: "global_settings", icon: "mdi-cog", title: "全局设置" },
    { tab: "notification", icon: "mdi-bell", title: "通知" },
    { tab: "115_settings", icon: "mdi-cookie", title: "115设置" },

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
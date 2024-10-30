<template>
    <SideBar />
    <v-overlay class="theme" v-model="isOverlayVisible" scroll-strategy="reposition"></v-overlay>

    <v-app-bar :style="{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(var(--v-theme-background), 0.7)',
        boxShadow: 'none',
        border: 'none'
    }" app>
        <v-btn icon @click="toggleDrawer" v-if="mdAndDown">
            <v-icon>mdi-menu</v-icon>
        </v-btn>
        <!-- 导航栏内容 -->
        <v-spacer></v-spacer>
        <v-btn class="theme-btn mr-2" icon="mdi-laptop" @click="setAutoTheme" :color="btnColor">
        </v-btn>
        <v-btn class="theme-btn mr-2" :icon="$vuetify.theme.current.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
            @click="toggleTheme" :color="btnColor">
        </v-btn>
        <v-btn id="settings" icon="mdi-cog-outline" :color="btnColor"></v-btn>
        <v-menu activator="#settings" width="200" \>
            <v-list>
                <VListItem @click="stopSync">
                    <template #prepend>
                        <VIcon class="me-2" icon="mdi-sync" size="22" />
                    </template>
                    <VListItemTitle>停止同步</VListItemTitle>
                </VListItem>
                <VListItem @click="stopScrape">
                    <template #prepend>
                        <VIcon class="me-2" icon="mdi-auto-fix" size="22" />
                    </template>
                    <VListItemTitle>停止刮削</VListItemTitle>
                </VListItem>

                <VDivider class="my-2" />

                <VListItem @click="restart">
                    <template #prepend>
                        <VIcon class="me-2" icon="mdi-restart" size="22" />
                    </template>
                    <VListItemTitle>重启</VListItemTitle>
                </VListItem>

                <v-list-item @click="logout">
                    <VBtn color="error" block>
                        <template #append>
                            <VIcon size="small" icon="mdi-logout" />
                        </template>
                        退出登录
                    </VBtn>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>

    <v-main>
        <!-- 主要内容区域 -->
        <v-container fluid>
            <RouterView></RouterView>
        </v-container>
    </v-main>
</template>

<script setup lang="ts">
import api from '@/api';
import { useTheme } from 'vuetify'
import { useConfirm } from 'vuetify-use-dialog'
import { RouterView } from 'vue-router';
import SideBar from '@/layouts/components/SideBar.vue'
import { SaveResponse } from '@/api/types';
import { useDisplay } from 'vuetify'
import { useDrawerStore } from '@/store/drawer';
import { checkPrefersColorSchemeIsDark } from '@/@core/utils';
const isOverlayVisible = ref(false);

import { useAuthStore } from '@/store/auth';
import router from '@/router'
const { mdAndDown } = useDisplay();
const { global: globalTheme } = useTheme()
import { useToast } from 'vue-toast-notification';

// 确认框
const createConfirm = useConfirm()
const $toast = useToast();
const drawerStore = useDrawerStore();

const btnColor = computed(() => (globalTheme.current.value.dark ? 'white' : 'gray'));
const authStore = useAuthStore();
// 根据屏幕大小初始化 drawer 状态
if (mdAndDown.value) {
    drawerStore.closeDrawer();
} else {
    drawerStore.openDrawer();
}

function toggleDrawer() {
    drawerStore.toggleDrawer();
}


async function saveConfig() {
    try {
        let data = { settings: globalTheme.name.value, name: "theme" }
        await api.post(`/system/save_settings`, data)
    } catch (error) {
        console.error('Error fetching  saveConfig:', error)
    }
}

async function stopSync() {
    try {
        let response: SaveResponse = await api.post(`/system/stop_sync`)
        if (response.success) {
            $toast.success(response.message)
        } else {
            $toast.error(response.message)
        }
    } catch (error) {
        console.error('Error fetching  stopSync:', error)
    }
}

async function stopScrape() {
    try {
        let response: SaveResponse = await api.post(`/system/stop_scrape`)
        if (response.success) {
            $toast.success(response.message)
        } else {
            $toast.error(response.message)
        }
    } catch (error) {
        console.error('Error fetching  stopScrape:', error)
    }
}

// 执行重启操作
async function restart() {
    // 弹出提示
    const confirmed = await createConfirm({
        title: '确认',
        content: '确认重启系统吗？',
    })

    if (confirmed) {
        // 调用API重启
        try {

            const result: { [key: string]: any } = await api.get('system/restart')
            if (!result?.success) {
                // 重启不成功
                $toast.error(result.message)
                return
            }
        } catch (error) {
            console.error(error)
        }
        // 注销
        logout()
    }
}


function logout() {
    authStore.logout()
    router.push("/login")
}

// 生效主题
async function setAutoTheme() {
    const autoTheme = checkPrefersColorSchemeIsDark() ? 'dark' : 'light'
    if (autoTheme != globalTheme.name.value) {
        isOverlayVisible.value = true; // 显示纯色覆盖层
        setTimeout(() => { isOverlayVisible.value = false }, 180)
    }
    globalTheme.name.value = autoTheme
    // 存储主题到本地
    localStorage.setItem('theme', "auto")
    localStorage.setItem('materio-initial-loader-bg', globalTheme.current.value.colors.background)
    let data = { settings: "auto", name: "theme" }
    await api.post(`/system/save_settings`, data)
}


function toggleTheme() {
    globalTheme.name.value = globalTheme.current.value.dark ? 'light' : 'dark';
    isOverlayVisible.value = true; // 显示纯色覆盖层
    setTimeout(() => { isOverlayVisible.value = false }, 180)
    // 存储主题到本地
    localStorage.setItem('theme', globalTheme.name.value)
    localStorage.setItem('materio-initial-loader-bg', globalTheme.current.value.colors.background)
    saveConfig()
}

// 生效主题
function setTheme() {
    let themeValue = localStorage.getItem('theme') || 'light'
    const autoTheme = checkPrefersColorSchemeIsDark() ? 'dark' : 'light'
    globalTheme.name.value = themeValue === 'auto' ? autoTheme : themeValue
}

onMounted(() => {
    setTheme()
});
</script>

<style lang="scss">
.theme .v-overlay__scrim {
    background: rgba(var(--v-theme-background)) !important;
    opacity: 1 !important;
}

.v-list-item:hover {
    color: rgba(var(--v-theme-on-surface));
}

.v-list-item--active {
    background: rgba(var(--v-theme-primary)) !important;
    color: white !important;
}

.side-bar {
    box-shadow: none !important;
    /* 去除阴影 */
    border: none !important;
    /* 去除边框 */
}

.ps {
    height: 100%;
}
</style>

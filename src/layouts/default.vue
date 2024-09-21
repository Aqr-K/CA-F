<template>
    <SideBar />
    <v-overlay class="theme" v-model="isOverlayVisible" scroll-strategy="reposition"></v-overlay>

    <v-app-bar :style="{
        background: $vuetify.theme.current.colors.background,
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
        <v-menu activator="#settings">
            <v-list>
                <v-list-item @click="logout">
                    <v-list-item-title>退出登录</v-list-item-title>
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
import { RouterView } from 'vue-router';
import SideBar from '@/layouts/components/SideBar.vue'
import { useDisplay } from 'vuetify'
import { useDrawerStore } from '@/store/drawer';
import { checkPrefersColorSchemeIsDark } from '@/@core/utils';
const isOverlayVisible = ref(false);

import { useAuthStore } from '@/store/auth';
import router from '@/router'
const { mdAndDown } = useDisplay();
const { global: globalTheme } = useTheme()

const drawerStore = useDrawerStore();
const settingsMenu = [
    { title: '退出登录' },
]

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

<template>
    <SideBar />

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
        <v-btn class="theme-btn mr-2" :icon="$vuetify.theme.current.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
            @click="toggleTheme" :color="$vuetify.theme.current.dark ? 'white' : 'gray'">
        </v-btn>
        <v-btn icon="mdi-cog-outline" :color="$vuetify.theme.current.dark ? 'white' : 'gray'"></v-btn>
    </v-app-bar>

    <v-main>
        <!-- 主要内容区域 -->
        <v-container class="p-0" fluid>
            <RouterView></RouterView>
        </v-container>
    </v-main>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { RouterView } from 'vue-router';
import SideBar from '@/layouts/components/SideBar.vue'
import { useDisplay } from 'vuetify'
import { useDrawerStore } from '@/store/drawerStore';

const { mdAndDown } = useDisplay();
const theme = useTheme();
const drawerStore = useDrawerStore();

// 根据屏幕大小初始化 drawer 状态
if (mdAndDown.value) {
    drawerStore.closeDrawer();
} else {
    drawerStore.openDrawer();
}

const drawer = drawerStore.isOpen;

function toggleDrawer() {
    drawerStore.toggleDrawer();
}

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}

</script>

<style lang="scss">
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

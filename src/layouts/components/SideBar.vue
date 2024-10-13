<template>
    <v-navigation-drawer v-model="drawerStore.isOpen" app class="side-bar" @wheel="handleScroll" color="background">
        <template v-slot:prepend>
            <div id="logo" class="my-10 flex justify-center">
                <!-- 放置你的标志图片，修改 'your_logo_path' 为实际路径 -->
                <img v-if="$vuetify.theme.current.dark" src="@images/dark.png" alt="Logo" style="max-width: 75%" />
                <img v-else src="@images/light2.png" alt="Logo" style="max-width: 75%;" />
            </div>
        </template>
        <PerfectScrollbar ref="scrollbar">
            <!-- 大分类名称 -->
            <div v-for="(category, index) in categories" :key="index" class="mr-5">
                <div class="mb-2 flex items-center">
                    <hr class="flex-1 opacity-35 divider"
                        :style="{ 'border-color': $vuetify.theme.current.colors.divider }">
                    <span class="mx-3 text-gray-500">{{ category.title }}</span>
                    <hr class="flex-1 opacity-35 divider"
                        :style="{ 'border-color': $vuetify.theme.current.colors.divider }">
                </div>
                <!-- 具体分类 -->
                <v-list-item class="h-[30px] text-[16px] my-5 pl-5 nav-link"
                    :active="route.path === item.to || (route.path.startsWith('/sync_config') && item.to.startsWith('/sync_list'))"
                    v-for="(item, index) in category.items" :key="index" :prepend-icon="item.icon" :to="item.to" link
                    @touchend="handleClick(item.to)">
                    <v-list-item-title class="w-min"><span class="text-[16px] font-[450]">{{ item.title
                            }}</span></v-list-item-title>
                </v-list-item>
                <!-- <li class="nav-link my-5 flex align-items" :class="{ 'nav-link-active': isActive(item.to) }"
                    v-for="(item, index) in category.items">
                    <RouterLink :to="item.to" class="text-[16px] font-[450]">
                        <VIcon :icon="item.icon" class="nav-item-icon mr-3" />
                        <span class="nav-item-title">
                            {{ item.title }}
                        </span>
                    </RouterLink>
                </li> -->
            </div>
        </PerfectScrollbar>
    </v-navigation-drawer>

</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useDisplay } from 'vuetify'
import { useDrawerStore } from '@/store/drawer';
import router from '@/router'

const { mdAndDown } = useDisplay();
const drawerStore = useDrawerStore();
// 根据屏幕大小初始化 drawer 状态
if (mdAndDown.value) {
    drawerStore.closeDrawer();
} else {
    drawerStore.openDrawer();
}
const touched = ref(false)
const route = useRoute()
const categories = [
    {
        title: "发现",
        items: [{ title: "主界面", to: "/dashboard", icon: "mdi-home", isActive: true },
        { title: "查看日志", to: "/logs", icon: "mdi-format-list-bulleted", isActive: false },
        ]
    },
    {
        title: "软链接 | Strm",
        items: [{ title: "目录配置", to: "/sync_list", icon: "mdi-folder", isActive: false },
        { title: "手动同步", to: "/sync_task", icon: "mdi-cloud-sync-outline", isActive: false },
        { title: "添加同步", to: "/add_sync", icon: "mdi-plus", isActive: false },]
    },
    {
        title: "刮削同步",
        items: [{ title: "目录监控", to: "/file_transfer", icon: "mdi-folder", isActive: false },
        { title: "文件管理", to: "/file_manager", icon: "mdi-folder-multiple-outline", isActive: false },]
    },
    {
        title: "系统",
        items: [{ title: "插件", to: "/plugins", icon: "mdi-dots-grid", isActive: false },
        { title: "设置", to: "/settings", icon: "mdi-cog", isActive: false },]
    }
];
const scrollbar = ref(null);

const handleScroll = (event) => {
    const ps = scrollbar.value.$el;
    const scrollTop = ps.scrollTop;
    const scrollHeight = ps.scrollHeight;
    const offsetHeight = ps.offsetHeight;

    if (
        (scrollTop === 0 && event.deltaY < 0) ||
        (scrollTop + offsetHeight >= scrollHeight && event.deltaY > 0)
    ) {
        event.preventDefault(); // 阻止事件传播
    }
};
function handleClick(to: string) {
    touched.value = true
    router.push(to)
}

</script>
<style lang="scss" scoped>
@media (max-width: 767.98px) {

    a.v-list-item:hover span {
        display: inline-block;
    }
}

.v-list-item--active {
    background: linear-gradient(-72.47deg, rgb(var(--v-theme-primary)) 22.16%, rgba(var(--v-theme-primary), 0.9) 76.47%) !important;
    color: white !important;
    // border-radius: 0 20px 20px 0 !important;
}

.v-list-item--active:hover {
    color: white !important;
}

.side-bar {
    box-shadow: none !important;
    /* 去除阴影 */
    border: none !important;
    /* 去除边框 */
}


:deep(.v-list-item__spacer) {
    width: 10px !important;
}

//滚动条

:deep(.ps__thumb-y) {
    background-color: rgba(var(--v-theme-perfect-scrollbar-thumb), 1);
}


:deep(.ps .ps__rail-x:hover),
:deep(.ps .ps__rail-y:hover),
:deep(.ps .ps__rail-x:focus),
:deep(.ps .ps__rail-y:focus),
:deep(.ps .ps__rail-x.ps--clicking),
:deep(.ps .ps__rail-y.ps--clicking) {
    background-color: transparent;
}

:deep(.ps .ps__rail-y:hover),
:deep(.ps .ps__rail-x:hover),
:deep(.ps .ps__rail-x:focus),
:deep(.ps .ps__rail-y:focus),
:deep(.ps .ps__rail-x.ps--clicking),
:deep(.ps .ps__rail-y.ps--clicking) {
    background-color: transparent;
}

:deep(.ps .ps__rail-y:hover>.ps__thumb-y),
:deep(.ps .ps__rail-y:focus>.ps__thumb-y),
:deep(.ps .ps__rail-y.ps--clicking .ps__thumb-y) {
    background-color: rgba(var(--v-theme-perfect-scrollbar-thumb), 1);
    width: 11px;
}
</style>
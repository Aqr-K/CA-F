<template>
    <v-navigation-drawer v-model="localDrawer" app class="side-bar" @wheel="handleScroll"
        :style="{ background: $vuetify.theme.current.colors.background }">

        <template v-slot:prepend>
            <div id="logo" class="my-10 flex justify-center">
                <!-- 放置你的标志图片，修改 'your_logo_path' 为实际路径 -->
                <img v-if="$vuetify.theme.current.dark" src="@/assets/resource/dark.png" alt="Logo"
                    style="max-width: 75%" />
                <img v-else src="@/assets/resource/light2.png" alt="Logo" style="max-width: 75%;" />
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
                <v-list-item class="h-[30px] text-[16px] my-5 pl-5"
                    :active="route.path === item.to || (route.path.startsWith('/sync_config') && item.to.startsWith('/sync_list'))"
                    v-for="(item, index) in category.items" :key="index" :to="item.to" :prepend-icon="item.icon" link>
                    <v-list-item-title class="w-min"><span class="text-[16px] font-[450]">{{ item.title
                            }}</span></v-list-item-title>
                </v-list-item>
            </div>
        </PerfectScrollbar>
    </v-navigation-drawer>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const drawer = defineModel("drawer")
let localDrawer = ref<boolean>(<boolean>drawer.value)


// 监听 props.modelValue 的变化,更新 localDrawer
watch(() => drawer.value, (newVal) => {
    localDrawer = newVal;
});

// 监听本地状态的变化，并通过 emit 事件同步回父组件
watch(localDrawer, (newVal) => {
    drawer.value = newVal
});


const route = useRoute()
const categories = [
    {
        title: "发现",
        items: [{ title: "主界面", to: "/dashboard", icon: "mdi-home", isActive: true },
        { title: "查看日志", to: "/view_logs", icon: "mdi-format-list-bulleted", isActive: false },
        ]
    },
    {
        title: "软链接 | Strm",
        items: [{ title: "目录配置", to: "/sync_list", icon: "mdi-cloud-sync-outline", isActive: false },
        { title: "添加同步", to: "/add_sync", icon: "mdi-plus", isActive: false },]
    },
    {
        title: "刮削同步",
        items: [{ title: "目录配置", to: "/scrape_synclist", icon: "mdi-folder", isActive: false },
        { title: "添加同步", to: "/add_scrpe_sync", icon: "mdi-plus", isActive: false },]
    },
    {
        title: "系统",
        items: [{ title: "常用工具", to: "/tools", icon: "mdi-tools", isActive: false },
        { title: "全局设置", to: "/global_settings", icon: "mdi-cog", isActive: false },]
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
</script>
<style lang="scss" scoped>
.v-list-item--active {
    background: linear-gradient(-72.47deg, rgb(var(--v-theme-primary)) 22.16%, rgba(var(--v-theme-primary), .7) 76.47%) !important;
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

:deep(.ps__thumb-y) {
    background-color: rgba(var(--v-theme-perfect-scrollbar-thumb), 1);
}

:deep(.v-list-item__spacer) {
    width: 10px !important;
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
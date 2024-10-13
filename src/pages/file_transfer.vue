<template>
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
            <v-window-item value="directory">
                <transition name=" fade-slide" appear>
                    <MediaLibrary />
                </transition>
            </v-window-item>
            <v-window-item value="transfer_watcher">
                <transition name="fade-slide" appear>
                    <TransferWatcher />
                </transition>
            </v-window-item>
            <v-window-item value="media_config">
                <transition name="fade-slide" appear>
                    <MediaConfig />
                </transition>
            </v-window-item>
            <v-window-item value="media_category">
                <transition name="fade-slide" appear>
                    <MediaCategory />
                </transition>
            </v-window-item>
        </v-window>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import MediaLibrary from '@/views/file_transfer/MediaLibrary.vue';
import MediaConfig from '@/views/file_transfer/MediaConfig.vue';
import TransferWatcher from '@/views/file_transfer/TransferWatcher.vue';
import MediaCategory from '@/views/file_transfer/MediaCategory.vue';
const route = useRoute()


const activeTab = ref(route.query.tab)

const tabs = [{ tab: "transfer_watcher", icon: "mdi-cloud-sync-outline", title: "同步配置" }, { tab: "directory", icon: "mdi-folder-outline", title: "目录配置" }, { tab: "media_config", icon: "mdi-cog-outline", title: "刮削选项" }, { tab: "media_category", icon: "mdi-format-list-bulleted", title: "二级分类" }]

function jumpTab(tab: string) {
    router.push("/file_transfer?tab=" + tab)
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

:deep(.v-btn__content) {
    transition: none !important;
    opacity: 1 !important;
}
</style>
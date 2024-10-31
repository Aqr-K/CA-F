<template>
    <div class="d-flex flex-wrap gap-4 pt-8">
        <v-card v-for="plugin in plugins" :key="plugin.name" width="350" :color="plugin.color" class="plugin-card"
            @click="router.push(`${basePath}/${plugin.path}`)">
            <div class="flex align-center">
                <div>
                    <v-card-title class="text-h6">{{ plugin.name }}</v-card-title>
                    <v-card-text>
                        {{ plugin.desc }}
                    </v-card-text>
                </div>
                <VAvatar>
                    <VImg :src="pluginIcon(plugin)" @error="pluginIconError(plugin)">
                        <template #placeholder>
                            <div class="w-full h-full">
                                <VSkeletonLoader class="object-cover aspect-w-1 aspect-h-1" />
                            </div>
                        </template>
                    </VImg>
                </VAvatar>
            </div>
        </v-card>
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { plugins } from '@/api/plugins';
import noImage from '@images/logos/plugin.png'

const router = useRouter();
const basePath = "/plugins"


type Plugin = typeof plugins[0]


// 每一个插件的图标加载状态
const pluginIconLoaded = ref<{ [key: string]: boolean }>({})

// 插件图标加载错误
function pluginIconError(item: Plugin) {
    pluginIconLoaded.value[item.name || '0'] = false

}
// 插件图标地址
function pluginIcon(item: Plugin) {
    // 如果图片加载错误
    if (pluginIconLoaded.value[item.name || '0'] === false) return noImage
    // 如果是网络图片则使用代理后返回
    if (item?.icon?.startsWith('http'))
        return `${import.meta.env.VITE_API_BASE_URL}system/img/1?imgurl=${encodeURIComponent(item?.icon)}`
    return item.icon
}

onMounted(() => {
});

</script>

<style scoped>
.plugin-card {
    cursor: pointer;
}

.plugin-card:hover {
    background-color: inherit;
}
</style>

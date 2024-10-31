<template>
  <div v-show="context">
    <VCol>
      <div v-if="context?.media_info?.title"
        class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
        <div v-if="context?.media_info?.poster_path" class="ma-auto">
          <VImg width="10rem" aspect-ratio="2/3"
            class="object-cover aspect-w-2 aspect-h-3 rounded-lg ring-1 ring-gray-500"
            :src="getW500Image(context?.media_info?.poster_path)" cover>
            <template #placeholder>
              <div class="w-full h-full">
                <VSkeletonLoader class="object-cover aspect-w-2 aspect-h-3" />
              </div>
            </template>
          </VImg>
        </div>

        <div>
          <VCardItem class="pb-1">
            <VCardTitle class="text-center text-md-left">
              {{ context?.media_info?.title || context?.media_info?.title }}
              {{ context?.media_info?.season_episode }}
            </VCardTitle>
            <VCardSubtitle class="text-center text-md-left">
              {{ context?.media_info?.year || context?.media_info?.year }}
            </VCardSubtitle>
          </VCardItem>

          <VCardText v-if="context?.media_info?.overview"
            class="line-clamp-4 overflow-hidden text-ellipsis text-center text-md-left ...">
            {{ context?.media_info?.overview }}
          </VCardText>
          <div>
            <VCardText v-if="context?.new_filename"
              class="line-clamp-4 overflow-hidden text-ellipsis text-center text-md-left ...">
              {{ context?.new_filename }}
            </VCardText>
          </div>

          <VCardItem class="text-center text-md-left">
            <!-- 类型 -->
            <VChip v-if="context?.media_info?.type || context?.media_info?.type" variant="elevated" color="primary"
              class="me-1 mb-1 text-white bg-blue-500">
              {{ context?.media_info?.type || context?.media_info?.type }}
            </VChip>
            <!-- 二级分类 -->
            <VChip v-if="context?.media_info?.category" variant="elevated" color="primary"
              class="me-1 mb-1 text-white bg-blue-500">
              {{ context?.media_info?.category }}
            </VChip>
            <!-- TMDBID -->
            <VChip v-if="context?.media_info?.tmdbid" variant="elevated" color="success" class="me-1 mb-1"
              @click="openTmdbPage(context?.media_info?.type || '', context?.media_info?.tmdbid)">
              {{ context?.media_info?.tmdbid }}
            </VChip>
            <!-- media_info -->
            <VChip v-if="context?.media_info?.resourceType" variant="elevated" color="error"
              class="me-1 mb-1 text-white bg-red-500">
              {{ context?.media_info?.resourceType }}
            </VChip>
            <VChip v-if="context?.media_info?.videoFormat" variant="elevated" color="error"
              class="me-1 mb-1 text-white bg-red-500">
              {{ context?.media_info?.videoFormat }}
            </VChip>
            <VChip v-if="context?.media_info?.videoCodec" variant="elevated" color="orange"
              class=" me-1 mb-1 text-white bg-orange-500">
              {{ context?.media_info?.videoCodec }}
            </VChip>
            <VChip v-if="context?.media_info?.audioCodec" variant="elevated" class="me-1 mb-1 text-white bg-orange-500">
              {{ context?.media_info?.audioCodec }}
            </VChip>
            <VChip v-if="context?.media_info?.releaseGroup" variant="elevated" color="cyan"
              class="me-1 mb-1 text-white bg-cyan-500">
              {{ context?.media_info?.releaseGroup }}
            </VChip>
          </VCardItem>
        </div>
      </div>
      <VAlert v-if="!context?.media_info?.title" icon="mdi-alert-circle-outline"> 识别失败，无法识别到有效信息！ </VAlert>
    </VCol>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Context } from '@/api/types'

// 输入参数
const props = defineProps({
  context: Object as PropType<Context>,
})

// TMDB图片转换为w500大小
function getW500Image(url = '') {
  if (!url) return ''
  return url.replace('original', 'w500')
}

// 打开TMDB详情页面
function openTmdbPage(type: string, tmdbId: number) {
  if (!type || !tmdbId) return

  const url = `https://www.themoviedb.org/${type === '电影' ? 'movie' : 'tv'}/${tmdbId}`
  window.open(url, '_blank')
}
</script>
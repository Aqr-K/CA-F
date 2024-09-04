<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card :class="cardHeight" title="实时监控" subtitle="网盘+事件通知建议开启挂载检测">
                        <v-card-item>
                            <v-select label="监控模式" :items="['事件通知', 'Webhook']" v-model="syncConfig.observer_mode"
                                hint="新手推荐用事件通知,如果想用Webhook,请去github上根据教程进行配置" persistent-hint></v-select>
                        </v-card-item>
                        <v-row class="ml-2">
                            <v-col v-for="(swite, index) in observerSwites" cols="12" md="6">
                                <v-switch :label="swite.label" v-model="syncConfig[swite.key]"
                                    class="no-wrap"></v-switch>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script lang="ts" setup>
import { SyncItem, SaveResponse } from '@/api/types';
import { ref } from 'vue';

const cardHeight = ref("h-[510px]")
const syncConfig = defineModel<SyncItem>('syncConfig');
const observerSwites = ref([
    { label: '实时监控', key: 'observer_enabled' },
    { label: '挂载检测', key: 'cloud_mount_watcher' },
    { label: '更新软链接', key: 'observer_symlink_creator' },
    { label: '更新元数据', key: 'observer_metadata_copyer' },
    { label: '删除软链接', key: 'observer_symlink_checker' },
    { label: '删除元数据', key: 'observer_metadata_checker' },
]);
</script>
<style></style>
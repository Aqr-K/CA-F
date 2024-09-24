<template>
    <div>
        <v-row>
            <v-col cols="12" md="6">
                <v-card class="sync-config" title="实时监控" subtitle="网盘+事件通知建议开启挂载检测">
                    <v-card-item>
                        <v-select label="监控模式" :items="['事件通知', 'Webhook']" v-model="syncConfig.observer_mode"
                            hint="新手推荐用事件通知,如果想用Webhook,请去github上根据教程进行配置" persistent-hint></v-select>
                    </v-card-item>
                    <v-card-item>
                        <v-text-field label="延迟时间" v-model="syncConfig.observer_delay" hint="监测到文件变化时,进行延迟处理"
                            persistent-hint></v-text-field>
                    </v-card-item>
                    <v-row class="ml-2 mb-3">
                        <v-col v-for="(swite, index) in observerSwites" cols="12" md="6">
                            <v-switch :label="swite.label" v-model="syncConfig[swite.key]" class="no-wrap"></v-switch>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <slot name="footer"></slot>

    </div>
</template>

<script lang="ts" setup>
import { SyncItem, SaveResponse } from '@/api/types';
import { ref } from 'vue';
const syncConfig = defineModel<SyncItem>('syncConfig');
const observerSwites = ref([
    { label: '实时监控', key: 'observer_enabled' },
    { label: '更新软链接', key: 'observer_symlink_creator' },
    { label: '更新元数据', key: 'observer_metadata_copyer' },
    { label: '删除软链接', key: 'observer_symlink_checker' },
    { label: '删除元数据', key: 'observer_metadata_checker' },
]);
</script>
<style></style>
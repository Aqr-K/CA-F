<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card :class="cardHeight" title="实时监控">
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
    { label: '更新软链接', key: 'observer_symlink_creator' },
    { label: '更新元数据', key: 'observer_metadata_copyer' },
    { label: '删除软链接', key: 'observer_symlink_checker' },
    { label: '删除元数据', key: 'observer_metadata_checker' },
]);
</script>
<style></style>
<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12" sm="6" md="4" lg="4">
                    <v-card class="mb-5 pb-5 px-5" :class="cardHeight">
                        <v-card-item class="pt-3 justify-start">
                            <span class="text-[25px] font-bold">实时监控</span>
                        </v-card-item>
                        <v-row>
                            <v-col v-for="(swite, index) in observerSwites" cols="12" sm="6" md="4" lg="4" class="ml-5">
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
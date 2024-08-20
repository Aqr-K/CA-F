<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12" sm="6" md="4" lg="4">
                    <v-card class="mb-5 pb-5 px-5" :class="cardHeight">
                        <v-card-item class="pt-3 justify-start">
                            <span class="text-[25px] font-bold">实时监控</span>
                        </v-card-item>
                        <v-card-item>
                            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-1 ">
                                <div v-for="(swite, index) in observerSwites" class="flex items-center flex-left my-5">
                                    <span class="text-[14px] font-bold w-[95px] text-left">
                                        {{ swite.label }}：
                                    </span>
                                    <v-switch v-model="syncConfig[swite.key]"></v-switch>
                                </div>
                            </div>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script lang="ts" setup>
import { SyncItem, SaveResponse } from '@/api/types';
import { ref, defineModel } from 'vue';

const cardHeight = ref("h-[510px]")
const syncConfig = defineModel<SyncItem>('syncConfig');
const observerSwites = ref([
    { label: '实时监控：', key: 'observer_enabled' },
    { label: '更新软链接：', key: 'observer_symlink_creator' },
    { label: '更新元数据：', key: 'observer_metadata_copyer' },
    { label: '删除软链接：', key: 'observer_symlink_checker' },
    { label: '删除元数据：', key: 'observer_metadata_checker' },
]);
</script>
<style></style>
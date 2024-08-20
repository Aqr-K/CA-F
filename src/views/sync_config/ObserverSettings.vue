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
                                <div class="flex items-center flex-left my-5">
                                    <span class="text-[14px] font-bold w-[95px] text-left">
                                        实时监控：
                                    </span>
                                    <v-switch v-model="syncConfig.observer_enabled"></v-switch>
                                </div>
                                <div class="flex items-center flex-left my-5">
                                    <span class="text-[14px] font-bold w-[95px] text-left">
                                        更新软链接：
                                    </span>
                                    <v-switch v-model="syncConfig.observer_symlink_creator"></v-switch>
                                </div>
                                <div class="flex items-center flex-left my-5">
                                    <span class="text-[14px] font-bold w-[95px] text-left">
                                        更新元数据：
                                    </span>
                                    <v-switch v-model="syncConfig.observer_metadata_copyer"></v-switch>
                                </div>
                                <div class="flex items-center flex-left my-5">
                                    <span class="text-[14px] font-bold w-[95px] text-left">
                                        删除软链接：
                                    </span>
                                    <v-switch v-model="syncConfig.observer_symlink_checker"></v-switch>
                                </div>
                                <div class="flex items-center flex-left my-5">
                                    <span class="text-[14px] font-bold w-[95px] text-left">
                                        删除元数据：
                                    </span>
                                    <v-switch v-model="syncConfig.observer_metadata_checker"></v-switch>
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
</script>
<style></style>
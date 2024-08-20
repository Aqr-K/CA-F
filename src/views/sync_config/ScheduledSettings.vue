<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12" sm="6" md="4" lg="4">
                    <v-card class="mb-5 pb-5 px-5" :class="cardHeight">
                        <v-card-item class="pt-3 justify-start">
                            <span class="text-[25px] font-bold">定时任务</span>
                        </v-card-item>
                        <v-card-item>
                            <div class="flex items-center flex-left">
                                <span class="text-[14px] font-bold w-[95px] text-left">
                                    定时同步：
                                </span>
                                <v-switch v-model="syncConfig.sync_scheduled"></v-switch>
                            </div>
                            <v-text-field label="同步时间" v-model="syncConfig.sync_time"></v-text-field>
                            <div class="flex items-center flex-left mt-10">
                                <span class="text-[14px] font-bold w-[95px] text-left">
                                    定时备份：
                                </span>
                                <v-switch v-model="syncConfig.sync_scheduled"></v-switch>
                            </div>
                            <v-text-field label="备份时间" v-model="syncConfig.backup_time" class="my-5"></v-text-field>

                            <v-text-field label="备份后缀" v-model="syncConfig.backup_ext" class="my-5"></v-text-field>
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
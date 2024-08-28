<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card :class="cardHeight" title="定时任务">
                        <v-card-item>
                            <v-switch label="定时同步" v-model="syncConfig.sync_scheduled" class="mb-5"></v-switch>
                            <v-text-field label="同步时间" v-model="syncConfig.sync_time" hint="定时同步的时间间隔:单位为秒,支持乘法表达式,比如一天就是24*3600,每隔指定的时间进行同步,
支持5位cron表达式" persistent-hint></v-text-field>
                            <v-switch label="定时备份" v-model="syncConfig.sync_scheduled" class="mt-10"></v-switch>
                            <v-text-field label="备份时间" v-model="syncConfig.backup_time" class="my-5" hint="定时备份的时间间隔:单位为秒,支持乘法表达式,比如一天就是24*3600,意思是每隔指定的时间进行同步
支持5位cron表达式" persistent-hint></v-text-field>
                            <v-text-field label="备份后缀" v-model="syncConfig.backup_ext" class="my-5" hint="定时备份指定后缀名的文件,以;隔开如果想要备份所有格式的文件,就填*.*
如只想备份元数据,则填:'.nfo;.jpg;.png;.svg;.ass;.srt;.sup'" persistent-hint></v-text-field>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>

    </div>
</template>

<script lang="ts" setup>
import { SyncItem } from '@/api/types';
import { ref } from 'vue';

const cardHeight = ref("h-[580px]")
const syncConfig = defineModel<SyncItem>('syncConfig');
</script>
<style></style>
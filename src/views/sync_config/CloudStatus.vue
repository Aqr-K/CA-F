<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12" md="6" title="掉盘检测">
                    <v-card :class="cardHeight">
                        <v-card-item class="pt-3">
                            <v-switch label="启用检测" v-model="syncConfig.cloud_status" class="p-0 m-0"></v-switch>
                        </v-card-item>
                        <v-card-item class="pt-3">
                            <VPathInput label="文件路径" v-model="syncConfig.sign_file"
                                hint="掉盘检测的文件路径，选中对应的文件夹后，记得加上/文件名，如'/.../sign.txt''" :fileRequired="true" />
                        </v-card-item>
                        <v-card-item class="pt-3">
                            <v-text-field label="文件链接" v-model="syncConfig.sign_file_url" class="my-10"
                                hint="掉盘检测的文件在网盘中的下载链接" persistent-hint>
                            </v-text-field>
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

const cardHeight = ref("h-[510px]")
const syncConfig = defineModel<SyncItem>('syncConfig');
</script>
<style></style>
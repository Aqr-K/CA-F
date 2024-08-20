<template>
    <div>
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-card class="mb-5 pb-5" :class="cardHeight">
                    <v-card-text class="pt-3">
                        <v-form>
                            <v-card>
                                <v-card-item class="pt-3 justify-start">
                                    <span class="text-[25px] font-bold">基础配置</span>
                                </v-card-item>
                                <v-card-item class="pt-3">
                                    <v-text-field label="任务名称" v-model="syncConfig.task_name"
                                        class="mt-3"></v-text-field>
                                </v-card-item>
                                <v-card-item class="pt-3">
                                    <VPathInput label="媒体目录" v-model="syncConfig.media_dir" />
                                </v-card-item>
                                <v-card-item class="pt-3">
                                    <VPathInput label="本地目录" v-model="syncConfig.symlink_dir" />
                                </v-card-item>
                                <v-card-item class="pt-3">
                                    <VPathInput label="排除目录" v-model="syncConfig.exclude_folder" />
                                </v-card-item>
                                <div
                                    class="grid grid-cols-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 ml-5">
                                    <div class="flex items-center flex-left">
                                        <span class="text-[14px] font-bold w-[95px] text-left">
                                            同步状态：
                                        </span>
                                        <v-switch v-model="syncConfig.sync_enabled"></v-switch>
                                    </div>
                                    <div class="flex items-center flex-left">
                                        <span class="text-[14px] font-bold w-[95px] text-left">
                                            重启全同步：
                                        </span>
                                        <v-switch v-model="syncConfig.restart_sync_enabled"></v-switch>
                                    </div>
                                </div>
                            </v-card>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-card class="mb-5 pb-5" :class="cardHeight">
                    <v-card-text class="pt-3">
                        <v-form>
                            <v-card>
                                <v-card-item class="pt-3 justify-start">
                                    <span class="text-[25px] font-bold">同步配置</span>
                                </v-card-item>
                                <div
                                    class="grid grid-cols-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-1 ml-5">
                                    <div class="flex items-center flex-left">
                                        <span class="text-[14px] font-bold w-[95px] text-left">
                                            更新软链接：
                                        </span>
                                        <v-switch v-model="syncConfig.symlink_creator"></v-switch>
                                    </div>
                                    <div class="flex items-center flex-left">
                                        <span class="text-[14px] font-bold w-[95px] text-left">
                                            更新元数据：
                                        </span>
                                        <v-switch v-model="syncConfig.metadata_copyer"></v-switch>
                                    </div>
                                    <div class="flex items-center flex-left">
                                        <span class="text-[14px] font-bold w-[95px] text-left">
                                            元数据覆盖：
                                        </span>
                                        <v-switch v-model="syncConfig.metadata_covered"></v-switch>
                                    </div>
                                    <div class="flex items-center flex-left">
                                        <span class="text-[14px] font-bold w-[95px] text-left">
                                            元数据跳过：
                                        </span>
                                        <v-switch v-model="syncConfig.metadata_skipped"></v-switch>
                                    </div>
                                    <div class="flex items-center flex-left">
                                        <span class="text-[14px] font-bold w-[95px] text-left">
                                            无效文件夹：
                                        </span>
                                        <v-switch v-model="syncConfig.symlink_dir_checker"></v-switch>
                                    </div>
                                    <div class="flex items-center flex-left">
                                        <span class="text-[14px] font-bold w-[95px] text-left">
                                            无效软链接：
                                        </span>
                                        <v-switch v-model="syncConfig.symlink_checker"></v-switch>
                                    </div>
                                    <div class="flex items-center flex-left">
                                        <span class="text-[14px] font-bold w-[95px] text-left">
                                            无效元数据：
                                        </span>
                                        <v-switch v-model="syncConfig.metadata_checker"></v-switch>
                                    </div>
                                </div>
                                <v-select label="元数据模式" :items="['下载模式', '本地模式']"
                                    v-model="syncConfig.metadata_copyer_mode" class="my-5"></v-select>
                                <v-text-field label="同步线程数" v-model="syncConfig.num_threads"></v-text-field>
                            </v-card>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-card class="mb-5 pb-5" :class="cardHeight">
                    <v-card-text class="pt-3">
                        <v-form>
                            <v-card>
                                <v-card-item class="pt-3 justify-start">
                                    <span class="text-[25px] font-bold">软链接配置</span>
                                </v-card-item>
                                <v-select label="软链接模式" :items="['symlink', 'strm']" v-model="syncConfig.symlink_mode"
                                    class="my-5"></v-select>
                                <v-select label="Strm模式" :items="['cloud', 'local']" v-model="syncConfig.strm_mode"
                                    class="my-5"></v-select>
                                <v-select label="挂载类型" :items="['cd2', 'alist']" v-model="syncConfig.cloud_type"
                                    class="my-5"></v-select>
                                <v-text-field label="云端地址" v-model="syncConfig.cloud_url"></v-text-field>
                                <VPathInput label="cd2根目录" v-model="syncConfig.clouddrive2_path" />
                                <VPathInput label="alist目录" v-model="syncConfig.alist_path" />

                            </v-card>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-card class="mb-5 pb-5" :class="cardHeight">
                    <v-card-text class="pt-3">
                        <v-form>
                            <v-card>
                                <v-card-item class="pt-3 justify-start">
                                    <span class="text-[25px] font-bold">其他配置</span>
                                </v-card-item>
                                <v-text-field label="软链接大小" v-model="syncConfig.symlink_size"
                                    class="mt-5 mb-10"></v-text-field>
                                <v-text-field label="软链接后缀" v-model="syncConfig.symlink_ext"
                                    class="my-10"></v-text-field>
                                <v-text-field label="元数据后缀" v-model="syncConfig.metadata_ext"
                                    class="my-10"></v-text-field>

                            </v-card>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { SyncItem, SaveResponse } from '@/api/types';
import { ref, defineModel } from 'vue';

const cardHeight = ref("h-[510px]")
const syncConfig = defineModel<SyncItem>('syncConfig');
</script>

<style></style>
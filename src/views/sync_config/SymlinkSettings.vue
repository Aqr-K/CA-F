<template>
    <div>
        <v-form>
            <v-row align="stretch">
                <v-col cols="12" sm="6" md="4" lg="4">
                    <v-card class="mb-5 pb-5 px-5" :class="cardHeight">
                        <v-card-item class="pt-3 justify-start">
                            <span class="text-[25px] font-bold">目录配置</span>
                        </v-card-item>
                        <v-card-item class="pt-3">
                            <v-text-field label="任务名称" v-model="syncConfig.task_name" class="mt-3"></v-text-field>
                        </v-card-item>
                        <v-card-item v-for="(input, index) in pathInputs" class="pt-3">
                            <VPathInput :label="input.label" v-model="syncConfig[input.key]" :hint="input.hint" />
                        </v-card-item>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                    <v-card class="mb-5 pb-5 px-5" :class="cardHeight">
                        <v-card-item class="pt-3 justify-start">
                            <span class="text-[25px] font-bold">同步配置</span>
                        </v-card-item>
                        <v-row>
                            <v-col v-for="(swite, index) in switches" cols="12" sm="6" md="4" lg="4" class="ml-5">
                                <v-switch :label="swite.label" v-model="syncConfig[swite.key]"></v-switch>
                            </v-col>
                        </v-row>
                        <v-card-item>
                            <v-select label="元数据模式" :items="['下载模式', '本地模式']" v-model="syncConfig.metadata_copyer_mode"
                                class="pt-3" hint="下载模式速度更快,适合网盘向本地同步;本地模式适合本地向网盘同步" persistent-hint></v-select>
                        </v-card-item>
                        <v-card-item>
                            <v-text-field label="同步线程数" v-model="syncConfig.num_threads" class="pt-3"></v-text-field>
                        </v-card-item>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                    <v-card class="mb-5 pb-5 px-5" :class="cardHeight">
                        <v-card-item class="pt-3 justify-start">
                            <span class="text-[25px] font-bold">软链接配置</span>
                        </v-card-item>
                        <v-card-item v-for="(select, index) in selects" class="pt-3">
                            <v-select :label="select.label" :items="select.items" v-model="syncConfig[select.key]"
                                class="pt-3" :hint="select.hint" persistent-hint>
                            </v-select>
                        </v-card-item>
                        <v-card-item class="pt-3">
                            <v-text-field label="云端地址" v-model="syncConfig.cloud_url" class="pt-3"
                                hint="bridge下要填本机ip,不能填localhost/127.0.0.1" persistent-hint></v-text-field>
                        </v-card-item>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                    <v-card class="mb-5 pb-5 px-5" :class="cardHeight">
                        <v-card-item class="pt-3 justify-start">
                            <span class="text-[25px] font-bold">其他配置</span>
                        </v-card-item>
                        <v-text-field v-for="(textField, index) in textFields" :label="textField.label"
                            v-model="syncConfig[textField.key]" class="my-10">
                        </v-text-field>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script lang="ts" setup>
import { SyncItem } from '@/api/types';
import { ref } from 'vue';

const cardHeight = ref("h-[650px]")
const syncConfig = defineModel<SyncItem>('syncConfig');
const pathInputs = ref([
    { label: '媒体目录', key: 'media_dir', hint: "视频所在的文件夹" },
    { label: '本地目录', key: 'symlink_dir', hint: "程序会在此文件夹中创建软链接/strm文件,同步方向为媒体目录到本地目录,多目录同步时,本地目录不能完全相同" },
    { label: '排除目录', key: 'exclude_folder', hint: "要排除同步的文件夹路径，多个路径以;隔开，被排除的文件夹不会被同步和监控" },
    { label: 'cd2根目录', key: 'clouddrive2_path', hint: "挂载类型为cd2时要填，cd2的挂载点" },
    { label: 'alist目录', key: 'alist_path', hint: "挂载类型为alist时要填，alist的挂载根目录" },
]);
const switches = ref([
    { label: '更新软链接', key: 'symlink_creator' },
    { label: '更新元数据', key: 'metadata_copyer' },
    { label: '元数据覆盖', key: 'metadata_covered' },
    { label: '元数据跳过', key: 'metadata_skipped' },
    { label: '无效文件夹', key: 'symlink_dir_checker' },
    { label: '无效软链接', key: 'symlink_checker' },
    { label: '无效元数据', key: 'metadata_checker' },
]);
const selects = ref([
    { label: '链接模式', key: 'symlink_mode', items: ['symlink', 'strm'] },
    { label: 'Strm模式', key: 'strm_mode', items: ['cloud', 'local'], hint: "cloud模式文件内是http开头的链接,local模式文件内是文件的路径" },
    { label: '挂载类型', key: 'cloud_type', items: ['cd2', 'alist'] },
]);
const textFields = ref([
    { label: '软链接大小', key: 'symlink_size', },
    { label: '软链接后缀', key: 'symlink_ext' },
    { label: '元数据后缀', key: 'metadata_ext' },
]);
</script>

<style scoped></style>
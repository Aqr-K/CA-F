<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card :class="cardHeight" title="基础配置">
                        <v-card-item v-if="props.isNew" class="pt-3">
                            <v-select label="复制现有配置" :items="syncTempateList" v-model="selectedTemplate" class="pt-3"
                                hint="复制现有的目录配置" persistent-hint @update:modelValue="handleTemplateChange">
                            </v-select>
                        </v-card-item>
                        <v-card-item class="pt-3">
                            <v-text-field label="任务名称" v-model="syncConfig.task_name"></v-text-field>
                        </v-card-item>
                        <v-card-item class="pt-3">
                            <v-select label="同步模式" :items="['常规同步', '目录树同步']" v-model="syncConfig.sync_mode"
                                class="pt-3" hint="常规同步即对文件夹进行遍历同步,目录树同步是通过115的api生成目录树后进行同步,目录树同步仅能用于115的文件夹"
                                persistent-hint>
                            </v-select>
                        </v-card-item>
                        <v-card-item v-for="(input, index) in pathInputs" class="pt-3">
                            <VPathInput :label="input.label" v-model="syncConfig[input.key]" :hint="input.hint" />
                        </v-card-item>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card :class="cardHeight" title="同步配置">
                        <v-row class="ml-2">
                            <v-col v-for="(swite, index) in switches" cols="12" md="6">
                                <v-switch :label="swite.label" v-model="syncConfig[swite.key]"
                                    class="p-0 m-0"></v-switch>
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
                <v-col cols="12" md="6">
                    <v-card :class="cardHeight" title="软链接置">
                        <v-card-item v-for="(select, index) in selects" class="pt-3">
                            <v-select v-if="select.items" :label="select.label" :items="select.items"
                                v-model="syncConfig[select.key]" class="pt-3" :hint="select.hint" persistent-hint>
                            </v-select>
                            <v-text-field v-else :label="select.label" v-model="syncConfig[select.key]" class="pt-3"
                                :hint="select.hint" persistent-hint></v-text-field>
                        </v-card-item>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card :class="cardHeight" title="根目录计算" subtitle="用于获取cd2根目录/alist根目录">
                        <v-card-item>
                            <VPathInput label="文件路径" v-model="testFilePath" hint="在媒体目录中选择任意一个文件"
                                :fileRequired="true" />
                        </v-card-item>
                        <v-card-item>
                            <v-text-field label="文件链接" v-model="testFileUrl" class="pt-3" hint="该文件在cd2中的链接"
                                persistent-hint></v-text-field>
                        </v-card-item>
                        <v-card-item>
                            <v-text-field label="根目录" v-model="testRootPath" class="pt-3" hint="将根目录的值复制到对应的设置里即可"
                                persistent-hint></v-text-field>
                        </v-card-item>
                        <div class="btn-settings">
                            <v-btn @click="caculatePath">生成</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script lang="ts" setup>
import { SyncItem } from '@/api/types';
import { ref } from 'vue';
import api from '@/api';

const cardHeight = ref("h-[830px]")
const syncConfig = defineModel<SyncItem>('syncConfig');
const syncTemplate = defineModel<SyncItem[]>('syncTemplate');
// 输入参数
const props = defineProps({
    type: String, // download/library
    isNew: {
        type: Boolean,
        required: false,
        default: false
    },

})

const syncTempateList = computed(() => {
    return syncTemplate.value.map(item => item.task_name);
});
const selectedTemplate = ref(syncTempateList[0])
const pathInputs = ref([
    { label: '源目录', key: 'media_dir', hint: "视频所在的文件夹,如果是cd2挂载文件夹,请直接挂载网盘根目录,否则会出现路径错误等问题" },
    { label: '链接目录', key: 'symlink_dir', hint: "程序会在此文件夹中创建软链接/strm文件,同步方向为媒体目录到本地目录,多目录同步时,本地目录不能完全相同" },
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

// 定义类型
interface SelectOption {
    label: string;
    key: string;
    items?: string[]; // 可选属性
    hint?: string;    // 可选属性
}

const selects = ref<SelectOption[]>([
    { label: '链接模式', key: 'symlink_mode', items: ['symlink', 'strm'] },
    { label: 'Strm模式', key: 'strm_mode', items: ['cloud', 'local'], hint: "cloud模式文件内是http开头的链接,local模式文件内是文件的路径" },
    { label: '挂载类型', key: 'cloud_type', items: ['cd2', 'alist'] },
    { label: '云端地址', key: 'cloud_url', hint: "cloud模式文件内是http开头的链接,local模式文件内是文件的路径" },
    { label: '软链接大小', key: 'symlink_size', },
    { label: '软链接后缀', key: 'symlink_ext' },
    { label: '元数据后缀', key: 'metadata_ext' },
]);
const testFilePath = ref("")
const testFileUrl = ref("")
const testRootPath = ref("")

async function caculatePath() {
    let data = { path: testFilePath.value, url: testFileUrl.value }
    try {
        const response: string = await api.post('/autosymlink/caculate_path', data)
        testRootPath.value = response
    } catch (error) {
        console.error('Error fetching sync list:', error)
    }
}

//根据template找到对应的配置
function handleTemplateChange(name) {
    const templateConfig = syncTemplate.value.find(item => item.task_name === name);

    if (templateConfig) {
        //深度复制,取消响应式
        syncConfig.value = JSON.parse(JSON.stringify(templateConfig));
    } else {
        console.log('Template config not found');
    }
}

</script>

<style scoped></style>
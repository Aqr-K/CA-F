<template>
  <div v-if="!isLoading">
    <v-card title="EmbyServer" subtitle="用于生成Strm｜软链接时通知Emby扫库">
      <v-card-text>
        <draggable :list="settings" handle=".cursor-move" delay="100" item-key="id" tag="div"
          :component-data="{ 'class': 'grid gap-3 grid-directory' }">
          <template #item="{ element, index }: { element: MediaServer; index: number }">
            <v-card color="card">
              <v-card-title class="py-3">
                <span class="absolute top-0 right-3">
                  <IconBtn @click="addConfig">
                    <v-icon icon="mdi-plus" />
                  </IconBtn>
                  <IconBtn @click="deleteConfig(index)">
                    <v-icon icon="mdi-minus" />
                  </IconBtn>
                  <IconBtn>
                    <VIcon class="cursor-move" icon="mdi-drag" />
                  </IconBtn>
                </span>
              </v-card-title>
              <v-text-field label="名称" v-model="element.name" hint="自定义该配置的名称,用于识别不同的账户,该名称不可重复" persistent-hint
                class="mx-3 mt-5"></v-text-field>
              <v-text-field label="地址" v-model="element.host" hint="Emby的地址" persistent-hint
                class="mx-3 my-2"></v-text-field>
              <v-text-field label="API Key" v-model="element.api_key" hint="Emby的API Key" persistent-hint
                class="mx-3 my-2"></v-text-field>
              <v-text-field label="延迟通知" v-model="element.time_delay" hint="延迟通知Emby扫描的时间" persistent-hint
                class="mx-3 my-2"></v-text-field>
              <v-text-field label="路径替换" v-model="element.filepath_mapping" hint="被替换路径 => 替换路径 最下方有具体说明"
                persistent-hint class="mx-3 my-2"></v-text-field>
              <VSwitch v-model="element.switch" label="启用" persistent-hint class="mx-3 mb-5" />
              <v-btn @click="testEmbyServer(element)" class="mx-3 my-3">测试</v-btn>
            </v-card>
          </template>
        </draggable>
        <v-alert type="info" variant="tonal" class="mt-2 mb-5">
          <span class="text-[16px]">
            Emby服务器配置排在第一个的将作为默认Emby服务器
          </span>
        </v-alert>
        <v-alert type="info" variant="tonal" class="mt-2 mb-5">
          <span v-html="`
          Emby媒体服务器通知：需要设置媒体服务器Webhook，回调相对路径为 /api/v1/webhook/mediamsg/emby?token=cloudassistant（8095端口），其中 cloudassistant 为设置的 API_TOKEN。
          `" class="text-[16px]" />
        </v-alert>
        <v-alert type="info" variant="tonal">
          <span v-html="`
          路径替换：Emby和CA对于同一个目录映射方式相同时可以不填
                    <br><br>

          Emby通知的原理是把生成的Strm｜软链接的路径通知给Emby，让Emby去扫描该路径，如果Strm｜软链接的目录在CA和Emby中的映射不一样，则需要在这里进行替换。因此建议CA和Emby在映射目录时尽量保持一致
          <br><br>
          支持的配置格式（注意空格）：多个配置用;隔开
          <br><br>
          被替换路径1 => 替换路径1;被替换路径2 => 替换路径2;...
          <br><br>
          示例：比如对于/mnt/Symlink在CA中的映射为/mnt/Symlink:/CA/Symlink,在Emby中的映射为/mnt/Symlink:/Emby/Symlink,我们就需要把/CA/Symlink替换为/Emby/Symlink
          <br><br>
          那么路径替换就是：/CA/Symlink => /Emby/Symlink          
          `" class="text-[16px]" />
        </v-alert>
        <div class="flex flex-row btn-settings">
          <v-btn @click="saveConfig" class="me-3">保存</v-btn>
          <v-btn color="success" variant="tonal" @click="addConfig">
            <VIcon icon="mdi-plus" />
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import api from '@/api/index'
import { MediaServer, SaveResponse } from '@/api/types';
import { MediaServerVar } from '@/api/variable';
import { useToast } from 'vue-toast-notification';
import draggable from 'vuedraggable'

const $toast = useToast();
const isLoading = ref(true)


const settings = ref<MediaServer[]>([
  { ...MediaServerVar }
]);

function addConfig() {
  settings.value.push({ ...MediaServerVar })
}

function deleteConfig(index: number) {
  settings.value.splice(index, 1);
}


async function fetchSyncConfig() {
  try {
    const response: MediaServer[] = await api.get('/system/settings/' + 'emby_server')
    updateConfigList(response)
    isLoading.value = false
  } catch (error) {
    console.error('Error fetching sync config:', error)
  }
}

async function saveConfig() {
  try {
    let data = { settings: settings.value, name: "emby_server" }
    const response: SaveResponse = await api.post(`/system/save_settings`, data)
    if (response.success) {
      $toast.success(response.message);
    } else {
      $toast.error(response.message);
    }
  } catch (error) {
    console.error('Error fetching sync config:', error)
  }
}

async function testEmbyServer(config: MediaServer) {
  try {
    const response: SaveResponse = await api.post(`/plugin/test_emby`, config)
    if (response.success) {
      $toast.success(response.message);
    } else {
      $toast.error(response.message);
    }
  } catch (error) {
    console.error('Error testing emby server:', error)
  }
}

function updateConfigList(configs: MediaServer[]) {
  settings.value = configs
}
onMounted(fetchSyncConfig)

</script>
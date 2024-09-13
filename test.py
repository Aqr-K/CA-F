 <v-col v-for="item in syncList" :key="item.id" cols="12" md="6" class="my-5">
            <v-card class="py-5 pr-5">
                <v-card-item class="pt-3 justify-start task-name">
                    <RouterLink class="text-[36px] text-[#2f94c3]"
                        :to="{ name: 'sync_config', params: { id: item.id } }">
                        <v-icon icon="mdi-cloud-sync-outline" class="mb-6"></v-icon>
                        <span class="ml-2">{{ item.task_name }}</span>
                    </RouterLink>
                    <span class="absolute top-4 right-8">
                        <VTooltip text="同步">
                            <template #activator="{ props }">
                                <IconBtn v-bind="props" @click.stop="startTask(item)">
                                    <VIcon icon="mdi-cloud-sync" />
                                </IconBtn>
                            </template>
                        </VTooltip>
                    </span>
                </v-card-item>
                <v-card-text v-for="(dir, index) in dirs" :key="index" class="text-left ml-5 p-0 truncate">
                    <span class="text-[14px] font-bold" :title="item[dir.key]">
                        {{ dir.label }}{{ item[dir.key] }}
                    </span>
                </v-card-text>
                <v-row class="ml-5">
                    <v-col v-for="(swite, index) in switches" :key="index" cols="12" md="6">
                        <v-switch :label="swite.label" v-model="item[swite.key]" @input="saveConfig(item)"></v-switch>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
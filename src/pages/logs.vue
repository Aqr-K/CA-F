<template>
    <div v-if="logs.length === 0" class="mt-5 w-full text-center flex flex-col items-center">
        <VProgressCircular size="48" indeterminate color="primary" />
        <span class="mt-3">正在刷新 ...</span>
    </div>
    <div v-if="logs.length > 0" class="flex flex-center mt-10">
        <VTable hide-default-footer disable-sort>
            <tbody>
                <tr>
                    <td>
                        <div class="flex align-center">
                            <span class="text-[20px] font-bold">
                                实时日志
                            </span>
                            <a class="mx-2 px-3 py-1 inline-flex items-center justify-center"
                                style="background: #4d5562;color:white;border-radius: 20px;cursor: pointer;"
                                :href="allLoggingUrl()" target="_blank">
                                <VIcon icon="mdi-open-in-new" />
                                <span class="ms-1">查看全部日志</span>
                            </a>
                        </div>

                    </td>
                </tr>
                <tr v-for="(log, i) in extractLogDetails" :key="i" class="text-sm">
                    <td class="text-sm info py-3">
                        <span class="inline-block w-[85px]">
                            <VChip size="small" :color="getLogColor(log.level)" variant="elevated" v-text="log.level" />
                        </span>
                        <span span class="inline-block w-[90px]">
                            {{ log.time }}
                        </span>
                        <span class="inline-block mx-10 w-[140px] text-center">
                            {{ log.program }}
                        </span>
                        <span v-html="log.content.replace(/\\hf/g, '<br><br>')">
                        </span>
                    </td>
                </tr>
            </tbody>
        </VTable>
    </div>
</template>

<script lang="ts" setup>
import api from '@/api';
import { useAuthStore } from '@/store/auth';
const auth = useAuthStore()
// 日志列表
const logs = ref<string[]>([])
// SSE消息对象
let eventSource: EventSource | null = null

// 获取全部日志
function allLoggingUrl() {
    const token = auth.token
    return `${import.meta.env.VITE_API_BASE_URL}/system/logging?token=${token}&length=-1`
}


// SSE持续获取日志
function startSSELogging() {
    const token = auth.token
    eventSource = new EventSource(
        `${import.meta.env.VITE_API_BASE_URL}/system/logging?token=${token}`,
    )

    eventSource.addEventListener('message', (event) => {
        const message = event.data

        if (message)
            logs.value.push(message)
        // 只保留最新的100行日志
        logs.value = logs.value.slice(-100);
    })
}

// 从日志中提取日志详情
function extractLogDetailsFromLogs(logs: string[]): { level: string; time: string; program: string; content: string }[] {
    const logDetails: { level: string; time: string; program: string; content: string }[] = []

    const logPattern = /^【(.*?)】[0-9\-:]*\s(.*?)\s-\s(.*?)\s-\s(.*)$/

    for (const log of logs) {
        const matches = RegExp(logPattern).exec(log)
        if (matches && matches.length === 5) {
            const [_, level, time, program, content] = matches
            logDetails.unshift({ level, time, program, content })
        }
        else {
            // 如果没有成功匹配，将该字符串放到最后一个元素的 content 中
            if (logDetails.length > 0) {
                logDetails[0].content += `</br></br>${log}`; // 添加到最后一个元素的 content
            } else {
                // 如果 logDetails 为空，创建一个新元素
                logDetails.push({ level: 'UNKNOWN', time: 'UNKNOWN', program: 'UNKNOWN', content: log });
            }
        }
    }


    return logDetails
}

// 计算日志颜色
function getLogColor(level: string): string {
    switch (level) {
        case 'DEBUG':
            return 'primary'
        case 'INFO':
            return 'secondary'
        case 'WARNING':
            return 'warning'
        case 'ERROR':
            return 'error'
        default:
            return 'secondary'
    }
}

// 拆分日志数据计算属性
const extractLogDetails = computed(() => {
    return extractLogDetailsFromLogs(logs.value)
})

onMounted(() => {
    startSSELogging()
})

onBeforeUnmount(() => {
    if (eventSource)
        eventSource.close()
})
</script>
<style scoped>
/* 可选：设置表格的宽度 */
.v-table {
    width: 90%;
}
</style>
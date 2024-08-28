<template>
    <div v-if="logs.length === 0" class="mt-5 w-full text-center flex flex-col items-center">
        <VProgressCircular size="48" indeterminate color="primary" />
        <span class="mt-3">正在刷新 ...</span>
    </div>
    <div class="flex flex-center mt-10">
        <VTable hide-default-footer disable-sort>
            <tbody>
                <tr v-for="(log, i) in extractLogDetails" :key="i" class="text-sm">
                    <td class="text-sm info">
                        <VChip size="small" :color="getLogColor(log.level)" variant="elevated" v-text="log.level" />
                        &nbsp;&nbsp;&nbsp;&nbsp;{{ log.time }}
                        &nbsp;&nbsp;&nbsp;&nbsp;{{ log.program }}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span v-html="log.content.replace(/\\hf/g, '<br><br>')"></span>
                    </td>
                </tr>
            </tbody>
        </VTable>
    </div>
</template>

<script lang="ts" setup>
import api from '@/api';
// 日志列表
const logs = ref<string[]>([])
const spacer = "     "
// SSE消息对象
let eventSource: EventSource | null = null

// 获取全部日志
async function fetchAllLogs() {
    const response: string = await api.get('/system/logging?length=-1');
    if (response) {
        logs.value = response.split("\n"); // 以换行符分隔转换为数组
    } else {
        console.error('Failed to fetch');
    }
}


// SSE持续获取日志
function startSSELogging() {
    eventSource = new EventSource(
        `${import.meta.env.VITE_API_BASE_URL}system/logging`,
    )

    eventSource.addEventListener('message', (event) => {
        const message = event.data
        if (message)
            logs.value.push(message)
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
    fetchAllLogs(),
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
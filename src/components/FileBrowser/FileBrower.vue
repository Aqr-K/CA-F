<template>
    <v-treeview :items="items" item-title="name" item-value="path" return-object activatable open-on-click
        @update:click="activateNode">
        <template v-slot:prepend="{ item, isOpen }">
            <v-icon> {{ isOpen ? 'mdi-folder-open' : 'mdi-folder' }} </v-icon>
        </template>
    </v-treeview>
</template>
<script setup>
import { ref } from 'vue'
const treeviewRef = ref(null)
// 用来追踪激活的节点
const activeItems = ref([])

const activateNode = node => {
    // 设置当前激活的节点，只允许一个节点激活
    activeItems.value = [node.path]
    console.log(node)
}

const items = [
    {
        name: 'CloudNAS',
        isOpen: true,
        opened: true,
        disabled: true,
        active: true,
        openAll: true,
        path: '/Users/shenxian/CloudNAS',
        children: [
            {
                name: 'CloudDrive2',
                path: '/Users/shenxian/CloudNAS/CloudDrive2',
                children: [],
            },
        ],
    },
    {
        name: 'Desktop',
        path: '/Users/shenxian/Desktop',
        children: [
            {
                name: 'rarbg',
                path: '/Users/shenxian/Desktop/rarbg',
                children: [],
            },
            {
                name: '$RECYCLE.BIN',
                path: '/Users/shenxian/Desktop/$RECYCLE.BIN',
                children: [],
            },
            {
                name: '.DownieTemporaryFolder',
                path: '/Users/shenxian/Desktop/.DownieTemporaryFolder',
                children: [],
            },
            {
                name: '.ipynb_checkpoints',
                path: '/Users/shenxian/Desktop/.ipynb_checkpoints',
                children: [],
            },
            {
                name: '.overlays',
                path: '/Users/shenxian/Desktop/.overlays',
                children: [],
            },
            {
                name: '常用工具',
                path: '/Users/shenxian/Desktop/常用工具',
                children: [],
            },
        ],
    },
    {
        name: 'Downloads',
        path: '/Users/shenxian/Downloads',
        children: [
            {
                name: '$RECYCLE.BIN',
                path: '/Users/shenxian/Downloads/$RECYCLE.BIN',
                children: [],
            },
            {
                name: 'logo(1)',
                path: '/Users/shenxian/Downloads/logo(1)',
                children: [],
            },
            {
                name: 'png2',
                path: '/Users/shenxian/Downloads/png2',
                children: [],
            },
            {
                name: '日韩电影',
                path: '/Users/shenxian/Downloads/日韩电影',
                children: [],
            },
            {
                name: 'ymsj,gk',
                path: '/Users/shenxian/Downloads/ymsj,gk',
                children: [],
            },
        ],
    },
]
</script>

<style scoped></style>

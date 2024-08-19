<template>
  <v-treeview :items="data"></v-treeview>
</template>
<script setup>
  const data = [
    {
      name: 'CloudNAS',
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

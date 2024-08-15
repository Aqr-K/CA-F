<template>
    <v-layout>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div v-for="item in sync_list" :key="item.uuid" class=" my-5">
                <v-card class="pl-5" style="width: auto;">
                    <v-card-item class="pt-3 justify-start text-[36px] text-[#277DB0]">
                        <v-icon icon="mdi-cloud-sync-outline" class="mb-6"></v-icon>
                        <span class="ml-2">{{ item.task_name }}</span>
                    </v-card-item>
                    <v-card-text class="text-left ml-5 p-0">
                        <span class="text-[14px] font-bold">
                            媒体目录：{{ item.media_dir }}
                        </span></v-card-text>
                    <v-card-text class="text-left ml-5 p-0">
                        <span class="text-[14px] font-bold">
                            本地目录：{{ item.symlink_dir }}
                        </span>
                    </v-card-text>
                    <div class="grid grid-cols-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 ml-5">
                        <div class="flex items-center justify-center">
                            <span class="text-[14px] font-bold">
                                同步状态：
                            </span>
                            <v-switch v-model="item.sync_enabled"></v-switch>
                        </div>
                        <div class="flex items-center justify-center">
                            <span class="text-[14px] font-bold">
                                实时监控：
                            </span>
                            <v-switch v-model="item.observer_enabled"></v-switch>
                        </div>
                        <div class="flex items-center justify-center">
                            <span class="text-[14px] font-bold">
                                重启全同步：
                            </span>
                            <v-switch v-model="item.restart_sync_enabled"></v-switch>
                        </div>
                        <div class="flex items-center justify-center">
                            <span class="text-[14px] font-bold">
                                定时同步：
                            </span>
                            <v-switch v-model="item.sync_scheduled"></v-switch>
                        </div>
                        <div class="flex items-center justify-center">
                            <span class="text-[14px] font-bold">
                                定时备份：
                            </span>
                            <v-switch v-model="item.backup_scheduled"></v-switch>
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
    </v-layout>

</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
const sync_list = ref([{
    'task_name': '欧美电影', 'media_dir': '/Users/shenxian/CloudNAS/CloudDrive2/115/欧美电影', 'symlink_dir': '/Users/shenxian/Downloads/欧美电影', 'exclude_folder': '', 'sync_enabled': true, 'restart_sync_enabled': false, 'sync_scheduled': false, 'sync_time': '30 2 * * *', 'symlink_creator': true, 'metadata_copyer': false, 'metadata_covered': false, 'metadata_skipped': false, 'metadata_copyer_mode': '下载模式', 'num_threads': 1, 'symlink_dir_checker': false, 'symlink_checker': false, 'metadata_checker': false, 'observer_enabled': true, 'observer_time': 5, 'observer_symlink_creator': true, 'observer_metadata_copyer': false, 'observer_symlink_checker': true, 'observer_metadata_checker': true, 'backup_scheduled': false, 'backup_time': '30 2 * * *', 'backup_ext': '*.*', 'symlink_mode': 'strm', 'symlink_size': 0, 'strm_mode': 'local', 'cloud_type': 'cd2', 'cloud_url': 'localhost:19798', 'clouddrive2_path': '/Users/shenxian/CloudNAS/CloudDrive2', 'alist_path': '', 'symlink_ext': '.mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov;.bif', 'metadata_ext': '.nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac', 'uuid': 'b7d3a003-79af-4d5c-a2b5-1f418ef42b18', 'init_sync': true
},
{ 'task_name': '华语电影', 'media_dir': '/Users/shenxian/CloudNAS/CloudDrive2/115/华语电影', 'symlink_dir': '/Users/shenxian/Downloads/华语电影', 'exclude_folder': '', 'sync_enabled': true, 'restart_sync_enabled': false, 'sync_scheduled': false, 'sync_time': '30 2 * * *', 'symlink_creator': true, 'metadata_copyer': false, 'metadata_covered': false, 'metadata_skipped': false, 'metadata_copyer_mode': '下载模式', 'num_threads': 1, 'symlink_dir_checker': false, 'symlink_checker': false, 'metadata_checker': false, 'observer_enabled': true, 'observer_time': 5, 'observer_symlink_creator': true, 'observer_metadata_copyer': false, 'observer_symlink_checker': true, 'observer_metadata_checker': true, 'backup_scheduled': false, 'backup_time': '30 2 * * *', 'backup_ext': '*.*', 'symlink_mode': 'strm', 'symlink_size': 0, 'strm_mode': 'local', 'cloud_type': 'cd2', 'cloud_url': 'localhost:19798', 'clouddrive2_path': '/Users/shenxian/CloudNAS/CloudDrive2', 'alist_path': '', 'symlink_ext': '.mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov;.bif', 'metadata_ext': '.nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac', 'uuid': 'b7d3a003-79af-4d5c-a2b5-1f418ef42b18', 'init_sync': true },
{ 'task_name': '日韩电影', 'media_dir': '/Users/shenxian/CloudNAS/CloudDrive2/115/日韩电影', 'symlink_dir': '/Users/shenxian/Downloads/日韩电影', 'exclude_folder': '', 'sync_enabled': true, 'restart_sync_enabled': false, 'sync_scheduled': false, 'sync_time': '30 2 * * *', 'symlink_creator': true, 'metadata_copyer': false, 'metadata_covered': false, 'metadata_skipped': false, 'metadata_copyer_mode': '下载模式', 'num_threads': 1, 'symlink_dir_checker': false, 'symlink_checker': false, 'metadata_checker': false, 'observer_enabled': true, 'observer_time': 5, 'observer_symlink_creator': true, 'observer_metadata_copyer': false, 'observer_symlink_checker': true, 'observer_metadata_checker': true, 'backup_scheduled': false, 'backup_time': '30 2 * * *', 'backup_ext': '*.*', 'symlink_mode': 'strm', 'symlink_size': 0, 'strm_mode': 'local', 'cloud_type': 'cd2', 'cloud_url': 'localhost:19798', 'clouddrive2_path': '/Users/shenxian/CloudNAS/CloudDrive2', 'alist_path': '', 'symlink_ext': '.mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov;.bif', 'metadata_ext': '.nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac', 'uuid': 'b7d3a003-79af-4d5c-a2b5-1f418ef42b18', 'init_sync': true },
{ 'task_name': '动画电影', 'media_dir': '/Users/shenxian/CloudNAS/CloudDrive2/115/动画电影', 'symlink_dir': '/Users/shenxian/Downloads/动画电影', 'exclude_folder': '', 'sync_enabled': true, 'restart_sync_enabled': false, 'sync_scheduled': false, 'sync_time': '30 2 * * *', 'symlink_creator': true, 'metadata_copyer': false, 'metadata_covered': false, 'metadata_skipped': false, 'metadata_copyer_mode': '下载模式', 'num_threads': 1, 'symlink_dir_checker': false, 'symlink_checker': false, 'metadata_checker': false, 'observer_enabled': true, 'observer_time': 5, 'observer_symlink_creator': true, 'observer_metadata_copyer': false, 'observer_symlink_checker': true, 'observer_metadata_checker': true, 'backup_scheduled': false, 'backup_time': '30 2 * * *', 'backup_ext': '*.*', 'symlink_mode': 'strm', 'symlink_size': 0, 'strm_mode': 'local', 'cloud_type': 'cd2', 'cloud_url': 'localhost:19798', 'clouddrive2_path': '/Users/shenxian/CloudNAS/CloudDrive2', 'alist_path': '', 'symlink_ext': '.mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov;.bif', 'metadata_ext': '.nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac', 'uuid': 'b7d3a003-79af-4d5c-a2b5-1f418ef42b18', 'init_sync': true },
{ 'task_name': '日韩电影', 'media_dir': '/Users/shenxian/CloudNAS/CloudDrive2/115/日韩电影', 'symlink_dir': '/Users/shenxian/Downloads/日韩电影', 'exclude_folder': '', 'sync_enabled': true, 'restart_sync_enabled': false, 'sync_scheduled': false, 'sync_time': '30 2 * * *', 'symlink_creator': true, 'metadata_copyer': false, 'metadata_covered': false, 'metadata_skipped': false, 'metadata_copyer_mode': '下载模式', 'num_threads': 1, 'symlink_dir_checker': false, 'symlink_checker': false, 'metadata_checker': false, 'observer_enabled': true, 'observer_time': 5, 'observer_symlink_creator': true, 'observer_metadata_copyer': false, 'observer_symlink_checker': true, 'observer_metadata_checker': true, 'backup_scheduled': false, 'backup_time': '30 2 * * *', 'backup_ext': '*.*', 'symlink_mode': 'strm', 'symlink_size': 0, 'strm_mode': 'local', 'cloud_type': 'cd2', 'cloud_url': 'localhost:19798', 'clouddrive2_path': '/Users/shenxian/CloudNAS/CloudDrive2', 'alist_path': '', 'symlink_ext': '.mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov;.bif', 'metadata_ext': '.nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac', 'uuid': 'b7d3a003-79af-4d5c-a2b5-1f418ef42b18', 'init_sync': true },
{ 'task_name': '日韩电影', 'media_dir': '/Users/shenxian/CloudNAS/CloudDrive2/115/日韩电影', 'symlink_dir': '/Users/shenxian/Downloads/日韩电影', 'exclude_folder': '', 'sync_enabled': true, 'restart_sync_enabled': false, 'sync_scheduled': false, 'sync_time': '30 2 * * *', 'symlink_creator': true, 'metadata_copyer': false, 'metadata_covered': false, 'metadata_skipped': false, 'metadata_copyer_mode': '下载模式', 'num_threads': 1, 'symlink_dir_checker': false, 'symlink_checker': false, 'metadata_checker': false, 'observer_enabled': true, 'observer_time': 5, 'observer_symlink_creator': true, 'observer_metadata_copyer': false, 'observer_symlink_checker': true, 'observer_metadata_checker': true, 'backup_scheduled': false, 'backup_time': '30 2 * * *', 'backup_ext': '*.*', 'symlink_mode': 'strm', 'symlink_size': 0, 'strm_mode': 'local', 'cloud_type': 'cd2', 'cloud_url': 'localhost:19798', 'clouddrive2_path': '/Users/shenxian/CloudNAS/CloudDrive2', 'alist_path': '', 'symlink_ext': '.mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov;.bif', 'metadata_ext': '.nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac', 'uuid': 'b7d3a003-79af-4d5c-a2b5-1f418ef42b18', 'init_sync': true },
{ 'task_name': '日韩电影', 'media_dir': '/Users/shenxian/CloudNAS/CloudDrive2/115/日韩电影', 'symlink_dir': '/Users/shenxian/Downloads/日韩电影', 'exclude_folder': '', 'sync_enabled': true, 'restart_sync_enabled': false, 'sync_scheduled': false, 'sync_time': '30 2 * * *', 'symlink_creator': true, 'metadata_copyer': false, 'metadata_covered': false, 'metadata_skipped': false, 'metadata_copyer_mode': '下载模式', 'num_threads': 1, 'symlink_dir_checker': false, 'symlink_checker': false, 'metadata_checker': false, 'observer_enabled': true, 'observer_time': 5, 'observer_symlink_creator': true, 'observer_metadata_copyer': false, 'observer_symlink_checker': true, 'observer_metadata_checker': true, 'backup_scheduled': false, 'backup_time': '30 2 * * *', 'backup_ext': '*.*', 'symlink_mode': 'strm', 'symlink_size': 0, 'strm_mode': 'local', 'cloud_type': 'cd2', 'cloud_url': 'localhost:19798', 'clouddrive2_path': '/Users/shenxian/CloudNAS/CloudDrive2', 'alist_path': '', 'symlink_ext': '.mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov;.bif', 'metadata_ext': '.nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac', 'uuid': 'b7d3a003-79af-4d5c-a2b5-1f418ef42b18', 'init_sync': true },
{ 'task_name': '日韩电影', 'media_dir': '/Users/shenxian/CloudNAS/CloudDrive2/115/日韩电影', 'symlink_dir': '/Users/shenxian/Downloads/日韩电影', 'exclude_folder': '', 'sync_enabled': true, 'restart_sync_enabled': false, 'sync_scheduled': false, 'sync_time': '30 2 * * *', 'symlink_creator': true, 'metadata_copyer': false, 'metadata_covered': false, 'metadata_skipped': false, 'metadata_copyer_mode': '下载模式', 'num_threads': 1, 'symlink_dir_checker': false, 'symlink_checker': false, 'metadata_checker': false, 'observer_enabled': true, 'observer_time': 5, 'observer_symlink_creator': true, 'observer_metadata_copyer': false, 'observer_symlink_checker': true, 'observer_metadata_checker': true, 'backup_scheduled': false, 'backup_time': '30 2 * * *', 'backup_ext': '*.*', 'symlink_mode': 'strm', 'symlink_size': 0, 'strm_mode': 'local', 'cloud_type': 'cd2', 'cloud_url': 'localhost:19798', 'clouddrive2_path': '/Users/shenxian/CloudNAS/CloudDrive2', 'alist_path': '', 'symlink_ext': '.mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov;.bif', 'metadata_ext': '.nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac', 'uuid': 'b7d3a003-79af-4d5c-a2b5-1f418ef42b18', 'init_sync': true },
{ 'task_name': '日韩电影', 'media_dir': '/Users/shenxian/CloudNAS/CloudDrive2/115/日韩电影', 'symlink_dir': '/Users/shenxian/Downloads/日韩电影', 'exclude_folder': '', 'sync_enabled': true, 'restart_sync_enabled': false, 'sync_scheduled': false, 'sync_time': '30 2 * * *', 'symlink_creator': true, 'metadata_copyer': false, 'metadata_covered': false, 'metadata_skipped': false, 'metadata_copyer_mode': '下载模式', 'num_threads': 1, 'symlink_dir_checker': false, 'symlink_checker': false, 'metadata_checker': false, 'observer_enabled': true, 'observer_time': 5, 'observer_symlink_creator': true, 'observer_metadata_copyer': false, 'observer_symlink_checker': true, 'observer_metadata_checker': true, 'backup_scheduled': false, 'backup_time': '30 2 * * *', 'backup_ext': '*.*', 'symlink_mode': 'strm', 'symlink_size': 0, 'strm_mode': 'local', 'cloud_type': 'cd2', 'cloud_url': 'localhost:19798', 'clouddrive2_path': '/Users/shenxian/CloudNAS/CloudDrive2', 'alist_path': '', 'symlink_ext': '.mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov;.bif', 'metadata_ext': '.nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac', 'uuid': 'b7d3a003-79af-4d5c-a2b5-1f418ef42b18', 'init_sync': true },

])
</script>
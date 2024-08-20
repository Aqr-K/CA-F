export interface SyncItem {
  id: string;
  task_name: string;
  media_dir: string;
  symlink_dir: string;
  exclude_folder: string;
  sync_enabled: boolean;
  restart_sync_enabled: boolean;
  sync_scheduled: boolean;
  sync_time: string | number; // e.g., cron expression like "30 2 * * *"
  symlink_creator: boolean;
  metadata_copyer: boolean;
  metadata_covered: boolean;
  metadata_skipped: boolean;
  metadata_copyer_mode: string; // e.g., "下载模式"
  num_threads: number;
  symlink_dir_checker: boolean;
  symlink_checker: boolean;
  metadata_checker: boolean;
  observer_enabled: boolean;
  observer_symlink_creator: boolean;
  observer_metadata_copyer: boolean;
  observer_symlink_checker: boolean;
  observer_metadata_checker: boolean;
  observer_time: number; // e.g., time in seconds or minutes
  backup_scheduled: boolean;
  backup_time: string | number; // e.g., cron expression like "30 2 * * *"
  backup_ext: string; // e.g., file extensions like "*.*"
  symlink_mode: string; // e.g., "symlink"
  strm_mode: string; // e.g., "cloud"
  symlink_size: number; // e.g., size in MB or GB
  cloud_type: string; // e.g., "cd2"
  cloud_url: string;
  clouddrive2_path: string;
  alist_path: string;
  symlink_ext: string; // e.g., ".mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov"
  metadata_ext: string; // e.g., ".nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac"
}

export interface SaveResponse {
  save_status: boolean;
  message: string;
}

export type SyncList = SyncItem[];

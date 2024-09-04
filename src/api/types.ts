export interface SyncItem {
  task_name: string;
  media_dir: string;
  symlink_dir: string;
  exclude_folder: string;
  sync_mode: string;
  media_dir_id: string | number;
  temp_dir_id: string | number;
  settings_115: string;
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
  observer_mode: string;
  cloud_mount_watcher: string;
  observer_symlink_creator: boolean;
  observer_metadata_copyer: boolean;
  observer_symlink_checker: boolean;
  observer_metadata_checker: boolean;
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
  id: string;
  cloud_status_enabled: boolean;
  cloud_status_group: string;
}

export interface GlobalSettings {
  start_delay: number;
  debug_mode: boolean;
  config_file_watcher: boolean;
  backup_dir: string;
  username: string;
  password: string;
  http_proxy: string;
}

export interface TelegramSettings {
  switch: boolean;
  bot_token: string;
  chat_id: string;
  user_id: string;
  admin_id: string;
  observer_started: boolean;
  observer_enabled: boolean;
  cloud_watcher_enabled: boolean;
  sync_completed: boolean;
  backup_completed: boolean;
  cloud_path_unmount: boolean;
  filetrans_enbaled: boolean;
}

export interface Settings115 {
  name: string;
  cookies: string;
}

export interface CloudStatusSettings {
  name: string;
  sign_file: string;
  sign_file_url: string;
}

export interface SaveResponse {
  success: boolean;
  message: string;
  data: any;
}

export type SyncList = SyncItem[];

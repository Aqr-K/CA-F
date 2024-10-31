export const SyncItemVar = {
  id: "",
  task_name: "",
  media_dir: "",
  symlink_dir: "",
  exclude_dir_path: "",
  exclude_dir_name: "",
  sync_mode: "常规同步",
  settings_115: "",
  sync_scheduled: false,
  sync_time: "30 2 * * *",
  symlink_creator: false,
  force_symlink: false,
  force_strm: false,
  metadata_copyer: false,
  metadata_covered: false,
  metadata_copyer_mode: "下载模式",
  num_threads: 0,
  symlink_dir_checker: false,
  symlink_checker: false,
  metadata_checker: false,
  observer_enabled: false,
  observer_mode: "事件通知",
  observer_delay: 0,
  observer_symlink_creator: false,
  observer_metadata_copyer: false,
  observer_symlink_checker: false,
  observer_metadata_checker: false,
  backup_scheduled: false,
  backup_time: "30 2 * * *",
  backup_ext: "*.*",
  strm_mode: "local",
  symlink_size: 0,
  cloud_type: "cd2",
  cloud_url: "http://ip:port",
  cloud_url_suffix: "",
  cloud_root_path: "",
  cloud_name: "",
  symlink_ext: ".mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov",
  strm_ext: ".mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov",
  metadata_ext: ".nfo;.jpg;jpeg;.png;.svg;.ass;.srt;.sup;.mp3;.flac;.wav;.aac",
  cloud_status_enabled: false,
  cloud_status_group: "",
};

export const SyncTemplateVar = { ...SyncItemVar, task_name: "默认模板" };

export const FileIconVar = {
  zip: "mdi-folder-zip-outline",
  rar: "mdi-folder-zip-outline",
  htm: "mdi-language-html5",
  html: "mdi-language-html5",
  js: "mdi-nodejs",
  json: "mdi-file-document-outline",
  md: "mdi-language-markdown-outline",
  pdf: "mdi-file-pdf-box",
  png: "mdi-file-image",
  jpg: "mdi-file-image",
  jpeg: "mdi-file-image",
  mp4: "mdi-filmstrip",
  mkv: "mdi-filmstrip",
  avi: "mdi-filmstrip",
  wmv: "mdi-filmstrip",
  mov: "mdi-filmstrip",
  txt: "mdi-file-document-outline",
  xls: "mdi-file-excel",
  other: "mdi-file-outline",
};

// 媒体服务器默认配置
export const MediaServerVar = {
  name: "",
  host: "",
  api_key: "",
  time_delay: 0,
  filepath_mapping: "",
  switch: false,
};

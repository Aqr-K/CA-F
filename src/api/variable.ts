export const SyncItemVar = {
  id: "",
  task_name: "",
  media_dir: "",
  symlink_dir: "",
  exclude_folder: "",
  sync_mode: "常规同步",
  media_dir_id: "",
  temp_dir_id: "",
  settings_115: "",
  sync_scheduled: false,
  sync_time: "",
  symlink_creator: false,
  metadata_copyer: false,
  metadata_covered: false,
  metadata_skipped: false,
  metadata_copyer_mode: "",
  num_threads: 0,
  symlink_dir_checker: false,
  symlink_checker: false,
  metadata_checker: false,
  observer_enabled: false,
  observer_mode: "事件通知",
  observer_symlink_creator: false,
  observer_metadata_copyer: false,
  observer_symlink_checker: false,
  observer_metadata_checker: false,
  backup_scheduled: false,
  backup_time: "",
  backup_ext: "",
  symlink_mode: "",
  strm_mode: "",
  symlink_size: 0,
  cloud_type: "",
  cloud_url: "",
  clouddrive2_path: "",
  alist_path: "",
  symlink_ext: "",
  metadata_ext: "",
  cloud_status_enabled: false,
  cloud_status_group: "",
};

export const SyncTemplateVar = { ...SyncItemVar, task_name: "默认模板" };

export interface SyncItem {
  id: string | number;
  task_name: string;
  media_dir: string;
  symlink_dir: string;
  sync_enabled: boolean;
  observer_enabled: boolean;
  restart_sync_enabled: boolean;
  sync_scheduled: boolean;
  backup_scheduled: boolean;
}

export type SyncList = SyncItem[];

export interface SyncItem {
  task_name: string;
  media_dir: string;
  symlink_dir: string;
  exclude_dir_path: string;
  exclude_dir_name: string;
  sync_mode: string;
  settings_115: string;
  sync_scheduled: boolean;
  sync_time: string | number; // e.g., cron expression like "30 2 * * *"
  symlink_creator: boolean;
  force_symlink: boolean;
  force_strm: boolean;
  metadata_copyer: boolean;
  metadata_covered: boolean;
  metadata_copyer_mode: string; // e.g., "下载模式"
  num_threads: number;
  symlink_dir_checker: boolean;
  symlink_checker: boolean;
  metadata_checker: boolean;
  observer_enabled: boolean;
  observer_mode: string;
  observer_delay: number;
  observer_symlink_creator: boolean;
  observer_metadata_copyer: boolean;
  observer_symlink_checker: boolean;
  observer_metadata_checker: boolean;
  backup_scheduled: boolean;
  backup_time: string | number; // e.g., cron expression like "30 2 * * *"
  backup_ext: string; // e.g., file extensions like "*.*"
  strm_mode: string; // e.g., "cloud"
  strm_prefix: string;
  symlink_size: number; // e.g., size in MB or GB
  cloud_type: string; // e.g., "cd2"
  cloud_url: string;
  cloud_url_suffix: string;
  cloud_root_path: string;
  cloud_name: string;
  symlink_ext: string; // e.g., ".mkv;.iso;.ts;.mp4;.avi;.rmvb;.wmv;.m2ts;.mpg;.flv;.rm;.mov"
  strm_ext: string;
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
  default_dir: string;
  username: string;
  password: string;
  http_proxy: string;
  api_token: string;
}

export interface TelegramSettings {
  switch: boolean;
  bot_token: string;
  chat_id: string;
  user_id: string;
  admin_id: string;
  symlink_watcher: boolean;
  cloud_wathcer: boolean;
  sync_task: boolean;
  backup_task: boolean;
  cloud_status: boolean;
  filetrans_task: boolean;
}

export interface Settings115 {
  name: string;
  cookies: string;
  status: boolean;
}

export interface CloudStatus {
  name: string;
  sign_file: string;
  sign_file_url: string;
}

export interface CloudMountWatcher {
  switch: boolean;
  cloud_dir: string;
}

export interface SaveResponse {
  success: boolean;
  message: string;
  data: any;
}

export interface FileItem {
  name: string; // 文件或目录的名称
  path: string; // 文件或目录的路径
  type: "dir" | "file"; // 类型：目录或文件
  size: number; // 文件或目录的大小（以字节为单位）
  extension: string; // 文件扩展名，如果是目录则为空字符串
  children: []; // 子文件或子目录
}

export type SyncList = SyncItem[];

// 下载目录/媒体库目录
export interface MediaDirectory {
  // 类型 download/library
  type?: string;
  // 别名
  name?: string;
  // 路径
  path?: string;
  // 媒体类型 电影/电视剧
  media_type?: string;
  //二级分类
  category?: string;
}

// 媒体信息
export interface MediaInfo {
  // 来源：themoviedb、douban、bangumi
  metadata_source?: string;
  // 类型 电影、电视剧
  type?: string;
  // 媒体标题
  title?: string;
  // 英文标题
  en_title?: string;
  // 新加坡标题
  sg_title?: string;
  // 年份
  year?: string;
  // 季
  season?: string;
  // 集
  episode?: string;
  videoFormat?: string;
  season_episode: string;
  part: string;
  effect: string;
  edition: string;
  resourceType: string;
  videoCodec: string;
  audioCodec: string;
  releaseGroup: string;
  // TMDB ID
  tmdbid?: number;
  // IMDB ID
  imdb_id?: string;
  // TVDB ID
  tvdb_id?: number;
  // 豆瓣ID
  douban_id?: string;
  // 媒体原语种
  original_language?: string;
  // 媒体原发行标题
  original_title?: string;
  // 媒体发行日期
  release_date?: string;
  // 背景图片
  backdrop_path?: string;
  // 海报图片
  poster_path?: string;
  // LOGO
  logo_path?: string;
  // 评分
  vote_average?: number;
  // 描述
  overview?: string;
  // 风格ID
  genre_ids?: number[];
  // 所有别名和译名
  names?: string[];
  // 各季的剧集清单信息
  seasons?: Record<number, any[]>; // 使用 any[] 以适应不同季节的内容
  // 各季详情
  season_info?: Record<string, any>[]; // 使用 Record<string, any> 以适应不同的季节详情
  // 各季的年份
  season_years?: Record<number, number>; // 季节年份映射
  // 二级分类
  category?: string;
  // TMDB INFO
  tmdb_info?: Record<string, any>; // 使用 Record<string, any> 以适应 TMDB 信息
  // 豆瓣 INFO
  douban_info?: Record<string, any>; // 使用 Record<string, any> 以适应豆瓣信息
  // 导演
  directors?: Record<string, any>[]; // 使用 Record<string, any> 以适应导演信息
  // 演员
  actors?: Record<string, any>[]; // 使用 Record<string, any> 以适应演员信息
  // 是否成人内容
  adult?: boolean;
  // 创建人
  created_by?: Record<string, any>[]; // 使用 Record<string, any> 以适应创建人信息
  // 集时长
  episode_run_time?: number[]; // 使用 number[] 以适应时长
  // 风格
  genres?: Record<string, any>[]; // 使用 Record<string, any> 以适应风格信息
  // 首播日期
  first_air_date?: string;
  // 首页
  homepage?: string;
  // 语种
  languages?: string[];
  // 最后上映日期
  last_air_date?: string;
  // 流媒体平台
  networks?: string[];
  // 集数
  number_of_episodes?: number;
  // 季数
  number_of_seasons?: number;
  // 原产国
  origin_country?: string[];
  // 原名
  original_name?: string;
  // 出品公司
  production_companies?: string[];
  // 出品国
  production_countries?: string[];
  // 语种
  spoken_languages?: string[];
  // 状态
  status?: string;
  // 标签
  tagline?: string;
  // 评价数量
  vote_count?: number;
  // 流行度
  popularity?: number;
  // 时长
  runtime?: number;
  // 下一集
  next_episode_to_air?: Record<string, any>; // 使用 Record<string, any> 以适应下一集信息
}

// TMDB季信息
export interface TmdbSeason {
  // 上映日期
  air_date?: string;
  // 总集数
  episode_count?: number;
  // 季名称
  name?: string;
  // 描述
  overview?: string;
  // 海报
  poster_path?: string;
  // 季号
  season_number?: number;
  // 评分
  vote_average?: number;
}

// TMDB集信息
export interface TmdbEpisode {
  // 上映日期
  air_date?: string;
  // 集号
  episode_number?: number;
  // 剧集名称
  name?: string;
  // 描述
  overview?: string;
  // 时长
  runtime?: number;
  // 季号
  season_number?: number;
  // 海报
  still_path?: string;
  // 评分
  vote_average?: number;
  // 演职人员
  crew: Object[];
  // 嘉宾
  guest_stars: Object[];
}

// 上下文信息
export interface Context {
  // 媒体信息
  media_info: MediaInfo;
  new_filename: string;
}

// 上下文信息
export interface TransferWatcher {
  source_dir: string; // 源目录路径
  dest_dir: string; // 目标目录路径
  transfer_type: string; // 传输类型，例如 'move' 或 'copy'
  watch_mode: string; // 监视模式，例如 'Observer'
  scrape: boolean; // 是否抓取元数据
  auto_category: boolean; // 是否自动分类
  switch: boolean; // 文件传输是否启用
  exclude_words: string;
  id: string; // 唯一标识符，可选
}

export interface CustomWords {
  replace_words: string;
  release_group: string;
  exclude_words: string;
}

// 历史记录
export interface TransferHistory {
  // ID
  id: number;
  // 源目录
  src?: string;
  // 目的目录
  dest?: string;
  // 转移模式link/copy/move/softlink/rclone_copy/rclone_move
  mode?: string;
  // 类型：电影、电视剧
  type?: string;
  // 二级分类
  category?: string;
  // 标题
  title?: string;
  // 年份
  year?: string;
  // TMDBID
  tmdbid?: number;
  // IMDBID
  imdbid?: string;
  // TVDBID
  tvdbid?: number;
  // 豆瓣ID
  doubanid?: string;
  // 季Sxx
  seasons?: string;
  // 集Exx
  episodes?: string;
  // 季集
  season_episode?: string;
  // 海报
  image?: string;
  // 下载器Hash
  download_hash?: string;
  // 状态 1-成功，0-失败
  status: boolean;
  // 失败原因
  errmsg?: string;
  // 日期
  date?: string;
}
// 媒体服务器配置
export interface MediaServer {
  // 主机名称
  name: string;
  // 主机地址
  host: string;
  // API 密钥
  api_key: string;
  // 时间延迟（秒）
  time_delay: number;
  // 文件路径映射
  filepath_mapping: string;
  // 是否启用
  switch: boolean;
}

export interface TransferConfig {
  // 源目录
  source_dir: string | null;
  // 目标目录
  dest_dir?: string;
  // 文件列表
  file_list?: string[];
  // 文件路径
  file_path?: string;
  // TMDB ID
  tmdbid?: string;
  // 豆瓣 ID
  doubanid?: string;
  // 季数
  season?: number;
  // 媒体类型
  media_type?: string;
  // 转移类型
  transfer_type: string;
  // 剧集格式
  episode_format?: string;
  // 剧集详情
  episode_detail?: string;
  // 剧集分段
  episode_part?: string;
  // 剧集偏移
  episode_offset?: number;
  // 最小文件大小
  min_filesize: number;
  // 后缀
  suffix: string;
  // 是否刮削
  scrape: boolean;
  // 是否自动分类
  auto_category: boolean;
  // 是否强制
  force: boolean;
}

export const plugins = [
  {
    name: "EmbyServer",
    path: "embyserver",
    desc: "同步生成Strm｜软链接后自动发送通知给Emby进行扫描",
    color: "green",
    icon: "./src/assets/icons/Emby_A.png",
    component: () => import("@/views/plugins/EmbyServerView.vue"),
  },
  {
    name: "PlexServer",
    path: "plexserver",
    desc: "同步生成Strm｜软链接后自动发送通知给Plex进行扫描",
    color: "#c98b35",
    icon: "./src/assets/icons/Plex_A.png",
    component: () => import("@/views/plugins/PlexServerView.vue"),
  },
];

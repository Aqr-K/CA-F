import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // 如果页面有缓存那么恢复其位置, 否则始终滚动到顶部
    if (to.meta.keepAlive && savedPosition) return savedPosition;
    return { top: 0 };
  },
  routes: [
    { path: "/", redirect: "/dashboard" },
    {
      path: "/",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "dashboard",
          component: () => import("../pages/dashboard.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "sync_list",
          component: () => import("../pages/sync_list.vue"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});
export default router;

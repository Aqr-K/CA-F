import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { plugins } from "@/api/plugins";

// 插件路由配置字典
const pluginRoutes = ref(
  plugins.reduce((routes, plugin) => {
    routes[plugin.path] = {
      path: `/plugins/${plugin.path}`,
      component: plugin.component,
    };
    return routes;
  }, {})
);

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
      name: "main",
      component: () => import("@/layouts/default.vue"),
      children: [
        {
          path: "dashboard",
          component: () => import("@/pages/dashboard.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "logs",
          component: () => import("@/pages/logs.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "sync_list",
          component: () => import("@/pages/sync_list.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: "sync_config",
          path: "sync_config/:id",
          component: () => import("@/pages/sync_config.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "add_sync",
          component: () => import("@/pages/add_sync.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "sync_task",
          component: () => import("@/pages/sync_task.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "file_transfer",
          component: () => import("@/pages/file_transfer.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "transfer_history",
          component: () => import("@/pages/transfer_history.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "file_manager",
          component: () => import("@/pages/file_manager.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "plugins",
          component: () => import("@/pages/plugins.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "settings",
          component: () => import("@/pages/settings.vue"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/",
      component: () => import("@/layouts/blank.vue"),
      children: [
        {
          path: "login",
          component: () => import("@/pages/login.vue"),
        },
        {
          path: "/:pathMatch(.*)*",
          component: () => import("@/pages/[...all].vue"),
        },
      ],
    },
  ],
});

const childrenRoutes = Object.values(pluginRoutes.value).map((route: any) => ({
  path: route.path,
  component: route.component,
  meta: {
    requiresAuth: true,
  },
}));

// 使用 router.addRoute 添加子路由
childrenRoutes.forEach((route) => {
  router.addRoute("main", route); // 假设主路由的 name 是 'main'
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.token !== null;
  // 总是记录非/login的路由
  if (to.fullPath != "/login") authStore.originalUrl = to.fullPath;
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;

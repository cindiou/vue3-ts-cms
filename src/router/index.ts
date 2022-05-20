import {
  createRouter,
  createWebHistory,
  // eslint-disable-next-line
  createWebHashHistory,
} from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import cache from "utils/localCache";
import { firstMenu } from "@/utils/useMenusMapper";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("views/login/Login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("views/main/Main.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("views/not-found/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  //history: createWebHistory(process.env.BASE_URL),
  routes,
});

// eslint-disable-next-line
router.beforeEach((to) => {
  // 注意如果是返回具体的值，那么就参数不能有next
  if (to.path !== "/login") {
    if (!cache.get("token")) {
      return "/login";
    }
    if (to.path === "/main") {
      // console.log("跳转路由:", firstMenu);

      return firstMenu;
    }
  } else {
    if (cache.get("token")) {
      return "/main";
    }
  }
});

export default router;

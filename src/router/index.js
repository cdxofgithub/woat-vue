import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" }
      }
    ]
  },
  {
    path: "/function",
    component: Layout,
    redirect: "/function/custom-menu",
    name: "Function",
    meta: { title: "功能", icon: "example" },
    children: [
      {
        path: "custom-menu",
        name: "Custom-menu",
        component: () => import("@/views/custom-menu/index"),
        meta: { title: "自定义菜单", icon: "table" }
      },
      {
        path: "custom-reply",
        name: "Custom-reply",
        component: () => import("@/views/custom-reply/index"),
        meta: { title: "自动回复", icon: "nested" }
      }
    ]
  },
  {
    path: "/table",
    component: Layout,
    redirect: "/table/photo",
    name: "table",
    meta: { title: "审核", icon: "example" },
    children: [
      {
        path: "photo",
        name: "table-photo",
        component: () => import("@/views/table/photo"),
        meta: { title: "图片审核", icon: "user" }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

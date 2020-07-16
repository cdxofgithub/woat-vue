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
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" }
      }
    ]
  }
];
export const asyncRoutes = [
  {
    path: "/user",
    component: Layout,
    redirect: "/user/user-list",
    name: "User",
    meta: { title: "用户管理", icon: "user" },
    children: [
      {
        path: "user-list",
        name: "User-list",
        component: () => import("@/views/user/user-list"),
        meta: { title: "用户列表", icon: "table" }
      },
      {
        path: "user-add",
        name: "User-add",
        component: () => import("@/views/user/user-add"),
        meta: { title: "新增用户", icon: "edit" }
      },
    ]
  },
  {
    path: "/function",
    component: Layout,
    redirect: "/function/custom-menu",
    name: "Function",
    meta: { title: "微信模块", icon: "example" },
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
        meta: { title: "自动回复", icon: "table" }
      }
    ]
  },
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    alwaysShow: true, // will always show the root menu
    name: "Permission",
    meta: {
      title: "权限控制",
      icon: "lock",
      roles: ["admin", "editor"] // you can set roles in root nav
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page"),
        name: "PagePermission",
        meta: {
          title: "页面权限",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      },
      {
        path: "role",
        component: () => import("@/views/permission/role"),
        name: "RolePermission",
        meta: {
          title: "角色权限",
          roles: ["admin"]
        }
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

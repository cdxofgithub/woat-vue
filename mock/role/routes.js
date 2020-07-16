/**
 * @description mock路由数据
 * @author devin
 */

export const constantRoutes = [
  {
    path: "/login",
    component: () => "views/login/index",
    hidden: true
  },

  {
    path: "/404",
    component: () => "views/404",
    hidden: true
  },

  {
    path: "/",
    component: "Layout",
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => "views/dashboard/index",
        meta: { title: "首页", icon: "dashboard" }
      }
    ]
  },
  {
    path: "/function",
    component: "Layout",
    redirect: "/function/custom-menu",
    name: "Function",
    meta: { title: "功能", icon: "example" },
    children: [
      {
        path: "custom-menu",
        name: "Custom-menu",
        component: () => "views/custom-menu/index",
        meta: { title: "自定义菜单", icon: "table" }
      },
      {
        path: "custom-reply",
        name: "Custom-reply",
        component: () => "views/custom-reply/index",
        meta: { title: "自动回复", icon: "table" }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];
export const asyncRoutes = [
  {
    path: "/permission",
    component: "Layout",
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
        component: () => "views/permission/page",
        name: "PagePermission",
        meta: {
          title: "页面权限",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      },
      {
        path: "role",
        component: () => "views/permission/role",
        name: "RolePermission",
        meta: {
          title: "角色权限",
          roles: ["admin"]
        }
      }
    ]
  }
];

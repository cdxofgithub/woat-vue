/**
 * @description mock路由数据
 * @author devin
 */

export const constantRoutes = [
  {
    path: "/login",
    hidden: true
  },
  {
    path: "/404",
    hidden: true
  },
  {
    path: "/",
    children: [
      {
        path: "dashboard",
        meta: { title: "首页", icon: "dashboard" }
      }
    ]
  }
];
export const asyncRoutes = [
  {
    path: "/user",
    meta: { title: "用户管理", icon: "user" },
    children: [
      {
        path: "user-list",
        name: "User-list",
        meta: { title: "用户列表", icon: "table" }
      },
      {
        path: "user-add",
        name: "User-add",
        meta: { title: "新增用户", icon: "edit" }
      },
    ]
  },
  {
    path: "/function",
    redirect: "/function/custom-menu",
    name: "Function",
    meta: { title: "微信模块", icon: "example" },
    children: [
      {
        path: "custom-menu",
        name: "Custom-menu",
        meta: { title: "自定义菜单", icon: "table" }
      },
      {
        path: "custom-reply",
        name: "Custom-reply",
        meta: { title: "自动回复", icon: "table" }
      }
    ]
  },
  {
    path: "/permission",
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
        name: "PagePermission",
        meta: {
          title: "页面权限",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      },
      {
        path: "role",
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
export const asyncRoutes = [
  {
    path: "/user",
    name: "User",
    meta: { title: "用户管理", icon: "user" },
  },
  {
    path: "user-list",
    name: "User-list",
    component: () => import("@/views/user/user-list"),
    meta: { title: "用户列表", icon: "table" }
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];
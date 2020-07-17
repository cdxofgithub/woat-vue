export const serverAsyncRouter = [
  {
    path: "/function",
    meta: { title: "微信模块", roles: ['admin', 'editor']},
    children: [
      {
        path: "custom-menu",
        meta: { title: "自定义菜单", roles: ['admin', 'editor'] }
      }
    ]
  },
  {
    path: "/permission",
    meta: {
      title: "权限控制",
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: "page",
        meta: {
          title: "页面权限",
          roles: ['admin', 'editor']
        }
      },
      {
        path: "role",
        meta: {
          title: "角色权限",
          roles: ['admin', 'editor']
        }
      }
    ]
  },
];
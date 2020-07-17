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
];
import request from "@/utils/request"

export const getRoutes = () => {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

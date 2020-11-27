import request from '@/utils/request'

export function getOpusList(query) {
  return request({
    url: '/admin/opus_list',
    method: 'get',
    params: query
  })
}
export function reviewOpus(data) {
  return request({
    url: '/admin/review_opus',
    method: 'post',
    data
  })
}

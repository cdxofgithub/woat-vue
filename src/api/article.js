import request from '@/utils/request'

export function getOpusList(query) {
  return request({
    url: '/opus_list',
    method: 'get',
    params: query
  })
}
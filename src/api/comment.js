import request from '@/utils/request'

export function getCommentsByShopId(cid) {
  return request({
    url: '/shops/' + cid + '/comments',
    method: 'get'
  })
}

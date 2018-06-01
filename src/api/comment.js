import request from '@/utils/request'

export function getComments() {
  return request({
    url: '/comments',
    method: 'get'
  })
}

export function getCommentsByShopId(cid) {
  return request({
    url: '/shops/' + cid + '/comments',
    method: 'get'
  })
}

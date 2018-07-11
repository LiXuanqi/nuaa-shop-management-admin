import request from '@/utils/request'

export function getComments() {
  return request({
    url: '/comments',
    method: 'get'
  })
}

export function getCommentsByShopId(sid) {
  return request({
    url: `/shops/${sid}/comments`,
    method: 'get'
  })
}

export function deleteComment(cid) {
  return request({
    url: `/comments/${cid}`,
    method: 'delete'
  })
}

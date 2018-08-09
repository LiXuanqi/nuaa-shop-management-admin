import request from '@/utils/request'
import { getToken } from '@/utils/auth' // getToken from cookie

export function addReply(commentId, data) {
  return request({
    url: '?service=App.Admin.Reply',
    method: 'post',
    data: {
      commentid: commentId,
      detail: data.content,
      token: getToken()
    }
  })
}

export function editReply(commentId, data) {
  return request({
    url: '?service=App.Admin.ChangeAdminReply',
    method: 'post',
    data: {
      commentid: commentId,
      detail: data.content,
      token: getToken()
    }
  })
}

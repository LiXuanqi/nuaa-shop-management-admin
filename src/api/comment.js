import request from '@/utils/request'
import { getToken } from '@/utils/auth' // getToken from cookie

export function getComments() {
  return new Promise((resolve) => {
    request({
      url: '?service=App.Admin.AllComments',
      method: 'post'
    }).then((res) => {
      console.log(res)
      const formatedData = {
        data: {
          comments: res['data'].map((item) => {
            let checkStatus = ''
            if (item.status === '0') {
              checkStatus = '审核中'
            } else if (item.status === '1') {
              checkStatus = '失败'
            } else {
              checkStatus = '成功'
            }
            return {
              ...item,
              checkStatus: checkStatus,
              adminReplyStatus: item.adminReplyStatus === '-1' ? '未回复' : '已回复',
              ownerReplyStatus: item.ownerReplyStatus === '-1' ? '未回复' : '已回复'
            }
          })
        }
      }
      resolve(formatedData)
    })
  })
}

export function getCommentsByShopId(sid) {
  return new Promise((resolve) => {
    request({
      url: '?service=App.Admin.GetComment',
      method: 'post',
      data: {
        shopid: sid
      }
    }).then((res) => {
      console.log(res)
      const formatedData = {
        data: {
          comments: res['data'].map((item) => {
            let checkStatus = ''
            if (item.status === '0') {
              checkStatus = '审核中'
            } else if (item.status === '1') {
              checkStatus = '失败'
            } else {
              checkStatus = '成功'
            }
            return {
              ...item,
              checkStatus: checkStatus,
              adminReplyStatus: item.adminReplyStatus === '-1' ? '未回复' : '已回复',
              ownerReplyStatus: item.ownerReplyStatus === '-1' ? '未回复' : '已回复'
            }
          })
        }
      }
      resolve(formatedData)
    })
  })
}

export function checkCommentPass(cid) {
  return request({
    url: '?service=App.Admin.ValidComment',
    method: 'post',
    data: {
      cid: cid,
      token: getToken()
    }
  })
}

export function checkCommentRej(cid) {

}

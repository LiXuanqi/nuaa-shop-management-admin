import request from '@/utils/request'
import { getToken } from '@/utils/auth' // getToken from cookie

export function getShops() {
  return new Promise((resolve) => {
    request({
      url: '?service=App.Admin.AllShops',
      method: 'post'
    }).then((res) => {
      const formatedData = {
        data: {
          shops: res.data.map((item) => {
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
              checkStatus: checkStatus
            }
          })
        }
      }
      resolve(formatedData)
    })
  })
}

export function getShop(sid) {
  return request({
    url: '?service=App.Admin.GetShop',
    method: 'post',
    data: {
      id: sid
    }
  })
}

export function getQiniuToken() {
  return request({
    url: '?service=App.Admin.GetQiniu',
    method: 'post',
    data: {
      token: getToken()
    }
  })
}

export function addShop(data) {
  const workStartTime = data.workTime[0].toTimeString().split(' ')[0]
  const workEndTime = data.workTime[1].toTimeString().split(' ')[0]
  return request({
    url: '?service=App.Admin.AddShop',
    method: 'post',
    data: {
      ...data,
      workStartTime: workStartTime,
      workEndTime: workEndTime,
      token: getToken()
    }
  })
}

export function checkShopPass(sid) {
  return request({
    url: '?service=App.Admin.ValidShop',
    method: 'post',
    data: {
      sid: parseInt(sid),
      token: getToken()
    }
  })
}

export function checkShopRej(sid) {
  return request({
    url: '?service=App.Admin.DelShop',
    method: 'post',
    data: {
      sid: sid,
      token: getToken()
    }
  })
}

export function editShop(sid, data) {
  const workStartTime = data.workTime[0].toTimeString().split(' ')[0]
  const workEndTime = data.workTime[1].toTimeString().split(' ')[0]
  return request({
    url: '?service=App.Admin.UpdateShop',
    method: 'post',
    data: {
      ...data,
      workStartTime: workStartTime,
      workEndTime: workEndTime,
      sid: sid,
      token: getToken()
    }
  })
}

export function deleteShop(sid) {
  return request({
    url: '?service=App.Admin.DelShop',
    method: 'post',
    data: {
      sid: sid,
      token: getToken()
    }
  })
}

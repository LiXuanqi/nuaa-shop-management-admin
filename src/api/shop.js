import request from '@/utils/request'

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

export function getQiniuToken(token) {
  return request({
    url: '?service=App.Admin.GetQiniu',
    method: 'post',
    data: {
      token: token
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
      workEndTime: workEndTime
    }
  })
}

export function checkShopPass(sid) {

}

export function checkShopRej(sid, reason) {

}

export function editShop(sid, data) {
  console.log(data)
}

export function deleteShop(sid) {
  return request({
    url: `/shops/${sid}`,
    method: 'delete'
  })
}

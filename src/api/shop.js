import request from '@/utils/request'

export function getShops() {
  return request({
    url: '/shops',
    method: 'get'
  })
}

export function getShop(sid) {
  return request({
    url: '/shops/' + sid,
    method: 'get'
  })
}

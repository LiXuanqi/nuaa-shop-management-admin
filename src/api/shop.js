import request from '@/utils/request'

export function getShops() {
  return request({
    url: '/shops',
    method: 'get'
  })
}

export function getShop(sid) {
  return request({
    url: `/shops/${sid}`,
    method: 'get'
  })
}

export function addShop() {

}

export function checkShop() {

}

export function editShop(sid, data) {
  return request({
    url: `/shops/${sid}`,
    method: 'put',
    data
  })
}

export function deleteShop(sid) {
  return request({
    url: `/shops/${sid}`,
    method: 'delete'
  })
}

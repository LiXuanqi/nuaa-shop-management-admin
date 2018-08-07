import request from '@/utils/request'
import base64url from 'base64url'

export function login(username, password) {
  return request({
    url: '?service=App.Admin.Login',
    method: 'post',
    data: {
      uname: username,
      passwd: password
    }
  })
}

export function getInfo(token) {
  const payload = token.split('.')
  const data = JSON.parse(base64url.decode(payload[1]))
  return new Promise((resolve) => {
    resolve({
      ...data,
      roles: data.admin === '0' ? ['owner'] : ['admin'],
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    })
  })
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

export function logout() {
  return new Promise((resolve) => {
    resolve()
  })
}

export function register(username, password) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

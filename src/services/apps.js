import request from '../utils/request';
import qs from 'qs'

export async function login(params) {
  return request('/api/login', {
    method: 'post',
    body:params,
  })
}
export async function logout(params) {
  return request('/api/logout', {
    method: 'post',
    body:params,
  })
}


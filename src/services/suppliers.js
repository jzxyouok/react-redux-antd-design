import request from '../utils/request';
import qs from 'qs';

export async function initSupplier(params) {
  return request('http://192.168.1.202:8080/supplier/init');
}
export async function supplier(params) {
  return request('http://192.168.1.202:8080/supplier?' + qs.stringify(params));
}
export async function update(params) {
  return request('http://192.168.1.202:8080/supplier/' + params.id,{
    method: 'put',
    body: qs.stringify({ ...params }),
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
}
export async function remove(params) {
  return request('/supplier/' + params , {
    method: 'delete',
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
}
export async function create(params) {
	params = {...params};
  return request('http://192.168.1.202:8080/supplier/', {
    method: 'post',
    body: qs.stringify({...params}),
    mode: "cors",
    headers: {
    	"Content-Type": "application/x-www-form-urlencoded"
    },
  });
}


import request from '../utils/request';
import qs from 'qs';

export async function query(params) {
  return request('http://192.168.1.202:8080/product?'+qs.stringify(params));
}

export async function update(params) {
	params = {...params , type1:params.type1[0],type2:params.type1[1],unit:params.unit[0],productStatus:params.productStatus[0],modelStatus:params.modelStatus[0],supplier:params.supplier[0],brand:params.brand[0]}
  return request('http://192.168.1.202:8080/product/'+params.id, {
    method: 'post',
    body: qs.stringify({ ...params }),
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
}

export async function remove(params) {
  return request('http://192.168.1.202:8080/product/'+params.id, {
    method: 'delete',
    mode: "cors",
  });
}
export async function create(params) {
	params = {...params};
  return request('http://192.168.1.202:8080/product/', {
    method: 'post',
    body: qs.stringify({...params}),
    mode: "cors",
    headers: {
    	"Content-Type": "application/x-www-form-urlencoded"
    },
  });
}
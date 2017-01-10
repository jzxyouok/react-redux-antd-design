import request from '../utils/request';
import qs from 'qs';

export async function query(params) {
  return request('http://192.168.1.202:8080/floor?'+qs.stringify(params));
}
export async function init(params) {
  return request('http://192.168.1.202:8080/floor/init/');
}
export async function supplier( ) {
  return request('http://192.168.1.202:8080/supplier/init?');
}
export async function remove(params) {
  return request('http://192.168.1.202:8080/floor/'+params.id, {
    method: 'delete',
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
}
export async function update(params) {
	params = {...params , type1:params.typeToString[0],type2:params.typeToString[1],type3:params.typeToString[2],typeToString:null};
  return request('http://192.168.1.202:8080/floor/'+params.floorId, {
    method: 'put',
    body: qs.stringify({ ...params }),
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
}
export async function create(params) {
	params = {...params , type1:params.typeToString[0],type2:params.typeToString[1],type3:params.typeToString[2],typeToString:null};
	console.log(params);
  return request('http://192.168.1.202:8080/floor/', {
    method: 'post',
    body: qs.stringify({...params}),
    mode: "cors",
    headers: {
    	"Content-Type": "application/x-www-form-urlencoded"
    },
  });
}


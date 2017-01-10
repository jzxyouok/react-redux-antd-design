import request from '../utils/request';
import qs from 'qs';

export async function listBySupplierId(params) {
  return request('http://192.168.1.202:8080/brand/list/'+params.data);
}


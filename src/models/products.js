import { hashHistory } from 'dva/router';

import { query ,update ,remove,create} from '../services/products';
import { initSupplier } from '../services/suppliers';
import { listBySupplierId } from '../services/brands';
import { parse } from 'qs';

export default {
  namespace: 'products',
	state: {
	    list: [],
	    suppliers:[],
	    brands:[],
	    field: '',
	    keyword: '',
	    total: null,
	   	loading: false, // 控制加载状态
	   	
	   	delAll:false,
	   	selectedRowKeys:[],
	   	
	   	
	    current: null, // 当前分页信息
	    currentItem: {}, // 当前操作的用户对象
	    modalVisible: false, // 弹出窗的显示状态
	    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
	},
  // Quick Start 已经介绍过 subscriptions 的概念，这里不在多说
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/product_management/products') {
          dispatch({
            type: 'query',
            payload: location.query
          });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { select, call, put }){
    	  yield put({ type: 'showLoading' });
    	  yield put({
	        type: 'updateQueryKey',
	        payload: { page: 1, field: '', keyword: '', ...payload },
        });
	      const { data } = yield call(query, payload);
	      console.log(data);
	      if (data) {
	        yield put({
	          type: 'querySuccess',
	          payload: {
	            list: data.data.products.list,
	            total: data.data.products.total,
	            current: data.data.products.pageNum,
	            type:data.data.type,
	            unit:data.data.unit,
	            status:data.data.status,
	            modelStatus:data.data.modelStatus
	          }
	        });
	      }
	      const suppliers = yield call(initSupplier);
	      if(suppliers.data){
	      	yield put({
	      		type:'suppliersInit',
	      		payload:{
	      			suppliers:suppliers.data.data.result
	      		}
	      	});
	      }
	      
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const { data } = yield call(create, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
          },
        });
      }
    },
   	*'delete'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(remove, { id: payload });
      if (data && data.success) {
      	const { data } = yield call(query);
        yield put({
          type: 'deleteSuccess',
          payload:data.data.products.list,
        });
      }
    },
    *update({ payload }, { select, call, put }) {
	      yield put({ type: 'hideModal' });
	      yield put({ type: 'showLoading' });
	      const id = yield select(({ products }) => products.currentItem.id);
	      //产品列表编辑保存之后下拉字段在产品集合中回显转换====start======
	      const ps = yield select(({ products }) => products);
	      const unit = ps.unit;
	      const modelStatus = ps.modelStatus;
	      const productStatus = ps.status;
	      const type = ps.type;
	      
	      const unitDict = toDict(payload.unit[0],unit);
	      const modelStatusDict = toDict(payload.modelStatus[0],modelStatus);
	      const productStatusDict = toDict(payload.productStatus[0],productStatus);
	      const parentDict = toDict(payload.type1[0],type);
	      
	      var typeChildren;
	      for(var t of type){
	      	if(t.id===payload.type1[0]){
	      		typeChildren = t.children;
	      		break;
	      	}
	      }
	      const childrenDict = toDict(payload.type1[1],typeChildren);
	       //产品列表编辑保存之后下拉字段在产品集合中回显转换====start======
	      const newProduct = { ...payload, id,unitDict,modelStatusDict,productStatusDict,parentDict,childrenDict};
	      const { data } = yield call(update, newProduct);
	      if (data && data.httpCode===200) {
	        yield put({
	          type: 'updateSuccess',
	          payload: newProduct,
	        });
	      }else{
	      	
	      }
    },
    *onSupplierChange({ payload }, { select, call, put }){
    	 const { data } = yield call(listBySupplierId, payload);
    	 if(data){
    	 	yield put({
	      		type:'updateBrands',
	      		payload:{
	      			brands:data.data
	      		}
	      });
    	}
    		
    },
  },
  reducers: {
    showLoading(state, action){
      return { ...state, loading: true };
    }, // 控制加载状态的 reducer
    // 使用静态数据返回
    querySuccess(state,action){
      return {...state, ...action.payload, loading: false};
    },
    createSuccess(){},
    deleteSuccess(state, action) {
//    const id = action.payload;
//    const newList = state.list.filter(product => product.id !== id);
      return { ...state, list: action.payload, loading: false };
    },
    updateSuccess(state, action) {
      const updateProduct = action.payload;
      console.log(state);
      const newList = state.list.map(product => {
        if (product.id === updateProduct.id) {
          return { ...product, ...updateProduct };
        }
        return product;
      });
      return { ...state, list: newList, loading: false };
    },
    searchSuccess(state,action) {
      return { ...state, ...action.payload, loading: false };
    },
    showSelection(state,action) {
    	return { ...state,...action.payload,delAll:true}
    },
    hideSelection(state,action) {
    	return { ...state,delAll:false}
    },
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    suppliersInit(state,action){
    	return {...state, ...action.payload,modalVisible: false }
    },
    updateBrands(state,action){
    	return {...state, ...action.payload}
    },
  }
}

function toDict(id,dict){
	 for(var u of dict){
      	if(u.id===id){
      		return {...u};
      	}
      }
}

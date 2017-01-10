import { hashHistory } from 'dva/router';

import { supplier,update,remove,create} from '../services/suppliers';
import { parse } from 'qs';

export default {
	namespace: 'suppliers',
	state: {
		list: [],
		field: '',
	    keyword: '',
		total: null,
		loading: false,
		
		delAll:false,
	   	selectedRowKeys:[],
	   	
		current: null, // 当前分页信息
		currentItem: {}, // 当前操作的用户对象
		modalVisible: false, // 弹出窗的显示状态
	    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
	},
	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				if (location.pathname === '/supplier_management/suppliers') {
					dispatch({
						type: 'query',
						payload: location.query
					})
				}
			})
		}
	},
	effects: {
		*query({ payload }, { select, call, put }){
    	  yield put({ type: 'showLoading' });
    	  yield put({
	        type: 'updateQueryKey',
	        payload: { page: 1, field: '', keyword: '', ...payload },
        });
	      const { data } = yield call(supplier, payload);
	      if (data) {
	        yield put({
	          type: 'querySuccess',
	          payload: {
	            list: data.data.result.list,
	            total: data.data.result.total,
	            current: data.data.result.pageNum,
	          }
	        });
	      }
    	},
    	*update({ payload },{ select,call,put}) {
    		yield put({ type: 'hideModal' });
	        yield put({ type: 'showLoading' });
	        const id = yield select(({ suppliers }) => suppliers.currentItem.id);
	        const newSupplier = { ...payload,id};
	        const { data } = yield call(update, newSupplier);
	        if (data) {
		        yield put({
		          type: 'updateSuccess',
		          payload: newSupplier,
		        });
	      }
    	},
    	*'delete'({ payload },{ call, put}) {
    		yield put({ type: 'showLoading'});
    		const { data } = yield call(remove,payload);
    		const supplierList = yield call(supplier);
    		if(data.message == '删除成功.') {
    			yield put({
    				type: 'deleteSuccess',
    				payload:supplierList,
    			})
    		}
    	},
    	*create({ payload }, { select,call, put }) {
	      yield put({ type: 'hideModal' });
	      yield put({ type: 'showLoading' });
	      const { data } = yield call(create, {...payload});
	      const supplierList = yield call(supplier);
	      if (data.message == '添加成功.') {
	        yield put({
	          type: 'createSuccess',
	          payload:supplierList,
	        });
	      }
	    },
	},
	reducers: {
		updateSuccess(state, action) {
	      const updateSupplier = action.payload;
	      const newList = state.list.map(supplier => {
	        if (supplier.id === updateSupplier.id) {
	          return { ...supplier, ...updateSupplier };
	        }
	        return supplier;
	      });
	      return { ...state, list: newList, loading: false };
	    },
	    deleteSuccess(state, action) {
		  const newList = action.payload.data.data.result.list;
		  const newTotal = action.payload.data.data.result.total;
		  const newCurrent = action.payload.data.data.result.pageNum;
	      return { ...state, list: newList,total:newTotal,current:newCurrent,loading: false,selectedRowKeys:[]};
	    },
	    createSuccess(state,action){
	    	const newList = action.payload.data.data.result.list;
	    	const newTotal = action.payload.data.data.result.total;
		    const newCurrent = action.payload.data.data.result.pageNum;
	      	return {...state, list: newList,total:newTotal,current:newCurrent,loading: false};
	    },
		showLoading(state, action){
	      	return { ...state, loading: true };
	    }, 
	    querySuccess(state,action){
	      	return {...state, ...action.payload, loading: false};
	    },
	    showModal(state, action) {
      		return { ...state, ...action.payload, modalVisible: true };
	    },
	    hideModal(state) {
	      	return { ...state, modalVisible: false };
	    },
	    updateQueryKey(state, action) {
	     	 return { ...state, ...action.payload };
	    },
	    showSelection(state,action) {
    		return { ...state,...action.payload,delAll:true}
	    },
	    hideSelection(state,action) {
	    	return { ...state,delAll:false}
	    },
	}
}

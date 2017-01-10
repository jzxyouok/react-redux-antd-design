import { create, remove, update, query,init} from '../services/ceramics';
import { listBySupplierId } from '../services/brands';
import { initSupplier } from '../services/suppliers';
import { parse } from 'qs';

export default {
  namespace: 'ceramics',
	state: {
	    list: [],  
	    unit: [],  
	    status:[],  
	    materialTexture:[],
	    type: [],
	    suppliers: [],
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
	    modalVisibleInit: false, // 弹出窗的显示状态
	    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
	},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/material_management/ceramics') {
          dispatch({
            type: 'query',
            payload: location.query
          });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(query, parse(payload));
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.result.list,
            total: data.data.result.total,
            current: data.data.result.pageNum,
          },
        });
      };
      const initFloor = yield call(init, parse(payload));
      if (initFloor) {
      	yield put({
      		type: 'querySuccess',
      		payload: {
      			unit: initFloor.data.unit, 
      			status: initFloor.data.status,
      			materialTexture: initFloor.data.materialTexture,
      			types:initFloor.data.type,
      		}
      	});
      };
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
    *onSupplierChange({ payload }, { select, call, put }){
    	 const { data } = yield call(listBySupplierId, payload);
    	 if (data) {
      	yield put({
      		type: 'updateBrands',
      		payload: {
      			brands: data.data,
      		}
      	});
      };
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const { data } = yield call(create, payload);
      console.log(data);
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
      const data = yield call(remove, { id: payload });
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current,
            field: '',
            keyword: '',
          },
        });
      }
    },
    *update({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const id = yield select(({ ceramics }) => ceramics.currentItem.id);
      const floorId = yield select(({ ceramics }) => ceramics.currentItem.floorId);
      
      const type1 = payload.typeToString[0];
      const type2 = payload.typeToString[1];
      const type3 = payload.typeToString[2];
      
      const newCeramic = { ...payload, id, floorId,type1,type2,type3};
      
      const  data  = yield call(update, newCeramic);
      if (data) {
        yield put({
          type: 'updateSuccess',
          payload: newCeramic,
        });
      }
    },
  },
  
  reducers: {
    showLoading(state, action){
      return { ...state, loading: true };
    }, 
    querySuccess(state,action){
      return {...state, ...action.payload, loading: false};
    },
    updateSuccess(state, action) {
      const updateCeramic = action.payload;
      const newList = state.list.map(ceramic => {
        if (ceramic.id === updateCeramic.id) {
          return { ...ceramic, ...updateCeramic };
        }
        return ceramic;
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
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true};
    },
    hideModal(state) {
      return { ...state, modalVisible: false};
    },
    showModalInit(state, action) {
      return { ...state, ...action.payload, modalVisibleInit: true};
    },
    hideModalInit(state) {
      return { ...state, modalVisibleInit: false};
    },
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },
    suppliersInit(state,action){
    	return {...state, ...action.payload,modalVisible: false }
    },
    updateBrands(state,action){
    	return {...state, ...action.payload}
    }
  }
}

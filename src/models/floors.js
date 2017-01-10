import { create, remove, update, query,init,supplier} from '../services/floors';
import { listBySupplierId } from '../services/brands';
import { parse } from 'qs';

export default {
  namespace: 'floors',
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
        if (location.pathname === '/material_management/floors') {
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
      const initFloor = yield call(init, parse(payload));
      const initSupplier = yield call(supplier);
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
      if (initSupplier) {
      	yield put({
      		type: 'querySuccess',
      		payload: {
      			suppliers: initSupplier.data.data.result,
      		}
      	});
      };
    },
    *onSupplierChange({ payload }, { select, call, put }){
    	 const { data } = yield call(listBySupplierId, payload);
    	 if (data) {
      	yield put({
      		type: 'querySuccess',
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
      const id = yield select(({ floors }) => floors.currentItem.id);
      const floorId = yield select(({ floors }) => floors.currentItem.floorId);
      const floors = yield select(({ floors }) => floors);
      console.log(floors);
      
      const unit = floors.unit;
      const status = floors.status;
      const materialTexture = floors.materialTexture;
      
      const unitDict = toDict(payload.unit[0],unit);
      
      const type1 = payload.typeToString[0];
      const type2 = payload.typeToString[1];
      const type3 = payload.typeToString[2];
      
      const newFloor = { ...payload, id, floorId,type1,type2,type3,unitDict};
      
      const  data  = yield call(update, newFloor);
      if (data) {
        yield put({
          type: 'updateSuccess',
          payload: newFloor,
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
  }
}
function toDict(id,dict){
	 for(var u of dict){
      	if(u.id===id){
      		return {...u};
      	}
      }
}
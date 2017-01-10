import { hashHistory } from 'dva/router';
import {login,logout} from '../services/apps';
import {parse} from 'qs';
import Cookie from 'js-cookie'

export default {
  namespace: 'apps',
  state: {
  	login: true,
    loading: false,
    loginButtonLoading: false,
	  user: {  name: "吴彦祖"  },
	  logoSrc: '../../src/assets/login-account-logo.gif',
	  adminlogoSrc: '../../src/assets/admin_logo.jpg',
    siderFold:localStorage.getItem("antdAdminSiderFold")==="true"?true:false,
    darkTheme:localStorage.getItem("antdAdminDarkTheme")==="false"?false:true,
    isNavbar: document.body.clientWidth < 769,
    openKeys:[],
  },
  subscriptions : {
    setup({dispatch}) {
      dispatch({type: 'queryUser'})
      window.onresize = function () {
        dispatch({type: 'changeNavbar'})
      }
    }
  },
  effects: {
  	*login ({payload}, {call, put}) {
      yield put({type: 'showLoginButtonLoading'})
      const data = yield call(login, parse(payload))
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: payload.username
            }
          }})
      } else {
        yield put({
          type: 'loginFail'
        })
      }
    },
  	*changeNavbar ({payload}, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
    }
  },
  reducers: {
  	loginSuccess (state, action) {
      return {...state,...action.payload,login: true,loginButtonLoading: false}
    },
    loginFail (state) {
      return {...state,login: false,loginButtonLoading: false}
    },
    showLoginButtonLoading (state) {
      return {...state,loginButtonLoading: true}
    },
    showLoading (state) {
      return {...state,loading: true}
    },
    hideLoading (state) {
      return { ...state,loading: false}
    },
    handleSwitchSider(state, action) {
    	localStorage.setItem("antdAdminSiderFold",!state.darkTheme)
      return { ...state, ...action.payload,siderFold: !state.siderFold}
    },
    handleChangeTheme(state) {
      localStorage.setItem("antdAdminDarkTheme",!state.darkTheme)
      return { ...state, darkTheme: !state.darkTheme }
    },
    onOpenChange(state,action) {
    	const openKeys = action.payload;
	    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
	    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
	    let nextOpenKeys = [];
	    if (latestOpenKey) {
	      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
	    }
	    if (latestCloseKey) {
	      nextOpenKeys = getAncestorKeys(latestCloseKey);
	    }
		  function getAncestorKeys(key) {
		    const map = {
		      sub1: ['sub1'],
		      sub2: ['sub2'],
		      sub3: ['sub3'],
		    };
		    return map[key] || [];
		  }
    return { ...state,openKeys: nextOpenKeys }
	  },
	  showNavbar (state) {
      return {...state,isNavbar: true}
    },
    hideNavbar (state) {
      return {...state,isNavbar: false}
    },
  }
}

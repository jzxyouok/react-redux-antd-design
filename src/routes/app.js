import React, {PropTypes} from 'react'
// 引入 connect 工具函数
import {connect} from 'dva';
import { routerRedux } from 'dva/router';

import Login from './login'
import Header from '../components/layout/header'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import Sider from '../components/layout/sider'

import styles from '../components/layout/main.less'
import {Spin,message} from 'antd'
import {classnames} from '../utils'
import '../components/layout/common.less'

function App({children, location,dispatch, apps}) {
	const {login, loading, loginButtonLoading,user,logoSrc,adminlogoSrc,siderFold,darkTheme,openKeys,isNavbar} = apps
	
	const loginProps = {
		loading,
		adminlogoSrc,
		loginButtonLoading,
		onOk (data) {
	      dispatch({
	      	type: 'app/login', 
	      	payload: data
	      })
       }
  }
	const headerProps = {
		user,
		siderFold,
		location,
		isNavbar,
	    onlogout() {
	      dispatch({type: 'apps/logout'})
	},
    onSwitchSider() {
      dispatch({
      	type: 'apps/handleSwitchSider',
      });
    },
	}
	const siderProps = {
	user,
	logoSrc,
    siderFold,
    darkTheme,
    location,
    openKeys,
    onChangeTheme(){
      dispatch({type: 'apps/handleChangeTheme'})
    },
  	onOpenChange(openKeys) {
	    dispatch({
      	type:'apps/onOpenChange',
      	payload: openKeys,
      });
	},


	}
  return (
    <div>{login
		?<div className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
		  {!isNavbar ? 	<aside className={classnames(styles.sider,{[styles.light]:!darkTheme})}>
               <Sider {...siderProps}/>
            </aside> : ''}
	        <div className={styles.main}>
	          <Header {...headerProps}/>
	          <Bread location={location}/>
	          <div className={styles.container}>
	            <div className={styles.content}>
	              {children}
	            </div>
	          </div>
	          <Footer/>
	        </div>
		</div>
		: <div className={styles.spin}><Spin tip='加载用户信息...' spinning={loading} size='large'><Login {...loginProps} /></Spin></div>}
    </div>
  )
}

App.propTypes = {
  apps: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  login: PropTypes.bool,
}

function mapStateToProps({ apps }) {
	return {apps};
}
export default connect(mapStateToProps)(App);

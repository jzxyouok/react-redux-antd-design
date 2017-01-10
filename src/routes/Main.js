import React, { Component, PropTypes } from 'react';
import { Link} from 'dva/router';
import { Breadcrumb} from 'antd';
import styles from './Main.less';

import SupplierList from '../components/Supplier/SupplierList';
import FloorList from '../components/Floors/FloorList';

import { Menu, Switch,Icon} from 'antd';
const SubMenu = Menu.SubMenu;

// 配置导航
const Main = React.createClass({
  getInitialState() {
    return {
      current: '',
      openKeys: [],
    };
  },
  handleClick(e) {
    this.setState({ current: e.key });
  },
  onOpenChange(openKeys) {
    const state = this.state;
    console.log(state);
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  },
  getAncestorKeys(key) {
    const map = {
      sub3: ['sub3'],
    };
    return map[key] || [];
  },
  render() {
    return (
      <div>
        <div className={styles.leftMenu}> 
        	<img src='../src/assets/login-account-logo.gif' className={styles.logo}/>
            <Menu theme="dark"
                mode="inline"
		        openKeys={this.state.openKeys}
		        selectedKeys={[this.state.current]}
		        style={{ width: 185 }}
		        onOpenChange={this.onOpenChange}
		        onClick={this.handleClick}
            >
                <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>材料管理</span></span>}>
                    <Menu.Item key="1"><Link to="/ceramics">材料数据库</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>产品管理</span></span>}>
                    <Menu.Item key="22"><Link to="/products">产品数据库(新)</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>主材管理</span></span>}>
                    <Menu.Item key="3"><Link to="/ceramics">瓷砖数据库</Link></Menu.Item>
                    <Menu.Item key="4">壁纸数据库</Menu.Item>
                    <Menu.Item key="5"><Link to="/ceramics">乳胶漆数据库</Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/FloorList">地板数据库</Link></Menu.Item>
                    <Menu.Item key="7"><Link to="/floor">地板数据库(新)</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="appstore" /><span>供应商管理</span></span>}>
                    <Menu.Item key="7"><Link to="/SupplierList">供应商数据</Link></Menu.Item>
                </SubMenu>
            </Menu>
        </div>
        
        <div className={styles.rightWrap}>
            <Menu mode="horizontal" style={{float:'right'}}>
                <SubMenu title={<span><Icon type="user"/>hahah{ this.state.username }</span>}>
                    <Menu.Item key="setting:1">退出</Menu.Item>
                </SubMenu>
            </Menu>
            <div className={styles.rightBox}>
            		{this.props.children}
            </div>
        </div>
      </div>
    );
  },
});

export default Main;

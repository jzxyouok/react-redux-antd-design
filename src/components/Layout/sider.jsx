import React, { PropTypes } from 'react'
import { Menu, Icon, Switch } from 'antd'
import { Link } from 'dva/router'
import styles from './main.less'
import { config, menu } from '../../utils'


const topMenus = menu.map( item => item.key)
const getMenus = function (menuArray,siderFold,parentPath) {
  parentPath = parentPath || '/'
  return menuArray.map(item => {
    if (!!item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold&&topMenus.indexOf(item.key)>=0 ? '' : item.name}</span>}>
          {getMenus(item.child,siderFold,parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {siderFold&&topMenus.indexOf(item.key)>=0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

function Sider({ 
	user,
	logoSrc,
	siderFold,
	darkTheme,
	location,
	onChangeTheme,
	openKeys,
  onOpenChange,
}) {
  return (
    <div>
      <div className={styles.logo}>
        <img src={logoSrc} />
        {siderFold?'':<span>{user.name}</span>}
      </div>
      <Menu
        mode={siderFold?"vertical":"inline"}
        theme={darkTheme?"dark":"light"}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1]||'sub1/1']}
        >
        {getMenus(menu,siderFold)}
      </Menu>
      {!siderFold?<div className={styles.switchtheme}>
        <span><Icon type="bulb" />切换主题</span>
        <Switch onChange={onChangeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白" />
      </div>:''}
    </div>
  )
}

Sider.propTypes = {
	location: PropTypes.object,
  onChangeTheme: PropTypes.func,
  onOpenChange: PropTypes.func,
  openKeys: PropTypes.array,
  siderFold:PropTypes.bool,
  darkTheme:PropTypes.bool,
  user: PropTypes.object,
  logoSrc: PropTypes.any,
}
export default Sider

import React, { PropTypes } from 'react'
import { Menu, Icon, Button } from 'antd'
import { Link } from 'dva/router'
import styles from './main.less'

const SubMenu = Menu.SubMenu

function Header({  
	user, 
	siderFold,
	onlogout, 
	onSwitchSider, 
}) {
  let onHandleClickMenu = e => {e.key === 'logout' && onlogout()};
  return (
    <div className={styles.header}>
      <div className={styles.siderbutton} onClick={onSwitchSider}>
        <Icon type={siderFold?"menu-unfold":"menu-fold"} />
      </div>
      <Menu className="header-menu" mode="horizontal" onClick={onHandleClickMenu}>
        <SubMenu style={{ float: 'right' }}
          title={<span><Icon type="user" />{user.name}</span>}
        >
          <Menu.Item key="logout">
            <a>注销</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

Header.propTypes = {
  onSwitchSider: PropTypes.func,
  onlogout: PropTypes.func,
  user: PropTypes.object,
  siderFold:PropTypes.bool,
}

export default Header

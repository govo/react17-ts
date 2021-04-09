import { UIEvent, useState } from 'react'
import { Avatar, Menu, Dropdown, Button, Space } from 'antd'

import { userService } from '@/pages/user/user.service'
import './UserAtPageHeader.less'
import { Link, useHistory } from 'react-router-dom'
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

function UserAtPageHeader () {
  const user = userService.getUserInfo()
  const [color] = useState(ColorList[0])
  const history = useHistory()
  const logoutHandler = async function (e: UIEvent) {
    e.preventDefault()
    try {
      await userService.logout()
      history.push('/logout')
    } catch (error) {

    }
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/me">我的账号</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a onClick={logoutHandler} href="/logout">退出登录</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="user__atPageHeader">
      <Dropdown overlay={menu}>
        <Button type="text" className="user__header-btn" size="large">
          <Space size="small">
            <Avatar className="user__header-icon" size="small" style={{ backgroundColor: color, verticalAlign: 'middle' }} >
              {user.username}
            </Avatar>
            <div className="user__header-name">
              {user.username}
            </div>
          </Space>
        </Button>
      </Dropdown>
    </div>
  )
}

export default UserAtPageHeader

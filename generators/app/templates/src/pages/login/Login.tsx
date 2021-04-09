import { Button, Input, Form, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useLocation, useHistory } from 'react-router-dom'
// import { history } from '@/utils/history'
import './Login.less'
import logo from '@/assets/img/logo.png'
import { userService, LoginProps } from '@/pages/user/user.service'
import { PrivateHistoryState } from '@/components/common/PrivateRoute'

const area = '地区'

export default function Login () {
  // const [form] = Form.useForm()
  const history = useHistory()
  const location = useLocation<PrivateHistoryState>()
  const onFinish = async (values: LoginProps) => {
    // console.log('Success:', values)
    const res = await userService.login(values)
    // console.log('res:', res)
    if (res.status === 200) {
      const { from } = location.state || { from: { pathname: '/' } }
      // console.log('push:', from)
      history.push(from)
    } else {
      console.log('error:', res)
    }
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo)
  }
  return (

    <div className="login">
      {/* <div className="logo">
        <img src={logo} alt="" />
      </div> */}
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          className="logo"
        >
          <img src={logo} alt="" />
          <div className="subtitle">
            {area}
          </div>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item
          className="pwd"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item className="option">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="remember-me">自动登录</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item className="login-btn-con">
          <Button className="login-btn" type="primary" htmlType="submit">
            登 录
          </Button>
        </Form.Item>

      </Form>

    </div>
  )
}

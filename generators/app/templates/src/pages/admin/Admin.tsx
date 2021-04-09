import React, { useState } from 'react'
import { Button, Descriptions, Result, Avatar, Space, Statistic } from 'antd'
import { LikeOutlined, UserOutlined } from '@ant-design/icons'

import type { ProSettings } from '@ant-design/pro-layout'
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout'
import defaultProps from './_defaultProps'
import proSettings from './_proSettings'
import UserAtPageHeader from '@/components/user/UserAtPageHeader'

import './Admin.less'

function Admin (props: { collapsed: boolean }) {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(proSettings)
  const [pathname, setPathname] = useState('/welcome')
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh'
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname
        }}
        waterMarkProps={{
          content: '用户名'
        }}

        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome')
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <div>
            <UserAtPageHeader />
          </div>
        )}
        {...settings}
      >
        <PageContainer
        // extraContent={
        //   <Space size={24}>
        //     <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
        //     <Statistic title="Unmerged" value={93} suffix="/ 100" />
        //   </Space>
        // }
        // extra={[
        //   <Button key="3">操作</Button>,
        //   <Button key="2">操作</Button>,
        //   <Button key="1" type="primary">
        //     主操作
        //   </Button>
        // ]}
        // footer={[
        //   <Button key="3">重置</Button>,
        //   <Button key="2" type="primary">
        //     提交
        //   </Button>
        // ]}
        >
          <div
            style={{
              height: '120vh'
            }}
          >
            <Result
              status="404"
              style={{
                height: '100%',
                background: '#fff'
              }}
              title="Hello World"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary">Back Home</Button>}
            />
          </div>
        </PageContainer>
      </ProLayout>
      {/* <SettingDrawer
        pathname={pathname}
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => setSetting(changeSetting)}
        disableUrlParams
      /> */}
    </div>
  )
}

export default Admin

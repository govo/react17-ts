import { ProSettings } from '@ant-design/pro-layout'

const Settings: Partial<ProSettings & {
  logo?: string,
  pwa: boolean
}> = {
  title: '芹菜游戏',
  fixSiderbar: true,
  navTheme: 'light',
  primaryColor: '#52C41A',
  contentWidth: 'Fluid'
}
export default Settings

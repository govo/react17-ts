/**
 * service 与UI无关
 */
export interface LoginProps {
  username: string
  password: string
  remember: boolean
}
export interface RequestProps {
  api: string
  data: unknown
  method?: string
}
export interface ResponseProps {
  status: number,
  data?: unknown,
  message?: string
}
export const userService = {
  async request (props: RequestProps): Promise<ResponseProps> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200
        })
      })
    })
  },
  async login (props: LoginProps): Promise<ResponseProps> {
    const rs = await this.request({
      api: '/login',
      data: props
    })
    if (rs.status === 200) {
      localStorage.setItem('username', props.username)
    }
    return rs
  },
  async logout (props: LoginProps): Promise<ResponseProps> {
    const rs = await this.request({
      api: '/logout',
      data: props
    })
    if (rs.status === 200) {
      localStorage.removeItem('username')
    }
    return rs
  }
}

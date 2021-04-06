import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom'
// import { accountService } from '@/service/account/account.service'

export interface PrivateRouteProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}
export interface PrivateHistoryState {
  pathname: string
  from: string
}
function PrivateRoute (props: PrivateRouteProps) {
  const { component: Component, ...rest } = props
  return (
    <Route {...rest} render={props => {
      const isLogin = localStorage.getItem('username')

      if (!isLogin) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }

      // logged in so return component
      return <Component {...props} />
    }} />
  )
}

export default PrivateRoute

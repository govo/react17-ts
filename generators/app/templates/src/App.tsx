import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Admin from '@/pages/admin/Admin'
import Login from '@/pages/login/Login'
import PrivateRouter from '@/components/common/PrivateRoute'

import './App.css'

function App () {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_PATH}>
        <>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <PrivateRouter exact path="/" component={Admin} />
            <Route exact path="/Login">
              <Login />
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </>
      </Router>
    </div>
  )
}

export default hot(module)(App)

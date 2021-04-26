import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from '../auth/PrivateRoute'
import Dashboard from '../user/Dashboard'
import AdminDashboard from '../user/AdminDashboard'
import Home from '../pages/Home'
import Menu from '../pages/Menu'
import SingIn from '../user/SingIn'
import SingUp from '../user/SingUp'
import AdminRoute from '../auth/AdminRoute'

const Routes = () => {
    return (
        <Router>
            <Menu />
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <Route exact path="/singin" component={SingIn} />
                <Route exact path="/singup" component={SingUp} />
            </Switch>
        </Router>
    )
}

export default Routes

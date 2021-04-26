import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Menu from '../pages/Menu'
import SingIn from '../user/SingIn'
import SingUp from '../user/SingUp'

const Routes = () => {
    return (
        <Router>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/singin" component={SingIn} />
                <Route exact path="/singup" component={SingUp} />
            </Switch>
        </Router>
    )
}

export default Routes

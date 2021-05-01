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
import AddCategory from '../admin/category/AddCategory'
import AddProduct from '../admin/product/AddProduct'
import NotFound from '../pages/NotFound'
import Shop from '../shop/Shop'
import Product from '../products/Product'
import Cart from '../cart/Cart'

const Routes = () => {
    return (
        <Router>
            <Menu />
            <Switch>
                
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoute exact path="/category/create" component={AddCategory} />
                <AdminRoute exact path="/product/create" component={AddProduct} />
                <AdminRoute exact path="/shop" component={Shop} />

                <Route exact path="/singin" component={SingIn} />
                <Route exact path="/singup" component={SingUp} />
                <Route exact path="/product/:id" component={Product} />
                <Route exact path="/cart" component={Cart} />

                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

export default Routes

import React, { Fragment ,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth/Authenticate'
import Layout from '../pages/Layout'
import './Dashboard.css'
const AdminDashboard = () => {
    // Get user informations from JWT
    const { user : {name , email , role} } = isAuthenticate();
    // Title of pages
    useEffect(() => {
        document.title = "Dashboard";
    })
    const adminInfo = ()=>{
        return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Admin informations</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <i class="fa fa-user-o" aria-hidden="true"></i>
                            {name}
                        </li>
                        <li className="list-group-item">
                            <i class="fa fa-at" aria-hidden="true"></i>
                            {email}
                        </li>
                        <li className="list-group-item">
                            <i class="fa fa-key" aria-hidden="true"></i>
                            {role ? 'Admin' : 'User'}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
    
    const adminLinks = ()=> {
        return(
            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Admin links</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                                        <Link className="nav-link" to="/category/create">+Category</Link>
                                    </li>
                                    <li className="list-group-item">
                                         <i class="fa fa-tags" aria-hidden="true"></i>
                                        <Link className="nav-link" to="/product/create">+Product</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
        )
    }
    return (
        <Fragment>
            <Layout
                title="Dashboard"
                description = {`Welcome ${name}`}
                className="container"
            >
                <div className="row">
                    <div className="col-md-3">
                        { adminLinks()}
                    </div>
                   
                   <div className="col-md-9">
                        {adminInfo()}
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export default AdminDashboard

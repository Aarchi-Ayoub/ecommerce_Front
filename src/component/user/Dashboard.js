import React, { Fragment ,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth/Authenticate'
import Layout from '../pages/Layout'
import './Dashboard.css'
const Dashboard = () => {
    // Get user informations from JWT
    const { user : {name , email , role} } = isAuthenticate();
    // Title of pages
    useEffect(() => {
        document.title = "Dashboard";
    })
    const userInfo = ()=>{
        return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">User informations</h5>
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
    const pushrase = ()=>{
        return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Pushrase histories</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                </div>
            </div>
        )
    }
    const userLinks = ()=> {
        return(
            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">User links</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
                                        <Link className="nav-link" to="">My card</Link>
                                    </li>
                                    <li className="list-group-item">
                                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                        <Link className="nav-link" to="">My profile</Link>
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
                        { userLinks()}
                    </div>
                   
                   <div className="col-md-9">
                        {userInfo()}
                        <hr/>
                        {pushrase()}
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export default Dashboard

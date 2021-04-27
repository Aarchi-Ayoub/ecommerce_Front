import React, { Fragment ,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth/Authenticate'
import Layout from '../pages/Layout'
import { BiUserCircle } from "react-icons/bi";
import { IoAddCircle , IoAtSharp , IoKeyOutline } from "react-icons/io5";
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
                           <BiUserCircle />{name} 
                        </li>
                        <li className="list-group-item">
                            <IoAtSharp />{email}
                        </li>
                        <li className="list-group-item">
                            <IoKeyOutline />{role ? 'Admin' : 'User'}
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
                            <Link className="nav-link" to="/category/create">
                                <IoAddCircle />
                                Add Category
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/product/create">
                                <IoAddCircle />
                                Add Product
                            </Link>
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

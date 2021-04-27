import React, { Fragment ,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth/Authenticate'
import Layout from '../pages/Layout'
import { BiUserCircle , BiCartAlt , BiUserPin } from "react-icons/bi";
import { IoAtSharp , IoKeyOutline } from "react-icons/io5";

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
                            <Link className="nav-link" to="">
                                <BiCartAlt/>
                                My card
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="">
                                <BiUserPin/>
                                My profile
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

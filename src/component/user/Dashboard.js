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
                            <BiUserCircle style={{marginRight:'0.5rem'}}/>{name}
                        </li>
                        <li className="list-group-item">
                            <IoAtSharp style={{marginRight:'0.5rem'}}/>{email}
                        </li>
                        <li className="list-group-item">
                            <IoKeyOutline style={{marginRight:'0.5rem'}}/>{role ? 'Admin' : 'User'}
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
                    <ul className="list-group list-group-flush links">
                        <li className="list-group-item">
                            <Link className="nav-link" to="">
                                <BiCartAlt style={{marginRight:'0.5rem',fontSize:"20px"}}/>
                                Card
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="">
                                <BiUserPin style={{marginRight:'0.5rem',fontSize:"20px"}}/>
                                Profile
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

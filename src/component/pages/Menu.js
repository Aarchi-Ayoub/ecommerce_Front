import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { API_URL } from '../../config'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { isAuthenticate } from '../auth/Authenticate'
import { AiOutlinePoweroff } from "react-icons/ai";

import { useSelector } from 'react-redux'
// history : un systéme qui nous permet de savoir l'url en cours
const isActive = (history,path)=>{
    if(history.location.pathname === path){
        return {
            color : '#2C3C3A'
        }
    }else{
        return {
            color : '#fff'
        }
    }
}

const Menu = (props) => {
    // Sing out 
    const singOut = ()=>{
        // Kill the cookies in the backend
        fetch(`${API_URL}/singout`)
        .then(()=>{
            toastr.info('Sing out with success','See you soon',{
                positionClass: "toast-top-center"
            })
            localStorage.removeItem('jwt_info');
            props.history.push('/singin');
        })
        .catch();
    }
    // Acced from reducer
    let countItems = useSelector(state => state.Cart.count);
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-info">
            <Link className="navbar-brand" to="/">Ecommerce</Link>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {
                        isAuthenticate() && (
                        <Fragment>
                            <li className="nav-item active">
                                <Link style={isActive(props.history,'/')} className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item active">
                                <Link 
                                    style={isActive(props.history,'/dashboard')} 
                                    className="nav-link" 
                                    to={`${isAuthenticate() && isAuthenticate().user.role === 1 ? '/admin' : ''}/dashboard`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link style={isActive(props.history,'/shop')} className="nav-link" to="/shop">Shop</Link>
                            </li>
                        </Fragment>
                        )
                    }
                </ul>   
                <ul className="navbar-nav ml-auto"> 
                {
                    !isAuthenticate() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link style={isActive(props.history,'/singin')} className="nav-link" to="/singin">Connexion</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={isActive(props.history,'/singup')} className="nav-link" to="/singup">Register</Link>
                            </li>
                        </Fragment>
                    )
                }        
                <li className="nav-item active">
                    <Link style={isActive(props.history,'/cart')} className="nav-link" to="/cart" style={{cursor:'pointer', fontSize:"20px"}}className="nav-link">
                        <span className="badge badge-warning">{countItems}</span>
                    </Link>
                </li>            
                {
                    isAuthenticate() && (                        
                        <li className="nav-item">
                            <span style={{cursor:'pointer'}}  className="nav-link" onClick={singOut} className="nav-link">
                                <AiOutlinePoweroff/>
                            </span>
                        </li>
                    )
                }
                    
                </ul>   
            </div>
        </nav>
    )
}

export default withRouter(Menu)

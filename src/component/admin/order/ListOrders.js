import React, { useEffect, useState } from 'react'
import { isAuthenticate } from '../../auth/Authenticate'
import { allOrders, orderStatus } from '../Admin'
import Layout  from '../../pages/Layout'
import { Fragment } from 'react'
import moment from 'moment'
const ListOrders = () => {
    // State of orders
    const [ order, setOrder ] = useState([]);
    // State of orders status
    const [ status, setStatus ] = useState([]);
    // Get user info
    const { user , token } = isAuthenticate();
    // M1
    const loadOrders = (user, token)=>{
        allOrders(user._id, token)
            .then(order => setOrder(order))
            .catch(err => console.error(err))
    }
    // M2
    const loadStatus = (user, token)=>{
        orderStatus(user._id, token)
            .then(res => setStatus(res))
            .catch(err => console.error(err))
    }
    // Execute 1 time 
    useEffect(()=>{
        loadOrders(user,token)
        loadStatus(user,token)
    },[])
    // Info message
    const countOrder = ()=>{
        if(order.length === 0){
            return(
                <div className="alert alert-warning text-center my-5 display-3">
                    No order yet !
                </div>
            )
        }else{
            return(
                <div className="alert alert-info text-center my-5 display-3">
                    Orders total is { order.length }
                </div>
            )
        }
    }
    // show input
    const showInput = (key, value)=>{
        return(
            <div className="form-group my-3">
                <label htmlFor={key}>{key}</label>
                <input type="text" className="form-control" value={value} readOnly id={key}/>
            </div>
        )
    }
     // show status
    const showStatus = (order)=>{
        return status.length && (
            <>
                <h4>Status :{order.status}</h4>
                <select className="form-control">
                    <option value="">Select value</option>
                    {
                        status.map(s=>(
                            <option value={s} key={s}>{s}</option>
                        ))
                    }
                </select>
            </>
        )
    }
    // Show orders
    const showOrders = ()=>{
        return order.length && order.map(order=>(
            <div className="my-3" key={order._id}>
                <ul className="list-group">
                    <li className="list-group-item active"><b>Transaction ID :</b>{order.transaction_id}</li>
                    <li className="list-group-item"><b>Price :</b>{order.amount} MAD</li>
                    <li className="list-group-item">{ showStatus(order) } </li>
                    <li className="list-group-item"><b>Order on :</b>{moment(order.createdAt).fromNow()}</li>
                    <li className="list-group-item"><b>Custemor :</b>{order.user.name}</li>
                    <li className="list-group-item"><b>Address :</b>{order.address}</li> 
                </ul>
                <div className="my-5">
                    <h3 className="display-4 text-center text-success">Total of products: {order.products.length}</h3>
                    { order.products.map(product=>(
                        <div key={product._id} className="card text-white bg-dark mb-3">
                            <div className="card-header">{product.name}</div>
                            <div className="card-body">
                                { showInput("Product ID", product._id)}
                                { showInput("Product Name", product.name)}
                                { showInput("Product Price", product.price)}
                                { showInput("Product Quantity", product.count)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        ))
    }
    return (
        <Fragment>
            <Layout
                title="Orders"
                description = "My list of orders"
                className="container"
            >
            <div className="row">
                <div className="col-md">
                    { countOrder() }
                    { showOrders() }
                </div>
            </div>
            </Layout>
        </Fragment>
    )
}

export default ListOrders

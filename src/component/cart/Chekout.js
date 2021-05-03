import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth/Authenticate';

const Chekout = ({ products }) => {
    const calcul = (products)=>{
        return products.reduce((total, product)=> total + (product.price * product.count), 0);
    }
    const button = ()=>{
        if(isAuthenticate()){
            return <button className="btn btn-raised btn-primary btn-block">Checkout</button>
        }else{
            return (<Link to="/singin">
                <button className="btn btn-raised btn-warning btn-block">Sing In to Checkout</button>
            </Link>)
        }
    }
    return (
        <div>
            <h2 className="text-center">Total : {calcul(products)} MAD</h2>
            { button() }
        </div>
    )
}

export default Chekout

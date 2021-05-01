import React from 'react'
import ShowImage from './ShowImage'
import { AiOutlineShopping , AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import moment from 'moment'
import { addToCart } from '../../actions/CartActions';
import { useDispatch } from 'react-redux'
const ProductCard = ({product , showButton = true }) => {
    // For using method declaring in actions
    const dispatch = useDispatch()
    // Get quantity 
    const stock = (quantity)=>{
        return quantity > 0 ?
        <span className="badge badge-pill badge-info" style={{fontSize:"15px"}}>{quantity} in stock</span>
        : <span className="badge badge-pill badge-warning my-4" style={{fontSize:"15px"}}>Out of stock</span>
    }
    return (
        <div className="mt-3">
            <div className="card text-justify">
                <div className="card-header">
                    <center><h4 className="display-6">{product.name}</h4></center>
                </div>
                    <ShowImage 
                        item={product}
                        url={`products/photo`} 
                        className="card-img-top mx-auto mt-2 "
                    ></ShowImage> 
                <div className="card-body">
                    <p className="mt-4">{product.description}</p>
                    <p className="float-right my-5">
                        <span className="badge badge-pill badge-danger" style={{fontSize:"15px"}}>{product.price} MAD</span>
                        { stock(product.quantity) }
                    </p>
                    <div className="well">
                        <em>Created at : <b>{ moment(product.createdAt).fromNow() }</b></em>
                    </div>
                    <div className="row mt-5 float-right">
                        {
                            product.quantity > 0 ?
                            <Link className="card-link">
                            <button 
                                onClick ={ () => dispatch(addToCart(product)) }
                                title="add to card" 
                                style={{borderRadius:"25px"}} 
                                className="btn btn-raised btn-sm  btn-primary">
                                    <AiOutlineShopping style={{fontSize:"30px"}} /
                                ></button>
                            </Link> : null
                        }
                    {
                        (showButton) 
                        ?(  
                            <Link className="card-link" to={`/product/${product._id}`}>
                                <button 
                                    title="product info" 
                                    style={{borderRadius:"25px"}} 
                                    className="btn btn-raised btn-sm btn-warning">
                                        <AiOutlineInfoCircle style={{fontSize:"30px"}}/>
                                </button>
                            </Link>
                            
                        ) 
                        : null
                    }</div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard

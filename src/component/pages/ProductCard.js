import React from 'react'
import ShowImage from './ShowImage'
import { AiOutlineShopping , AiOutlineInfoCircle } from "react-icons/ai";
const ProductCard = ({product}) => {
    return (
        <div>
            <div className="card text-justify" style={{minHeight:'500px', maxHeight:'500px'}}>
                <div className="card-header">
                    <center><h4 className="display-6">{product.name}</h4></center>
                </div>
                    <ShowImage 
                        item={product}
                        url={`products/photo`} 
                        className="card-img-top mx-auto mt-2"
                    ></ShowImage> 
                <div className="card-body">
                    <p className="mt-4">{product.description}</p>
                    <p className="float-right">
                        <span className="badge badge-pill badge-danger" style={{fontSize:"15px"}}>{product.price} MAD</span>
                    </p>
                </div>
                <div className="row mx-auto mb-2">
                    <div className="col-md">
                        <button title="add to card" style={{borderRadius:"25px"}} className="btn btn-raised btn-sm mr-2 btn-primary"><AiOutlineShopping style={{fontSize:"30px"}} /></button>
                    </div>
                    <div className="col-md">
                        <button title="product info" style={{borderRadius:"25px"}} className="btn btn-raised btn-sm btn-warning"><AiOutlineInfoCircle style={{fontSize:"30px"}}/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard

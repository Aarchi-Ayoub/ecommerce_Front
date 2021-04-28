import React from 'react'
import ShowImage from './ShowImage'

const ProductCard = ({product}) => {
    return (
        <div>
            <div className="card" style={{minHeight:'500px', maxHeight:'500px'}}>
                <div className="card-header">{product.name}</div>
                <div className="card-body">
                    <ShowImage 
                        item={product}
                        url={`products/photo`} 
                        className="card-img-top mx-auto"
                    ></ShowImage> 
                    <p className="mt-4">{product.description}</p>
                    <p className="float-right">{product.price} MAD</p>
                </div>
                <div className="row mx-auto mb-2">
                    <div className="col-md">
                        <button className="btn btn-raised btn-sm mr-2 btn-primary">Add to card</button>
                    </div>
                    <div className="col-md">
                        <button className="btn btn-raised btn-sm btn-warning">Show infos</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard

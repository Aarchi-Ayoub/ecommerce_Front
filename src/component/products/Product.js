import React, { Fragment, useEffect, useState } from 'react'
import { getProduct , relatedProduct } from '../pages/API';
import ProductCard from '../pages/ProductCard';

const Product = (props) => {
    // Product state
    const [ product , setProduct ] = useState({});
    // Related products state
    const [ productRelated , setProductRelated ] = useState([]);
    // in mountig 
    useEffect(()=> document.title = 'Product')
    // In changing the id of page
    useEffect(()=>{
        // Get id from guery
        let productID = props.match.params.id ; 
        // Get the product of this id
        getProduct(productID).then(product => setProduct(product));
        // Get the related products of this id
        relatedProduct(productID).then(products => setProductRelated(products));
    },[props]);
    return (
        <Fragment>
            <div className="container">
                <div className="row mt-3">
                <div className="col-md-9" >
                    <ProductCard style={{maxWidth:"500px"}} product={product} showButton={false} />
                </div>
                <div className="col-md-3">
                    {
                        (productRelated.length > 0)
                        ? productRelated.map(p=>(
                            <ProductCard product={p} key={p._id} />
                        )) : (
                            <div className="alert alert-warning mt-3" role="alert">
                                0 related products found !
                            </div>
                        )
                    }
                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default Product

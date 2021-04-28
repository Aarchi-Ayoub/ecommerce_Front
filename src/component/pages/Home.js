import React, { Fragment, useEffect, useState } from 'react'
import { getProducts } from './API';
import Layout from './Layout'
import ProductCard from './ProductCard';

const Home = () => {
    // State of products best-sellers & last-arrivals
    const [ productBestSellers , setProductBestSellers ] = useState([]);
    const [ productLastArrivals , setProductLastArrivals ] = useState([]);
    // Get the products 
        // Last Arrivals
    const lastArrivals = ()=>{
        getProducts('createdAt','desc',3)
        .then(products => setProductLastArrivals(products))
        .catch(err => console.error(err))
    }
        // Best Sellers
    const bestSellers = ()=>{
        getProducts('dold','desc',6)
        .then(products => setProductBestSellers(products))
        .catch(err => console.error(err))
    }
    // Set the states in mounting the page
    useEffect(()=>{
        lastArrivals()
        bestSellers()
        document.title = "Home"
    },[]);
    return (
        <Fragment>
            <Layout
                title="Home"
                description = "Home space for all products"
                className="container"
            >
                <h1 className="display-3" style={{color:'#3AB630'}}>Last Arrivals</h1>
                <div className="row">
                    {
                    productLastArrivals && productLastArrivals.map((p,i)=>(
                        <div className="col-md-4 mx-auto mt-3">
                            <ProductCard product={p} key={i}/>
                        </div>
                    ))
                }
                </div>
                
                <hr/>
                <h1 className="display-3" style={{color:'#008276'}}>Best Sellers</h1>
                <div className="row">
                    {
                    productBestSellers && productBestSellers.map((p,i)=>(
                        <div className="col-md-4 mx-auto mt-3">
                            <ProductCard product={p} key={i}/>
                        </div>
                    ))
                }
                </div>
                
            </Layout>
        </Fragment>
    )
}

export default Home

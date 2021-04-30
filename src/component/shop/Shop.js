import React, { Fragment, useEffect, useState } from 'react'
import { getCategories , filterProducts } from '../pages/API';
import Layout from '../pages/Layout'
import FilterCat from './FilterCat';
import FilterPrice from './FilterPrice';
import ProductCard from '../pages/ProductCard'
const Shop = () => {
    // Rename page
    useEffect(()=>document.title='Shop');
    // State categories
    const [ categories , setCategories ] = useState([]);
    // State of filtering
    const [ filters , setFilters ] = useState({
        category : [],
        price : []
    });
    // State of feltering
    const [ limit , setLimit ] = useState(3);
    const [ skip , setSkip ] = useState(0);
    const [ productFeltering , setProductFeltering ] = useState([]);
    const [ size , setSize ] = useState(0);
    // Load data from API
    const Categories = () =>{
        getCategories().then(res=> setCategories(res.data)).catch(err=>console.error(err));
    }
    // Load data in mounting
    useEffect(()=> {
        Categories()
        filterProducts(skip,limit,filters)
            .then( res =>{ 
                setProductFeltering(res);
                setSize(res.length); 
                setSkip(0);
            })
            .catch( err => console.error(err) );
        
    },[filters]);
    
    // Load more function
    const loadMore = ()=>{
        const toSkip = skip + limit;
        filterProducts(toSkip, limit, filters)
        .then( res => {
            setProductFeltering([...productFeltering , ...res]);
            setSkip(toSkip);
            setSize(res.length)
        })
        .catch( err => console.error(err) );
    }
    // Load more button
    const loadMoreBtn = ()=>{
        return (
            size > 0  
            && size >= limit 
            &&
            (<button onClick={loadMore} className="btn btn-raised btn-secondary">More</button>)
        )
    }
    // Get data from the child component
    const handelFilter = (data,filterBy)=>{
        setFilters({...filters, [filterBy] : data });
    }
    return (
        <Fragment>
            <Layout
                title="Shop"
                description = 'Shop space...'
                className="container"
            >
                <div className="row">
                    <div className="col-md-3">
                        <FilterCat 
                            categories = { categories }
                            // Recive the checked ID to in DATA  
                            handelFilter = { (data) => handelFilter(data , 'category') }
                        /><hr/>
                        <FilterPrice 
                            // Recive the checked ID to in DATA
                            handelFilter = { (data) => handelFilter(data , 'price') }
                        />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                        {
                            productFeltering && productFeltering.map((p,i)=>(
                                <div key={i} className="col-md-4 mb-2">
                                    <ProductCard product={p} key={i}/>
                                </div>
                            ))
                        }
                        </div>
                        <center>{ loadMoreBtn() }</center> 
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export default Shop

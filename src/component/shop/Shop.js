import React, { Fragment, useEffect, useState } from 'react'
import { getCategories , filterProducts } from '../pages/API';
import Layout from '../pages/Layout'
import FilterCat from './FilterCat';
import FilterPrice from './FilterPrice';

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
    const [ limit , setLimit ] = useState(12);
    const [ skip , setSkip ] = useState(0);
    const [ productFeltering , setProductFeltering] = useState([]);
    // Load data from API
    const Categories = () =>{
        getCategories().then(res=> setCategories(res)).catch(err=>console.error(err));
    }
    // Load data in mounting
    useEffect(()=> {
        Categories()
        filterProducts(skip,limit,filters)
        .then( res => setProductFeltering(res) )
        .catch( err => console.error(err) );
    },[filters]);
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
                    <div className="col-md-4">
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
                    <div className="col-md-8">
                        {JSON.stringify(productFeltering)}
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export default Shop

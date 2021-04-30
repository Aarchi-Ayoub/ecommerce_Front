import React, { Fragment, useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import { getCategories , getProducts } from '../pages/API';
import ProductCard from '../pages/ProductCard';
const SearchProd = () => {
    // Category state
    const [ category , setCategory ] = useState([]);
    // Search state
    const [ search , setSearch ] = useState({
        category : '',
        name : ''
    });
    // Products state
    const [ product, setProduct ] = useState([]);
    // Result state
    const [ result , setResult ] = useState(0)
    // Handels changes
    const handels = e =>{
        setSearch({...search, [e.target.name] : e.target.value })
    }
    // Get categories from API
    const getCat = () =>{ 
        getCategories().then(res => setCategory(res.data))
    }
    const submitSearch = (e)=>{
        e.preventDefault();
        let { category  , name } = search;
        if(category || name){
            getProducts({category , 'name' : name || undefined})
            .then(products => {
                setProduct(products)
                setResult(products.length)
            })
            .catch(err => console.error(err))
        }else{
            setProduct([]);
        }
    }
    // Load categry in mounting page
    useEffect(()=>getCat(),[]);
    return (
        <Fragment>
            <form onSubmit={submitSearch}>
                <div className="input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn" onChange={handels} name="category">
                            <option>Select a category</option>
                            {
                            category.map((c,i)=>(
                                   <option value={c._id} key={c._id}>{c.name}</option>
                               )) 
                            }
                        </select>
                    </div>
                    <div className="input-group-prepend">
                        <input type="search" onChange={handels} name="name" className="form-control mx-auto" />
                        <button className="btn"> <BsSearch/> </button>
                    </div>
                </div>
            </form>
            <hr />
            { 
                (result && result > 0) ?  
                <div style={{fontSize:"25px"}}>
                    <span className="float-right"><b>{result}</b> courses found</span>
                    <br/>
                </div>
                : null
            }
            <div className="row">
                {    
                    product && product.map((p,i)=>(
                        <div key={i} className="col-md-4 mb-5">
                            <ProductCard product={p} />
                        </div>
                    ))
                }
            </div>
        </Fragment>
    )
}

export default SearchProd

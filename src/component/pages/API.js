import { API_URL } from '../../config'
import queryString from 'query-string'
// Get products
export const  getProducts = ( params )=>{
    let query = queryString.stringify(params);
    return fetch(`${API_URL}/products?${query}`,{
        method  : "GET",
        headers : {
            "Accept"        :   "application/json",
            "Content-Type"  :   "application/json" 
        }
    })
    .then(res => res.json())
    .then(res => res.products)
    .catch(err => console.error(err))
}
// Get categories
export const getCategories = async () =>{
    // return fetch(`${API_URL}/categories`,{
    //     method  : "GET",
    //         headers : {
    //             "Accept" : "application/json",
    //             "Content-Type" : "application/json"
    //         }
    // })
    // .then(res => res.json())
    // .then(res =>res.data)
    // .catch(err => console.error(err))
    return await fetch(`${API_URL}/categories`,{
            method  : "GET",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .catch(err => console.error(err))
}
// Search products
export const filterProducts = (skip,limit,filters) =>{
    const data = {
        skip,limit,filters
    };
    return fetch(`${API_URL}/products/search`,{
        method  : "POST",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },body  : JSON.stringify(data) 
    })
    .then(res => res.json())
    .then(res =>res.products)
    .catch(err => console.error(err))
}

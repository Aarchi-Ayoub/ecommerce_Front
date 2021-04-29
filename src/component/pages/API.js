import { API_URL } from '../../config'

// Get products
export const  getProducts = ( sortBy, orderBy, limit )=>{
    return fetch(`${API_URL}/products?sortBy=${sortBy}&orderBy=${orderBy}&limit=${limit}`,{
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
export const getCategories = () =>{
    return fetch(`${API_URL}/categories`,{
        method  : "GET",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
    })
    .then(res => res.json())
    .then(res =>res.data)
    .catch(err => console.error(err))
}
// Search products
export const filterProducts = (skip,limit,filters) =>{
    const data = {
        filters
    };
    return fetch('http://localhost:8000/api/products/search',{
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

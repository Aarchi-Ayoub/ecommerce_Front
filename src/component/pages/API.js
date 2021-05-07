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

// Get product
export const  getProduct = ( id )=>{
    return fetch(`${API_URL}/products/${id}`,{
        method  : "GET",
        headers : {
            "Accept"        :   "application/json",
            "Content-Type"  :   "application/json" 
        }
    })
    .then(res => res.json())
    .then(res => res.product)
    .catch(err => console.error(err))
}

// Get product
export const  relatedProduct = ( id )=>{
    return fetch(`${API_URL}/products/related/${id}`,{
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

// Get braintree token
export const getBraintreeToken = (userID, token) =>{
    return fetch(`${API_URL}/braintree/token/${userID}`,{
            method  : "GET",
            headers : {
                Accept : "application/json",
                ContentType : "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
}

// Process payement
export const procesPayement = (userID, token, paymentData) =>{
    return fetch(`${API_URL}/braintree/purchase/${userID}`,{
            method  : "POST",
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            },body : JSON.stringify(paymentData)
        })
        .then(res => res.json())
}

// Create order
export const createOrder = (userID, token, orderData) =>{
    return fetch(`${API_URL}/order/create/${userID}`,{
            method  : "POST",
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            },body : JSON.stringify(orderData)
        })
        .then(res => res.json())
}
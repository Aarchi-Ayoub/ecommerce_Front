import { API_URL } from '../../config'

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
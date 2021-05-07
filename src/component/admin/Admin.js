import { API_URL } from "../../config";
// List all orders
export const allOrders = (userID, token) =>{
    return fetch(`${API_URL}/order/${userID}`,{
            method  : "GET",
            headers : {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
}

// List order status
export const orderStatus = (userID, token) =>{
    return fetch(`${API_URL}/order/status/${userID}`,{
            method  : "GET",
            headers : {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
}
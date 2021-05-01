import { uniqBy } from 'lodash'

export const addToCart = (item) =>{
    // If we have in localSorage 
    let items = JSON.parse(localStorage.getItem('cart')) || [];
    // Add the items to array & unique item
    items =  uniqBy([ {...item , count : 1} , ...items ] , '_id');
    // Update the localSorage
    localStorage.setItem('cart',JSON.stringify(items));
    // Reducers param
    return {
        type    : 'Add_Item',
        payload : items
    }
}

export const increment = (product)=>{
    let items   = JSON.parse(localStorage.getItem('cart'));
    items       = items.map(item => item._id === product._id ? {...product , count : item.count+1 } : item)
    localStorage.setItem('cart',JSON.stringify(items));
    return {
        type    : 'Increment',
        payload : items
    }
}

export const desincrement = (product)=>{
    if(product.count > 1){
        let items   = JSON.parse(localStorage.getItem('cart'));
        items       = items.map(item => item._id === product._id ? {...product , count : item.count-1 } : item)
        localStorage.setItem('cart',JSON.stringify(items));
        return {
            type    : 'Desincrement',
            payload : items
        }
    }
    return{
        type    : null
    }
}
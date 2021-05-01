// Get value from localStorage
let items = JSON.parse(localStorage.getItem('cart')) || [] ;

let initialState = {
    products : items , 
    count    : /** items.length */ items.reduce((total,products)=> total + products.count , 0)
};

const CartReducer =( state = initialState , action)=>{
    switch(action.type){
        case 'Add_Item' : {
            return {
                ...state,
                products: action.payload ,
                count   : action.payload.length
            }
        };
        case 'Increment' : {
            return {
                ...state,
                products: action.payload ,
                count : state.count +1
            }
        };
        case 'Desincrement' : {
            return {
                ...state,
                products: action.payload ,
                count : state.count -1
            }
        };
        default  :{
            return state
        }
    }
};

export default CartReducer
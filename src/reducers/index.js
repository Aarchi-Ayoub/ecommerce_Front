import { combineReducers } from 'redux' 
import AuthReducer  from './AuthReducer'
import CartReducer  from './CartReducer'

const rootReducers = combineReducers({
    Auth : AuthReducer ,
    Cart : CartReducer
});

export default rootReducers
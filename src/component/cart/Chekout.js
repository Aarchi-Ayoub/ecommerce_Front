import React, { useEffect , useState} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth/Authenticate';
import { createOrder, getBraintreeToken, procesPayement } from '../pages/API';
import DropIn from "braintree-web-drop-in-react";
import toastr from 'toastr';
const Chekout = ({ products }) => {
    // Braintree token state
    const [ data , setData ] = useState({
        braintreeToken  : null,
        error           : null,
        instance        : {},
        adress          : ''
    });
    // Get the user id & token authenticate from localStorage
    const userID    = isAuthenticate() && isAuthenticate().user._id;
    const userToken = isAuthenticate() && isAuthenticate().token;
    // Generate braintree in mounting
    useEffect(()=>{
        getBraintreeToken(userID,userToken)
            .then(res => setData({...data, braintreeToken: res.token}))
            .catch(err => setData({...data, error: err}))
    },[]);
    // Calcul the total price
    const calcul = (products)=>{
        return products.reduce((total, product)=> total + (product.price * product.count), 0);
    }
    // Show the payement options
    const dropIn = ()=>{
        return (
            <div>
                {
                    data.braintreeToken && products.length > 0 && (
                        <DropIn 
                            options={{ 
                                authorization : data.braintreeToken, 
                                paypal : "vault"
                            }}
                            onInstance={ instance => data.instance = instance }
                        />
                    )
                }
            </div>
        )
    }
    // Buy method
    const buy = ()=>{
        const adress = data.adress;
        data.instance.requestPaymentMethod()
            .then(data  => {
                let paymentData = {
                    amount : calcul(products),
                    paymentMethodNonce : data.nonce
                };
                procesPayement(userID, userToken,paymentData)
                    .then(res => { 
                        // console.log(res)
                        let orderData = { 
                            products,
                            transaction_id: res.transaction.id,
                            amount: res.transaction.amount,
                            address: adress
                        };
                        createOrder(userID, userToken,orderData)
                            .then(res => console.log(res))
                            .catch(err => console.error(err));
                        // Remove the cart array from the LS
                        localStorage.removeItem('cart');
                        toastr.success("Operation end with success",'Valid',{
                            positionClass: "toast-bottom-left"
                        }
                    )})
                    .catch(err =>{
                        console.error(err)
                        toastr.error(err.message,'Invalid',{
                            positionClass: "toast-bottom-left"
                        }
                    )})
                toastr.success(data,'Valid',{
                    positionClass: "toast-bottom-left"
                })
            })
            .catch(err  => { toastr.error(err.message,'Error',{
                    positionClass: "toast-bottom-left"
                })
            });
    }
    // Show the button
    const button = ()=>{
        if(isAuthenticate()){
            return (
                <>
                    { dropIn() }
                    <button onClick={buy} className="btn btn-raised btn-secondary btn-block">
                        Pay
                    </button>
                </>
            )
        }else{
            return (<Link to="/singin">
                <button className="btn btn-raised btn-warning btn-block">Sing In to Checkout</button>
            </Link>)
        }
    }
    // Get adress 
    const handelChanges = e =>{
        setData({...data, adress : e.target.value})
    }
    return (
        <div>
            <h2 className="text-center">Total : {calcul(products)} MAD</h2>
            <div className="form-group">
              <label for="adress" className="text-muted">Livraison adress :</label>
              <textarea className="form-control" onChange={handelChanges} name="adress" id="adress" rows="3"></textarea>
            </div>
            { button() }
        </div>
    )
}

export default Chekout

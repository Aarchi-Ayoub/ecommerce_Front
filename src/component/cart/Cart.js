import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import Layout from '../pages/Layout'
import ShowImage from '../pages/ShowImage'
import { VscDiffRemoved , VscDiffAdded } from "react-icons/vsc"
import { AiOutlineDelete } from "react-icons/ai"
import { increment , desincrement , rmoveFromCart } from '../../actions/CartActions'
import Chekout from './Chekout'
const Cart = () => {
    // Get the products from localStorage
    let productsInCart = useSelector(state => state.Cart.products)
    let dispatch = useDispatch();
    
    return (
        <Layout
                title="My cart"
                description = "Products in my cart..."
                className="container-fluid"
        >
            <div className="row">
                <div className="col-md-9">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productsInCart && productsInCart.map((p,i)=>(
                                    <tr key={i}>
                                        <td>
                                            <h5>{p.name}</h5>
                                            <p className="well">{p.description}</p>
                                        </td>
                                        <td width="100px">
                                            <ShowImage 
                                                item={p}
                                                url={`products/photo`} 
                                                className="card-img-top mx-auto mt-2 "/>
                                        </td>
                                        <td>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <button title="Add" onClick={()=>dispatch(increment(p))} className="btn btn-raised mr-3 btn-sm btn-success">
                                                        <VscDiffAdded />
                                                    </button>
                                                    <span className="span span-danger">{p.count}</span>
                                                    {
                                                        p.count > 1 ?
                                                        (<button title="Remove" onClick={()=>dispatch(desincrement(p))} className="btn btn-raised ml-3 btn-sm btn-warning">
                                                            <VscDiffRemoved/>
                                                        </button>): null
                                                    }
                                                </div>
                                            </div> 
                                        </td>
                                        <td>{p.price} MAD</td>
                                        <td>{p.price * p.count} MAD</td>
                                        <td className="text-right">
                                            <button onClick={()=>dispatch(rmoveFromCart(p._id))} className="btn btn-lg btn-danger" title="Delete">
                                                <AiOutlineDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col md-3">
                            <Chekout products={productsInCart}/>
                </div>
            </div>
        </Layout>
    )
}

export default Cart

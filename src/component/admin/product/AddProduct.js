import React, { Fragment ,useEffect, useState} from 'react'
import Layout from '../../pages/Layout';
import { AiOutlinePlus } from "react-icons/ai";
import { API_URL } from '../../../config';
import { isAuthenticate } from '../../auth/Authenticate';
import toastr from 'toastr'
import 'toastr/build/toastr.css'
const AddProduct = () => {
    // Category name state
    const [ product , setProduct] = useState({
        name        : '',
        description : '',
        shipping    : false,
        quantity    : 0,
        category    : 0,
        price       : 0,
        photo       : '' 
    });
    // State 
    const [ formData , setFormData ] = useState(new FormData());
    const [ categories , setCategories ] = useState([]);
    // Get categories
    const getCategories = () =>{
        fetch(`${API_URL}/categories`,{
            method  : "GET",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then(res => setCategories(res.data))
        .catch(err => console.error(err))
    }
    // Info from token
    const { user , token } = isAuthenticate();
    // Title of pages
    useEffect(() => getCategories(),[])
    // Manipulate the inputs changes
    const handelChanges = e=>{
        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value)
        setProduct({ ...product , [e.target.name] : value });
    }
    // Persist new category
    const submitProduct = e=>{
        e.preventDefault();
        fetch(`${API_URL}/products/create/${user._id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            }
            else {
                toastr.success(`Product ${product.name} created`, 'new Product', {
                    positionClass: "toast-bottom-left",
                })

                setProduct({
                    photo: '',
                    name: '',
                    description: '',
                    quantity: 0,
                    price: 0,
                    shipping: false,
                    category: 0
                })

                setFormData(new FormData())

            }

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                })
        );
    }
    return (
        <Fragment>
            <Layout
                title="Product"
                description = 'New product'
                className="container"
            >
                <div className="row"> 
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={submitProduct}>
                            <div className="form-group">
                                <label htmlFor="product" className="text-muted">Product</label>
                                <input 
                                    value={product.name} 
                                    required="true" 
                                    autoFocus="true" 
                                    type="text" 
                                    className="form-control" 
                                    name="name" 
                                    id="product" 
                                    onChange={handelChanges} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="text-muted">Description</label>
                                <textarea 
                                    value={product.description} 
                                    required="true" 
                                    type="text" 
                                    className="form-control" 
                                    name="description" 
                                    id="description" 
                                    rows="4"
                                    onChange={handelChanges} 
                                ></textarea> 
                            </div>
                            <div className="form-group">
                                <label htmlFor="price" className="text-muted">Price</label>
                                <input 
                                    value={product.price} 
                                    required="true" 
                                    type="number" 
                                    className="form-control" 
                                    name="price" 
                                    min="0"
                                    id="price" 
                                    onChange={handelChanges} 
                                />
                            </div>
                             <div className="form-group">
                                <label htmlFor="quantity" className="text-muted">Quantity</label>
                                <input 
                                    value={product.quantity} 
                                    required="true" 
                                    type="number" 
                                    className="form-control" 
                                    name="quantity" 
                                    id="quantity" 
                                    min="0"
                                    onChange={handelChanges} 
                                />
                            </div>
                            <div className="form-group">
                            <label htmlFor="category" className="text-muted">category</label>
                                <select value={product.category} onChange={handelChanges} name="category" id="category" className="form-control">
                                    <option value="0">Select a category</option>
                                    { categories && categories.map((category, i) => (
                                        <option key={i} value={category._id}>{category.name}</option>
                                    )) }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="shipping" className="text-muted">shipping</label>
                                <select value={product.shipping} onChange={handelChanges} name="shipping" id="shipping" className="form-control">
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="photo" className="text-muted">Photo product</label>
                                <input 
                                    onChange={handelChanges} 
                                    id="photo" 
                                    type="file" 
                                    className="form-control-file" 
                                    name="photo"  
                                />
                            </div>
                            <div className="float-right">
                                <button className="btn btn-primary bmd-btn-fab">
                                    <AiOutlinePlus /> 
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export default AddProduct

import React, { Fragment ,useEffect, useState} from 'react'
import Layout from '../../pages/Layout';
import { AiOutlinePlus } from "react-icons/ai";
import { API_URL } from '../../../config';
import { isAuthenticate } from '../../auth/Authenticate';
import toastr from 'toastr'
import 'toastr/build/toastr.css'
const AddCategory = (props) => {
    // Category name state
    const [ name , setName ] = useState('');
    // Title of pages
    useEffect(() => {
        document.title = "Add category";
    })
    // Manipulate the inputs changes
    const handelChanges = e=>{
        setName( e.target.value);
    }
    // Persist new category
    const submitCategory = e=>{
        e.preventDefault();
        const { user , token } = isAuthenticate();
        fetch(`${API_URL}/categories/create/${user._id}`,{
                method  : "POST",
                headers : {
                    "Accept"        :   "application/json",
                    "Content-Type"  :   "application/json",
                    "Authorization" :   `Bearer ${token}`
                },body  :   JSON.stringify({name}) 
            },
        ).then(res   => res.json())
        .then(res =>{
            if(res.error){ // Case of error
                toastr.error(res.error,'Check the form',{
                    positionClass: "toast-bottom-center"
                })
            }else{ // Case of not
                toastr.success('Create category with success','New category',{
                    positionClass: "toast-top-center"
                })
                setName('');
            }
        })
        .catch(err  => toastr.error(err,'Server',{
                    positionClass: "toast-bottom-center"
        }));
    }
    return (
        <Fragment>
            <Layout
                title="Category"
                description = 'New category'
                className="container"
            >
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={submitCategory}>
                            <div className="form-group">
                                <label htmlFor="category" className="text-muted">Category</label>
                                <input value={name} required="true" autoFocus="true" type="text" className="form-control" name="category" id="category" onChange={handelChanges} />
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

export default AddCategory

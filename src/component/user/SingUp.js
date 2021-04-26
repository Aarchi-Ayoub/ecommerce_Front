import React, { useEffect , useState}  from 'react'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { API_URL } from '../../config';
import Layout from '../pages/Layout'

const SingUp = (props) => {
    // Declare our state
    const [ user , setUser ] = useState({
        name    : '',
        email   : '',
        password: ''
    });
    // Change the title of page
    useEffect(() => {
        document.title ="Inscription"
    }, []);
    // Manipulate the inputs
    const handelChanges = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }
    // Sing up methode
    const submitSingUp = e =>{
        e.preventDefault();
        fetch(`${API_URL}/singup`,{
            method  : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body    : JSON.stringify(user) 
        })
        .then(res   => res.json())
        .then(res =>{
            if(res.error){ // Case of error
                toastr.error(res.error,'Check the form',{
                    positionClass: "toast-bottom-center"
                })
            }else{ // Case of not
                toastr.success('Registring with success','New account',{
                    positionClass: "toast-top-center"
                })
                props.history.push('/singin');
            }
        })
        .catch(err  => console.error(err));
    }
    // Form
    const form = ()=>(
        <form onSubmit={submitSingUp}>
            <div className="form-group">
                <label htmlFor="name" className="text-muted">Pseudo :</label>
                <input type="text" onChange={handelChanges} id="name" name="name" className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="email" className="text-muted">Email :</label>
                <input type="email" onChange={handelChanges} id="email" name="email" className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="password" className="text-muted">Password :</label>
                <input type="password" onChange={handelChanges} id="password" name="password" className="form-control"/>
            </div>
            <button class="btn btn-lg btn-block btn-outline-success">Sing Up</button>
        </form>
    )
    return (
        <div>
             <Layout 
                title="Register in"
                description="Node & React ecommerce app"
                className="container"
            >
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        {form()}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default SingUp

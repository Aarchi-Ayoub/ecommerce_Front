import React, { useEffect , useState}  from 'react'
import Layout from '../pages/Layout'
import { API_URL } from '../../config';
import toastr from 'toastr'
import 'toastr/build/toastr.css'
const SingIn = (props) => {
    // Declare our state
    const [ user , setUser ] = useState({
        email   : '',
        password: ''
    });
    // Change the title of page
    useEffect(() => {
        document.title ="Connection"
    })
    // Manipulate the inputs
    const handelChanges = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }
    // Sing in methode
    const submitSingIn = e =>{
        e.preventDefault();
        fetch(`${API_URL}/singin`,{
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
                toastr.error(res.error,'Login error',{
                    positionClass: "toast-bottom-center"
                })
            }else{ // Case of not
                toastr.info('Authenticate with success','Welcome',{
                    positionClass: "toast-top-center"
                })
                localStorage.setItem('jwt_info',JSON.stringify(res));
                props.history.push('/');
            }
        })
        .catch(err  => console.error(err));
    }
    // Form 
    const form = ()=>(
        <form onSubmit={submitSingIn}>
            <div className="form-group">
                <label htmlFor="email" className="text-muted">Email :</label>
                <input type="email" onChange={handelChanges} id="email" name="email" className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="password" className="text-muted">Password :</label>
                <input type="password" onChange={handelChanges} id="password" name="password" className="form-control"/>
            </div>
            <button class="btn btn-lg btn-block btn-outline-primary">Sing In</button>
        </form>
    )
    return (
        <div>
             <Layout 
                title="Connection"
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

export default SingIn

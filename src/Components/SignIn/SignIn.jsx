import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom'; 
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

export default function SignIn() {

    let navigate=useNavigate()
    const[isLoading,setIsLoading]=useState('false');
    const [errorHandle ,setErrorHandle]=useState('')
    async function handleSignIn(values){
        try{
            let data =await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',values)
            console.log(data);
            setIsLoading (true)
            if (data.msg === 'done') {
                setIsLoading(false)
                navigate('/Notes'); 
            }
            
        }
        catch(error){
            console.log(error);
            setIsLoading(false)
            setErrorHandle(error.response.data.msg)
        }
    
    }
    
    let validation = Yup.object().shape({
    
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Minimum characters is 6')
      
    });
  
    const formik = useFormik({
        initialValues: { 
            email: '',
            password: ''
          
        },
        onSubmit: handleSignIn,
        validationSchema: validation
    });
  return (
    <div>
                                <form className="m-5" onSubmit={formik.handleSubmit}>
                                {errorHandle ? <p className='text-danger text-start'>{errorHandle}</p> : null}

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    name="email" 
                                    value={formik.values.email}
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                    aria-describedby="emailHelp" 
                                />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            {formik.errors.email && formik.touched.email ? (
                                <p className='text-danger text-start'>{formik.errors.email}</p>
                            ) : null}
                                           <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    name="password" 
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur} 
                                    onChange={formik.handleChange} 
                                />
                            </div>
                            {formik.errors.password && formik.touched.password ? (
                                <p className='text-danger text-start'>{formik.errors.password}</p>
                            ) : null}

                         
                           
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                            {isLoading ? <i className='fa-solid fa-spinner fa-spin'></i> : "Register"}
                            <p className='mt-3 me-3'>Don't Have an Account ?<Link to='/' className='text-primary  mx-3'>Sign Up</Link></p> 
                        </form>
    </div>
  )
}

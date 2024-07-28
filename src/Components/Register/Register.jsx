import React, { useState } from 'react';
import register from './register.png';
import styles from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

export default function Register() {
    let navigate=useNavigate()
    const[isLoading,setIsLoading]=useState('false');
    const [errorHandle ,setErrorHandle]=useState('')
    async function handleRegister(values){
        try{
            let data =await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',values)
            console.log(data);
            setIsLoading (true)
            if (data.msg === 'done') {
                setIsLoading(false)
                navigate('/SignIn'); 
            }
            
        }
        catch(error){
            console.log(error);
            setIsLoading(false)
            setErrorHandle(error.response.data.msg)
        }
    
    }

    let validation = Yup.object().shape({
        name: Yup.string().required('Your name is required').min(3, 'Minimum characters is 3').max(15, 'Maximum characters is 15'),
        age: Yup.number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Minimum characters is 6'),
        phone: Yup.string().required('Phone number is required').matches(/^01[0-9]{9}$/, 'Phone number must contain only digits').min(10, 'Minimum 10 digits').max(15, 'Maximum 15 digits')
    });
  
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            age: '',
            phone: ''
        },
        onSubmit: handleRegister,
        validationSchema: validation
    });

    return (
        <div className={styles.div}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <form className="m-5" onSubmit={formik.handleSubmit}>
                        {errorHandle ? <p className='text-danger text-start'>{errorHandle}</p> : null}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
                                    name="name" 
                                    value={formik.values.name}
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                />
                            </div>
                            {formik.errors.name && formik.touched.name ? (
                                <p className='text-danger text-start'>{formik.errors.name}</p>
                            ) : null}

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
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label">Age</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="age" 
                                    name="age" 
                                    value={formik.values.age}
                                    onBlur={formik.handleBlur} 
                                    onChange={formik.handleChange} 
                                />
                            </div>
                            {formik.errors.age && formik.touched.age ? (
                                <p className='text-danger text-start'>{formik.errors.age}</p>
                            ) : null}
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input 
                                    type="tel" 
                                    className="form-control" 
                                    id="phone" 
                                    name="phone" 
                                    value={formik.values.phone}
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                />
                            </div>
                            {formik.errors.phone && formik.touched.phone ? (
                                <p className='text-danger text-start'>{formik.errors.phone}</p>
                            ) : null}
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            {isLoading ? <i className='fa-solid fa-spinner fa-spin'></i> : "Register"}
                            <p>Have an account? <Link to="/SignIn">Signin</Link></p>
                        </form>
                    </div>
                    <div className="col-6">
                        <figure>
                            <img className="w-75 m-5" src={register} alt="singUp" />
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
}







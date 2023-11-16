import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const Login = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})
    const [valid, setValid] = useState(true)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        let isvalid = true;
        let validationErrors = {}

        if (formData.email === "" || formData.email === null) {
            isvalid = false;
            validationErrors.email = "Email is Required!"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isvalid = false;
            validationErrors.email = "Email is Not Valid!"
        }
        if (formData.password === "" || formData.password === null) {
            isvalid = false;
            validationErrors.password = "Password Required!"
        } else if (formData.password.length < 8) {
            isvalid = false;
            validationErrors.password = "Password Minimum Length is 8 characters!"
        }

        axios.get('http://localhost:8000/users')
            .then(result => {
                result.data.map(user => {
                    if (user.email === formData.email) {
                        if (user.password === formData.password) {
                            alert("Login Successfully")
                            login();
                            navigate('/genshin')
                        } else {
                            isvalid = false;
                            validationErrors.password = "Wrong Password; "
                        }
                    }
                })
                setErrors(validationErrors)
                setValid(isvalid)
            })
            .catch(err => console.log(err))
        console.log(formData)
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="signup-form">
                        <form onSubmit={handleSubmit} class="mt-5 border p-4 bg-light shadow">
                            <h4 class="mb-5 text-secondary">Log In</h4>
                            {
                                valid ? <></> :
                                    <span className='text-danger'>
                                        {errors.email};
                                        {errors.password};
                                    </span>
                            }
                            <div class="row">
                                <div class="mb-3 col-md-12">
                                    <label>Email<span class="text-danger">*</span></label>
                                    <input type="text" name="email" class="form-control" placeholder="Enter Email"
                                        onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                                    />
                                </div>

                                <div class="mb-3 col-md-12">
                                    <label>Password<span class="text-danger">*</span></label>
                                    <input type="password" name="password" class="form-control" placeholder="Enter Password"
                                        onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                                    />
                                </div>
                                <div class="col-md-12">
                                    <button class="btn btn-primary float-end">Log In</button>
                                </div>
                            </div>
                        </form>
                        <p class="text-center mt-3 text-secondary">
                            If you don't have account, Please <Link to="/registration">Register Now</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
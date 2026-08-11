import React, { useState } from "react";
import { register } from "../../services/api";
import { useNavigate } from "react-router-dom";

function RegisterForm(){

    const navigate = useNavigate();

    const [name, setName]                   =   useState('');
    const [email, setEmail]                 =   useState('');
    const [password, setPassword]           =   useState(''); 
    const [error, setError]                 =   useState(null);
    const [success, setSuccess]             =   useState();
    const [isSubmitting, setIsSubmitting]   =   useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setIsSubmitting(true);
        try{
            const response = await register(name, email, password);
            const token = response.data.data.token;
            localStorage.setItem('token', token);
            setSuccess(true);
            setName('');
            setEmail('');
            setPassword('');
            navigate("/dashboard");
        } catch(err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };  

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <form   id="registerForm"
                    onSubmit={handleSubmit}
                    className="shadow-lg p-4 rounded"
                    style={{ width: '400px', backgroundColor: '#f8f9fa' }}
                    >
                        <div className="mb-3">
                            <label className="form-label" htmlFor="name">Name</label>
                            <input 
                                type="text"
                                className="form-control" 
                                name="name" 
                                id="name" 
                                placeholder="Enter your name" 
                                value={name}
                                onChange={(e)=>
                                    setName(e.target.value)
                                }
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                className="form-control"    
                                name="email" 
                                id="email" 
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e)=>
                                    setEmail(e.target.value)
                                } 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                className="form-control"
                                name="password" 
                                id="password" 
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e)=>
                                    setPassword(e.target.value)
                                } 
                                required
                            /> 
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>Registerd successfully!</p>}
                        <button type="submit" disabled={isSubmitting}className="btn btn-primary mb-2">
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </form>
                </div>
            </div>
            
            <p>Already have an account? <a href="/login">Login</a></p>
        </>
    );
}

export default RegisterForm;
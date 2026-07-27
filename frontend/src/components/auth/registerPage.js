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
            // navigate("/dashboard");
        } catch(err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };  

    return (
        <>
            <form   id="registerForm"
                    onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder="enter your name" 
                    value={name}
                    onChange={(e)=>
                        setName(e.target.value)
                    }
                    required 
                />
                <br /><br />
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="enter your email"
                    value={email}
                    onChange={(e)=>
                        setEmail(e.target.value)
                    } 
                    required 
                />
                <br /><br />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="enter your name"
                    value={password}
                    onChange={(e)=>
                        setPassword(e.target.value)
                    } 
                    required 
                />
                <br /><br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>Registerd successfully!</p>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </form>
        </>
    );
}

export default RegisterForm;
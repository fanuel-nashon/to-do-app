import React, { useState } from "react";
import { register } from "../services/api";


function RegisterForm(){

    const [name, setName]           =   useState('');
    const [email, setEmail]         =   useState('');
    const [password, setPassword]   =   useState(''); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await register(name, email, password);
        const token = response.data.data.token;
        localStorage.setItem('token', token);
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
                <button type="submit"> Register </button>
            </form>
        </>
    );
}

export default RegisterForm;
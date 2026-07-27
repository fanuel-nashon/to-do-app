import React, {useState} from "react";
import { login } from "../../services/api";
import { useNavigate } from "react-router-dom";

function LoginForm(){

    const [email, setEmail]                 =   useState('');
    const [password, setPassword]           =   useState('');
    const [error, setError]                 =   useState('');
    const [success, setSuccess]             =   useState(false);
    const [submitting, setIsSubmitting]     =    useState(false);

    const handleLogin   =   async (e)   => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setIsSubmitting(true);
        try {
            const response  =   await login(email, password);
            const token     =   response.data.data.token;
            localStorage.setItem('token', token);
            setSuccess(true);
            setEmail('');
            setPassword('');
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setIsSubmitting(false);
        }
    }  

    return (
        <>
            <form   id="loginForm"
                    onSubmit={handleLogin}
            >
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>
                        setEmail(e.target.value)
                    }
                    required
                />
                <br></br>
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e)=>
                        setPassword(e.target.value)
                    }
                    required
                />
                <br></br>
                {error && <p style={{ color:'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>Login successful</p>}
                <button type="submit" disabled={submitting}>
                    {isSubmitting ? 'Logging ...' : 'Login'}
                </button>
            </form>
        </>
    );
}

export default LoginForm;
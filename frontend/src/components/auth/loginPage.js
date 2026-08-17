import React, {useState} from "react";
import { login } from "../../services/api";
import { useNavigate } from "react-router-dom";
import BrandButton from "../common/BrandButton";
import PasswordInput from "../common/PasswordInput";

function LoginForm(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const BRAND_COLOR = '#5e2a2afa';
    const labelStyle = { color: BRAND_COLOR, fontWeight: 600, letterSpacing: '0.03em' };
    const linkStyle = { color: BRAND_COLOR, fontWeight: 500, textDecoration: 'none' };
    const buttonStyle = { backgroundColor: BRAND_COLOR, border: 'none', letterSpacing: '0.03em' };
    const inputClasses = "form-control rounded-3 shadow-sm border-0 bg-light";

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
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <form   id="loginForm"
                    onSubmit={handleLogin}
                    className="shadow-lg p-4 rounded"
                    style={{
                        width: '400px',
                        backgroundColor: 'rgba(255, 255, 255, 0.65)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.4)'
                    }}
                >
                    <div style={{color: BRAND_COLOR, textAlign: 'center', marginBottom: '20px'}}>
                        <h2 className="text-center mb-4">Task Manager</h2>
                        <h6 className="text-center mb-4">SIGN IN</h6>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={labelStyle} >Email</label>
                        <input
                            type="email"
                            className={inputClasses}
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
                        <label htmlFor="password" className="form-label" style={labelStyle} >Password</label>
                        <PasswordInput
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className={inputClasses}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger py-2">{error}</div>}
                    {success && <div className="alert alert-success py-2">Login successful</div>}
                    <div className="d-flex">
                        <BrandButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </BrandButton>
                        <p className="ms-auto mb-0"><a href="/forgot-password" style={linkStyle}>Forgot Password?</a></p>
                    </div>
                    <p className="text-center mb-0 text-muted">Don't have an account? <a href="/register" style={linkStyle}>Register</a></p>
                </form>
            </div>    
        </div>
    );
}

export default LoginForm;
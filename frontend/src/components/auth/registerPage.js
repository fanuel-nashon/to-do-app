import React, { useState } from "react";
import { register } from "../../services/api";
import { useNavigate } from "react-router-dom";
import BrandButton from "../common/BrandButton";
import PasswordInput from "../common/PasswordInput";
import { validatePasswordStrength } from "../../utils/passwordValidator";

function RegisterForm(){

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const passwordErrors = validatePasswordStrength(password);
    const rules = [
        { label: 'At least 8 characters', met: password.length >= 8 },
        { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
        { label: 'One lowercase letter', met: /[a-z]/.test(password) },
        { label: 'One number', met: /[0-9]/.test(password) },
        { label: 'One special character', met: /[^A-Za-z0-9]/.test(password) }
    ];
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const passwordErrors = validatePasswordStrength(password);
        if(passwordErrors.length > 0){
            setError(`Password must contain ${passwordErrors.join(', ')}`);
            return;
        }

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
                            <PasswordInput
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                            {password && (
                                <ul className="list-unstyled small mt-1">
                                    {rules.map((rule => (
                                        <li key={rule.label} style={{ color: rule.met ? 'green' : '#999' }}>
                                            {rule.met ? '✓' : 'o'} {rule.label}
                                        </li>
                                    )))}
                                </ul>
                            )}
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>Registerd successfully!</p>}
                        <BrandButton type="submit" disabled={isSubmitting}className="btn btn-primary mb-2">
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </BrandButton>
                        <p>Already have an account? <a href="/">Login</a></p>
                    </form>
                </div>
            </div>
            
        </>
    );
}

export default RegisterForm;
import {React, useState} from 'react';
import BrandButton from '../common/BrandButton';
import { forgotPassword } from '../../services/api';

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const checkEmail = async (e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        setError(false);
        setSuccess('');
        try{
           const response = await forgotPassword(email);
           setSuccess('A password reset link has been sent to your email.');
           setEmail(''); 
        } catch (err){
            setError(err.response?.data?.message || 'Something went wrong. Please try again');
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <form className="shadow-lg p-4 rounded" 
                    style={{ width: '400px', backgroundColor: '#f8f9fa' }}
                    onSubmit={checkEmail}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <BrandButton type="submit" className="btn mb-2" disabled={isSubmitting}>
                        Reset Password
                    </BrandButton>
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    )
}   

export default ForgotPasswordForm;
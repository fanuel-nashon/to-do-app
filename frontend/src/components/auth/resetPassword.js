import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/api';
import BrandButton from '../common/BrandButton'; 

function ResetPasswordForm() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleReset = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError("Password do not match");
            return;
        }
        setIsSubmitting(true);
        try {
            await resetPassword(token, password);
            navigate('/', { state: { message: 'Password reset. Please log in' } });
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired reset link');
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <form className="shadow-lg p-4 rounded" style={{ width: '400px' }} onSubmit={handleReset}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input type="password" className="form-control" id="password"
                            value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <BrandButton type="submit" disabled={isSubmitting} className="btn mb-2">
                        {isSubmitting ? 'Resetting...' : 'Reset Password'}
                    </BrandButton>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordForm;
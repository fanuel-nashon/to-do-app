import React, { useState } from 'react';

function PasswordInput({ id, name, value, onChange, placeholder, className = 'form-control', required = false }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="input-group">
            <input
                type={showPassword ? 'text' : 'password'}
                id={id}
                name={name || id}
                className={`${className} rounded-start-3 border-end-0`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
            <button
                type="button"
                className="btn btn-outline-secondary border-0 bg-light rounded-end-3"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
        </div>
    );
}

export default PasswordInput;

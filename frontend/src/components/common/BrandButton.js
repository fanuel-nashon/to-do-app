import {React} from 'react';

const BRAND_COLOR = '#5e2a2afa';

function BrandButton({ children, disabled, type = 'button', className = '', ...rest }) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`btn text-white p-2 rounded-3 ${className}`}
           style={{ backgroundColor: BRAND_COLOR, border: 'none', letterSpacing: '0.03em' }}
            {...rest}
        >
            {children}

        </button>
    );
}

export default BrandButton;
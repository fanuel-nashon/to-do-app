function validatePasswordStrength(password){
    const errors = [];

    if(!password || password.length < 8){
        errors.push('at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('one uppercase letter');
    }
    if(!/[a-z]/.test(password)) {
        errors.push('one lowercase letter');
    }
    if(!/[0-9]/.test(password)) {
        errors.push('one number');
    }
    if(!/[^A-Za-z0-9]/.test(password)) {
        errors.push('one special character');
    }

    return errors;
}

module.exports = { validatePasswordStrength };
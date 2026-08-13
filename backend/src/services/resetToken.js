const crypto = require('crypto');

function generateResetToken(){
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    return { rawToken, hashedToken, expires };
}

function hashToken(token){
    return crypto.createHash('sha256').update(token).digest('hex');
}

module.exports = { generateResetToken, hashToken };
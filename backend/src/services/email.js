const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendPasswordResetEmail(to, resetUrl){
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Password Reset Request',
        html: `
            <p>You request a password reset.</p>
            <p><a href="${resetUrl}">Click here to reset your password</a></p>
            <p>This link expires in 1 hour. If you did not request a password reset, please ignore this email.</p>
        `
    });
}

module.exports = { sendPasswordResetEmail };
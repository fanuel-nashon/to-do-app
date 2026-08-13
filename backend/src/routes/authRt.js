const express           =   require('express');
const router            =   express.Router();
const authController    =   require('../controllers/authController');
const authMiddleware    =   require('../middleware/auth');
const { registerLimiter, loginLimiter, forgotPasswordLimiter } = require('../middleware/rateLimiter');

// public routes - no token needed
router.post('/register', registerLimiter, authController.register);
router.post('/login', loginLimiter, authController.login);

// protected routes - token is required
router.get('/me', authMiddleware, authController.me);

router.post('/forgot-password', forgotPasswordLimiter, authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
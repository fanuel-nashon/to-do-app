const express           =   require('express');
const router            =   express.Router();
const authController    =   require('../controllers/authController');
const authMiddleware    =   require('../middleware/auth');

// public routes - no token needed
router.post('/register', authController.register);
router.post('/login', authController.login);

// protected routes - token is required
router.get('/me', authMiddleware, authController.me);

module.exports = router;
const jwt  = require('jsonwebtoken');
const User = require('../models/user');
const { hashPassword, verifyPassword } = require('../services/hash');
const { generateResetToken, hashToken } = require('../services/resetToken');
const { sendPasswordResetEmail } = require('../services/email');
const { validatePasswordStrength } = require('../services/passwordValidator');

const authController = {

  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(422).json({
          success: false,
          message: 'Name, email and password are required'
        });
      }

      const passwordErrors = validatePasswordStrength(password);
      if(passwordErrors.length > 0) {
        return res.status(422).json({
          success: false,
          message: `Password must contain ${passwordErrors.join(', ')}`
        });
      }

      const existing = await User.findByEmail(email);
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email already exists'
        });
      }

      // await is required - hashPassword is async
      const hashedPassword = await hashPassword(password);

      const user = await User.create(name, email, hashedPassword);

      const token = jwt.sign(
        { id: user.id, name:user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      delete user.password;

      res.status(201).json({ success: true, data: { user, token } });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(422).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // stored as 'user' - must be consistent below
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const passwordMatch = await verifyPassword(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const token = jwt.sign(
        { id: user.id, name:user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      delete user.password;

      res.json({ success: true, data: { user, token } });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async forgotPassword(req, res){
    try {
      const email = req.body.email;
      if(!email){
        return res.status(422).json({
          success: false,
          message: 'Email is required'
        });
      }
      const user = await User.findByEmail(email);
      if(!user){
        return res.status(404).json({
          success: false,
          message: 'No account found with this email'
        });
      }

      const { rawToken, hashedToken, expires } = generateResetToken();
      await User.setResetToken(email, hashedToken, expires);

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;
      await sendPasswordResetEmail(email, resetUrl);

      res.json({
        success: true,
        message: 'Password reset email sent'
      });
      
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async resetPassword(req, res){
    try {
      const { token } = req.params;
      const { password } = req.body;

      if(!password){
        return res.status(422).json({
          success: false,
          message: 'New password is required'
        });
      }

      const hashedToken = hashToken(token);
      const user = await User.findByResetToken(hashedToken);
      if(!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired reset token'
        });
      }

      const passwordErrors = validatePasswordStrength(password);
      if(passwordErrors.length > 0) {
        return res.status(422).json({
          success: false,
          message: `Password must contain ${passwordErrors.join(', ')}`
        });
      }

      const hashedPassword = await hashPassword(password);
      await User.updatePassword(user.id, hashedPassword);

      res.json({
        success: true,
        message: 'Password has been reset'
      });
    } catch(err){
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  },

  // This method was missing - it was causing the crash
  async me(req, res) {
    try {
      const user = await User.findById(req.user.id);
      delete user.password;
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

};

module.exports = authController;
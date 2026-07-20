const jwt  = require('jsonwebtoken');
const User = require('../models/user');
const { hashPassword, verifyPassword } = require('../services/hash');

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
        { id: user.id, email: user.email },
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
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      delete user.password;

      res.json({ success: true, data: { user, token } });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
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
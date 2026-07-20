const jwt   =   require('jsonwebtoken');
const User  =   require('../models/User');
const {hashPassword, verifyPassword} = require('../services/hash');

const authController = {

    // POST /api/auth/register
    // creating a new user account
    async register(req, res){
        try{
            const {name, email,password}= req.body;

            if(!name || !email || !password){
                return res.status(422).json({
                    success:    false,
                    message:    'Name, email, and password are required'
                });
            }

            const existing = await User.findByEmail(email);
            if (existing) {
                return res.status(409).json({
                    success:    false,
                    message:    'An account with this email already exists' 
                });
            }

            const hashedPassword = hashPassword(password);

            const user = await User.create(name, email, hashedPassword);

            // creating a token for the user

            const token =   jwt.sign(
                { id: user.id, email:user.email }, // payload - data stored in the token
                process.env.JWT_SECRET, // secret key used to sign it
                { expiresIn: process.env.JWT_EXPIRES_IN }   // expiry
            );

            delete user.password;

            res.status(201).json({
                success: true,
                data: {user,token}      
            });
        } catch(err){
            res.status(500).json({ success: false, message: err.message});
        }
    },

    // POST /api/auth/login
    // Verifies credentials and returns a token
    async login(req, res) {
        try {
            const {email, password} = req.body;

            if(!email || !password){
                return res.status(422).json({
                    success: false,
                    message: 'All fields are required',
                });
            }

            const exists = await User.findByEmail(email);
            if(!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            const passwordMatch = await verifyPassword(password, user.password);
            if(!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            const token = jwt.sign(
                {id: user.id, email:user.email},
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRES_IN}
            );

            delete user.password;

            res.json({
                success: true,
                data: {user,token}
            });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
};

module.exports = authController;
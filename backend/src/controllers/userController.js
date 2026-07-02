const User = require('../models/User');
const { hashPassword } = require ('../services/hash');

const userController={
    async findAllUsers(req, res){
        try{
            const users = await User.findAll();
            res.json({
                success: true,
                data: users
            });
        }
        catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    async findUserById(req, res){
        try{
            const user = await User.findById(req.params.id);
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.json({
                success: true,
                data: user
            });
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    async createUser(req, res){
        try{
            const hashedPassword = await hashPassword(req.params.password);
            const {name, email, hashedPassword} = req.params;
            const user = await User.create(name, email, hashedPassword);
            res.json({
                success: true,
                data: user               
            })
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
}

module.exports=userController;
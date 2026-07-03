const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.findAllUsers);
router.get('/:id', userController.findUserById);
router.post('/create', userController.createUser);
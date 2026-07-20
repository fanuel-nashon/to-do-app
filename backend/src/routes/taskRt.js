const express           =   require('express');
const router            =   express.Router();
const taskController    =   require('../controllers/taskController');
const authMiddleware    =   require('../middleware/auth'); 

router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.post('/create', authMiddleware, taskController.createTask);

module.exports = router;
const Task = require('../models/taskModel');

const taskController = {
    async getAllTasks(req, res) {
        try {
            const tasks = await Task.findAll(req.user.id);
            res.json({
                success: true,
                data: tasks
            });
        }
        catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    
    async getTaskById(req, res) {
        try {
            const task = await Task.findById(req.params.id);

            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'task not found'
                });
            }

            return res.json({
                success: true,
                data: task
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    async createTask(req, res){
        try {
            const {name, creation_date, due_date, completion_date} = req.params;
            const task = await Task.createTask(req.params);
            res.json({
                success: true,
                data: task
            });
        }
        catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },
};

module.exports = taskController;    
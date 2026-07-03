const db = require('../config/database');

const Task = {
    async findAll(id){
        const result=await db.query(
            'SELECT * FROM tasks WHERE user_id = $1',
            [id]
        );
        return result.rows;
    },

    async create(name, creation_date, due_date, completion_date){
        const result = await db.query(
            `INSERT INTO tasks (name, creation_date, due_date, completion_date)
             VALUES($1,$2,$3,$4)
             RETURNING *
            `,
            [name, creation_date, due_date, completion_date]
        );
        return result.rows[0];
    },
    
    // find a task by its id
    async findById(id){
        const result = await db.query(
            'SELECT * FROM tasks WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }
}

module.exports = Task;
const db = require ('../config/database');

const User = {
    async findAll(){
        const result = await db.query(
            'SELECT * FROM users ORDER BY id ASC'
        );
        return result.rows;
    },

    async findById(id) {
        const result = await db.query(
            'SELECT * FROM users WHERE id = $1;',
            [id]
        );
        return result.rows[0] || null;
    },

    async create(name, email, password) {
        const result = await db.query(
            `INSERT INTO users (name, email, password) 
             VALUES ($1, $2, $3)
             RETURNING *
            `, 
            [name, email, password]
        );
        return result.rows[0];
    },

    async findByEmail(email) {
        const result = await db.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
        return result.rows[0] || null;
    }
};

module.exports=User;

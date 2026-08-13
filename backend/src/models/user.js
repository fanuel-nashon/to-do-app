const db = require ('../config/database');

const User = {
    async findAll(){
        const result = await db.query(
            `SELECT * FROM users ORDER BY id ASC`
        );
        return result.rows;
    },

    async findById(id) {
        const result = await db.query(
            `SELECT * FROM users WHERE id = $1;`,
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
    },

    async setResetToken(email, hashedToken, expires) {
        const result = await  db.query(
            `UPDATE users 
            SET reset_token = $1, reset_token_expires = $2
            WHERE email = $3
            RETURNING *`,
            [hashedToken, expires, email]
        );
        return result.rows[0] || null;
    },

    async findByResetToken(hashedToken){
        const result = await db.query(
            `SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()`,
            [hashedToken]
        );
        return result.rows[0] || null;
    },

    async updatePassword(id, hashedPassword){
        const result = await db.query(
            `UPDATE users
            SET password = $1, reset_token = NULL, reset_token_expires = NULL
            WHERE id = $2
            RETURNING *`,
            [hashedPassword, id]
        );
        return result.rows[0] || null;
    }
};

module.exports=User;

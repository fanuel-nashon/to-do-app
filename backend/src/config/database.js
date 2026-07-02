const { Pool } = require('pg'); 

const pool = new Pool ({
    host:       process.env.DB_HOST,
    port:       process.env.DB_PORT,
    database:   process.env.DB_NAME,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASSWORD,
});

// testing the connection
pool.connect((err,client,release)=> {
    if(err){
        console.err('DB connection failed:', err.message);
    }
    else {
        console.log('DB connected successfully');
    }
});
require('dotenv').config(); // loading environment variables from the .env file

const express = require('express'); // importing express - used to handle http requests

const cors = require('cors'); // import cors - allows react app to talk to node

const app = express(); // creating an express app

const PORT = process.env.PORT || 3001; // setting up running port

app.use(express.json()); // parsing json requests

app.use(cors ({
    origin: 'http://localhost:3000'
})); //

// registering routes
app.use('/api/auth', require('./routes/authRt'));
app.use('/api/tasks', require('./routes/taskRt'));
app.use('/api/users', require('./routes/userRt'));


// health check
app.get('/health', (req, res)=> {
    res.json({
        status: 'ok',
        timestamp: new Date()
    });
});

app.listen(PORT, ()=> {
    console.log(`Server monitor API running on http://localhost:${PORT}`);
});

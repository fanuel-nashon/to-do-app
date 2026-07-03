CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    username    VARCHAR(50) NOT NULL,
    email       VARCHAR(50) NOT NULL,
    password    VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(50) NOT NULL,
    creation_date   DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date        DATE NOT NULL,
    completion_date DATE NULL
);
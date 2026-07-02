const bcrypt = require('bcrypt');

const saltRounds = 10;

async function hashPassword(plainPassword){
    return await bcrypt.hash(plainPassword, saltRounds);
}

async function verifyPassword(plainPassword, hashedPassword){
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports= { hashPassword, verifyPassword };
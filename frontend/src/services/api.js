import axios from 'axios';

const api = axios.create({
    baseURL:    'http://localhost:3001/api',
    timeout:    10000,
});

export const register   =   (name,email,password)   => api.post('/auth/register', {name,email,password});
export const login      =   (email,password)        => api.post('/auth/login', {email,password});  
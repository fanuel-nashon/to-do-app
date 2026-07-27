import React from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./dashboard";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    const navigate = new useNavigate();

    if(!token){
        navigate('/login');
    }

    <Dashboard />
}
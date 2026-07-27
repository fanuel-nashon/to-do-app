import React from 'react';
import RegisterForm from './components/auth/registerPage';
import LoginForm from './components/auth/loginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/welcome';
import Dashboard from './components/pages/dashboard';
import ProtectedRoute from './components/pages/ProtectedRoute';

function App()  {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
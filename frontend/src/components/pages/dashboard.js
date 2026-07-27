import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate  = useNavigate();  
    const [error, setError] = useState(false) 

    const token     = localStorage.getItem('token');
    let payload     = {};

    if(token) {
        try {
            payload   = JSON.parse(atob(token.split('.')[1]));
        } catch (err) {
            console.error("Invalid token", err);
            navigate("/login");
        }
    }
    else {
        navigate("/login");
    }

    const handleLogout  = async (e) => {
        e.preventDefault();
        try{
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            setError("Logout failed");
        } 
    };

    return(
        <>
            <p>Welcome {payload.name}</p>
            <form   id="logoutForm"
                    onSubmit={handleLogout}
            >
                <button type="submit">
                    Logout
                </button>
                {error && <p style={{color: 'red' }}> {error}</p>}
            </form>
        </>
    );
}

export default Dashboard;
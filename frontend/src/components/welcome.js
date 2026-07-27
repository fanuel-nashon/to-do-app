import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage(){
    return(
        <>
            <button onClick={()=>navigate("/login")} >
                Login
            </button>
            <button onClick={()=>navigate("/register")}>
                Register
            </button>
        </>
    );
}


export default WelcomePage;
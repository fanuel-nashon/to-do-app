import React from "react";

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
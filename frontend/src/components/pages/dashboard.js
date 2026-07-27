import React from "react";

function Dashboard(){
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    return(
        <>
            <p>Welcome {payload.name}</p>
        </>
    );
}

export default Dashboard;
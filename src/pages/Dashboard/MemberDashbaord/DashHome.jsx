import React from "react";
import UseAuth from "../../../custom hooks/UseAuth";
const DashHome = () => {
    const {user} = UseAuth();
    return(<div className="flex items-center justify-center min-h-[calc(100vh-50px)] text-center">
        <h2 className="text-main text-4xl">WelCome <span className="font-bold">{user.displayName}</span> 
        <br /> <span className="text-2xl">to</span> <br />Core<span className="text-gray200 font-bold">X</span> Gym</h2>
    </div>)
}

export default DashHome;
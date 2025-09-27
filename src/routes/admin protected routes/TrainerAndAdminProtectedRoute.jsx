import React from "react";
import UseAuth from "../../custom hooks/UseAuth";
import ObserverLoading from "../../shared/Loading/ObserverLoading";
import { useQuery } from "@tanstack/react-query";
import useUserRole from "../../custom hooks/useUserRole";
import { Navigate } from "react-router";
const TrainerAndAdmnProtectedRoute = ({children}) => {
    const {role , roleLoading} = useUserRole();
    if(roleLoading){
        return <ObserverLoading></ObserverLoading>
    }

    if(role === 'trainer' || role === 'admin'){
        return (children)
    }
    else{
        return <Navigate to={'/ForbiddenAccess'} replace></Navigate>
    }

}

export default TrainerAndAdmnProtectedRoute
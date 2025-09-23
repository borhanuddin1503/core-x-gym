import React from "react";
import UseAuth from "../../custom hooks/UseAuth";
import ObserverLoading from "../../shared/Loading/ObserverLoading";
import { useQuery } from "@tanstack/react-query";
import useUserRole from "../../custom hooks/useUserRole";
import { Navigate } from "react-router";
const TrainerProtectedRoute = ({children}) => {
    const {role , roleLoading} = useUserRole();
    if(roleLoading){
        return <ObserverLoading></ObserverLoading>
    }

    if(role !== 'trainer'){
        return <Navigate to={'/ForbiddenAccess'} replace></Navigate>
    }

    return (children)
}

export default TrainerProtectedRoute
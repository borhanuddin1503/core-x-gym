import React from 'react';
import UseAuth from '../../custom hooks/UseAuth';
import ObserverLoading from '../../shared/Loading/ObserverLoading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user , observerLoading} = UseAuth();
     const location = useLocation();

    if(observerLoading){
        return <ObserverLoading></ObserverLoading>
    }

    console.log(user)

    if(!user){
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return (children);
};

export default PrivateRoute;
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context/AuthContext';

const UseAuth = () => {
    const value = useContext(AuthContext);
    return (value);
};

export default UseAuth
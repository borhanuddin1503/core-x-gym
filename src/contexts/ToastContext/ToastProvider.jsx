import React, { useState } from 'react';
import { ToastContext } from './ToastContext';

const ToastProvider = ({children}) => {
    const [toastMsg , setToastMsg] = useState('')

    const toastInfo = {
        toastMsg,
        setToastMsg,
    }

    return (
        <ToastContext.Provider value={toastInfo}>
            {children}
        </ToastContext.Provider>
 );
};

export default ToastProvider;
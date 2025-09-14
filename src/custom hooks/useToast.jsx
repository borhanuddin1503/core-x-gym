import React, { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext/ToastContext';

const useToast = () => {
    const toastInfo = useContext(ToastContext);
    return toastInfo;
};

export default useToast;
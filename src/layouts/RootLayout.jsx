import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import useToast from '../custom hooks/useToast';
import Navbar from '../shared/Navbar/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import UseAuth from '../custom hooks/UseAuth';
import ObserverLoading from '../shared/Loading/ObserverLoading';
AOS.init()
const RootLayout = () => {
    const { toastMsg, setToastMsg } = useToast();
    const {observerLoading} = UseAuth();

    useEffect(() => {
        if (!toastMsg || !toastMsg.type) return;
        if (toastMsg.type === 'error') {
            toast.error(toastMsg.message)
        } else {
            toast.success(toastMsg.message)
        }
        setToastMsg('')
    }, [toastMsg]);

    if(observerLoading){
        return <ObserverLoading></ObserverLoading>
    }

    return (
        <div className='p-2 bg-root-bg'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default RootLayout;
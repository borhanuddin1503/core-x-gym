import axios from "axios";
import { useEffect } from "react";
import UseAuth from "../../../custom hooks/UseAuth";

const secureAxios = axios.create({
    baseURL: "http://localhost:3000",
});

const useSecureAxios = () => {
    const { user } = UseAuth();

    useEffect(() => {
        const requestInterceptor = secureAxios.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        
        return () => {
            secureAxios.interceptors.request.eject(requestInterceptor);
        };
    }, [user?.accessToken]);

    return secureAxios;
};

export default useSecureAxios;

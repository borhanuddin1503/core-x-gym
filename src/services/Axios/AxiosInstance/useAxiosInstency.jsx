import axios from 'axios';
import React from 'react';
const axiosInstency = axios.create({
    baseURL: 'https://core-x-server.vercel.app'
});

// base url
// https://core-x-server.vercel.app

const useAxiosInstency = () => {
    return axiosInstency
};

export default useAxiosInstency;
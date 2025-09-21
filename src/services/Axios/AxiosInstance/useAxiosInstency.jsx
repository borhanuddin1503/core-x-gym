import axios from 'axios';
import React from 'react';
const axiosInstency = axios.create({
    baseURL: 'http://localhost:3000'
});


const useAxiosInstency = () => {
    return axiosInstency
};

export default useAxiosInstency;
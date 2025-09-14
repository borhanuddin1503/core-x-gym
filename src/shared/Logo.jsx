import React from 'react';
import logo from '../assets/images/logo.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
        <Link to={'/'}><img src={logo}></img></Link>
    ); 
};

export default Logo;
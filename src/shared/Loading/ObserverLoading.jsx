import React from 'react';
import { Helix } from 'ldrs/react'
import 'ldrs/react/Helix.css'

const ObserverLoading = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <Helix
                size="45"
                speed="2.5"
                color="red"
            />
        </div>
    );
};

export default ObserverLoading;
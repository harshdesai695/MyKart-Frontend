import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
const Alert = ({ message }) => {
    useEffect(() => {
        notify()
    }, []);
    const notify = () => toast(message);
    return (
        <div>
            <ToastContainer />
        </div>
    );
}

export default Alert

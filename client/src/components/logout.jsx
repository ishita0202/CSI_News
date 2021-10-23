import React from 'react';
import { Link } from 'react-router-dom';
import { postDataAPI } from './../utils/fetchData';
import '../styles/logout.css';

const Logout = () => {
    const logout = async () => {
        localStorage.removeItem('firstLogin');
        await postDataAPI('logout');
        window.location.href = "/";
    }
    
    return (
        <Link className="logout__btn" to="/" onClick={logout}>Logout</Link>
    )
};

export default Logout;
import React from 'react';
import Header from '../components/admin/Header';
import "../styles/admin.css";
import NewsMain from './../components/admin/NewsMain';

const Admin = () => {
    return (
        <div>
            <Header/>
            <NewsMain />
        </div>
    )
};

export default Admin;
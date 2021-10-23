import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import loginImage from '../images/login.jpg';
import {isEmpty, isEmail, isLength} from './../utils/valid';
import { postDataAPI } from './../utils/fetchData';
import { showErrorMsg, showSuccessMsg } from '../components/Notification';

import "../styles/auth.css";

const Login = () => {
    const state = {
        email: '',
        password: '',
        err: '',
        success: ''
    }

    const [userData, setUserData] = useState(state);
    const { email, password, err, success } = userData;
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('firstLogin'))
            history.push('/');
    }, [history]);

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value, err: '', success: ''});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isEmpty(email) || isEmpty(password))
                return setUserData({...userData, err: "Please fill in all fields.", success: ''});

        if(!isEmail(email))
            return setUserData({...userData, err: "Invalid emails.", success: ''});

        if(isLength(password))
            return setUserData({...userData, err: "Password must be at least 6 characters.", success: ''});
        try {
            const res = await postDataAPI('login', userData);
            console.log(res);
            setUserData({...userData, err: '', success: res.data.msg});
            localStorage.setItem("firstLogin", true);
            localStorage.setItem("user", res.data.access_token);
            window.location.href = "/";
        } catch (err) {
            err.response.data.msg && setUserData({...userData, err: err.response.data.msg, success: ''});
        }
    }

    return (
        <div className="container">
            <img id="login__image" src={loginImage} alt="login page" />
            <div className="login__main">
                <h2 id="login__title">CSI NEWS</h2>
                <p className="login__sub">Login to CSI NEWS</p>
                <form className="login__form" onSubmit={handleSubmit}>
                    <label className="login__label" htmlFor="email">Email: </label>
                    <input
                        className="login__input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder=" &#xF007;  email"
                        style={{fontFamily: "Arial, FontAwesome"}}
                        onChange={handleChangeInput}
                        value={email}
                    />
                    <label className="login__label" htmlFor="password">Password: </label>
                    <input
                        className="login__input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder=" &#xF023;  Password"
                        style={{fontFamily: "Arial, FontAwesome"}}
                        onChange={handleChangeInput}
                        value={password}
                    />
                    {err && showErrorMsg(err)}
                    {success && showSuccessMsg(success)}
                    <button className="login__btn" type="submit">Login</button>
                </form>
                <p id="register">
                Don't have an account? <Link className="login__r__btn" to="/register">Register</Link>
                </p>
            </div>
        </div>
    )
};

export default Login;
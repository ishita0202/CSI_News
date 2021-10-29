import React, { useState } from 'react';
import img from '../images/register.jpg';
import instagram from '../images/instagram.png';
import gmail from '../images/gmail.png';
import '../styles/aboutus.css';
import { postDataAPI } from '../utils/fetchData';

const Aboutus = () => {
    const state = {
        email: '',
        msg: '',
        success: ''
    };

    const [contect, setContect] = useState(state);
    const { email, msg, success } = contect;

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setContect({...contect, [name]: value, err: '', success: ''});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postDataAPI('addfeedback', { email, msg });
            setContect({email: '', msg: '', success: "Feedback submitted"});
        } catch (err) {
            err.response.data.msg && setContect({...contect, err: err.response.data.msg});
        }
    }

    return (
        <div className="about_container">
            <div className="about__block">
                <h2 className="about__title">About Us:</h2>
                <p className="about__par">The CSI News is multifaceted digital media to helping citizens, consumers, business leaders. We publish independent reporting, rankings, data journalism and advice that has earned the trust of our readers and users. Thank you for visiting</p>
                <div className="ourself">
                    <span className="me">
                        <img src={img} className="about__img" alt="profile"/>
                        <h3 className="about__email">ishitaachauhan11@gmail.com</h3>
                    </span>
                    <span className="me">
                        <img src={img} className="about__img" alt="profile"/>
                        <h3 className="about__email">charvitardeshna@gmail.com</h3>
                    </span>
                    <span className="me">
                        <img src={img} className="about__img" alt="profile"/>
                        <h3 className="about__email">smitbhoraniya11@gmail.com</h3>
                    </span>
                </div>
                <div className="about__social">
                    <img src={instagram} alt="instagram" className="about__simg" />
                    <img src={gmail} alt="gmail" className="about__simg" />
                </div>
                <p className="about__copy">©Copyright 2021 CSI NEWS</p>
            </div>
            <div className="about__block">
                <h2 className="about__title">Contact Us:</h2>
                <form className="about__form">
                    <label htmlFor="email" className="about__label">Email Address:</label>
                    <input 
                        className="about__input"
                        type="text" 
                        id="email"
                        name="email"
                        placeholder="Enter Email Address..."
                        onChange={handleChangeInput}
                        value={email}
                    />
                    <label htmlFor="msg" className="about__label">Message: </label>
                    <textarea 
                        className="about__textarea"
                        type="text" 
                        id="msg"
                        name="msg"
                        placeholder="Enter Message..."
                        onChange={handleChangeInput}
                        value={msg}
                    />
                    {
                        success && <p className="about__succ">{contect.success}</p>
                    }
                    <button onClick={handleSubmit} className="btn btn--primary about__btn">Feedback</button>
                </form>
            </div>
        </div>
    )
};

export default Aboutus;
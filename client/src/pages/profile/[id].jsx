import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getDataAPI } from '../../utils/fetchData';
import EditUser from '../../components/EditUser';
import '../../styles/userprofile.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

const User = () => {
    const { id } = useParams();
    const [editUser, setEditUser] = useState(false);
    const [user, setUser] = useState([]);
    const [saveNews, setSaveNews] = useState([]);
    const [len, setLen] = useState();

    useEffect(() => {
        async function fetchData() {
            const res = await getDataAPI(`user/${id}`);
            setUser(res.data.user);
            const res1 = await getDataAPI('getSavedNews', localStorage.getItem("user"));
            setSaveNews(res1.data.saveNews);
            setLen(res1.data.saveNews.length);
        };
        fetchData();
    }, [id]);

    console.log(saveNews);
    return (
        <div className="user__con">
            <div className="user__container">
                <img className= "user__image"src={user.avatar} alt="" />
                <div className="user__details">
                <h2 className="user__name">{user.username}</h2>
                <h2 className="user__email">{user.email}</h2>
                <h2 className="user__website">{user.website}</h2>
                <h2 >Create at {moment(user.createdAt).fromNow()}</h2>
                </div>
                <button className="homecard__btn" onClick={() => setEditUser(true)}>Edit Profile</button>
                {
                    editUser && <EditUser setEditUser={setEditUser} userInfo={user}/>
                }
            </div>
            <div className="saved__container">
                <h2 className="saved__title">Saved News:</h2>
                {
                    len === 0
                    ? <h2 className="no__savednews">No Saved News</h2>
                    : saveNews.map(news => (
                        <div className="saved__news">
                            <img className="saved__img" src={news.images[0].url} alt="news"/>
                            <div>
                                <h2 className="saved__t"><Link className="saved__an" to={`/news/${news._id}`}>{news.title.length > 19 ? news.title.slice(0, 20) + '...' : news.title}</Link></h2>
                                <h2 className="saved__time">{moment(news.createdAt).fromNow()}</h2>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default User;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getDataAPI } from '../../utils/fetchData';
import EditUser from '../../components/EditUser';
import '../../styles/userprofile.css';
import moment from 'moment';

const User = () => {
    const { id } = useParams();
    const [editUser, setEditUser] = useState(false);
    const [user, setUser] = useState([]);

    let newsids = [];
    useEffect(() => {
        async function fetchData() {
            const res = await getDataAPI(`user/${id}`);
            setUser(res.data.user);
        };
        console.log(newsids);
        fetchData();
    }, [id]);

    console.log(user);
    return (
        <div>
            <div className="user__container">
                <img className= "user__image"src={user.avatar} alt="" />
                <div className="user__details">
                <h2 className="user__name">{user.username}</h2>
                <h2 className="user__email">{user.email}</h2>
                <h2 className="user__website">{user.website}</h2>
                <h2 >Create at {moment(user.createdAt).fromNow()}</h2>
                </div>
                <button onClick={() => setEditUser(true)}>Edit Profile</button>
                {
                    editUser && <EditUser setEditUser={setEditUser} userInfo={user}/>
                }
            </div>
            <div>

            </div>
        </div>
    )
};

export default User;
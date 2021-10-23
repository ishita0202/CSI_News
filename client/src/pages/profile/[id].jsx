import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getDataAPI } from '../../utils/fetchData';
import EditUser from '../../components/EditUser';

const User = () => {
    const { id } = useParams();
    const [editUser, setEditUser] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(async () => {
        const res = await getDataAPI(`user/${id}`);
        setUser(res.data.user);
    }, [id]);

    return (
        <div>
            <img src={user.avatar} alt="" />
            <h2>{user.username}</h2>
            <h2>{user.email}</h2>
            <h2>{user.website}</h2>
            <h2>{user.createdAt}</h2>
            <button onClick={() => setEditUser(true)}>Edit Profile</button>
            {
                editUser && <EditUser setEditUser={setEditUser} userInfo={user}/>
            }
        </div>
    )
};

export default User;
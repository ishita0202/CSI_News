import React, { useState, useEffect } from 'react';
import { patchDataAPI } from '../utils/fetchData';
import { imageUpload } from '../utils/imageUpload';

const EditUser = ({setEditUser, userInfo}) => {
    const state = {
        username: '',
        website: '',
        err: ''
    };

    const [user, setUser] = useState(state);
    const [avatar, setAvatar] = useState('');
    const { username, website } = user;

    useEffect(() => {
        setUser(userInfo);
    }, [setUser, setAvatar, userInfo])

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUser({...user, [name]: value});
    };

    const changeAvatar = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let media;
        try {
            if(avatar)
                media = await imageUpload([avatar]);
            await patchDataAPI(`edituser/${userInfo._id}`, { username, website, avatar: avatar ? media[0].url : userInfo.avatar })
        } catch (err) {
            err.response.data.msg && setUser({...user, err: err.response.data.msg});
        }
    }

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <button onClick={() => setEditUser(false)}>
                Close
            </button>
            <div className="info_avatar">
                    <img 
                        src={avatar ? URL.createObjectURL(avatar) : userInfo.avatar} 
                        alt="avatar" 
                    />
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up"
                        accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>
            <h2>UserName:</h2>
            <input 
                type="text"
                id="username"
                name="username"
                onChange={handleChangeInput}
                value={username}
            />
            <h2>WebSite</h2>
            <input 
                type="text"
                id="website"
                name="website"
                onChange={handleChangeInput}
                value={website}
            />
        </div>
        <button type="submit">Update</button>
        </form>
    )
};

export default EditUser;
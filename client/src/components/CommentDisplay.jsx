import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDataAPI } from './../utils/fetchData';

const CommentDisplay = ({cmnt}) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const res = await getDataAPI(`user/${cmnt.user}`);
            setUser(res.data.user);
        }
        fetchData();
    }, [cmnt.user]);
    return (
        <div className="comment__card2">
            <img className="comment__img" src={user.avatar} alt="profile"/>
            <h2 className="comment"><Link className="comment_lnk">{user.username}</Link>: {cmnt.content}</h2>
        </div>
    )
};

export default CommentDisplay;
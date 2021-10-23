import React from 'react'
import '../styles/homecard.css'
import { Link } from 'react-router-dom';
const HomeCard = ({n}) => {
    return (
            <div className="card">
                <div className="image">
                    <img src={n.images[0].url} />
                </div>
                <div className="title">
                    <h1>{n.title}</h1>
                </div>
                <div className="des">
                    <p>{n.content}</p>
                    <button ><Link className="btn1" to={`/news/${n._id}`}>Read More...</Link></button>
                </div>
            </div>
    )
}

export default HomeCard

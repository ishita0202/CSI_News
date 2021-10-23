import React from 'react';
import moment from 'moment';

const NewsCard = ({n}) => {
    if (!n.images) {
        return <span>Loading...</span>;
    }
    return (   
        <div>
            <div className="newscard__img">
                <img src={n.images[0].url} alt="news"/>
            </div>
            <div className="newscard__header">
                <p className="newscard__title">{n.title}</p>
                <div className="newscard__func">{n.category}</div>
                <div className="newscard__func">{moment(n.createdAt).fromNow()}</div>
            </div>
            
            <div className="newscard__content">{n.content}</div>
        </div>
    )
};

export default NewsCard;
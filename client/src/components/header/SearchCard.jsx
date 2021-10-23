import React from 'react';
import { Link } from 'react-router-dom';

const SearchCard = ({news, handleClose}) => {
    let title = news.title.slice(0, 20);
    if(title.length > 19)
        title += '...';
    return (
        <Link to={`/news/${news._id}`} className="search__card" onClick={handleClose}>
            <img src={news.images[0].url} className="search__img" alt="news"/>
            <h2 className="search__title">{title}</h2>
        </Link>
    )
};

export default SearchCard;
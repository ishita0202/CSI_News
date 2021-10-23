import React from 'react';
import { Link } from 'react-router-dom';
import { moment } from 'moment';

const SearchCard = ({news, handleClose}) => {
    let title = news.title.slice(0, 20);
    if(title.length > 19)
        title += '...';
    return (
        <Link to="" className="search__card" onClick={handleClose}>
            <img src={news.images[0].url} className="search__img"/>
            <h2 className="search__title">{title}</h2>
        </Link>
    )
};

export default SearchCard;
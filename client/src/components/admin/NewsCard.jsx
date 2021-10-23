import React, { useState } from 'react';
import moment from 'moment';
import EditNews from './EditNews';
import DeleteNews from './DeleteNews';
import { Link } from 'react-router-dom';

const NewsCard = ({n}) => {
    const [editNews, setEditNews] = useState(false);
    const [deleteNews, setDeleteNews] = useState(false);
    let title = n.title.slice(0, 20);
    if(title.length > 19)
        title += '...';
    return (
        <div className="anews__card">
            <div className="anews__main">
                <img className="anews__img" src={n.images[0].url} alt="news" />
                <div className="anews__content">
                    <h3 className="anews__title"><Link className="lnk" to={`/news/${n._id}`}>{title}</Link></h3>
                    <h3 className="anews__time ">{moment(n.createdAt).fromNow()}</h3>
                </div>
            </div>
            <div className="anews__btn">
                <button onClick={() => setEditNews(true)} className="anews__button btn btn--secondary">
                    Edit
                </button>
                {
                    editNews && <EditNews setEditNews={setEditNews} n={n}/>
                }
                <button onClick={() => setDeleteNews(true)} className="anews__button btn btn--primary">
                    Delete
                </button>
                {
                    deleteNews && <DeleteNews setDeleteNews={setDeleteNews} n={n} />
                }
            </div>
        </div>
    )
};

export default NewsCard;
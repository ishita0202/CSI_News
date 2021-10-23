import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataAPI } from './../../utils/fetchData';
import NewsCard from '../../components/NewsCard';
import moment from 'moment';

const News = () => {
    const { id } = useParams();
    const [news, setNews] = useState([]);
    useEffect(async () => {
        const res = await getDataAPI(`/news/${id}`);
        setNews(res.data.news);
    },[]);
    if (!news.images) {
        return <span>Loading...</span>;
    }
    return (
        <div>
            <div className="newscard__img">
                <img src={news.images[0].url} />
            </div>
            <div className="newscard__header">
                <p className="newscard__title">{news.title}</p>
                <div className="newscard__func">{news.category}</div>
                <div className="newscard__func">{moment(news.createdAt).fromNow()}</div>
            </div>
            
            <div className="newscard__content">{news.content}</div>
        </div>
    )
};

export default News;
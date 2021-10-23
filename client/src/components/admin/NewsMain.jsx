import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import '../../styles/newsmain.css';
import { getDataAPI } from './../../utils/fetchData';

const News_Main = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await getDataAPI('allnews');
            setNews(res.data.news);
        }
        fetchData();
    }, [setNews]);
    
    return (
        <div className="anews__container">
            {
                news.map(n => (
                    <NewsCard n={n}/>
                ))
            }
        </div>
    )
};

export default News_Main;
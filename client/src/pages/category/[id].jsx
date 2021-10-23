import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router';
import HomeCard from '../HomeCard';
import { getDataAPI } from './../../utils/fetchData';

const NewsCatvise = () => {
    const [news,setNews]=useState([])
    const {id}=useParams();
    useEffect(() => {
        async function fetchData() {
            const res = await getDataAPI(`newsCat/${id}`);
            setNews(res.data.news);
        }
        fetchData();
    }, [id, setNews]);
    return (
        <div>
            {
                news.map(n=>(
                    <HomeCard n={n} />
                ))
            }
        </div>
    )
}

export default NewsCatvise

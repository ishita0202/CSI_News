import React, { useState, useEffect } from 'react';
import { categorys } from '../../utils/categorys';
import closeIcon from '../../images/delete.png';
import addIcon from '../../images/add.png';
import { patchDataAPI } from '../../utils/fetchData';
import { imageUpload } from './../../utils/imageUpload';

const EditNews = ({setEditNews, n}) => {
    const state = {
        title: '',
        content: '',
        category: '',
        err: ''
    };

    const [news, setNews] = useState(state);
    const [images, setImages] = useState([]);
    const { title, content, category } = news;

    useEffect(() => {
        setNews(n);
        setImages(n.images);
    }, [setNews, n])

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setNews({...news, [name]: value, err: '', success: ''});
    };

    const handleChangeCategory = e => {
        setNews({...news, category: e.target.value});
    };

    const handleChangeImages = e => {
        const files = [...e.target.files];
        let errMsg = "";
        let newImages = [];

        files.forEach(file => {
            if(!file)
                return errMsg = "File does not exists."
            
            if(file.size > 1024 * 1024 * 5){
                return errMsg = "The image largest is 5MB.";
            }

            return newImages.push(file);
        })

        if(errMsg) 
            return setNews({...news, err: errMsg});
        
        setImages([...images, ...newImages]);
    };

    const deleteImages = (index) => {
        const newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let media = [];
        let newImg = images.filter(img => !img.url);
        let oldImg = images.filter(img => img.url);
        if (images.length === 0)
            return setNews({...news, err: "Please Add photo."});

        try {

            if(images.length > 0) 
                media = await imageUpload(newImg);
            await patchDataAPI(`editnews/${n._id}`, { title, content, category, images: [...oldImg, ...media] });
        } catch (err) {
            err.response.data.msg && setNews({...news, err: err.response.data.msg});
        }
        setImages([]);
        setEditNews(false);
    }

    return (
        <div className="addNews__main">
            <button className="addNews__close btn" onClick={() => setEditNews(false)}>
                <img className="icon" src={closeIcon} alt="close button" />
            </button>
            <form className="addNews__form">
                <h2 className="addNews__title">Edit News</h2>
                <label className="addNews__label" htmlFor="title">Title:</label>
                <input
                    className="addNews__input"
                    type="text" 
                    id="title"
                    name="title"
                    placeholder="Enter title..."
                    onChange={handleChangeInput}
                    value={title}
                />
                <label className="addNews__label" htmlFor="">Content:</label>
                <textarea
                    className="addNews__textarea"
                    type="text" 
                    id="content"
                    name="content"
                    placeholder="Enter content..."
                    onChange={handleChangeInput}
                    value={content}
                />
                <label className="addNews__label" htmlFor="category">Category:</label>
                <select value={category} onChange={handleChangeCategory} id="category" className="addNews__category">
                    <option className="addNews__option" value=""></option>
                    {
                        categorys.map((cat) => (
                            <option className="addNews__option" value={cat.name}>{cat.name}</option>
                        ))
                    }
                </select>
                <label className="addNews__label" htmlFor="file_up">Images</label>
                <div className="addNews__imgUpload">
                    <img className="addNews__add" src={addIcon} alt="edit news" />
                    <input onChange={handleChangeImages} className="addNews__images" type="file" name="file" id="file_up" accept="image/*" multiple/>
                </div>
                
                <div className="addNews__showimg">
                    {
                        images.map((img, index) => (
                            <div key={index} id="file__img">
                                {  
                                    img.url
                                        ? <>
                                            <img className="addNews__thumb" src={img.url} alt="images" />
                                        </>
                                        : <>
                                            <img className="addNews__thumb" src={URL.createObjectURL(img)} alt="images" />
                                        </>
                                }
                                <span onClick={() => deleteImages(index)}>&times;</span>
                            </div>
                        ))
                    }
                </div>

                <button onClick={handleSubmit} className="btn btn--primary addNews__btn">
                    Update
                </button>
            </form>
        </div>
    )
};

export default EditNews;
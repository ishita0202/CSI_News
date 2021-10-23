import React, { useState } from 'react';
import AddIcon from '../../images/plus.png';
import AddNews from './addNews';

const Header = () => {
    const [addNews, setAddNews] = useState(false);
    return (
        <div className="admin__header">
            <h2 className="admin__title">News Panel: </h2>
            <span className="icon-container">
                <button className="btn" onClick={() => setAddNews(true)}>
                    <img className="admin__addNews icon" src={AddIcon} alt="plus" />
                </button>
                {
                    addNews && <AddNews setAddNews={setAddNews}/>
                }
            </span>
        </div>
    )
};

export default Header;
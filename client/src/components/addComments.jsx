import React,{ useState } from 'react';
import closeIcon from '../images/delete.png';
import { postDataAPI, getDataAPI } from '../utils/fetchData';
import jwt from 'jsonwebtoken';


const AddComments = ({setAddCmnt, postId, postUserId}) => {
    const state = {
        content: '',
    };

    const [cmnt, setCmnt] = useState(state);
    const {content} = cmnt;

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setCmnt({...cmnt, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const id = jwt.decode(localStorage.getItem("user")).id;
        try {
            const res1 = await getDataAPI(`user/${id}`);
            const comment = {
                content,
                user: res1.data.user,
                createdAt: new Date().toISOString(),
            }
            await postDataAPI('addcomment', {...comment, postId: postId, postUserId: postUserId}, localStorage.getItem("user"));
        } catch (err) {
            err.response.data.msg && setCmnt({...cmnt, err: err.response.data.msg});
        }
        setAddCmnt(false);
    }
    return (
        <div className="addNews__main addComments__main">
            <button className="addNews__close addComment__close btn" onClick={() => setAddCmnt(false)}>
                <img className="icon" src={closeIcon} alt="close button" />
            </button>
            <form className="addNews__form addComment__form">
                <h2 className="addNews__title">Add Comment</h2>
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
                <button onClick={handleSubmit} className="btn btn--primary addNews__btn">
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddComments

import React, { useState, useEffect } from "react";
import { patchDataAPI } from "../utils/fetchData";
import { imageUpload } from "../utils/imageUpload";
import "../styles/admin.css";
import deleteIcon from '../images/delete.png';

const EditUser = ({ setEditUser, userInfo }) => {
  const state = {
    username: "",
    website: "",
    err: "",
  };

  const [user, setUser] = useState(state);
  const [avatar, setAvatar] = useState("");
  const { username, website } = user;

  useEffect(() => {
    setUser(userInfo);
  }, [setUser, setAvatar, userInfo]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let media;
    try {
      if (avatar) media = await imageUpload([avatar]);
      await patchDataAPI(`edituser/${userInfo._id}`, {
        username,
        website,
        avatar: avatar ? media[0].url : userInfo.avatar,
      });
    } catch (err) {
      err.response.data.msg && setUser({ ...user, err: err.response.data.msg });
    }
  };

  return (
    <div className="Edituser__main">
      <button onClick={() => setEditUser(false)} className="addNews__close btn">
        <img className="icon" src={deleteIcon} alt="cancel"/>
      </button>
      <form onSubmit={handleSubmit} className="addNews__form">
        <div>
          <img
            className="user_avatar"
            src={avatar ? URL.createObjectURL(avatar) : userInfo.avatar}
            alt="avatar"
          />
          <span >
           
            <h2 classname="addNews__label">Change</h2>
            <input  className=" editimg__input"
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>
        <h2 classname="addNews__label">UserName:</h2>
        <input
          className=" addNews__input"
          type="text"
          id="username"
          name="username"
          onChange={handleChangeInput}
          value={username}
        />
        <h2 classname="addNews__label">WebSite</h2>
        <input
          className=" addNews__input"
          type="text"
          id="website"
          name="website"
          onChange={handleChangeInput}
          value={website}
        />

        <button type="submit" className="btn btn--primary addNews__btn" >Update</button>
      </form>
    </div>
  );
};

export default EditUser;
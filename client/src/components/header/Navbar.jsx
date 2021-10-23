import React,{useState} from 'react';
import sprite from '../../images/sprite-1.svg';
import '../../styles/navbar.css';
import Logout from '../logout';
import Search from './Search';
import { Link } from 'react-router-dom';
import { categorys } from '../../utils/categorys';
import jwt from 'jsonwebtoken';


const Navbar = () => {
    const id = jwt.decode(localStorage.getItem("user")).id;
    const categoryNews=(category)=>{
        const url = `/category/${category}`;
        window.location.href=url;
    }
    const toggleBtn = () => {
        const collapsibles = document.querySelectorAll(".collapsible");
        collapsibles.forEach((item) =>
            item.addEventListener("click", function () {
                this.classList.toggle("collapsible--expanded");
            })
        );
    };

    return (
        <header>
            <nav className="nav collapsible collapsible--expanded">
                <a className="nav__brand" href="/">logo</a>
                <svg onClick={toggleBtn} className="icon nav__toggler">
                     <use href={sprite + "#menu"}></use>
                </svg>
                <Search sprite={sprite} />
                <ul className="list nav__list collapsible__content">
                    <li className="nav__item"><Link to="/">News</Link></li>
                    <li className="nav__item"><Link to="/aboutus">About US</Link></li>
                    <li className="nav__item"><Link to='/admin'>Admin</Link></li>
                    <li className="nav__item"><Link to={`/profile/${id}`}>Profile</Link></li>
                    <li className="nav__item"><Link to="/"><Logout /></Link></li>
                </ul>
            </nav>
            <div className="category">
                <ul className="sub__list block-domain__prices">
                    {
                        categorys.map(cate =>(
                            <li className="badge" key={cate.name} onClick={() => categoryNews(cate.name)}>{cate.name}</li>
                        ))
                    }
                </ul>
            </div>
        </header>
    )
};

export default Navbar;
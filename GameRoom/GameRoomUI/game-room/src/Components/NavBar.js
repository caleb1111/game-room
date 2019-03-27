import React from 'react';
import { Link } from "react-router-dom";
import '../style/home.css';
import MovingLogo from './MovingLogo';

const Nav = () => (
    <div className="row">
        <MovingLogo />
        <ul className="main-nav">
            <li style={{visibility:"hidden"}}><Link to='/game/'>Game</Link></li>
            <li><Link to='/home/'>Lobby</Link></li>
            <li><Link to='/shop/'>Shop</Link></li>
            <li><Link to='/userprofile/'>User Profile</Link></li>
            <li><Link to='/signin/'>Sign Out</Link></li>
        </ul>
    </div>
  );

export default Nav
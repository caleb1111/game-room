import React from "react";
import '../style/players_online.css';
import User_img from '../media/user.png';

class PlayersOnline extends React.Component{
    
    render(){
        return (
            <div className="player_list">
                <div className="menu_title">Players Online</div>
                    <div className="player_box">
                    <ul id="players">
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman</cite></li>
                        </ul>
                    </div>
            </div>
        );
    }
}

export default PlayersOnline;

import React from "react";
import '../style/friend_list.css';
import User_img from '../media/user.png';

class FriendList extends React.Component{
    
    render(){
        return (
            <div className="friend_list">
                <div className="menu_title">Friend List</div>
                    <div className="friend_box">
                    <ul id="friends">
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

export default FriendList;

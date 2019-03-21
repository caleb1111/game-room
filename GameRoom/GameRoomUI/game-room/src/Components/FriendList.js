import React from "react";
import '../style/friend_list.css';
import User_img from '../media/user.png';

class FriendList extends React.Component{
    state = {
        friends: [
            {friendId: 1, name: "friend1", img: User_img},
            {friendId: 2, name: "friend2", img: User_img},
            {friendId: 3, name: "friend3", img: User_img},
            {friendId: 4, name: "friend4", img: User_img},
            {friendId: 5, name: "friend5", img: User_img},
        ]
    }

    render(){
        return (
            <div className="friend_list">
                <div className="menu_title">Friend List</div>
                    <div className="friend_box">
                    <ul id="friends">
                        {this.state.friends.map(friend => {
                            return (
                                <li><cite><img src={friend.img} alt='user_img'/>{friend.name}</cite></li>
                            )
                        })}
                        </ul>
                    </div>
            </div>
        );
    }
}

export default FriendList;

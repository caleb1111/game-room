import React from "react";
import '../style/friend_list.css';

class FriendList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            friends : this.props.friends
        }
    }


    render(){

        return (
            <div className="friend_list">
                <div className="menu_title">Friend List</div>
                    <div className="friend_box">
                    <ul id="friends">
                        {this.state.friends.map((friend, i) => {
                            return (
                                <li key={i}><cite style={{textAlign:"center"}}>{friend}</cite></li>
                            )
                        })}
                        </ul>
                    </div>
            </div>
        );
    }
}

export default FriendList;

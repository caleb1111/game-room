import React from "react";
import '../style/friend_list.css';

class FriendList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isClicked: false,
            friends : ["this.props.friends", "11"]
        }

        this.handleMouseClicked = this.handleMouseClicked.bind(this);
    }

    handleMouseClicked() {
        this.setState(this.clickState);
        console.log("clicked ", this.state.isClicked);
      }
    
      clickState(state) {
        return {
            isClicked: !state.isClicked,
        };
      }

    render(){
        let showDropDown = this.state.isClicked ? "show" : "hide";

        return (
            <div className="friend_list">
                <div className="menu_title">Friend List</div>
                    <div className="friend_box">
                    <ul id="friends">
                        {this.state.friends.map((friend, i) => {
                            return (
                                <li key={i}
                                onClick={this.handleMouseClicked}><cite style={{textAlign:"center"}}>{friend}</cite>
                                <div className={showDropDown}>
                                    Hello
                                </div>
                                </li>
                            )
                        })}
                        </ul>
                    </div>
            </div>
        );
    }
}

export default FriendList;

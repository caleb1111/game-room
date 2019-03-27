import React, {Component} from 'react';
// import styled from 'styled-components';
import '../style/room_hovered.css';
import User_img from '../media/user.png';


class RoomHovered extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            joined: false,
            players:[
                {playerId: 1, player_name: "player1", img:User_img},
                {playerId: 2, player_name: "player2", img:User_img}

            ]
        }
        this.handleJoin = this.handleJoin.bind(this);
    }


    show = {
        showLeave : false
    }

    handleJoin(){
        this.setState(this.clickJoinState);
        if (this.state.joined === true){

            // display leave btn and ready btn and hide join btn
        }
    }

    clickJoinState(state) {
        return {
          joined: !state.joined,
        };
      }
    

render(){
    let hideOrShow = this.state.joined ? "hide" : "show";
    let showOrHide = this.state.joined ? "show" : "hide";
    return(
    <div className="room_hover">
        <div className="hovered">
        {this.state.players.map((player, i) => {
                        return (
                            <div key={i}><img src={player.img} alt="player"/>{player.player_name}</div>
                        )
                    })}
        </div>
        <div className={hideOrShow}>
        <button className="join_btn" 
            onClick={() => this.clickJoinState && this.handleJoin()} >Join Game</button>
        </div>
        <div className={showOrHide}>
        <button className="leave_btn" 
            onClick={() => this.clickJoinState && this.handleJoin()} >Leave Game</button>
        <button className="ready_btn">Ready</button>
        </div>

    </div>
    );
 }
}

export default RoomHovered;
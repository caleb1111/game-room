import React, {Component} from 'react';
import '../style/room_hovered.css';
import User_img from '../media/user.png';


class RoomHovered extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            joined: true,
            ready : true,
            players : [
               {playerId: 1, player_name: "player1", img:User_img},
               {playerId: 2, player_name: "player2", img:User_img}
            ]
        }
        this.handleJoin = this.handleJoin.bind(this);
        this.handleReady = this.handleReady.bind(this);
    }

    handleJoin(){
        console.log("join: ", this.state.joined)
        this.setState(this.clickJoinState);
        console.log("ready: ", this.state.ready)
    }

    clickJoinState(state) {
        if (this.state.joined === false){
                this.setState({ready: false})
        }
        return {
          joined: !state.joined,
        };
      }

    handleReady(){
        this.setState(this.clickReadyState)
        console.log("ready: ", this.state.ready)
    }

    clickReadyState(state) {
        return{
            ready: !state.ready,
        };
    }

render(){
    let hideOrShow = this.state.joined ? "show" : "hide";
    let showOrHide = this.state.joined ? "hide" : "show";
    return(
    <div className="room_hover">
        <div className="hovered">
        {this.state.players.map((player, i) => {
                        return (
                            <div key={i}><img src={player.img} alt="player"/>{player.player_name}:{player.ready_state}</div>
                        )
                    })}
            <div className={hideOrShow}>
                <button className="join_btn" 
                    onClick={() => this.clickJoinState && this.handleJoin()} >Join Game</button>
            </div>
            <div className={showOrHide}>
                <button className="leave_btn" 
                    onClick={() => this.clickJoinState && this.handleJoin()} >Leave Game</button>
                <button className="ready_btn"
                    onClick={() => this.clickReadyState && this.handleReady()} >Ready</button>
            </div>
        </div>
    </div>
    );
 }
}

export default RoomHovered;
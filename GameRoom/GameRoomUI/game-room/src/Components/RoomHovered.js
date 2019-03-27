import React, {Component} from 'react';
import '../style/room_hovered.css';
import User_img from '../media/user.png';

class RoomHovered extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            players:[
                {playerId: 1, player_name: "player1", img:User_img},
                {playerId: 2, player_name: "player2", img:User_img}
            ]
        }
    }

render(){
    return(
    <div className="room_hover">
        <div className="hovered">
        {this.state.players.map((player, i) => {
                        return (
                            <div key={i}><img src={player.img} alt="player"/>{player.player_name}</div>
                        )
                    })}
        </div>
        <button className="join_btn"
        onClick={() => console.log("join room", )}>Join Game</button>
    </div>
    );
 }
}

export default RoomHovered;
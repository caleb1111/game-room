import React from "react";
import '../style/players_online.css';
import User_img from '../media/user.png';

class PlayersOnline extends React.Component{
    state = {
        players: [
            {playerId: 1, name: "player1", img: User_img},
            {playerId: 2, name: "player2", img: User_img},
            {playerId: 3, name: "player3", img: User_img},
            {playerId: 4, name: "player4", img: User_img},
            {playerId: 5, name: "player5", img: User_img},
        ]
    }

    render(){
        return (
            <div className="player_list">
                <div className="menu_title">Players Online</div>
                    <div className="player_box">
                    <ul id="players">
                    {this.state.players.map((player, i) => {
                            return (
                                <li key={i}><cite><img src={player.img} alt='user_img'/>{player.name}</cite></li>
                            )
                        })}
                        </ul>
                    </div>
            </div>
        );
    }
}

export default PlayersOnline;

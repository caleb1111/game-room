import React from "react";
import '../style/players_online.css';

class PlayersOnline extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            players : this.props.players
        }
    }

    render(){
        return (
            <div className="player_list">
                <div className="menu_title">Players Online</div>
                    <div className="player_box">
                    <ul id="players">
                    {this.state.players.map((player, i) => {
                            return (
                                <li key={i}><cite style={{textAlign:"center"}}>{player}</cite></li>
                            )
                        })}
                        </ul>
                    </div>
            </div>
        );
    }
}

export default PlayersOnline;

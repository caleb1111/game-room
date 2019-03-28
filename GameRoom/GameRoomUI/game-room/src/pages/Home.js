import React, { Component } from 'react';
import Logo from '../Components/Logo';
import Nav from '../Components/NavBar';
import Chat from '../Components/Chat';
import FriendList from '../Components/FriendList';
import '../style/lobby.css';
import PlayersOnline from '../Components/PlayersOnline';
import RoomHovered from '../Components/RoomHovered';


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false,
    };

  //   this.socket = this.props.socket;

  //   this.socket.on("joined", function(result, lobbyId){
  //     if (result){
  //         lobbyId = lobbyId;
  //         sessionStorage.setItem("lobbyId", lobbyId);
  //     }    
  //   });
  }

/*
  handleReady(){
    this.socket.emit("ready", lobbyId);
    // change something to indicate player is ready
  };

  handleLeave(){
    lobbyId = null;
            // remove player from list
  }
*/

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }
  

  Rooms = {
    items: [
      {room_id:1, room_name: "Game Room 1", player1: null, player2: null},
      {room_id:2, room_name: "Game Room 2", player1: null, player2: null},
      {room_id:3, room_name: "Game Room 3", player1: null, player2: null},
      {room_id:4, room_name: "Game Room 4", player1: null, player2: null},
      {room_id:5, room_name: "Game Room 5", player1: null, player2: null},
      {room_id:6, room_name: "Game Room 6", player1: null, player2: null},
      {room_id:7, room_name: "Game Room 7", player1: null, player2: null},
      {room_id:8, room_name: "Game Room 8", player1: null, player2: null},
      {room_id:9, room_name: "Game Room 9", player1: null, player2: null},
    ]
  }

  render() {
    return (
      <div className="background">
        <header>
          <a href="/"><Logo/></a>
          <Nav/>
        </header>
        <br></br>

        <div>
        <div id="lobby_wrapper">
        <div className="empty"></div>

        <div id="lobby_leftsidebar">
            <Chat />
        </div>

        <div id="lobby_main">
                <div id="game_rooms">
                    <ul id="game_room">
                    {this.Rooms.items.map((item, i) => {
                        return (
                            <li key={i} onMouseEnter={this.handleMouseHover}
                                onMouseLeave={this.handleMouseHover}>
                                {item.room_name}
                                 <RoomHovered />
                            </li>
                        )
                    })}
                    </ul> 
                </div>
        </div>

        <div id="lobby_sidebar">
                <FriendList />
                <PlayersOnline />
            </div>
        </div>
            <div className="clear"></div>
        </div>
      </div>
    );
  }
}
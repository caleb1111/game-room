import React, { Component } from 'react';
import Logo from '../Components/Logo';
import Nav from '../Components/NavBar';
import Chat from '../Components/Chat';
import FriendList from '../Components/FriendList';
import '../style/lobby.css';
import PlayersOnline from '../Components/PlayersOnline';


export default class Home extends Component {
  state = {
    items: [
      {room_id:1, room_name: "Room 1"},
      {room_id:2, room_name: "Room 2"},
      {room_id:3, room_name: "Room 3"},
      {room_id:4, room_name: "Room 4"},
      {room_id:5, room_name: "Room 5"},
      {room_id:6, room_name: "Room 6"},
      {room_id:7, room_name: "Room 7"},
      {room_id:8, room_name: "Room 8"},
      {room_id:9, room_name: "Room 9"},
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
                    {this.state.items.map(item => {
                        return (
                            // <div>{message.username}: {message.message}</div>
                            <li>ID{item.room_id}:{item.room_name}</li>
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
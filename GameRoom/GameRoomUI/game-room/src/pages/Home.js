import React, { Component } from 'react';
import Logo from '../Components/Logo';
import Nav from '../Components/NavBar';
import Chat from '../Components/Chat';
import FriendList from '../Components/FriendList';
import io from "socket.io-client";
import '../style/lobby.css';
import PlayersOnline from '../Components/PlayersOnline';
import RoomHovered from '../Components/RoomHovered';


export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      playersOnline: [],
      friend_list: []
    };

    this.socket = io.connect('http://localhost:5000');
  }

  componentDidMount(){
    const that = this;
    fetch('http://localhost:5000/api/user/loggedUsers/', {
            credentials: 'include',
            }).then(function(response){
                return response.json(); 
            })
                .then(function(data) {
                    const items = data;
                    for (let i=0; i < items.length; i++){
                      that.state.playersOnline.push(items[i]._id);
                    }
                })
            .catch(function(error){
                console.log(error);
              })
              
    fetch('http://localhost:5000/api/currUser/', {
        credentials: 'include',
      })
      .then(function(response) {
        return response.json(); 
      })
        .then(function(data) {
            const user = data;
            that.setState({
              user: user
            })
            for(let i=0; i < user.friends.length; i++){
              that.state.friend_list.push(user.friends[i])
            }
            fetch('http://localhost:5000/api/user/'+ that.state.user._id +'/' + that.socket.id + '/', {
            credentials: 'include',
            method: 'PATCH'
            }).then(function(response){
                return response.json(); 
            })
                .then(function(data) {
                    const items = data;
                    console.log(items);
                })
            .catch(function(error){
                console.log(error);
              })
            })
      .catch(function(error){
        console.log(error);
      })
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
    const userName = this.state.user._id;
    const friends = this.state.friend_list;
    const players = this.state.playersOnline;

    return (
      <div className="background">
        <header>
          <a href="/"><Logo/></a>
          <Nav/>
        </header>
        <br></br>

        <div>
        <div id="lobby_wrapper">
        <div className="empty">
        </div>

        <div id="lobby_leftsidebar">
            <Chat userName={userName}/>
        </div>

        <div id="lobby_main">
                <div id="game_rooms">
                    <ul id="game_room">
                    {this.Rooms.items.map((item, i) => {
                        return (
                            <li key={i}>
                                {item.room_name}
                                 <RoomHovered />
                            </li>
                        )
                    })}
                    </ul> 
                </div>
        </div>

        <div id="lobby_sidebar">
                <FriendList friends={friends}/>
                <PlayersOnline players={players}/>
            </div>
        </div>
        </div>
      </div>
    );
  }
}
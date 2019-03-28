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

    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleUser = this.handleUser.bind(this);

    this.state = {
      isHovering: false,
      user: {}
    };

    this.socket = io.connect('http://localhost:5000');

    // this.socket.on("joined", function(result, lobbyId){
    //   if (result){
    //       lobbyId = lobbyId;
    //       sessionStorage.setItem("lobbyId", lobbyId);
    //   }    
    // });
  }



  handleUser(){
    const that = this;
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
            console.log("user: ", user)
            console.log("user name: ", user._id)
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
    const userName = this.state.user._id;

    return (
      <div className="background">
        <header onLoad={this.handleUser}>
          <a href="/"><Logo/></a>
          <Nav/>
        </header>
        <br></br>

        <div>
        <div id="lobby_wrapper">
        <div className="empty"></div>

        <div id="lobby_leftsidebar">
            <Chat userName={userName}/>
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
        </div>
      </div>
    );
  }
}
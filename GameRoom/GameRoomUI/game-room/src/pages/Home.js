import React, { Component } from 'react';
import Logo from '../Components/Logo';
import Nav from '../Components/NavBar';
import io from "socket.io-client";
import '../style/lobby.css';
import '../style/friend_list.css';
import '../style/players_online.css';
import '../style/chat.css'
import User_img from '../media/user.png';

// import PlayersOnline from '../Components/PlayersOnline';
import RoomHovered from '../Components/RoomHovered';


export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isClicked: false,
      user: {},
      playersOnline: [],
      friend_list: [],
      message: '',
      messages: []
    };

    this.socket = io.connect('http://localhost:5000');

    this.socket.on('receiveMessage', function(data){
      console.log("receive data:", data)
      addMessage(data);
    });

    // this.socket.on('refreshPlayers', function(data){
    //   console.log("refreshPlayers:", data)
    //   refresh(data);
    //   fetch('http://localhost:5000/api/user/loggedUsers/', {
    //     credentials: 'include',
    //     }).then(function(response){
    //         return response.json(); 
    //     })
    //         .then(function(data) {
    //             const items = data;
    //             that.setState({
    //               playersOnline: items
    //             })
    //         })
    //     .catch(function(error){
    //         console.log(error);
    //       })
    // });

    // this.socket.emit('login', function() {
    // });

  this.sendMessage = ev => {
      console.log("send: msg: ", this.state.message);
      ev.preventDefault();
      if (this.state.message !== ''){
          this.socket.emit('sendMessage', {
              username: this.state.user._id,
              message: this.state.message,
          });
      }
      this.setState({message: ''});
  }
  
  const addMessage = data => {
      console.log("add data", data);
      this.setState({messages: [...this.state.messages, data]});
      console.log(this.state.messages);
  };

    this.handleMouseClicked = this.handleMouseClicked.bind(this);

  }

  componentDidMount(){
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
              user: user,
              friend_list: ['user.friends']
            })
            // console.log("f:" , that.state.friend_list)
          })
      .catch(function(error){
        console.log(error);
      })
      fetch('http://localhost:5000/api/user/loggedUsers/', {
        credentials: 'include',
        }).then(function(response){
            return response.json(); 
        })
            .then(function(data) {
                const items = data;
                that.setState({
                  playersOnline: items
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

  handleMouseClicked() {
    this.setState(this.clickState);
    console.log("clicked ", this.state.isClicked);
  }

  clickState(state) {
    return {
        isClicked: !state.isClicked,
    };
  }

  render() {
    let showAddedFriendBtn = this.state.isClicked ? "show" : "hide";


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
        <div className="chat_box">
                <div className="menu_title">Chat</div>
                <div className="chat_content">
                    <div className="messages_box">
                    <ul id="message">
                    {this.state.messages.map((message, i) => {
                        return (
                            <li key={i}><div className="msg"><img src={User_img} alt='user_img'/>{message.username}: {message.message}</div></li>
                        )
                    })}
                    </ul>
                    </div>
                <div>
                <input type="text" placeholder="Enter Your Message" className="form_element" value={this.state.message}
                    onChange={ev => this.setState({message: ev.target.value})} required/>
                <br/>
                <button onClick={this.sendMessage} className="btn_msg">Send</button>
                </div>
                </div>
            </div>
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
            <div className="friend_list">
                    <div className="menu_title">Friend List</div>
                        <div className="friend_box">
                        <ul id="friends">
                            {this.state.friend_list.map((friend, i) => {
                                return (
                                    <li key={i}
                                    onClick={this.handleMouseClicked}><cite style={{textAlign:"center"}}>{friend}</cite>
                                    <div className={showAddedFriendBtn}>
                                        <div className="friend_clicked">
                                            <button className="f_btn">Add Friend</button>
                                            <button className="f_btn">View Profile</button>
                                        </div>
                                    </div>
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                </div>
                
                
                <div className="player_list">
                <div className="menu_title">Players Online</div>
                    <div className="player_box">
                    <ul id="players">
                    {this.state.playersOnline.map((player, i) => {
                            return (
                                <li key={i}><cite style={{textAlign:"center"}}>{player._id}</cite></li>
                            )
                        })}
                        </ul>
                    </div>
            </div>

            </div>
        </div>
        </div>
      </div>
    );
  }
}
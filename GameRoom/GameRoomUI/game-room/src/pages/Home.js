import React, { Component } from 'react';
import Logo from '../Components/Logo';
import Nav from '../Components/NavBar';
import Chat from '../Components/Chat';
import '../style/lobby.css';


export default class Home extends Component {
  
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
                        <li>game room 1</li>
                        <li>game room 2</li>
                        <li>game room 3</li>
                        <li>game room 4</li>
                        <li>game room 5</li>
                        <li>game room 6</li>
                        <li>game room 7</li>
                        <li>game room 8</li>
                        <li>game room 9</li>
                    </ul>   
                </div>
        </div>

        <div id="lobby_sidebar">
            <div className="player_box">
                <span className="menu_title">Friend List</span>
            </div>

            <div className="player_box">
                <span className="menu_title">Players Online</span>
            </div>
        </div>
            <div className="clear"></div>
        </div>
        </div>
      </div>
    );
  }
}
import React from 'react';
import '../../style/lobby.css';

const Lobby = () => (
    <div>
        <div id="lobby_wrapper">
        <div className="empty"></div>

        <div id="lobby_leftsidebar">

            <div className="leftsidebar_box">
                <span className="menu_title">Chat</span>
                <span className="menu_desc"></span>
            </div>
        </div>

        <div id="lobby_main">
                <div id="home">
                    <ul id="game_room">
                        <li><img src="" alt="game room 1"/></li>
                        <li><img src="" alt="game room 2" /></li>
                        <li><img src="" alt="game room 3" /></li>
                        <li><img src="" alt="game room 4" /></li>
                        <li><img src="" alt="game room 5" /></li>
                        <li><img src="" alt="game room 6" /></li>
                        <li><img src="" alt="game room 7" /></li>
                        <li><img src="" alt="game room 8" /></li>
                        <li><img src="" alt="game room 9" /></li>
                        
                    </ul>   
                </div>
        </div>

        <div id="lobby_sidebar">
            <div className="sidebar_box">
                <span className="menu_title">Friend List</span>
                <span className="menu_desc"></span>
            </div>

            <div className="sidebar_box">
                <span className="menu_title">Players Online</span>
                <span className="menu_desc"></span>
            </div>
        </div>
            <div className="clear"></div>
        </div>
    </div>
  );

export default Lobby
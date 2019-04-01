import React from 'react';
import { Link } from "react-router-dom";
import '../style/home.css';
import io from "socket.io-client";


class Nav extends React.Component {

    constructor() {
        super();
    
        this.handleSignout = this.handleSignout.bind(this);
        this.handleProfileReset = this.handleProfileReset.bind(this);

        this.socket = io.connect('http://localhost:5000');
    }

    handleSignout() {
      const that = this;
      fetch('http://localhost:5000/signout/', {
        credentials: 'include',
      })
      .then(function(response) {
        return response.json(); })
        .then(function() {
            that.socket.emit("logout");
            that.socket.disconnect();
      })
      .catch(function(error){
        console.log(error);
      })
    }

    handleProfileReset() {
      fetch('http://localhost:5000/api/user/profile/reset', {
        method: "PATCH",
        credentials: 'include'
      })
      .catch(function(error){
        console.log(error);
      })
    }
  
    render(){
      return(
        <div className="row">
            <ul className="main-nav">
                <li style={{visibility:"hidden"}}><Link to='/game/'>Game</Link></li>
                <li><Link to='/home/' onClick={()=> this.handleProfileReset()}>Lobby</Link></li>
                <li><Link to='/shop/' onClick={()=> this.handleProfileReset()}>Shop</Link></li>
                <li><Link to='/userprofile/'>User Profile</Link></li>
                <li><Link to='/credits/' onClick={()=> this.handleProfileReset()}>Credits</Link></li>
                <li><Link to='/signin/' 
                onClick={() => this.handleSignout()}>Sign Out</Link></li>
            </ul>
        </div>
      );
    }
  }
  
  export default Nav;
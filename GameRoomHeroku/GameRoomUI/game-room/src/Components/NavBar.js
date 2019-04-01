import React from 'react';
import { Link } from "react-router-dom";
import '../style/home.css';
import io from "socket.io-client";


class Nav extends React.Component {

    constructor() {
        super();
    
        this.handleSignout = this.handleSignout.bind(this);
        this.handleProfileReset = this.handleProfileReset.bind(this);

        this.socket = io.connect('https://cscc09gameroom.herokuapp.com');
    }

    handleSignout() {
      const that = this;
      fetch('https://cscc09gameroom.herokuapp.com/signout/', {
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
      fetch('https://cscc09gameroom.herokuapp.com/api/user/profile/reset', {
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
                <li><Link to='/shop/'>Shop</Link></li>
                <li><Link to='/userprofile/'>User Profile</Link></li>
                <li><Link to='/signin/' 
                onClick={() => this.handleSignout()}>Sign Out</Link></li>
            </ul>
        </div>
      );
    }
  }
  
  export default Nav;
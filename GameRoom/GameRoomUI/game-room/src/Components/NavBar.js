import React from 'react';
import { Link } from "react-router-dom";
import '../style/home.css';
import io from "socket.io-client";


class Nav extends React.Component {

    constructor() {
        super();
    
        this.handleSignout = this.handleSignout.bind(this);

        this.socket = io.connect('http://localhost:5000');

    }

    handleSignout() {
      const that = this;
      fetch('http://localhost:5000/signout/', {
        credentials: 'include',
      })
      .then(function(response) {
        return response.json(); })
        .then(function(data) {
            const items = data;
            console.log(items)
            that.socket.disconnect();
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
                <li><Link to='/home/'>Lobby</Link></li>
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
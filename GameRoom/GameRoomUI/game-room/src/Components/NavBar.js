import React from 'react';
import { Link } from "react-router-dom";
import '../style/home.css';
import MovingLogo from './MovingLogo';

class Nav extends React.Component {

    constructor() {
        super();
    
        this.handleSignout = this.handleSignout.bind(this);
    }

    handleSignout() {
        var that = this;
          fetch('http://localhost:5000/signout/')
          .then(function(response) {
            return response.json(); })
            .then(function(data) {
                const items = data;
                console.log(items)
                that.props.history.push("/");
          })
          .catch(function(error){
            console.log(error);
          })
      }

    render(){
      return(
        <div className="row">
            <MovingLogo />
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
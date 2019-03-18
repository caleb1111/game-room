import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from '../Components/Logo';
import '../style/home.css';
import Nav from '../Components/NavBar';
import User from '../Components/User';

export default class UserProfile extends Component {

    render() {
      return (
        <div className="background">
          <header>
            <Link to="/"><Logo/></Link>
            <Nav/>
          </header>
          <br></br>
          <hr />
          <User />
        </div>
      );
    }
  }
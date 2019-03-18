import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from '../Components/Logo';
import '../style/home.css';
import Nav from '../Components/NavBar';

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
          <div>
              <h1 style={{color: 'white'}}>This is Shop Page</h1>
          </div>
        </div>
      );
    }
  }
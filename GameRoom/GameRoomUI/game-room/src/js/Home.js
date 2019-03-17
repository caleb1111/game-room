import React, { Component } from 'react';
import Logo from './Components/Logo';
import Nav from './Components/NavBar';
import Lobby from './Components/Lobby';



export default class Home extends Component {

  render() {
    return (
      <div className="background">
        <header>
          <a href="/"><Logo/></a>
          <Nav/>
        </header>
        <br></br>
        <hr></hr>
        <Lobby />
      </div>
    );
  }
}
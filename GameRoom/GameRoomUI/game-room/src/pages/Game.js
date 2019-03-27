import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from '../Components/Logo';
import '../style/game.css';
import Nav from '../Components/NavBar';
import destroyer from "../media/game/destroyer.png";
import destroyerH from "../media/game/destroyerH.png";
import submarine from "../media/game/submarine.png";
import submarineH from "../media/game/submarineH.png";
import cruiser from "../media/game/cruiser.png";
import cruiserH from "../media/game/cruiserH.png";
import dreadnought from "../media/game/dreadnought.png";
import dreadnoughtH from "../media/game/dreadnoughtH.png";
import carrier from "../media/game/carrier.png";
import carrierH from "../media/game/carrierH.png";
import hit from "../media/game/hit.png";
import miss from "../media/game/miss.png";
import coin from "../media/items/coin.png";


export default class Game extends Component {

    render() {
      return (
        <div className="background">
          <header>
          <Link to="/home/"><Logo/></Link>
            <Nav/>
          </header>
          <br />

          <p id="gameTitle">BattleShip</p>
    <p id="error_box"></p>

    <div id="ending">
        <p id="result">Result</p>
        <div class="board">
            <p>Gained </p>
            <p id="earned">xxx </p>
            <img class="coin" src={coin} alt="coin"></img>
        </div>
        <button id="returnButton">Return to Lobby</button>
    </div>

    <div id="gameContent">

        <div class="board">
            <div id="player">
                <p id="yFleet">Your Fleet</p>
                <canvas width="400" height="400" id="playerBoard"></canvas>
            </div>
            <div id="opponent">
                <p id="oFleet">Opponent's Fleet</p>
                <canvas width="400" height="400" id="opponentBoard"></canvas>
            </div>
            <div id="turnText"></div>

            <div id="logs">
                <p id="logTitle">Log</p>
                <p id="textLog"></p>
            </div>
            
        </div>
        <h3 id="status">Waiting For Both Players To Set Up</h3>
        <div id="fl">
            <p id="fleetText">Fleet</p>
            <div id="deployments">
                <div id="carrierSelect" class="entry">
                    
                    <img id="carrierImg" class="shipName" src={carrier} alt="ship"></img>
                    <div id ="carrierBar" class="selector"></div>
                    <p class="shipName">Carrier</p>
                    <p class="shipName" id="carrierRemaining">Remaining: </p>
                </div>

                <div id="dreadnoughtSelect" class="entry">
                    <img id="dreadnoughtImg" class="shipName" src={dreadnought} alt="ship"></img>
                    <div id="dreadnoughtBar" class="selector"></div>
                    <p class="shipName">Dreadnought</p>
                    <p class="shipName" id="dreadnoughtRemaining">Remaining: </p>
                </div>

                <div id="cruiserSelect" class="entry">
                    <img id="cruiserImg" class="shipName" src={cruiser} alt="ship"></img>
                    <div id="cruiserBar"class="selector"></div>
                    <p class="shipName">Cruiser</p>
                    <p class="shipName" id="cruiserRemaining">Remaining: </p>
                </div>

                <div id="submarineSelect" class="entry">
                    <img id="submarineImg" class="shipName" src={submarine} alt="ship"></img>
                    <div id="submarineBar" class="selector"></div>
                    <p class="shipName">Submarine</p>
                    <p class="shipName" id="submarineRemaining">Remaining: </p>
                </div>

                <div id="destroyerSelect" class="entry">
                    <img id="destroyerImg" class="shipName" src={destroyer} alt="ship"></img>
                    <div id="destroyerBar" class="selector"></div>
                    <p class="shipName">Destroyer</p>
                    <p class="shipName" id="destroyerRemaining">Remaining: </p>
                </div>

                <button id="rotateShips">ROTATE</button>
            </div>
        </div>

    </div>

<div class="deployments" id="drawingTemplates" style={{visibility:"hidden"}}>
    <img id="destroyerPlace" class="place" src={destroyer} alt="ship"></img>
    <img id="destroyerHPlace" class="place" src={destroyerH} alt="ship"></img>
    <img id="submarinePlace" class="place" src={submarine} alt="ship" ></img>
    <img id="submarineHPlace" class="place" src={submarineH} alt="ship"></img>
    <img id="cruiserPlace" class="place" src={cruiser} alt="ship"></img>
    <img id="cruiserHPlace" class="place" src={cruiserH} alt="ship"></img>
    <img id="dreadnoughtPlace" class="place" src={dreadnought} alt="ship"></img>
    <img id="dreadnoughtHPlace" class="place" src={dreadnoughtH} alt="ship"></img>
    <img id="carrierPlace" class="place" src={carrier} alt="ship"></img>
    <img id="carrierHPlace" class="place" src={carrierH} alt="ship"></img>
    <img id="hit" class="place" src={hit} alt="ship"></img>
    <img id="miss" class="place" src={miss} alt="ship"></img>

</div>

        </div>
      );
    }
  }
import React, { Component } from 'react';
import Logo from '../Components/Logo';
import '../style/game.css';
// --------------------- Image Components -------------------------
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
// -----------------------------------------------------------------
import Canvas from '../Components/Canvas';


export default class Game extends Component {

    render() {
      return (
        <div className="background white">
          <header>
          <Logo />
          <div className="empty" />
          </header>
        
          <p id="gameTitle">BattleShip</p>
    <p id="error_box"></p>

    <div id="ending">
        <p id="result">Result</p>
        <div className="board">
            <p>Gained </p>
            <p id="earned">xxx </p>
            <img className="coin" src={coin} alt="coin"></img>
        </div>
        <button id="returnButton">Return to Lobby</button>
    </div>

    <div id="gameContent">

        <div className="board">
            <div id="player">
                <p id="yFleet">Your Fleet</p>
                <Canvas />
            </div>
            <div id="opponent">
                <p id="oFleet">Opponent's Fleet</p>
                <Canvas />
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
                <div id="carrierSelect" className="entry">
                    
                    <img id="carrierImg" className="shipName" src={carrier} alt="ship"></img>
                    <div id ="carrierBar" className="selector"></div>
                    <p className="shipName">Carrier</p>
                    <p className="shipName" id="carrierRemaining">Remaining: </p>
                </div>

                <div id="dreadnoughtSelect" className="entry">
                    <img id="dreadnoughtImg" className="shipName" src={dreadnought} alt="ship"></img>
                    <div id="dreadnoughtBar" className="selector"></div>
                    <p className="shipName">Dreadnought</p>
                    <p className="shipName" id="dreadnoughtRemaining">Remaining: </p>
                </div>

                <div id="cruiserSelect" className="entry">
                    <img id="cruiserImg" className="shipName" src={cruiser} alt="ship"></img>
                    <div id="cruiserBar"className="selector"></div>
                    <p className="shipName">Cruiser</p>
                    <p className="shipName" id="cruiserRemaining">Remaining: </p>
                </div>

                <div id="submarineSelect" className="entry">
                    <img id="submarineImg" className="shipName" src={submarine} alt="ship"></img>
                    <div id="submarineBar" className="selector"></div>
                    <p className="shipName">Submarine</p>
                    <p className="shipName" id="submarineRemaining">Remaining: </p>
                </div>

                <div id="destroyerSelect" className="entry">
                    <img id="destroyerImg" className="shipName" src={destroyer} alt="ship"></img>
                    <div id="destroyerBar" className="selector"></div>
                    <p className="shipName">Destroyer</p>
                    <p className="shipName" id="destroyerRemaining">Remaining: </p>
                </div>

                <button className="btn_rotate" id="rotateShips">ROTATE</button>
            </div>
        </div>

    </div>

<div className="deployments" id="drawingTemplates">
    <img id="destroyerPlace" className="place" src={destroyer} alt="ship"></img>
    <img id="destroyerHPlace" className="place" src={destroyerH} alt="ship"></img>
    <img id="submarinePlace" className="place" src={submarine} alt="ship" ></img>
    <img id="submarineHPlace" className="place" src={submarineH} alt="ship"></img>
    <img id="cruiserPlace" className="place" src={cruiser} alt="ship"></img>
    <img id="cruiserHPlace" className="place" src={cruiserH} alt="ship"></img>
    <img id="dreadnoughtPlace" className="place" src={dreadnought} alt="ship"></img>
    <img id="dreadnoughtHPlace" className="place" src={dreadnoughtH} alt="ship"></img>
    <img id="carrierPlace" className="place" src={carrier} alt="ship"></img>
    <img id="carrierHPlace" className="place" src={carrierH} alt="ship"></img>
    <img id="hit" className="place" src={hit} alt="ship"></img>
    <img id="miss" className="place" src={miss} alt="ship"></img>

</div>

        </div>
      );
    }
  }
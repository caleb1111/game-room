import React, { Component } from 'react';
import { Stage, Layer, Rect} from 'react-konva';
import Logo from '../Components/Logo';
import io from "socket.io-client";
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


export default class Game extends Component {
    constructor(props){
        super(props);

        this.state ={
            log: '',
            logs : [],
            setupMode: false,
            remainingShips :  {destroyer: 3, submarine: 2, cruiser: 2, dreadnought: 1, arrier: 1},
            rotated: false,
            selectedShip: '',
            playerBoard: [],
            opponentBoard: [],
            readyToPlay: false,
            winner: '',
            gainedCoins: 100,


        }

        const that = this;
        // https://blog.cloudboost.io/creating-a-chat-web-app-using-express-js-react-js-socket-io-1b01100a8ea5 
        this.socket = io.connect('http://localhost:5000');

        this.socket.on("setup", function (e){
            let d = new Date().toLocaleTimeString();
            that.setState({
                setupMode: true,
                log: "Set up your boards" + d
            })
        });
        console.log("setup mode: ", this.state.setupMode)
        console.log("log: ", this.state.log)
    }
    
      render() {
        return (
            <div className="background white">
                <header>
                <Logo />
                <div className="empty" />
                </header>
                
                <p id="gameTitle" style={{marginBottom:"20px"}}>BattleShip</p>
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
            <div style={{border:"1px solid white"}}>
                <Stage width={400} height={400}>
                    <Layer>
                        <Rect
                            sceneFunc={(context, shape) => {
                                context.beginPath();
                            for (let i = 1; i < 10; i++){
                                context.moveTo(i*400/10, 0);
                                context.lineTo(i*400/10, 400);
                            }
                            context.closePath();
                            // (!) Konva specific method, it is very important
                            context.fillStrokeShape(shape);
                            }}
                            
                            fill="#fff"
                            stroke="white"
                            strokeWidth={1}
                        />
                        <Rect
                            sceneFunc={(context, shape) => {
                                context.beginPath();
                            for (let i = 1; i < 10; i++){
                                context.moveTo(0, i*400/10);
                                context.lineTo(400, i*400/10);
                            }
                            context.closePath();
                            // (!) Konva specific method, it is very important
                            context.fillStrokeShape(shape);
                            }}
                            fill="#fff"
                            stroke="white"
                            strokeWidth={1}
                        />
                    </Layer>
                </Stage>
                </div>
            </div>
            

            <div id="opponent">
                <p id="oFleet">Opponent's Fleet</p>
                <div style={{border:"1px solid white"}}>
                <Stage width={400} height={400}>
                <Layer>
                    <Rect
                        sceneFunc={(context, shape) => {
                            context.beginPath();
                        for (let i = 1; i < 10; i++){
                            context.moveTo(i*400/10, 0);
                            context.lineTo(i*400/10, 400);
                        }
                        context.closePath();
                        // (!) Konva specific method, it is very important
                        context.fillStrokeShape(shape);
                        }}
                        
                        fill="#fff"
                        stroke="white"
                        strokeWidth={1}
                    />
                    <Rect
                        sceneFunc={(context, shape) => {
                            context.beginPath();
                        for (let i = 1; i < 10; i++){
                            context.moveTo(0, i*400/10);
                            context.lineTo(400, i*400/10);
                        }
                        context.closePath();
                        // (!) Konva specific method, it is very important
                        context.fillStrokeShape(shape);
                        }}
                        fill="#fff"
                        stroke="white"
                        strokeWidth={1}
                    />
                </Layer>
            </Stage>
            </div>
            </div>


            <div id="turnText"></div>
            <div id="logs">
                <p id="logTitle">Log</p>
                <p id="textLog"></p>
            </div>
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
    </div>
      );
    }
  }
import React, { Component } from 'react';
import { Stage, Layer, Rect, Image} from 'react-konva';
import Konva from "konva";
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
            logs : ['log 1: qwdiquwhdqiuxnasojxmaosmxaowudnhqiuwdbqi qiwdbqiwdnoqwdnqondqowdn','log 2','log 3','log 4'],
            setupMode: false,
            remainingShips :  {destroyer: 3, submarine: 2, cruiser: 2, dreadnought: 1, carrier: 1},
            rotated: false,
            selectedShip: {destroyer: false, submarine:false, cruiser:false, dreadnought:false, carrier:false},
            ships:{destroyer: destroyer, submarine:submarine, cruiser:cruiser, dreadnought:dreadnought, carrier:carrier},
            playerBoard: [],
            opponentBoard: [],
            readyToPlay: false,
            winner: '',
            gainedCoins: 100,
            shipArray: [],
            turnStatus: false, // true players turn. false opponent turn
            isOver: false,
            currPlayer: {},
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

        this.handleReturnToLobby = this.handleReturnToLobby.bind(this);
        this.handleRotate = this.handleRotate.bind(this);
        this.handleYFleetClick = this.handleYFleetClick.bind(this);
        this.handleOFleetClick = this.handleOFleetClick.bind(this);
    }

    componentDidMount(){
        const that = this;     
        fetch('http://localhost:5000/api/currUser/', {
            credentials: 'include',
        })
        .then(function(response) {
            return response.json(); 
        })
            .then(function(data) {
                const user = data;
                that.setState({
                currPlayer: user,
                })
            })
        .catch(function(error){
            console.log(error);
        })
    }
    
    handleReturnToLobby(){
        this.props.history.push("/home/");
    }

    handleRotate(){
        this.setState(this.clickRotateState);
        if(this.state.rotated === false){
            this.setState({
                ships: {
                    destroyer: destroyerH,
                    submarine:submarineH, 
                    cruiser:cruiserH, 
                    dreadnought:dreadnoughtH, 
                    carrier:carrierH
                }
            })
        }
        if (this.state.rotated === true){
            this.setState({
                ships: {
                    destroyer: destroyer,
                    submarine:submarine, 
                    cruiser:cruiser, 
                    dreadnought:dreadnought, 
                    carrier:carrier
                }
            })
        }
    }

    clickRotateState(state){
        return{
            rotated: !state.rotated,
        }
    }

    carrierSelect(){
        console.log("carrier selected");
        this.setState({
            selectedShip : {
                destroyer: false, 
                submarine:false, 
                cruiser:false, 
                dreadnought:false, 
                carrier:true
            }
        })
    }

    destroyerSelect(){
        console.log("destroyer selected");
        this.setState({
            selectedShip : {
                destroyer: true, 
                submarine:false, 
                cruiser:false, 
                dreadnought:false, 
                carrier:false
            }
        })

    }

    submarineSelect(){
        console.log("submarine selected");
        this.setState({
            selectedShip : {
                destroyer: false, 
                submarine:true, 
                cruiser:false, 
                dreadnought:false, 
                carrier:false
            }
        })

    }

    cruiserSelect(){
        console.log("cruiser selected");
        this.setState({
            selectedShip : {
                destroyer: false, 
                submarine:false, 
                cruiser:true, 
                dreadnought:false, 
                carrier:false
            }
        })

    }

    dreadnoughtSelect(){
        console.log("dreadnought selected");
        this.setState({
            selectedShip : {
                destroyer: false, 
                submarine:false, 
                cruiser:false, 
                dreadnought:true, 
                carrier:false
            }
        })
    }

    handleYFleetClick(){
        console.log("yFleet clicked: ")
        const group = new Konva.Group({
            x: 50,
            rotation: 10,
            scaleX: 2
        })
        console.log("g", group)
    }

    handleOFleetClick(){
        console.log("oFleet clicked: ")
    }

      render() {
        let showEnding = this.state.isOver ? "show" : "hide";
        let showCarrierSelected = this.state.selectedShip.carrier ? "show" : "hide";
        let showDestroyerSelected = this.state.selectedShip.destroyer ? "show" : "hide";
        let showSubmarineSelected = this.state.selectedShip.submarine ? "show" : "hide";
        let showDreadnoughtSelected = this.state.selectedShip.dreadnought ? "show" : "hide";
        let showCruiserSelected = this.state.selectedShip.cruiser ? "show" : "hide";


        return (
            <div className="background white">
                <header>
                <Logo />
                <div className="empty" />
                </header>
                
                <p id="gameTitle" style={{marginBottom:"20px"}}>BattleShip</p>
                <p id="error_box"></p>

            <div id="ending" className={showEnding}>
                <p id="result" style={{color:'white', marginLeft:"-20px"}}>{this.state.winner}</p>
                <div className="board">
                <p style={{color:'white', marginLeft:"200px"}}>Gained</p> <p> {this.state.gainedCoins} </p><img className="coinImg" src={coin} alt="coin"></img>
                </div>
                <button className="btn_return" style={{color:'white', marginLeft:"190px"}}
                onClick={() => this.handleReturnToLobby()}>Return to Lobby</button>
            </div>
            <br />

            <div id="gameContent">
            <div className="board"> 
            <div id="player">
                <p id="yFleet">{this.state.currPlayer._id}'s Fleet</p>
            <div style={{border:"1px solid white"}}>
                <Stage width={400} height={400}
                >
                    <Layer>
                    <Rect
                    sceneFunc={(context, shape) => {
                        context.beginPath();
                        for (let i = 0; i < 10; i++){
                            context.rect(i * 400 / 10, 0, 400 / 10, 400);
                            context.rect(0, i * 400 / 10, 400, 400 / 10);
                        }
                        context.closePath();
                        context.fillStrokeShape(shape);
                    }}

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
                        for (let i = 0; i < 10; i++){
                            context.rect(i * 400 / 10, 0, 400 / 10, 400);
                            context.rect(0, i * 400 / 10, 400, 400 / 10);
                        }
                        context.closePath();
                        context.fillStrokeShape(shape);
                    }}
                        stroke="white"
                        strokeWidth={1}
                        onClick={this.handleOFleetClick}
                    />
                </Layer>
            </Stage>
            </div>
            </div>


            <div id="turnText"></div>
            <div id="logs">
                <p id="logTitle">Log</p>
                <div className="log_box" style={{border:"1px solid white"}}>
                    <ul id="log">
                    {this.state.logs.map((log, i) => {
                        return (
                            <li key={i}>{log}</li>
                        )
                    })}
                    </ul>
                    </div>
            </div>
            </div>
            </div>

        <h3 className="statusMsg" id="status">Waiting For Both Players To Set Up</h3>

        <div className="fleetTitle"> Fleet </div>
        <div id="fl" className="fleets">
            <div id="deployments">
                <div id="carrierSelect" className="entry">
                    
                    <img id="carrierImg" className="shipName" src={this.state.ships.carrier} alt="ship"
                    onClick={() => this.carrierSelect()}></img>
                    <div id ="carrierBar" className={showCarrierSelected} ></div>
                    <p className="shipName">Carrier</p>
                    <p className="shipName" id="carrierRemaining">Remaining: {this.state.remainingShips.carrier}</p>
                </div>

                <div id="dreadnoughtSelect" className="entry">
                    <img id="dreadnoughtImg" className="shipName" src={this.state.ships.dreadnought} alt="ship"
                    onClick={() => this.dreadnoughtSelect()}></img>
                    <div id="dreadnoughtBar" className={showDreadnoughtSelected}></div>
                    <p className="shipName">Dreadnought</p>
                    <p className="shipName" id="dreadnoughtRemaining">Remaining: {this.state.remainingShips.dreadnought}</p>
                </div>

                <div id="cruiserSelect" className="entry">
                    <img id="cruiserImg" className="shipName" src={this.state.ships.cruiser} alt="ship"
                    onClick={() => this.cruiserSelect()}></img>
                    <div id="cruiserBar" className={showCruiserSelected}></div>
                    <p className="shipName">Cruiser</p>
                    <p className="shipName" id="cruiserRemaining">Remaining: {this.state.remainingShips.cruiser}</p>
                </div>

                <div id="submarineSelect" className="entry">
                    <img id="submarineImg" className="shipName" src={this.state.ships.submarine} alt="ship"
                    onClick={() => this.submarineSelect()}></img>
                    <div id="submarineBar" className={showSubmarineSelected}></div>
                    <p className="shipName">Submarine</p>
                    <p className="shipName" id="submarineRemaining">Remaining: {this.state.remainingShips.submarine}</p>
                </div>

                <div id="destroyerSelect" className="entry">
                    <img id="destroyerImg" className="shipName" src={this.state.ships.destroyer} alt="ship"
                    onClick={() => this.destroyerSelect()}></img>
                    <div id="destroyerBar" className={showDestroyerSelected}></div>
                    <p className="shipName">Destroyer</p>
                    <p className="shipName" id="destroyerRemaining">Remaining: {this.state.remainingShips.destroyer}</p>
                </div>

                <button className="btn_rotate" id="rotateShips"
                onClick={() => this.handleRotate()}>ROTATE SHIPS</button>
            </div>

            <div style={{marginBottom:"100px"}}></div>
        </div>
    </div>
      );
    }
  }
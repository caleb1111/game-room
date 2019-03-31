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
            isHit: "",
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

    handleYFleetClick(x, y){
        console.log("yFleet clicked coordinates: ", x, y);
    }

    handleOFleetClick(x, y){
        console.log("oFleet clicked coordinates: ", x, y);
        // check if opponent placed ships at the coordinate
        // show hit
        // else
        // show miss
    }
    
      render() {
        let showEnding = this.state.isOver ? "show" : "hide";
        let showCarrierSelected = this.state.selectedShip.carrier ? "show" : "hide";
        let showDestroyerSelected = this.state.selectedShip.destroyer ? "show" : "hide";
        let showSubmarineSelected = this.state.selectedShip.submarine ? "show" : "hide";
        let showDreadnoughtSelected = this.state.selectedShip.dreadnought ? "show" : "hide";
        let showCruiserSelected = this.state.selectedShip.cruiser ? "show" : "hide";
        const Ocolor = this.state.isHit ;

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
            <div>
                <Stage width={400} height={400}>
                    <Layer>
                    <Rect x={0} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,0)} />
                    <Rect x={0} y={40} width={40} height={40} stroke="white"  strokeWidth={1} onClick={() => this.handleYFleetClick(0,40)}  />
                    <Rect x={0} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,80)} />
                    <Rect x={0} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,120)} />
                    <Rect x={0} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,160)} />
                    <Rect x={0} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,200)} />
                    <Rect x={0} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,240)} />
                    <Rect x={0} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,280)}/>
                    <Rect x={0} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,320)} />
                    <Rect x={0} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,360)} />
                    <Rect x={0} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,400)} />

                    <Rect x={40} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,0)}/>
                    <Rect x={40} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,40)}/>
                    <Rect x={40} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,80)}/>
                    <Rect x={40} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,120)}/>
                    <Rect x={40} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,160)}/>
                    <Rect x={40} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,200)}/>
                    <Rect x={40} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,240)}/>
                    <Rect x={40} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,280)}/>
                    <Rect x={40} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,320)}/>
                    <Rect x={40} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,360)}/>
                    <Rect x={40} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,400)}/>

                    <Rect x={80} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,0)}/>
                    <Rect x={80} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,40)}/>
                    <Rect x={80} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,80)}/>
                    <Rect x={80} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,120)}/>
                    <Rect x={80} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,160)}/>
                    <Rect x={80} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,200)}/>
                    <Rect x={80} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,240)}/>
                    <Rect x={80} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,280)}/>
                    <Rect x={80} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,320)}/>
                    <Rect x={80} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,360)}/>
                    <Rect x={80} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,400)}/>

                    <Rect x={120} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,0)}/>
                    <Rect x={120} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,40)}/>
                    <Rect x={120} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,80)}/>
                    <Rect x={120} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,120)}/>
                    <Rect x={120} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,160)}/>
                    <Rect x={120} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,200)}/>
                    <Rect x={120} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,240)}/>
                    <Rect x={120} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,280)}/>
                    <Rect x={120} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,320)}/>
                    <Rect x={120} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,360)}/>
                    <Rect x={120} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,400)}/>

                    <Rect x={160} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,0)}/>
                    <Rect x={160} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,40)}/>
                    <Rect x={160} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,80)}/>
                    <Rect x={160} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,120)}/>
                    <Rect x={160} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,160)}/>
                    <Rect x={160} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,200)}/>
                    <Rect x={1620} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,240)}/>
                    <Rect x={160} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,280)}/>
                    <Rect x={160} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,320)}/>
                    <Rect x={160} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,360)}/>
                    <Rect x={160} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,400)}/>

                    <Rect x={200} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,0)}/>
                    <Rect x={200} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,40)}/>
                    <Rect x={200} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,80)}/>
                    <Rect x={200} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,120)}/>
                    <Rect x={200} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,160)}/>
                    <Rect x={200} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,200)}/>
                    <Rect x={200} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,240)}/>
                    <Rect x={200} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,280)}/>
                    <Rect x={200} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,320)}/>
                    <Rect x={200} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,360)}/>
                    <Rect x={200} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,400)}/>

                    <Rect x={240} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,0)}/>
                    <Rect x={240} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,40)}/>
                    <Rect x={240} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,80)}/>
                    <Rect x={240} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,120)}/>
                    <Rect x={240} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,160)}/>
                    <Rect x={240} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,200)}/>
                    <Rect x={240} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,240)}/>
                    <Rect x={240} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,280)}/>
                    <Rect x={240} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,320)}/>
                    <Rect x={240} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,360)}/>
                    <Rect x={240} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,400)}/>

                    <Rect x={280} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,0)}/>
                    <Rect x={280} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,40)}/>
                    <Rect x={280} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,80)}/>
                    <Rect x={280} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,120)}/>
                    <Rect x={280} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,160)}/>
                    <Rect x={280} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,200)}/>
                    <Rect x={280} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,240)}/>
                    <Rect x={280} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,280)}/>
                    <Rect x={280} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,320)}/>
                    <Rect x={280} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,360)}/>
                    <Rect x={280} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,400)}/>

                    <Rect x={320} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,0)}/>
                    <Rect x={320} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,40)}/>
                    <Rect x={320} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,80)}/>
                    <Rect x={320} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,120)}/>
                    <Rect x={320} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,160)}/>
                    <Rect x={320} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,200)}/>
                    <Rect x={320} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,240)}/>
                    <Rect x={320} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,280)}/>
                    <Rect x={320} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,320)}/>
                    <Rect x={320} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,360)}/>
                    <Rect x={320} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,400)}/>

                    <Rect x={360} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,0)}/>
                    <Rect x={360} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,40)}/>
                    <Rect x={360} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,80)}/>
                    <Rect x={360} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,120)}/>
                    <Rect x={360} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,160)}/>
                    <Rect x={360} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,200)}/>
                    <Rect x={360} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,240)}/>
                    <Rect x={360} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,280)}/>
                    <Rect x={360} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,320)}/>
                    <Rect x={360} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,360)}/>
                    <Rect x={360} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,400)}/>

                    <Rect x={400} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,0)}/>
                    <Rect x={400} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,40)}/>
                    <Rect x={400} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,80)}/>
                    <Rect x={400} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,120)}/>
                    <Rect x={400} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,160)}/>
                    <Rect x={400} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,200)}/>
                    <Rect x={400} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,240)}/>
                    <Rect x={400} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,280)}/>
                    <Rect x={400} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,320)}/>
                    <Rect x={400} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,360)}/>
                    <Rect x={400} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,400)}/>

                    </Layer>
                </Stage>
                </div>
            </div>
            

            <div id="opponent">
                <p id="oFleet">Opponent's Fleet</p>
                <div>
                <Stage width={400} height={400}>
                <Layer>
                    <Rect x={0} y={0} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(0,0)}/>
                    <Rect x={0} y={40} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(0,40)}/>
                    <Rect x={0} y={80} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(0,80)}/>
                    <Rect x={0} y={120} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(0,120)}/>
                    <Rect x={0} y={160} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(0,160)}/>
                    <Rect x={0} y={200} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(0,200)}/>
                    <Rect x={0} y={240} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(0,240)}/>
                    <Rect x={0} y={280} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(0,280)}/>
                    <Rect x={0} y={320} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(0,320)}/>
                    <Rect x={0} y={360} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(0,360)}/>
                    <Rect x={0} y={400} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(0,400)}/>

                    <Rect x={40} y={0} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(40,0)}/>
                    <Rect x={40} y={40} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(40,40)}/>
                    <Rect x={40} y={80} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(40,80)}/>
                    <Rect x={40} y={120} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(40,120)}/>
                    <Rect x={40} y={160} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(40,160)}/>
                    <Rect x={40} y={200} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(40,200)}/>
                    <Rect x={40} y={240} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(40,240)}/>
                    <Rect x={40} y={280} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(40,280)}/>
                    <Rect x={40} y={320} width={40} height={40} stroke="white"  fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(40,320)}/>
                    <Rect x={40} y={360} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(40,360)}/>
                    <Rect x={40} y={400} width={40} height={40} stroke="white"  fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(40,400)}/>

                    <Rect x={80} y={0} width={40} height={40} stroke="white"  fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(80,0)}/>
                    <Rect x={80} y={40} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(80,40)}/>
                    <Rect x={80} y={80} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(80,80)}/>
                    <Rect x={80} y={120} width={40} height={40} stroke="white" fill={Ocolor}  strokeWidth={1} onClick={() => this.handleOFleetClick(80,120)}/>
                    <Rect x={80} y={160} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(80,160)}/>
                    <Rect x={80} y={200} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(80,200)}/>
                    <Rect x={80} y={240} width={40} height={40} stroke="white"  fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(80,240)}/>
                    <Rect x={80} y={280} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(80,280)}/>
                    <Rect x={80} y={320} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(80,320)}/>
                    <Rect x={80} y={360} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(80,360)}/>
                    <Rect x={80} y={400} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(80,400)}/>

                    <Rect x={120} y={0} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(120,0)}/>
                    <Rect x={120} y={40} width={40} height={40} stroke="white" fill={Ocolor}  strokeWidth={1} onClick={() => this.handleOFleetClick(120,40)}/>
                    <Rect x={120} y={80} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(120,80)}/>
                    <Rect x={120} y={120} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(120,120)}/>
                    <Rect x={120} y={160} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(120,160)}/>
                    <Rect x={120} y={200} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(120,200)}/>
                    <Rect x={120} y={240} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(120,240)}/>
                    <Rect x={120} y={280} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(120,280)}/>
                    <Rect x={120} y={320} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(120,320)}/>
                    <Rect x={120} y={360} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(120,360)}/>
                    <Rect x={120} y={400} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(120,400)}/>

                    <Rect x={160} y={0} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(160,0)}/>
                    <Rect x={160} y={40} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(160,40)}/>
                    <Rect x={160} y={80} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(160,80)}/>
                    <Rect x={160} y={120} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(160,120)}/>
                    <Rect x={160} y={160} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(160,160)}/>
                    <Rect x={160} y={200} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(160,200)}/>
                    <Rect x={160} y={240} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(160,240)}/>
                    <Rect x={160} y={280} width={40} height={40} stroke="white"  fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(160,280)}/>
                    <Rect x={160} y={320} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(160,320)}/>
                    <Rect x={160} y={360} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(160,360)}/>
                    <Rect x={160} y={400} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(160,400)}/>

                    <Rect x={200} y={0} width={40} height={40} stroke="white"  fill={Ocolor}strokeWidth={1} onClick={() => this.handleOFleetClick(200,0)}/>
                    <Rect x={200} y={40} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(200,40)}/>
                    <Rect x={200} y={80} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(200,80)}/>
                    <Rect x={200} y={120} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(200,120)}/>
                    <Rect x={200} y={160} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(200,160)}/>
                    <Rect x={200} y={200} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(200,200)}/>
                    <Rect x={200} y={240} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(200,240)}/>
                    <Rect x={200} y={280} width={40} height={40} stroke="white"  fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(200,280)}/>
                    <Rect x={200} y={320} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(200,320)}/>
                    <Rect x={200} y={360} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(200,360)}/>
                    <Rect x={200} y={400} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(200,400)}/>

                    <Rect x={240} y={0} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(240,0)}/>
                    <Rect x={240} y={40} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(240,40)}/>
                    <Rect x={240} y={80} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(240,80)}/>
                    <Rect x={240} y={120} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(240,120)}/>
                    <Rect x={240} y={160} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(240,160)}/>
                    <Rect x={240} y={200} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(240,200)}/>
                    <Rect x={240} y={240} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(240,240)}/>
                    <Rect x={240} y={280} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(240,280)}/>
                    <Rect x={240} y={320} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(240,320)}/>
                    <Rect x={240} y={360} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(240,360)}/>
                    <Rect x={240} y={400} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(240,400)}/>

                    <Rect x={280} y={0} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(280,0)}/>
                    <Rect x={280} y={40} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(280,40)}/>
                    <Rect x={280} y={80} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(280,80)}/>
                    <Rect x={280} y={120} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(280,120)}/>
                    <Rect x={280} y={160} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(280,160)}/>
                    <Rect x={280} y={200} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(280,200)}/>
                    <Rect x={280} y={240} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(280,240)}/>
                    <Rect x={280} y={280} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(280,280)}/>
                    <Rect x={280} y={320} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(280,320)}/>
                    <Rect x={280} y={360} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(280,360)}/>
                    <Rect x={280} y={400} width={40} height={40} stroke="white"fill={Ocolor}  strokeWidth={1} onClick={() => this.handleOFleetClick(280,400)}/>

                    <Rect x={320} y={0} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(320,0)}/>
                    <Rect x={320} y={40} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(320,40)}/>
                    <Rect x={320} y={80} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(320,80)}/>
                    <Rect x={320} y={120} width={40} height={40} stroke="white"fill={Ocolor}  strokeWidth={1} onClick={() => this.handleOFleetClick(320,120)}/>
                    <Rect x={320} y={160} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(320,160)}/>
                    <Rect x={320} y={200} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(320,200)}/>
                    <Rect x={320} y={240} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(320,240)}/>
                    <Rect x={320} y={280} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(320,280)}/>
                    <Rect x={320} y={320} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(320,320)}/>
                    <Rect x={320} y={360} width={40} height={40} stroke="white" fill={Ocolor}strokeWidth={1} onClick={() => this.handleOFleetClick(320,360)}/>
                    <Rect x={320} y={400} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(320,400)}/>

                    <Rect x={360} y={0} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(360,0)}/>
                    <Rect x={360} y={40} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(360,40)}/>
                    <Rect x={360} y={80} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(360,80)}/>
                    <Rect x={360} y={120} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(360,120)}/>
                    <Rect x={360} y={160} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(360,160)}/>
                    <Rect x={360} y={200} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(360,200)}/>
                    <Rect x={360} y={240} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(360,240)}/>
                    <Rect x={360} y={280} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(360,280)}/>
                    <Rect x={360} y={320} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(360,320)}/>
                    <Rect x={360} y={360} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(360,360)}/>
                    <Rect x={360} y={400} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(360,400)}/>

                    <Rect x={400} y={0} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(400,0)}/>
                    <Rect x={400} y={40} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(400,40)}/>
                    <Rect x={400} y={80} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(400,80)}/>
                    <Rect x={400} y={120} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(400,120)}/>
                    <Rect x={400} y={160} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(400,160)}/>
                    <Rect x={400} y={200} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(400,200)}/>
                    <Rect x={400} y={240} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(400,240)}/>
                    <Rect x={400} y={280} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(400,280)}/>
                    <Rect x={400} y={320} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(400,320)}/>
                    <Rect x={400} y={360} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(400,360)}/>
                    <Rect x={400} y={400} width={40} height={40} stroke="white" fill={Ocolor} strokeWidth={1} onClick={() => this.handleOFleetClick(400,400)}/>
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
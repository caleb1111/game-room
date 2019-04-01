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
import coin from "../media/items/coin.png";

// -----------------------------------------------------------------


export default class Game extends Component {
    constructor(props){
        super(props);

        this.state ={
            errorMsg:"",
            hasError: false,
            setupMode: true,
            remainingShips :  {destroyer: 3, submarine: 2, cruiser: 2, dreadnought: 1, carrier: 1},
            rotated: false,
            selectedShip: {destroyer: false, submarine:false, cruiser:false, dreadnought:false, carrier:false},
            ships:{destroyer: destroyer, submarine:submarine, cruiser:cruiser, dreadnought:dreadnought, carrier:carrier},
            readyToPlay: false,
            winner: '',
            lobbyId: '',
            gainedCoins: 0,
            turnStatus: '', 
            isOver: false,
            currPlayer: {},
            opponent:{},
            isOHit: {Y0_0c:"", Y40_0c:"", Y80_0c:"",Y120_0c:"", Y160_0c:"", Y200_0c:"", Y240_0c:"", Y280_0c:"", Y320_0c:"", Y360_0c:"",  Y400_0c:"",
                     Y0_40c:"", Y40_40c:"", Y80_40c:"", Y120_40c:"", Y160_40c:"", Y200_40c:"", Y240_40c:"", Y280_40c:"", Y320_40c:"", Y360_40c:"",  Y400_40c:"",
                     Y0_80c:"", Y40_80c:"", Y80_80c:"", Y120_80c:"", Y160_80c:"", Y200_80c:"", Y240_80c:"", Y280_80c:"", Y320_80c:"", Y360_80c:"",  Y400_80c:"",
                     Y0_120c:"", Y40_120c:"", Y80_120c:"", Y120_120c:"", Y160_120c:"", Y200_120c:"", Y240_120c:"", Y280_120c:"", Y320_120c:"", Y360_120c:"",  Y400_120c:"",
                     Y0_160c:"", Y40_160c:"", Y80_160c:"", Y120_160c:"", Y160_160c:"", Y200_160c:"", Y240_160c:"", Y280_160c:"", Y320_160c:"", Y360_160c:"",  Y400_160c:"",
                     Y0_200c:"", Y40_200c:"", Y80_200c:"", Y120_200c:"", Y160_200c:"", Y200_200c:"", Y240_200c:"", Y280_200c:"", Y320_200c:"", Y360_200c:"",  Y400_200c:"",
                     Y0_240c:"", Y40_240c:"", Y80_240c:"", Y120_240c:"", Y160_240c:"", Y200_240c:"", Y240_240c:"", Y280_240c:"", Y320_240c:"", Y360_240c:"",  Y400_240c:"",
                     Y0_280c:"", Y40_280c:"", Y80_280c:"", Y120_280c:"", Y160_280c:"", Y200_280c:"", Y240_280c:"", Y280_280c:"", Y320_280c:"", Y360_280c:"",  Y400_280c:"", 
                     Y0_320c:"", Y40_320c:"", Y80_320c:"", Y120_320c:"", Y160_320c:"", Y200_320c:"", Y240_320c:"", Y280_320c:"", Y320_320c:"", Y360_320c:"",  Y400_320c:"",
                     Y0_360c:"", Y40_360c:"", Y80_360c:"", Y120_360c:"", Y160_360c:"", Y200_360c:"", Y240_360c:"", Y280_360c:"", Y320_360c:"", Y360_360c:"",  Y400_360c:"",
                     Y0_400c:"", Y40_400c:"", Y80_400c:"", Y120_400c:"", Y160_400c:"", Y200_400c:"", Y240_400c:"", Y280_400c:"", Y320_400c:"", Y360_400c:"",  Y400_400c:"",
                    },
            isYHit: {Y0_0c:"", Y40_0c:"", Y80_0c:"", Y120_0c:"", Y160_0c:"", Y200_0c:"", Y240_0c:"", Y280_0c:"", Y320_0c:"", Y360_0c:"",  Y400_0c:"",
                    Y0_40c:"", Y40_40c:"", Y80_40c:"", Y120_40c:"", Y160_40c:"", Y200_40c:"", Y240_40c:"", Y280_40c:"", Y320_40c:"", Y360_40c:"",  Y400_40c:"",
                    Y0_80c:"", Y40_80c:"", Y80_80c:"", Y120_80c:"", Y160_80c:"", Y200_80c:"", Y240_80c:"", Y280_80c:"", Y320_80c:"", Y360_80c:"",  Y400_80c:"",
                    Y0_120c:"", Y40_120c:"", Y80_120c:"", Y120_120c:"", Y160_120c:"", Y200_120c:"", Y240_120c:"", Y280_120c:"", Y320_120c:"", Y360_120c:"",  Y400_120c:"",
                    Y0_160c:"", Y40_160c:"", Y80_160c:"", Y120_160c:"", Y160_160c:"", Y200_160c:"", Y240_160c:"", Y280_160c:"", Y320_160c:"", Y360_160c:"",  Y400_160c:"",
                    Y0_200c:"", Y40_200c:"", Y80_200c:"", Y120_200c:"", Y160_200c:"", Y200_200c:"", Y240_200c:"", Y280_200c:"", Y320_200c:"", Y360_200c:"",  Y400_200c:"",
                    Y0_240c:"", Y40_240c:"", Y80_240c:"", Y120_240c:"", Y160_240c:"", Y200_240c:"", Y240_240c:"", Y280_240c:"", Y320_240c:"", Y360_240c:"",  Y400_240c:"",
                    Y0_280c:"", Y40_280c:"", Y80_280c:"", Y120_280c:"", Y160_280c:"", Y200_280c:"", Y240_280c:"", Y280_280c:"", Y320_280c:"", Y360_280c:"",  Y400_280c:"", 
                    Y0_320c:"", Y40_320c:"", Y80_320c:"", Y120_320c:"", Y160_320c:"", Y200_320c:"", Y240_320c:"", Y280_320c:"", Y320_320c:"", Y360_320c:"",  Y400_320c:"",
                    Y0_360c:"", Y40_360c:"", Y80_360c:"", Y120_360c:"", Y160_360c:"", Y200_360c:"", Y240_360c:"", Y280_360c:"", Y320_360c:"", Y360_360c:"",  Y400_360c:"",
                    Y0_400c:"", Y40_400c:"", Y80_400c:"", Y120_400c:"", Y160_400c:"", Y200_400c:"", Y240_400c:"", Y280_400c:"", Y320_400c:"", Y360_400c:"",  Y400_400c:"",
                   },
        }

        const that = this;
        // https://blog.cloudboost.io/creating-a-chat-web-app-using-express-js-react-js-socket-io-1b01100a8ea5 
        this.socket = io.connect('http://localhost:5000');

        const d = new Date().toLocaleTimeString();

        this.socket.on("setup", function (e){
            const d = new Date().toLocaleTimeString();
            that.setState({
                setupMode: true,
                log: "Set up your boards" + d
            })
        });

        this.socket.on("finished", function(){
            that.setState({
                readyToPlay : true
        });
    })


        this.socket.on("gameOver", function (e, int){
            if (e === true ){
                that.setState({
                    winner: that.state.currPlayer._id,
                    isOver: true,
                    gainedCoins: 100
                })
                that.socket.emit("updateCoins", 100);
            }
            else {
                that.setState({
                    winner: that.state.opponent._id,
                    isOver: true,
                    gainedCoins: 0
                })
                that.socket.emit("updateCoins", 0);
            }
        });

        this.socket.on("getState", function(data){
            that.setState({
                isYHit: data
            })
        })

        console.log("setup mode: ", this.state.setupMode, d)

        this.handleReturnToLobby = this.handleReturnToLobby.bind(this);
        this.handleRotate = this.handleRotate.bind(this);
        this.handleYFleetClick = this.handleYFleetClick.bind(this);
        this.handleOFleetClick = this.handleOFleetClick.bind(this);
        this.carrierSelect = this.carrierSelect.bind(this);
        this.cruiserSelect = this.cruiserSelect.bind(this);
        this.submarineSelect = this.submarineSelect.bind(this);
        this.destroyerSelect = this.destroyerSelect.bind(this);
        this.dreadnoughtSelect = this.dreadnoughtSelect.bind(this);
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
                lobbyId: user.roomId
                })
                console.log("curr lobby id", that.state.lobbyId);
                that.socket.emit("joinSession", that.state.lobbyId);
                sessionStorage.setItem("lobbyId", that.state.lobbyId);
                that.socket.emit("ready", that.state.lobbyId);
            })
        .catch(function(error){
            console.log(error);
        })
        

        fetch('http://localhost:5000/api/user/getOpponent/', {
            credentials: 'include',
        })
        .then(function(response) {
            return response.json(); 
        })
            .then(function(data) {
                const user = data;
                that.setState({
                opponent: user
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
        this.setState({
            rotated: !this.state.rotated
        });
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

    carrierSelect(){
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
        const that = this;
        if (!that.state.readyToPlay){
            console.log("yFleet clicked coordinates: ", x, y);
        if (this.state.selectedShip.carrier){
            if(this.state.remainingShips.carrier !== 0 ){
                this.socket.emit("place", that.state.lobbyId, "carrier", x, y, that.state.rotated, function(result){
                    console.log("carrier placed: ", result)
                    if (result === null ){
                        that.setState({
                            remainingShips:{
                                carrier: that.state.remainingShips.carrier - 1,
                                cruiser: that.state.remainingShips.cruiser,
                                submarine: that.state.remainingShips.submarine,
                                destroyer: that.state.remainingShips.destroyer,
                                dreadnought: that.state.remainingShips.dreadnought,
                            },
                            selectedShip : {
                                destroyer: false, 
                                submarine:false, 
                                cruiser:false, 
                                dreadnought:false, 
                                carrier:false
                            },
                            hasError: false,
                            errorMsg: ""
                        })
                    }else{
                        that.setState({
                            hasError: true,
                            errorMsg: result
                        })
                    }
                })
                if (this.state.remainingShips.carrier === 0 &&  this.state.remainingShips.cruiser === 0 && 
                    this.state.remainingShips.destroyer === 0 && this.state.remainingShips.submarine === 0
                    && this.state.remainingShips.dreadnought === 0){
                        that.setState({
                            readyToPlay: true,
                        })
                    }
            }
            
        }
        else if (this.state.selectedShip.cruiser){
            if (this.state.remainingShips.cruiser !== 0 ){
                this.socket.emit("place", that.state.lobbyId, "cruiser", x, y, that.state.rotated, function(result){
                    console.log("cruiser placed: ", result)
                    if (result === null ){
                        that.setState({
                            remainingShips:{
                                cruiser: that.state.remainingShips.cruiser - 1,
                                carrier: that.state.remainingShips.carrier,
                                submarine: that.state.remainingShips.submarine,
                                destroyer: that.state.remainingShips.destroyer,
                                dreadnought: that.state.remainingShips.dreadnought,
                            },
                            selectedShip : {
                                destroyer: false, 
                                submarine:false, 
                                cruiser:false, 
                                dreadnought:false, 
                                carrier:false
                            },
                            hasError: false,
                            errorMsg: ""
                        })
                    } else {
                        that.setState({
                            hasError: true,
                            errorMsg: result
                        })
                    }
                })
                if (this.state.remainingShips.carrier === 0 &&  this.state.remainingShips.cruiser === 0 && 
                    this.state.remainingShips.destroyer === 0 && this.state.remainingShips.submarine === 0
                    && this.state.remainingShips.dreadnought === 0){
                        that.setState({
                            readyToPlay: true,
                        })
                    }
            }
        }else if (this.state.selectedShip.submarine){
            if (this.state.remainingShips.submarine !== 0 ){
                this.socket.emit("place", that.state.lobbyId, "submarine", x, y,  that.state.rotated, function(result){
                    console.log("submarine placed: ", result)
                    if (result === null ){
                        that.setState({
                            remainingShips:{
                                submarine: that.state.remainingShips.submarine - 1,
                                carrier: that.state.remainingShips.carrier,
                                cruiser: that.state.remainingShips.cruiser,
                                destroyer: that.state.remainingShips.destroyer,
                                dreadnought: that.state.remainingShips.dreadnought,
                            },
                            selectedShip : {
                                destroyer: false, 
                                submarine:false, 
                                cruiser:false, 
                                dreadnought:false, 
                                carrier:false
                            },
                            hasError: false,
                            errorMsg: ""
                        })
                    }else {
                        that.setState({
                            hasError: true,
                            errorMsg: result
                        })
                    }
                })
                if (this.state.remainingShips.carrier === 0 &&  this.state.remainingShips.cruiser === 0 && 
                    this.state.remainingShips.destroyer === 0 && this.state.remainingShips.submarine === 0
                    && this.state.remainingShips.dreadnought === 0){
                        that.setState({
                            readyToPlay: true,
                        })
                    }
            }
        }else if (this.state.selectedShip.destroyer){
            if (this.state.remainingShips.destroyer !== 0 ){
                this.socket.emit("place", that.state.lobbyId, "destroyer", x, y,  that.state.rotated, function(result){
                    console.log("destroyer placed: ", result)
                    if (result === null ){
                        that.setState({
                            remainingShips:{
                                destroyer: that.state.remainingShips.destroyer - 1,
                                carrier: that.state.remainingShips.carrier,
                                cruiser: that.state.remainingShips.cruiser,
                                submarine: that.state.remainingShips.submarine,
                                dreadnought: that.state.remainingShips.dreadnought,
                            },
                            selectedShip : {
                                destroyer: false, 
                                submarine:false, 
                                cruiser:false, 
                                dreadnought:false, 
                                carrier:false
                            },
                            hasError: false,
                            errorMsg: ""
                        })
                    } else {
                        that.setState({
                            hasError: true,
                            errorMsg: result
                        })
                    }
                })
                if (this.state.remainingShips.carrier === 0 &&  this.state.remainingShips.cruiser === 0 && 
                    this.state.remainingShips.destroyer === 0 && this.state.remainingShips.submarine === 0
                    && this.state.remainingShips.dreadnought === 0){
                        that.setState({
                            readyToPlay: true,
                        })
                    }
            }
        }else if (this.state.selectedShip.dreadnought){
            if (this.state.remainingShips.dreadnought !== 0 ){
                this.socket.emit("place", that.state.lobbyId, "dreadnought", x, y, that.state.rotated, function(result){
                    console.log("dreadnought placed: ", result)
                    if (result === null ){
                        that.setState({
                            remainingShips:{
                                dreadnought: that.state.remainingShips.dreadnought - 1,
                                carrier: that.state.remainingShips.carrier,
                                cruiser: that.state.remainingShips.cruiser,
                                submarine: that.state.remainingShips.submarine,
                                destroyer: that.state.remainingShips.destroyer,
                            },
                            selectedShip : {
                                destroyer: false, 
                                submarine:false, 
                                cruiser:false, 
                                dreadnought:false, 
                                carrier:false
                            },
                            hasError: false,
                            errorMsg: ""
                        })
                    } else {
                        that.setState({
                            hasError: true,
                            errorMsg: result
                        })
                    }
                })
                if (this.state.remainingShips.carrier === 0 &&  this.state.remainingShips.cruiser === 0 && 
                    this.state.remainingShips.destroyer === 0 && this.state.remainingShips.submarine === 0
                    && this.state.remainingShips.dreadnought === 0){
                        that.setState({
                            readyToPlay: true,
                        })
                    }
            }
        }
            console.log("ready to play", that.state.readyToPlay);
        }
        
    }

    handleOFleetClick(x, y){
        console.log("oFleet clicked coordinates: ", x, y);
        const that = this;
        if (that.state.readyToPlay){
            this.socket.emit("shot", that.state.lobbyId, x, y, function(result, xy){
                if (result === 1){
                   // success shot was a hit
                   let d = new Date().toLocaleTimeString();
                   console.log("The Shot Hit", d);
                   if (xy === "00"){
                       that.setState({isOHit:{Y0_0c: 'red'}
                   })
                   }
                   else if (xy === "040"){
                       that.setState({isOHit:{Y0_40c: 'red'}
                   })
                   }
                   else if (xy === "080"){
                       that.setState({isOHit:{Y0_80c: 'red'}
                   })
                   }
                   else if (xy === "0120"){
                       that.setState({isOHit:{Y0_120c: 'red'}
                   })
                   }
                   else if (xy === "0160"){
                       that.setState({isOHit:{Y0_160c: 'red'}
                   })
                   }
                   else if (xy === "0200"){
                       that.setState({isOHit:{Y0_200c: 'red'}
                   })
                   }
                   else if (xy === "0240"){
                       that.setState({isOHit:{Y0_240c: 'red'}
                   })
                   }
                   else if (xy === "0280"){
                       that.setState({isOHit:{Y0_280c: 'red'}
                   })
                   }
                   else if (xy === "0320"){
                       that.setState({isOHit:{Y0_320c: 'red'}
                   })
                   }
                   else if (xy === "0360"){
                       that.setState({isOHit:{Y0_360c: 'red'},
                       })
                   }
                   else if (xy === "0400"){
                       that.setState({isOHit:{Y0_400c: 'red'}
                   })
                   }
   
                   else if (xy === "400"){
                       that.setState({isOHit:{Y40_0c: 'red'},
                    })
                   }
                   else if (xy === "4040"){
                       that.setState({isOHit:{Y40_40c: 'red'},
                      })
                   }
                   else if (xy === "4080"){
                       that.setState({isOHit:{Y40_80c: 'red'},
                       })
                   }
                   else if (xy === "40120"){
                       that.setState({isOHit:{Y40_120c: 'red'},
                       })
                   }
                   else if (xy === "40160"){
                       that.setState({isOHit:{Y40_160c: 'red'},
                       })
                   }
                   else if (xy === "40200"){
                       that.setState({isOHit:{Y40_200c: 'red'},
                       })
                   }
                   else if (xy === "40240"){
                       that.setState({isOHit:{Y40_240c: 'red'},
                       })
                   }
                   else if (xy === "40280"){
                       that.setState({isOHit:{Y40_280c: 'red'},
                       })
                   }
                   else if (xy === "40320"){
                       that.setState({isOHit:{Y40_320c: 'red'},
                       })
                   }
                   else if (xy === "40360"){
                       that.setState({isOHit:{Y40_360c: 'red'},
                       })
                   }
                   else if (xy === "40400"){
                       that.setState({isOHit:{Y40_400c: 'red'},
                       })
                   }
   
                   else if (xy === "800"){
                       that.setState({isOHit:{Y80_0c: 'red'},
                        })
                   }
                   else if (xy === "8040"){
                       that.setState({isOHit:{Y80_40c: 'red'},
                        })
                   }
                   else if (xy === "8080"){
                       that.setState({isOHit:{Y80_80c: 'red'},
                       })
                   }
                   else if (xy === "80120"){
                       that.setState({isOHit:{Y40_120c: 'red'},
                      })
                   }
                   else if (xy === "80160"){
                       that.setState({isOHit:{Y80_160c: 'red'},
                        })
                   }
                   else if (xy === "80200"){
                       that.setState({isOHit:{Y80_200c: 'red'},
                        })
                   }
                   else if (xy === "80240"){
                       that.setState({isOHit:{Y80_240c: 'red'},
                        })
                   }
                   else if (xy === "80280"){
                       that.setState({isOHit:{Y80_280c: 'red'},
                       })
                   }
                   else if (xy === "80320"){
                       that.setState({isOHit:{Y80_320c: 'red'},
                        })
                   }
                   else if (xy === "80360"){
                       that.setState({isOHit:{Y80_360c: 'red'},
                        })
                   }
                   else if (xy === "80400"){
                       that.setState({isOHit:{Y80_400c: 'red'},
                        })
                   }
   
                   else if (xy === "1200"){
                       that.setState({isOHit:{Y120_0c: 'red'},
                        })
                   }
                   else if (xy === "12040"){
                       that.setState({isOHit:{Y120_40c: 'red'},
                        })
                   }
                   else if (xy === "12080"){
                       that.setState({isOHit:{Y120_80c: 'red'},
                       })
                   }
                   else if (xy === "120120"){
                       that.setState({isOHit:{Y120_120c: 'red'},
                      })
                   }
                   else if (xy === "120160"){
                       that.setState({isOHit:{Y120_160c: 'red'},
                       })
                   }
                   else if (xy === "120200"){
                       that.setState({isOHit:{Y120_200c: 'red'},
                       })
                   }
                   else if (xy === "120240"){
                       that.setState({isOHit:{Y120_240c: 'red'},
                       })
                   }
                   else if (xy === "120280"){
                       that.setState({isOHit:{Y120_280c: 'red'},
                      })
                   }
                   else if (xy === "120320"){
                       that.setState({isOHit:{Y120_320c: 'red'},
                        })
                   }
                   else if (xy === "120360"){
                       that.setState({isOHit:{Y120_360c: 'red'},
                       })
                   }
                   else if (xy === "120400"){
                       that.setState({isOHit:{Y120_400c: 'red'},
                     })
                   }
   
                   else if (xy === "1600"){
                       that.setState({isOHit:{Y160_0c: 'red'},
                })
                   }
                   else if (xy === "16040"){
                       that.setState({isOHit:{Y160_40c: 'red'},
                  })
                   }
                   else if (xy === "16080"){
                       that.setState({isOHit:{Y0_80c: 'red'},
               })
                   }
                   else if (xy === "160120"){
                       that.setState({isOHit:{Y160_120c: 'red'},
                })
                   }
                   else if (xy === "160160"){
                       that.setState({isOHit:{Y160_160c: 'red'},
                 })
                   }
                   else if (xy === "160200"){
                       that.setState({isOHit:{Y160_200c: 'red'},
                 })
                   }
                   else if (xy === "160240"){
                       that.setState({isOHit:{Y160_240c: 'red'},
                   })
                   }
                   else if (xy === "160280"){
                       that.setState({isOHit:{Y160_280c: 'red'},
                 })
                   }
                   else if (xy === "160320"){
                       that.setState({isOHit:{Y160_320c: 'red'},
                   })
                   }
                   else if (xy === "160360"){
                       that.setState({isOHit:{Y160_360c: 'red'},
                      })
                   }
                   else if (xy === "160400"){
                       that.setState({isOHit:{Y160_400c: 'red'},
                    })
                   }
   
                   else if (xy === "2000"){
                       that.setState({isOHit:{Y200_0c: 'red'},
                        })
                   }
                   else if (xy === "20040"){
                       that.setState({isOHit:{Y200_40c: 'red'},
                      })
                   }
                   else if (xy === "20080"){
                       that.setState({isOHit:{Y200_80c: 'red'},
                      })
                   }
                   else if (xy === "200120"){
                       that.setState({isOHit:{Y200_120c: 'red'},
                      })
                   }
                   else if (xy === "200160"){
                       that.setState({isOHit:{Y200_160c: 'red'},
                     })
                   }
                   else if (xy === "200200"){
                       that.setState({isOHit:{Y200_200c: 'red'},
                     })
                   }
                   else if (xy === "200240"){
                       that.setState({isOHit:{Y200_240c: 'red'},
                })
                   }
                   else if (xy === "200280"){
                       that.setState({isOHit:{Y200_280c: 'red'},
                    })
                   }
                   else if (xy === "200320"){
                       that.setState({isOHit:{Y200_320c: 'red'},
                  })
                   }
                   else if (xy === "200360"){
                       that.setState({isOHit:{Y200_360c: 'red'},
                    })
                   }
                   else if (xy === "200400"){
                       that.setState({isOHit:{Y200_400c: 'red'},
                    })
                   }
   
                   else if (xy === "2400"){
                       that.setState({isOHit:{Y240_0c: 'red'},
                    })
                   }
                   else if (xy === "24040"){
                       that.setState({isOHit:{Y240_40c: 'red'},
                      })
                   }
                   else if (xy === "24080"){
                       that.setState({isOHit:{Y240_80c: 'red'},
                     })
                   }
                   else if (xy === "240120"){
                       that.setState({isOHit:{Y240_120c: 'red'},
                    })
                   }
                   else if (xy === "240160"){
                       that.setState({isOHit:{Y240_160c: 'red'},
                     })
                   }
                   else if (xy === "240200"){
                       that.setState({isOHit:{Y240_200c: 'red'},
                     })
                   }
                   else if (xy === "240240"){
                       that.setState({isOHit:{Y240_240c: 'red'},
                    })
                   }
                   else if (xy === "240280"){
                       that.setState({isOHit:{Y240_280c: 'red'},
                     })
                   }
                   else if (xy === "240320"){
                       that.setState({isOHit:{Y240_320c: 'red'},
                    })
                   }
                   else if (xy === "240360"){
                       that.setState({isOHit:{Y240_360c: 'red'},
                      })
                   }
                   else if (xy === "240400"){
                       that.setState({isOHit:{Y240_400c: 'red'},
                     })
                   }
   
                   else if (xy === "2800"){
                       that.setState({isOHit:{Y280_0c: 'red'},
                    })
                   }
                   else if (xy === "28040"){
                       that.setState({isOHit:{Y280_40c: 'red'},
                     })
                   }
                   else if (xy === "28080"){
                       that.setState({isOHit:{Y280_80c: 'red'},
                    })
                   }
                   else if (xy === "280120"){
                       that.setState({isOHit:{Y280_120c: 'red'},
                   })
                   }
                   else if (xy === "280160"){
                       that.setState({isOHit:{Y280_160c: 'red'},
                    })
                   }
                   else if (xy === "280200"){
                       that.setState({isOHit:{Y280_200c: 'red'},
                     })
                   }
                   else if (xy === "280240"){
                       that.setState({isOHit:{Y280_240c: 'red'},
                     })
                   }
                   else if (xy === "280280"){
                       that.setState({isOHit:{Y280_280c: 'red'},
                     })
                   }
                   else if (xy === "280320"){
                       that.setState({isOHit:{Y280_320c: 'red'},
                    })
                   }
                   else if (xy === "280360"){
                       that.setState({isOHit:{Y280_360c: 'red'},
                    })
                   }
                   else if (xy === "280400"){
                       that.setState({isOHit:{Y280_400c: 'red'},
                     })
                   }
   
                   else if (xy === "3200"){
                       that.setState({isOHit:{Y320_0c: 'red'},
                      })
                   }
                   else if (xy === "32040"){
                       that.setState({isOHit:{Y320_40c: 'red'},
                    })
                   }
                   else if (xy === "32080"){
                       that.setState({isOHit:{Y320_80c: 'red'},
                      })
                   }
                   else if (xy === "320120"){
                       that.setState({isOHit:{Y320_120c: 'red'},
                    })
                   }
                   else if (xy === "320160"){
                       that.setState({isOHit:{Y320_160c: 'red'},
                     })
                   }
                   else if (xy === "320200"){
                       that.setState({isOHit:{Y320_200c: 'red'},
                    })
                   }
                   else if (xy === "320240"){
                       that.setState({isOHit:{Y320_240c: 'red'},
                     })
                   }
                   else if (xy === "3240280"){
                       that.setState({isOHit:{Y320_280c: 'red'},
                    })
                   }
                   else if (xy === "320320"){
                       that.setState({isOHit:{Y320_320c: 'red'},
                     })
                   }
                   else if (xy === "320360"){
                       that.setState({isOHit:{Y320_360c: 'red'},
                     })
                   }
                   else if (xy === "320400"){
                       that.setState({isOHit:{Y320_400c: 'red'},
                    })
                   }
   
                   else if (xy === "3600"){
                       that.setState({isOHit:{Y360_0c: 'red'},
                   })
                   }
                   else if (xy === "36040"){
                       that.setState({isOHit:{Y360_40c: 'red'},
                    })
                   }
                   else if (xy === "36080"){
                       that.setState({isOHit:{Y360_80c: 'red'},
                    })
                   }
                   else if (xy === "360120"){
                       that.setState({isOHit:{Y360_120c: 'red'},
                    })
                   }
                   else if (xy === "360160"){
                       that.setState({isOHit:{Y360_160c: 'red'},
                   })
                   }
                   else if (xy === "360200"){
                       that.setState({isOHit:{Y360_200c: 'red'},
                    })
                   }
                   else if (xy === "360240"){
                       that.setState({isOHit:{Y360_240c: 'red'},
                     })
                   }
                   else if (xy === "3640280"){
                       that.setState({isOHit:{Y360_280c: 'red'},
                     })
                   }
                   else if (xy === "360320"){
                       that.setState({isOHit:{Y360_320c: 'red'},
                     })
                   }
                   else if (xy === "360360"){
                       that.setState({isOHit:{Y360_360c: 'red'},
                   })
                   }
                   else if (xy === "360400"){
                       that.setState({isOHit:{Y360_400c: 'red'},
                    })
                   }
   
                   else if (xy === "4000"){
                       that.setState({isOHit:{Y400_0c: 'red'},
                   })
                   }
                   else if (xy === "40040"){
                       that.setState({isOHit:{Y400_40c: 'red'},
                    })
                   }
                   else if (xy === "40080"){
                       that.setState({isOHit:{Y400_80c: 'red'},
                   })
                   }
                   else if (xy === "400120"){
                       that.setState({isOHit:{Y400_120c: 'red'},
                    })
                   }
                   else if (xy === "400160"){
                       that.setState({isOHit:{Y400_160c: 'red'},
                   })
                   }
                   else if (xy === "400200"){
                       that.setState({isOHit:{Y400_200c: 'red'},
                    })
                   }
                   else if (xy === "400240"){
                       that.setState({isOHit:{Y400_240c: 'red'},
                    })
                   }
                   else if (xy === "4040280"){
                       that.setState({isOHit:{Y400_280c: 'red'},
                    })
                   }
                   else if (xy === "400320"){
                       that.setState({isOHit:{Y400_320c: 'red'},
                    })
                   }
                   else if (xy === "400360"){
                       that.setState({isOHit:{Y400_360c: 'red'},
                      })
                   }
                   else if (xy === "4004000"){
                       that.setState({isOHit:{Y400_400c: 'red'},
                  
                   })
                   }
               }
               else if (result === 2){
                   // miss shot
                   const d = new Date().toLocaleTimeString();
                   console.log("2 ", d)
                   that.setState({
                       errorMsg: "Missed shot! " + d
                   })
                   if (xy === "00"){
                    that.setState({isOHit:{Y0_0c: 'green'},
                })
                }
                else if (xy === "040"){
                    that.setState({isOHit:{Y0_40c: 'green'},
                })
                }
                else if (xy === "080"){
                    that.setState({isOHit:{Y0_80c: 'green'},
                })
                }
                else if (xy === "0120"){
                    that.setState({isOHit:{Y0_120c: 'green'},
                })
                }
                else if (xy === "0160"){
                    that.setState({isOHit:{Y0_160c: 'green'},
                })
                }
                else if (xy === "0200"){
                    that.setState({isOHit:{Y0_200c: 'green'},
                })
                }
                else if (xy === "0240"){
                    that.setState({isOHit:{Y0_240c: 'green'},
                })
                }
                else if (xy === "0280"){
                    that.setState({isOHit:{Y0_280c: 'green'},
                })
                }
                else if (xy === "0320"){
                    that.setState({isOHit:{Y0_320c: 'green'},
                })
                }
                else if (xy === "0360"){
                    that.setState({isOHit:{Y0_360c: 'green'},
                })
                }
                else if (xy === "0400"){
                    that.setState({isOHit:{Y0_400c: 'green'},
      
                })
                }

                else if (xy === "400"){
                    that.setState({isOHit:{Y40_0c: 'green'},
         
                 })
                }
                else if (xy === "4040"){
                    that.setState({isOHit:{Y40_40c: 'green'},
                })
                }
                else if (xy === "4080"){
                    that.setState({isOHit:{Y40_80c: 'green'},
                   })
                }
                else if (xy === "40120"){
                    that.setState({isOHit:{Y40_120c: 'green'},
                   })
                }
                else if (xy === "40160"){
                    that.setState({isOHit:{Y40_160c: 'green'},
                   })
                }
                else if (xy === "40200"){
                    that.setState({isOHit:{Y40_200c: 'green'},
                   })
                }
                else if (xy === "40240"){
                    that.setState({isOHit:{Y40_240c: 'green'},
                    })
                }
                else if (xy === "40280"){
                    that.setState({isOHit:{Y40_280c: 'green'},
                 })
                }
                else if (xy === "40320"){
                    that.setState({isOHit:{Y40_320c: 'green'},
                  })
                }
                else if (xy === "40360"){
                    that.setState({isOHit:{Y40_360c: 'green'},
                 })
                }
                else if (xy === "40400"){
                    that.setState({isOHit:{Y40_400c: 'green'},
                   })
                }

                else if (xy === "800"){
                    that.setState({isOHit:{Y80_0c: 'green'},
                  })
                }
                else if (xy === "8040"){
                    that.setState({isOHit:{Y80_40c: 'green'},
                 })
                }
                else if (xy === "8080"){
                    that.setState({isOHit:{Y80_80c: 'green'},
                    })
                }
                else if (xy === "80120"){
                    that.setState({isOHit:{Y40_120c: 'green'},
                  })
                }
                else if (xy === "80160"){
                    that.setState({isOHit:{Y80_160c: 'green'},
                   })
                }
                else if (xy === "80200"){
                    that.setState({isOHit:{Y80_200c: 'green'},
                 })
                }
                else if (xy === "80240"){
                    that.setState({isOHit:{Y80_240c: 'green'},
                  })
                }
                else if (xy === "80280"){
                    that.setState({isOHit:{Y80_280c: 'green'},
                   })
                }
                else if (xy === "80320"){
                    that.setState({isOHit:{Y80_320c: 'green'},
                     })
                }
                else if (xy === "80360"){
                    that.setState({isOHit:{Y80_360c: 'green'},
                     })
                }
                else if (xy === "80400"){
                    that.setState({isOHit:{Y80_400c: 'green'},
                     })
                }
                else if (xy === "1200"){
                    that.setState({isOHit:{Y120_0c: 'green'},
                    })
                }
                else if (xy === "12040"){
                    that.setState({isOHit:{Y120_40c: 'green'},
                     })
                }
                else if (xy === "12080"){
                    that.setState({isOHit:{Y120_80c: 'green'},
                  })
                }
                else if (xy === "120120"){
                    that.setState({isOHit:{Y120_120c: 'green'},
                  })
                }
                else if (xy === "120160"){
                    that.setState({isOHit:{Y120_160c: 'green'},
                 })
                }
                else if (xy === "120200"){
                    that.setState({isOHit:{Y120_200c: 'green'},
                  })
                }
                else if (xy === "120240"){
                    that.setState({isOHit:{Y120_240c: 'green'},
                 })
                }
                else if (xy === "120280"){
                    that.setState({isOHit:{Y120_280c: 'green'},
                   })
                }
                else if (xy === "120320"){
                    that.setState({isOHit:{Y120_320c: 'green'},
                 })
                }
                else if (xy === "120360"){
                    that.setState({isOHit:{Y120_360c: 'green'},
                  })
                }
                else if (xy === "120400"){
                    that.setState({isOHit:{Y120_400c: 'green'},
                     })
                }

                else if (xy === "1600"){
                    that.setState({isOHit:{Y160_0c: 'green'},
                   })
                }
                else if (xy === "16040"){
                    that.setState({isOHit:{Y160_40c: 'green'},
                  })
                }
                else if (xy === "16080"){
                    that.setState({isOHit:{Y160_80c: 'green'},
                   })
                }
                else if (xy === "160120"){
                    that.setState({isOHit:{Y160_120c: 'green'},
                  })
                }
                else if (xy === "160160"){
                    that.setState({isOHit:{Y160_160c: 'green'},
                  })
                }
                else if (xy === "160200"){
                    that.setState({isOHit:{Y160_200c: 'green'},
                   })
                }
                else if (xy === "160240"){
                    that.setState({isOHit:{Y160_240c: 'green'},
                  })
                }
                else if (xy === "160280"){
                    that.setState({isOHit:{Y160_280c: 'green'},
                   })
                }
                else if (xy === "160320"){
                    that.setState({isOHit:{Y160_320c: 'green'},
                  })
                }
                else if (xy === "160360"){
                    that.setState({isOHit:{Y160_360c: 'green'},
                    })
                }
                else if (xy === "160400"){
                    that.setState({isOHit:{Y160_400c: 'green'},
                   })
                }

                else if (xy === "2000"){
                    that.setState({isOHit:{Y200_0c: 'green'},
                    })
                }
                else if (xy === "20040"){
                    that.setState({isOHit:{Y200_40c: 'green'},
                 })
                }
                else if (xy === "20080"){
                    that.setState({isOHit:{Y200_80c: 'green'},
                   })
                }
                else if (xy === "200120"){
                    that.setState({isOHit:{Y200_120c: 'green'},
                 })
                }
                else if (xy === "200160"){
                    that.setState({isOHit:{Y200_160c: 'green'},
                  })
                }
                else if (xy === "200200"){
                    that.setState({isOHit:{Y200_200c: 'green'},
                  })
                }
                else if (xy === "200240"){
                    that.setState({isOHit:{Y200_240c: 'green'},
                  })
                }
                else if (xy === "200280"){
                    that.setState({isOHit:{Y200_280c: 'green'},
                  })
                }
                else if (xy === "200320"){
                    that.setState({isOHit:{Y200_320c: 'green'},
                    })
                }
                else if (xy === "200360"){
                    that.setState({isOHit:{Y200_360c: 'green'},
                  })
                }
                else if (xy === "200400"){
                    that.setState({isOHit:{Y200_400c: 'green'},
                 })
                }

                else if (xy === "2400"){
                    that.setState({isOHit:{Y240_0c: 'green'},
                   })
                }
                else if (xy === "24040"){
                    that.setState({isOHit:{Y240_40c: 'green'},
                    })
                }
                else if (xy === "24080"){
                    that.setState({isOHit:{Y240_80c: 'green'},
                 })
                }
                else if (xy === "240120"){
                    that.setState({isOHit:{Y240_120c: 'green'},
                  })
                }
                else if (xy === "240160"){
                    that.setState({isOHit:{Y240_160c: 'green'},
                   })
                }
                else if (xy === "240200"){
                    that.setState({isOHit:{Y240_200c: 'green'},
                   })
                }
                else if (xy === "240240"){
                    that.setState({isOHit:{Y240_240c: 'green'},
                    })
                }
                else if (xy === "240280"){
                    that.setState({isOHit:{Y240_280c: 'green'},
                    })
                }
                else if (xy === "240320"){
                    that.setState({isOHit:{Y240_320c: 'green'},
                   })
                }
                else if (xy === "240360"){
                    that.setState({isOHit:{Y240_360c: 'green'},
                  })
                }
                else if (xy === "240400"){
                    that.setState({isOHit:{Y240_400c: 'green'},
                   })
                }

                else if (xy === "2800"){
                    that.setState({isOHit:{Y280_0c: 'green'},
                 })
                }
                else if (xy === "28040"){
                    that.setState({isOHit:{Y280_40c: 'green'},
                 })
                }
                else if (xy === "28080"){
                    that.setState({isOHit:{Y280_80c: 'green'},
                  })
                }
                else if (xy === "280120"){
                    that.setState({isOHit:{Y280_120c: 'green'},
                    })
                }
                else if (xy === "280160"){
                    that.setState({isOHit:{Y280_160c: 'green'},
                   })
                }
                else if (xy === "280200"){
                    that.setState({isOHit:{Y280_200c: 'green'},
                    })
                }
                else if (xy === "280240"){
                    that.setState({isOHit:{Y280_240c: 'green'},
                   })
                }
                else if (xy === "280280"){
                    that.setState({isOHit:{Y280_280c: 'green'},
                  })
                }
                else if (xy === "280320"){
                    that.setState({isOHit:{Y280_320c: 'green'},
                    })
                }
                else if (xy === "280360"){
                    that.setState({isOHit:{Y280_360c: 'green'},
                   })
                }
                else if (xy === "280400"){
                    that.setState({isOHit:{Y280_400c: 'green'},
                   })
                }

                else if (xy === "3200"){
                    that.setState({isOHit:{Y320_0c: 'green'},
                    })
                }
                else if (xy === "32040"){
                    that.setState({isOHit:{Y320_40c: 'green'},
                   })
                }
                else if (xy === "32080"){
                    that.setState({isOHit:{Y320_80c: 'green'},
                  })
                }
                else if (xy === "320120"){
                    that.setState({isOHit:{Y320_120c: 'green'},
                 })
                }
                else if (xy === "320160"){
                    that.setState({isOHit:{Y320_160c: 'green'},
                })
                }
                else if (xy === "320200"){
                    that.setState({isOHit:{Y320_200c: 'green'},
              })
                }
                else if (xy === "320240"){
                    that.setState({isOHit:{Y320_240c: 'green'},
                  })
                }
                else if (xy === "3240280"){
                    that.setState({isOHit:{Y320_280c: 'green'},
                })
                }
                else if (xy === "320320"){
                    that.setState({isOHit:{Y320_320c: 'green'},
                })
                }
                else if (xy === "320360"){
                    that.setState({isOHit:{Y320_360c: 'green'},
                 })
                }
                else if (xy === "320400"){
                    that.setState({isOHit:{Y320_400c: 'green'},
               })
                }

                else if (xy === "3600"){
                    that.setState({isOHit:{Y360_0c: 'green'},
                   })
                }
                else if (xy === "36040"){
                    that.setState({isOHit:{Y360_40c: 'green'},
               })
                }
                else if (xy === "36080"){
                    that.setState({isOHit:{Y360_80c: 'green'},
                  })
                }
                else if (xy === "360120"){
                    that.setState({isOHit:{Y360_120c: 'green'},
                 })
                }
                else if (xy === "360160"){
                    that.setState({isOHit:{Y360_160c: 'green'},
                  })
                }
                else if (xy === "360200"){
                    that.setState({isOHit:{Y360_200c: 'green'},
                    })
                }
                else if (xy === "360240"){
                    that.setState({isOHit:{Y360_240c: 'green'},
                   })
                }
                else if (xy === "3640280"){
                    that.setState({isOHit:{Y360_280c: 'green'},
                  })
                }
                else if (xy === "360320"){
                    that.setState({isOHit:{Y360_320c: 'green'},
                  })
                }
                else if (xy === "360360"){
                    that.setState({isOHit:{Y360_360c: 'green'},
                    })
                }
                else if (xy === "360400"){
                    that.setState({isOHit:{Y360_400c: 'green'},
                  })
                }

                else if (xy === "4000"){
                    that.setState({isOHit:{Y400_0c: 'green'},
                  })
                }
                else if (xy === "40040"){
                    that.setState({isOHit:{Y400_40c: 'green'},
                 })
                }
                else if (xy === "40080"){
                    that.setState({isOHit:{Y400_80c: 'green'},
                  })
                }
                else if (xy === "400120"){
                    that.setState({isOHit:{Y400_120c: 'green'},
                })
                }
                else if (xy === "400160"){
                    that.setState({isOHit:{Y400_160c: 'green'},
                   })
                }
                else if (xy === "400200"){
                    that.setState({isOHit:{Y400_200c: 'green'},
                    })
                }
                else if (xy === "400240"){
                    that.setState({isOHit:{Y400_240c: 'green'},
               })
                }
                else if (xy === "4040280"){
                    that.setState({isOHit:{Y400_280c: 'green'},
                   })
                }
                else if (xy === "400320"){
                    that.setState({isOHit:{Y400_320c: 'green'},
                   })
                }
                else if (xy === "400360"){
                    that.setState({isOHit:{Y400_360c: 'green'},
                 })
                }
                else if (xy === "4004000"){
                    that.setState({isOHit:{Y400_400c: 'green'},
                })
                }
                that.socket.emit("sendState", that.state.lobbyId, that.state.isOHit);
               }
               else if (result === 3){
                   // already shot there
                   const d = new Date().toLocaleTimeString();
                   console.log("3")
                   that.setState({
                    hasError: true,
                       errorMsg: "Already shot here! " + d
                   })
               }
               else if (result === 4){
                   // not your turn
                   const d = new Date().toLocaleTimeString();
                   console.log("4")
                   that.setState({
                       hasError: true,
                       errorMsg: "Not your turn! " + d
                   })
               }
           });
        }
        
    }
    
      render() {
        const showError = this.state.hasError ? "show" : "hide";
        let showEnding = this.state.isOver ? "show" : "hide";
        let showEnd = this.state.isOver ? "hide" : "show";
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
                <div className={showError} style={{color: "red", marginLeft:"150px", marginTop:"30px"}}> {this.state.errorMsg}</div>

            <div id="ending" className={showEnding}>
                <p id="result" style={{color:'white', marginLeft:"-20px"}}>{this.state.winner} Wins!</p>
                <div className="board">
                <p style={{color:'white', marginLeft:"200px"}}>Gained</p> <p> {this.state.gainedCoins} </p><img className="coinImg" src={coin} alt="coin"></img>
                </div>
                <button className="btn_return" style={{color:'white', marginLeft:"190px"}}
                onClick={() => this.handleReturnToLobby()}>Return to Lobby</button>
            </div>
            <br />

            <div  className={showEnd}>
            <div id="gameContent">
            <div className="board"> 
            <div id="player">
                <p id="yFleet">Your Fleet</p>
            <div>
                <Stage width={400} height={400}>
                    <Layer>
                    <Rect x={0} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,0)} fill={this.state.isYHit.Y0_0c} />
                    <Rect x={0} y={40} width={40} height={40} stroke="white"  strokeWidth={1} onClick={() => this.handleYFleetClick(0,40)}  fill={this.state.isYHit.Y0_40c}/>
                    <Rect x={0} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,80)} fill={this.state.isYHit.Y0_80c}/>
                    <Rect x={0} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,120)} fill={this.state.isYHit.Y0_120c}/>
                    <Rect x={0} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,160)} fill={this.state.isYHit.Y0_160c}/>
                    <Rect x={0} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,200)} fill={this.state.isYHit.Y0_200c}/>
                    <Rect x={0} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,240)} fill={this.state.isYHit.Y0_240c}/>
                    <Rect x={0} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,280)} fill={this.state.isYHit.Y0_280c}/>
                    <Rect x={0} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,320)} fill={this.state.isYHit.Y0_320c}/>
                    <Rect x={0} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,360)} fill={this.state.isYHit.Y0_360c}/>
                    <Rect x={0} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(0,400)} fill={this.state.isYHit.Y0_400c}/>

                    <Rect x={40} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,0)} fill={this.state.isYHit.Y40_0c}/>
                    <Rect x={40} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,40)} fill={this.state.isYHit.Y40_40c}/>
                    <Rect x={40} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,80)} fill={this.state.isYHit.Y40_80c}/>
                    <Rect x={40} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,120)} fill={this.state.isYHit.Y40_120c}/>
                    <Rect x={40} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,160)} fill={this.state.isYHit.Y40_160c}/>
                    <Rect x={40} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,200)} fill={this.state.isYHit.Y40_200c}/>
                    <Rect x={40} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,240)} fill={this.state.isYHit.Y40_240c}/>
                    <Rect x={40} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,280)} fill={this.state.isYHit.Y40_280c}/>
                    <Rect x={40} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,320)} fill={this.state.isYHit.Y40_320c}/>
                    <Rect x={40} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,360)} fill={this.state.isYHit.Y40_360c}/>
                    <Rect x={40} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(40,400)} fill={this.state.isYHit.Y40_400c}/>

                    <Rect x={80} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,0)} fill={this.state.isYHit.Y80_0c} />
                    <Rect x={80} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,40)} fill={this.state.isYHit.Y80_40c}/>
                    <Rect x={80} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,80)} fill={this.state.isYHit.Y80_80c}/>
                    <Rect x={80} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,120)} fill={this.state.isYHit.Y80_120c}/>
                    <Rect x={80} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,160)} fill={this.state.isYHit.Y80_160c}/>
                    <Rect x={80} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,200)} fill={this.state.isYHit.Y80_200c}/>
                    <Rect x={80} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,240)} fill={this.state.isYHit.Y80_240c}/>
                    <Rect x={80} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,280)} fill={this.state.isYHit.Y80_280c}/>
                    <Rect x={80} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,320)} fill={this.state.isYHit.Y80_320c}/>
                    <Rect x={80} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,360)} fill={this.state.isYHit.Y80_360c}/>
                    <Rect x={80} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(80,400)} fill={this.state.isYHit.Y80_400c}/>

                    <Rect x={120} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,0)} fill={this.state.isYHit.Y120_0c}/>
                    <Rect x={120} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,40)} fill={this.state.isYHit.Y120_40c}/>
                    <Rect x={120} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,80)} fill={this.state.isYHit.Y120_80c} />
                    <Rect x={120} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,120)} fill={this.state.isYHit.Y120_120c}/>
                    <Rect x={120} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,160)} fill={this.state.isYHit.Y120_160c}/>
                    <Rect x={120} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,200)} fill={this.state.isYHit.Y120_200c}/>
                    <Rect x={120} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,240)} fill={this.state.isYHit.Y120_240c}/>
                    <Rect x={120} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,280)} fill={this.state.isYHit.Y120_280c}/>
                    <Rect x={120} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,320)} fill={this.state.isYHit.Y120_320c}/>
                    <Rect x={120} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,360)} fill={this.state.isYHit.Y120_360c}/>
                    <Rect x={120} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(120,400)} fill={this.state.isYHit.Y120_400c}/>

                    <Rect x={160} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,0)} fill={this.state.isYHit.Y160_0c} />
                    <Rect x={160} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,40)} fill={this.state.isYHit.Y160_40c}/>
                    <Rect x={160} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,80)} fill={this.state.isYHit.Y160_80c}/>
                    <Rect x={160} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,120)} fill={this.state.isYHit.Y160_120c}/>
                    <Rect x={160} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,160)} fill={this.state.isYHit.Y160_160c}/>
                    <Rect x={160} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,200)} fill={this.state.isYHit.Y160_200c}/>
                    <Rect x={1620} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,240)} fill={this.state.isYHit.Y160_240c}/>
                    <Rect x={160} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,280)} fill={this.state.isYHit.Y160_280c}/>
                    <Rect x={160} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,320)} fill={this.state.isYHit.Y160_320c}/>
                    <Rect x={160} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,360)} fill={this.state.isYHit.Y160_360c}/>
                    <Rect x={160} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(160,400)} fill={this.state.isYHit.Y160_400c}/>

                    <Rect x={200} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,0)} fill={this.state.isYHit.Y200_0c}/>
                    <Rect x={200} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,40)} fill={this.state.isYHit.Y200_40c}/>
                    <Rect x={200} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,80)} fill={this.state.isYHit.Y200_80c}/>
                    <Rect x={200} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,120)} fill={this.state.isYHit.Y200_120c}/>
                    <Rect x={200} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,160)} fill={this.state.isYHit.Y200_160c}/>
                    <Rect x={200} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,200)} fill={this.state.isYHit.Y200_200c}/>
                    <Rect x={200} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,240)} fill={this.state.isYHit.Y200_240c}/>
                    <Rect x={200} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,280)} fill={this.state.isYHit.Y200_280c}/>
                    <Rect x={200} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,320)} fill={this.state.isYHit.Y200_320c}/>
                    <Rect x={200} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,360)} fill={this.state.isYHit.Y200_360c}/>
                    <Rect x={200} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(200,400)} fill={this.state.isYHit.Y200_400c}/>

                    <Rect x={240} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,0)} fill={this.state.isYHit.Y240_0c}/>
                    <Rect x={240} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,40)} fill={this.state.isYHit.Y240_40c}/>
                    <Rect x={240} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,80)} fill={this.state.isYHit.Y240_80c}/>
                    <Rect x={240} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,120)} fill={this.state.isYHit.Y240_120c}/>
                    <Rect x={240} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,160)} fill={this.state.isYHit.Y240_160c}/>
                    <Rect x={240} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,200)} fill={this.state.isYHit.Y240_200c}/>
                    <Rect x={240} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,240)} fill={this.state.isYHit.Y240_240c}/>
                    <Rect x={240} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,280)} fill={this.state.isYHit.Y240_280c}/>
                    <Rect x={240} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,320)} fill={this.state.isYHit.Y240_320c}/>
                    <Rect x={240} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,360)} fill={this.state.isYHit.Y240_360c}/>
                    <Rect x={240} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(240,400)} fill={this.state.isYHit.Y240_400c}/>

                    <Rect x={280} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,0)} fill={this.state.isYHit.Y280_0c}/>
                    <Rect x={280} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,40)} fill={this.state.isYHit.Y280_40c}/>
                    <Rect x={280} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,80)} fill={this.state.isYHit.Y280_80c}/>
                    <Rect x={280} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,120)} fill={this.state.isYHit.Y280_120c}/>
                    <Rect x={280} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,160)} fill={this.state.isYHit.Y280_160c}/>
                    <Rect x={280} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,200)} fill={this.state.isYHit.Y280_200c}/>
                    <Rect x={280} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,240)} fill={this.state.isYHit.Y280_240c}/>
                    <Rect x={280} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,280)} fill={this.state.isYHit.Y280_280c}/>
                    <Rect x={280} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,320)} fill={this.state.isYHit.Y280_320c}/>
                    <Rect x={280} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,360)} fill={this.state.isYHit.Y280_360c}/>
                    <Rect x={280} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(280,400)} fill={this.state.isYHit.Y280_400c}/>

                    <Rect x={320} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,0)} fill={this.state.isYHit.Y320_0c}/>
                    <Rect x={320} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,40)} fill={this.state.isYHit.Y320_40c}/>
                    <Rect x={320} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,80)}  fill={this.state.isYHit.Y320_80c}/>
                    <Rect x={320} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,120)} fill={this.state.isYHit.Y320_120c}/>
                    <Rect x={320} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,160)} fill={this.state.isYHit.Y320_160c}/>
                    <Rect x={320} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,200)} fill={this.state.isYHit.Y320_200c}/>
                    <Rect x={320} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,240)} fill={this.state.isYHit.Y320_240c}/>
                    <Rect x={320} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,280)} fill={this.state.isYHit.Y320_280c}/>
                    <Rect x={320} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,320)} fill={this.state.isYHit.Y320_320c}/>
                    <Rect x={320} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,360)} fill={this.state.isYHit.Y320_360c}/>
                    <Rect x={320} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(320,400)} fill={this.state.isYHit.Y320_400c}/>

                    <Rect x={360} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,0)} fill={this.state.isYHit.Y360_0c}/>
                    <Rect x={360} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,40)} fill={this.state.isYHit.Y360_40c}/>
                    <Rect x={360} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,80)} fill={this.state.isYHit.Y360_80c}/>
                    <Rect x={360} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,120)} fill={this.state.isYHit.Y360_120c}/>
                    <Rect x={360} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,160)} fill={this.state.isYHit.Y360_160c}/>
                    <Rect x={360} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,200)} fill={this.state.isYHit.Y360_200c}/>
                    <Rect x={360} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,240)} fill={this.state.isYHit.Y360_240c}/>
                    <Rect x={360} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,280)} fill={this.state.isYHit.Y360_280c}/>
                    <Rect x={360} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,320)} fill={this.state.isYHit.Y360_320c}/>
                    <Rect x={360} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,360)} fill={this.state.isYHit.Y360_360c}/>
                    <Rect x={360} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(360,400)} fill={this.state.isYHit.Y360_400c}/>

                    <Rect x={400} y={0} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,0)} fill={this.state.isYHit.Y400_0c}/>
                    <Rect x={400} y={40} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,40)} fill={this.state.isYHit.Y400_40c}/>
                    <Rect x={400} y={80} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,80)} fill={this.state.isYHit.Y400_80c}/>
                    <Rect x={400} y={120} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,120)} fill={this.state.isYHit.Y400_120c}/>
                    <Rect x={400} y={160} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,160)} fill={this.state.isYHit.Y400_160c}/>
                    <Rect x={400} y={200} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,200)} fill={this.state.isYHit.Y400_200c}/>
                    <Rect x={400} y={240} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,240)} fill={this.state.isYHit.Y400_240c}/>
                    <Rect x={400} y={280} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,280)} fill={this.state.isYHit.Y400_280c}/>
                    <Rect x={400} y={320} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,320)} fill={this.state.isYHit.Y400_320c}/>
                    <Rect x={400} y={360} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,360)} fill={this.state.isYHit.Y400_360c}/>
                    <Rect x={400} y={400} width={40} height={40} stroke="white" strokeWidth={1} onClick={() => this.handleYFleetClick(400,400)} fill={this.state.isYHit.Y400_400c}/>
                    </Layer>
                </Stage>
                </div>
            </div>
            

            <div id="opponent">
                <p id="oFleet">Opponent's Fleet</p>
                <div>
                <Stage width={400} height={400}>
                <Layer>
                    <Rect x={0} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.Y0_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,0)}/>
                    <Rect x={0} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.Y0_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,40)}/>
                    <Rect x={0} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.Y0_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,80)}/>
                    <Rect x={0} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.Y0_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,120)}/>
                    <Rect x={0} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.Y0_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,160)}/>
                    <Rect x={0} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.Y0_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,200)}/>
                    <Rect x={0} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.Y0_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,240)}/>
                    <Rect x={0} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.Y0_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,280)}/>
                    <Rect x={0} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.Y0_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,320)}/>
                    <Rect x={0} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.Y0_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,360)}/>
                    <Rect x={0} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.Y0_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,400)}/>

                    <Rect x={40} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.Y40_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,0)}/>
                    <Rect x={40} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.Y40_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,40)}/>
                    <Rect x={40} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.Y40_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,80)}/>
                    <Rect x={40} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.Y40_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,120)}/>
                    <Rect x={40} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.Y40_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,160)}/>
                    <Rect x={40} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.Y40_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,200)}/>
                    <Rect x={40} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.Y40_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,240)}/>
                    <Rect x={40} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.Y40_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,280)}/>
                    <Rect x={40} y={320} width={40} height={40} stroke="white"  fill={this.state.isOHit.Y40_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,320)}/>
                    <Rect x={40} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.Y40_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,360)}/>
                    <Rect x={40} y={400} width={40} height={40} stroke="white"  fill={this.state.isOHit.Y0_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,400)}/>

                    <Rect x={80} y={0} width={40} height={40} stroke="white"  fill={this.state.isOHit.Y80_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,0)}/>
                    <Rect x={80} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.Y80_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,40)}/>
                    <Rect x={80} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.Y80_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,80)}/>
                    <Rect x={80} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.Y80_120c}  strokeWidth={1} onClick={() => this.handleOFleetClick(80,120)}/>
                    <Rect x={80} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.Y80_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,160)}/>
                    <Rect x={80} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.Y80_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,200)}/>
                    <Rect x={80} y={240} width={40} height={40} stroke="white"  fill={this.state.isOHit.Y80_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,240)}/>
                    <Rect x={80} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.Y80_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,280)}/>
                    <Rect x={80} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.Y80_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,320)}/>
                    <Rect x={80} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.Y80_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,360)}/>
                    <Rect x={80} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.Y80_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,400)}/>

                    <Rect x={120} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.Y120_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,0)}/>
                    <Rect x={120} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.Y120_40c}  strokeWidth={1} onClick={() => this.handleOFleetClick(120,40)}/>
                    <Rect x={120} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.Y120_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,80)}/>
                    <Rect x={120} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.Y120_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,120)}/>
                    <Rect x={120} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.Y120_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,160)}/>
                    <Rect x={120} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.Y120_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,200)}/>
                    <Rect x={120} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.Y120_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,240)}/>
                    <Rect x={120} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.Y120_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,280)}/>
                    <Rect x={120} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.Y120_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,320)}/>
                    <Rect x={120} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.Y120_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,360)}/>
                    <Rect x={120} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.Y120_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,400)}/>

                    <Rect x={160} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.Y160_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,0)}/>
                    <Rect x={160} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.Y160_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,40)}/>
                    <Rect x={160} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.Y160_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,80)}/>
                    <Rect x={160} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.Y160_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,120)}/>
                    <Rect x={160} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.Y160_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,160)}/>
                    <Rect x={160} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.Y160_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,200)}/>
                    <Rect x={160} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.Y160_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,240)}/>
                    <Rect x={160} y={280} width={40} height={40} stroke="white"  fill={this.state.isOHit.Y160_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,280)}/>
                    <Rect x={160} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.Y160_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,320)}/>
                    <Rect x={160} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.Y160_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,360)}/>
                    <Rect x={160} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.Y160_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,400)}/>

                    <Rect x={200} y={0} width={40} height={40} stroke="white"  fill={this.state.isOHit.Y200_0c}strokeWidth={1} onClick={() => this.handleOFleetClick(200,0)}/>
                    <Rect x={200} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.Y200_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,40)}/>
                    <Rect x={200} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.Y200_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,80)}/>
                    <Rect x={200} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.Y200_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,120)}/>
                    <Rect x={200} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.Y200_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,160)}/>
                    <Rect x={200} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.Y200_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,200)}/>
                    <Rect x={200} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.Y200_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,240)}/>
                    <Rect x={200} y={280} width={40} height={40} stroke="white"  fill={this.state.isOHit.Y200_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,280)}/>
                    <Rect x={200} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.Y200_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,320)}/>
                    <Rect x={200} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.Y200_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,360)}/>
                    <Rect x={200} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.Y200_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,400)}/>

                    <Rect x={240} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.Y240_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,0)}/>
                    <Rect x={240} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.Y240_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,40)}/>
                    <Rect x={240} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.Y240_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,80)}/>
                    <Rect x={240} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.Y240_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,120)}/>
                    <Rect x={240} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.Y240_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,160)}/>
                    <Rect x={240} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.Y240_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,200)}/>
                    <Rect x={240} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.Y240_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,240)}/>
                    <Rect x={240} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.Y240_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,280)}/>
                    <Rect x={240} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.Y240_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,320)}/>
                    <Rect x={240} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.Y240_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,360)}/>
                    <Rect x={240} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.Y240_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,400)}/>

                    <Rect x={280} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.Y280_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,0)}/>
                    <Rect x={280} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.Y280_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,40)}/>
                    <Rect x={280} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.Y280_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,80)}/>
                    <Rect x={280} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.Y280_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,120)}/>
                    <Rect x={280} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.Y280_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,160)}/>
                    <Rect x={280} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.Y280_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,200)}/>
                    <Rect x={280} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.Y280_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,240)}/>
                    <Rect x={280} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.Y280_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,280)}/>
                    <Rect x={280} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.Y280_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,320)}/>
                    <Rect x={280} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.Y280_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,360)}/>
                    <Rect x={280} y={400} width={40} height={40} stroke="white"fill={this.state.isOHit.Y280_400c}  strokeWidth={1} onClick={() => this.handleOFleetClick(280,400)}/>

                    <Rect x={320} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.Y320_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,0)}/>
                    <Rect x={320} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.Y320_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,40)}/>
                    <Rect x={320} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.Y320_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,80)}/>
                    <Rect x={320} y={120} width={40} height={40} stroke="white"fill={this.state.isOHit.Y320_120c}  strokeWidth={1} onClick={() => this.handleOFleetClick(320,120)}/>
                    <Rect x={320} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.Y320_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,160)}/>
                    <Rect x={320} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.Y320_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,200)}/>
                    <Rect x={320} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.Y320_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,240)}/>
                    <Rect x={320} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.Y320_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,280)}/>
                    <Rect x={320} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.Y320_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,320)}/>
                    <Rect x={320} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.Y320_360c}strokeWidth={1} onClick={() => this.handleOFleetClick(320,360)}/>
                    <Rect x={320} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.Y320_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,400)}/>

                    <Rect x={360} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.Y360_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,0)}/>
                    <Rect x={360} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.Y360_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,40)}/>
                    <Rect x={360} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.Y360_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,80)}/>
                    <Rect x={360} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.Y360_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,120)}/>
                    <Rect x={360} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.Y360_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,160)}/>
                    <Rect x={360} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.Y360_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,200)}/>
                    <Rect x={360} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.Y360_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,240)}/>
                    <Rect x={360} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.Y360_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,280)}/>
                    <Rect x={360} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.Y360_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,320)}/>
                    <Rect x={360} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.Y360_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,360)}/>
                    <Rect x={360} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.Y360_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,400)}/>

                    <Rect x={400} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.Y400_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,0)}/>
                    <Rect x={400} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.Y400_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,40)}/>
                    <Rect x={400} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.Y400_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,80)}/>
                    <Rect x={400} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.Y400_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,120)}/>
                    <Rect x={400} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.Y400_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,160)}/>
                    <Rect x={400} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.Y400_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,200)}/>
                    <Rect x={400} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.Y400_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,240)}/>
                    <Rect x={400} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.Y400_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,280)}/>
                    <Rect x={400} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.Y400_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,320)}/>
                    <Rect x={400} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.Y400_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,360)}/>
                    <Rect x={400} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.Y400_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,400)}/>
                </Layer>
            </Stage>
            </div>
            </div>
            </div>
            </div>

        <h3 className="statusMsg" id="status">Waiting For Both Players To Set Up</h3>
        <div className="turnText"><h3>{this.state.turnStatus}'s turn</h3></div>

        <div className="fleetTitle"> Fleet </div>
        <div id="fl" className="fleets">
            <div id="deployments">
                <div id="carrierSelect" className="entry">
                    
                    <img id="carrierImg" className="shipName" src={this.state.ships.carrier} alt="ship"
                    onClick={this.carrierSelect}></img>
                    <div id ="carrierBar" className={showCarrierSelected} ></div>
                    <p className="shipName">Carrier</p>
                    <p className="shipName" id="carrierRemaining">Remaining: {this.state.remainingShips.carrier}</p>
                </div>

                <div id="dreadnoughtSelect" className="entry">
                    <img id="dreadnoughtImg" className="shipName" src={this.state.ships.dreadnought} alt="ship"
                    onClick={this.dreadnoughtSelect}></img>
                    <div id="dreadnoughtBar" className={showDreadnoughtSelected}></div>
                    <p className="shipName">Dreadnought</p>
                    <p className="shipName" id="dreadnoughtRemaining">Remaining: {this.state.remainingShips.dreadnought}</p>
                </div>

                <div id="cruiserSelect" className="entry">
                    <img id="cruiserImg" className="shipName" src={this.state.ships.cruiser} alt="ship"
                    onClick={this.cruiserSelect}></img>
                    <div id="cruiserBar" className={showCruiserSelected}></div>
                    <p className="shipName">Cruiser</p>
                    <p className="shipName" id="cruiserRemaining">Remaining: {this.state.remainingShips.cruiser}</p>
                </div>

                <div id="submarineSelect" className="entry">
                    <img id="submarineImg" className="shipName" src={this.state.ships.submarine} alt="ship"
                    onClick={this.submarineSelect}></img>
                    <div id="submarineBar" className={showSubmarineSelected}></div>
                    <p className="shipName">Submarine</p>
                    <p className="shipName" id="submarineRemaining">Remaining: {this.state.remainingShips.submarine}</p>
                </div>

                <div id="destroyerSelect" className="entry">
                    <img id="destroyerImg" className="shipName" src={this.state.ships.destroyer} alt="ship"
                    onClick={this.destroyerSelect}></img>
                    <div id="destroyerBar" className={showDestroyerSelected}></div>
                    <p className="shipName">Destroyer</p>
                    <p className="shipName" id="destroyerRemaining">Remaining: {this.state.remainingShips.destroyer}</p>
                </div>

                <button className="btn_rotate" id="rotateShips"
                onClick={() => this.handleRotate()}>ROTATE SHIPS</button>
            </div>
            </div>
            <div style={{marginBottom:"100px"}}></div>
        </div>
    </div>
      );
    }
  }
import React, { Component } from 'react';
import { Stage, Layer, Rect} from 'react-konva';
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
import coin from "../media/items/coin.png";

// -----------------------------------------------------------------


export default class Game extends Component {
    constructor(props){
        super(props);

        this.state ={
            log: '',
            logs : [],
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
            isOHit: {O0_0c:"", O40_0c:"", O80_0c:"", O120_0c:"", O160_0c:"", O200_0c:"", O240_0c:"", O280_0c:"", O320_0c:"", O360_0c:"",  O400_0c:"",
                     O0_40c:"", O40_40c:"", O80_40c:"", O120_40c:"", O160_40c:"", O200_40c:"", O240_40c:"", O280_40c:"", O320_40c:"", O360_40c:"",  O400_40c:"",
                     O0_80c:"", O40_80c:"", O80_80c:"", O120_80c:"", O160_80c:"", O200_80c:"", O240_80c:"", O280_80c:"", O320_80c:"", O360_80c:"",  O400_80c:"",
                     O0_120c:"", O40_120c:"", O80_120c:"", O120_120c:"", O160_120c:"", O200_120c:"", O240_120c:"", O280_120c:"", O320_120c:"", O360_120c:"",  O400_120c:"",
                     O0_160c:"", O40_160c:"", O80_160c:"", O120_160c:"", O160_160c:"", O200_160c:"", O240_160c:"", O280_160c:"", O320_160c:"", O360_160c:"",  O400_160c:"",
                     O0_200c:"", O40_200c:"", O80_200c:"", O120_200c:"", O160_200c:"", O200_200c:"", O240_200c:"", O280_200c:"", O320_200c:"", O360_200c:"",  O400_200c:"",
                     O0_240c:"", O40_240c:"", O80_240c:"", O120_240c:"", O160_240c:"", O200_240c:"", O240_240c:"", O280_240c:"", O320_240c:"", O360_240c:"",  O400_240c:"",
                     O0_280c:"", O40_280c:"", O80_280c:"", O120_280c:"", O160_280c:"", O200_280c:"", O240_280c:"", O280_280c:"", O320_280c:"", O360_280c:"",  O400_280c:"", 
                     O0_320c:"", O40_320c:"", O80_320c:"", O120_320c:"", O160_320c:"", O200_320c:"", O240_320c:"", O280_320c:"", O320_320c:"", O360_320c:"",  O400_320c:"",
                     O0_360c:"", O40_360c:"", O80_360c:"", O120_360c:"", O160_360c:"", O200_360c:"", O240_360c:"", O280_360c:"", O320_360c:"", O360_360c:"",  O400_360c:"",
                     O0_400c:"", O40_400c:"", O80_400c:"", O120_400c:"", O160_400c:"", O200_400c:"", O240_400c:"", O280_400c:"", O320_400c:"", O360_400c:"",  O400_400c:"",
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
        const that = this;
        console.log("yFleet clicked coordinates: ", x, y);
        if (this.state.selectedShip.carrier){
            this.socket.emit("place", 1, x, y, "carrier", function(result){
                console.log("carrier placed: ", result)
                that.setState({
                    remainingShips:{
                        carrier: that.state.remainingShips.carrier - 1
                    }
                })
            })
        }
        else if (this.state.selectedShip.cruiser){
            this.socket.emit("place", 1, x, y, "cruiser", function(result){
                console.log("cruiser placed: ", result)
                that.setState({
                    remainingShips:{
                        cruiser: that.state.remainingShips.cruiser - 1
                    }
                })
            })
        }
        else if (this.state.selectedShip.submarine){
            this.socket.emit("place", 1, x, y, "submarine", function(result){
                console.log("submarine placed: ", result)
                that.setState({
                    remainingShips:{
                        submarine: that.state.remainingShips.submarine - 1
                    }
                })
            })
        }
        else if (this.state.selectedShip.destroyer){
            this.socket.emit("place", 1, x, y, "destroyer", function(result){
                console.log("destroyer placed: ", result)
                that.setState({
                    remainingShips:{
                        destroyer: that.state.remainingShips.destroyer - 1
                    }
                })
            })
        }
        else if (this.state.selectedShip.dreadnought){
            this.socket.emit("place", 1, x, y, "dreadnought", function(result){
                console.log("dreadnought placed: ", result)
                that.setState({
                    remainingShips:{
                        dreadnought: that.state.remainingShips.dreadnought - 1
                    }
                })
            })
        }
        else {
            console.log("please select a ship");
        }
        if (this.state.remainingShips.carrier === 0 &&  this.state.remainingShips.cruiser === 0 && 
            this.state.remainingShips.destroyer === 0 && this.state.remainingShips.submarine === 0
            && this.state.remainingShips.dreadnought === 0){
                this.setState({
                    readyToPlay: true
                })
            }
            console.log("ready to play");
    }

    handleOFleetClick(x, y){
        console.log("oFleet clicked coordinates: ", x, y);
       
        this.socket.emit("shot", 1, x, y, function(result, xy){
             if (result === 1){
                // success shot was a hit
                let d = new Date().toLocaleTimeString();
                console.log("The Shot Hit", d);

                if (xy === "00"){
                    this.setState({isOHit:{O0_0c: 'red'} })
                }
                else if (xy === "040"){
                    this.setState({isOHit:{O0_40c: 'red'}})
                }
                else if (xy === "080"){
                    this.setState({isOHit:{O0_80c: 'red'}})
                }
                else if (xy === "0120"){
                    this.setState({isOHit:{O0_120c: 'red'}})
                }
                else if (xy === "0160"){
                    this.setState({isOHit:{O0_160c: 'red'}})
                }
                else if (xy === "0200"){
                    this.setState({isOHit:{O0_200c: 'red'}})
                }
                else if (xy === "0240"){
                    this.setState({isOHit:{O0_240c: 'red'}})
                }
                else if (xy === "0280"){
                    this.setState({isOHit:{O0_280c: 'red'}})
                }
                else if (xy === "0320"){
                    this.setState({isOHit:{O0_320c: 'red'}})
                }
                else if (xy === "0360"){
                    this.setState({isOHit:{O0_360c: 'red'}})
                }
                else if (xy === "0400"){
                    this.setState({isOHit:{O0_400c: 'red'}})
                }

                else if (xy === "400"){
                    this.setState({isOHit:{O40_0c: 'red'} })
                }
                else if (xy === "4040"){
                    this.setState({isOHit:{O40_40c: 'red'}})
                }
                else if (xy === "4080"){
                    this.setState({isOHit:{O40_80c: 'red'}})
                }
                else if (xy === "40120"){
                    this.setState({isOHit:{O40_120c: 'red'}})
                }
                else if (xy === "40160"){
                    this.setState({isOHit:{O40_160c: 'red'}})
                }
                else if (xy === "40200"){
                    this.setState({isOHit:{O40_200c: 'red'}})
                }
                else if (xy === "40240"){
                    this.setState({isOHit:{O40_240c: 'red'}})
                }
                else if (xy === "40280"){
                    this.setState({isOHit:{O40_280c: 'red'}})
                }
                else if (xy === "40320"){
                    this.setState({isOHit:{O40_320c: 'red'}})
                }
                else if (xy === "40360"){
                    this.setState({isOHit:{O40_360c: 'red'}})
                }
                else if (xy === "40400"){
                    this.setState({isOHit:{O40_400c: 'red'}})
                }

                else if (xy === "800"){
                    this.setState({isOHit:{O80_0c: 'red'} })
                }
                else if (xy === "8040"){
                    this.setState({isOHit:{O80_40c: 'red'}})
                }
                else if (xy === "8080"){
                    this.setState({isOHit:{O80_80c: 'red'}})
                }
                else if (xy === "80120"){
                    this.setState({isOHit:{O40_120c: 'red'}})
                }
                else if (xy === "80160"){
                    this.setState({isOHit:{O80_160c: 'red'}})
                }
                else if (xy === "80200"){
                    this.setState({isOHit:{O80_200c: 'red'}})
                }
                else if (xy === "80240"){
                    this.setState({isOHit:{O80_240c: 'red'}})
                }
                else if (xy === "80280"){
                    this.setState({isOHit:{O80_280c: 'red'}})
                }
                else if (xy === "80320"){
                    this.setState({isOHit:{O80_320c: 'red'}})
                }
                else if (xy === "80360"){
                    this.setState({isOHit:{O80_360c: 'red'}})
                }
                else if (xy === "80400"){
                    this.setState({isOHit:{O80_400c: 'red'}})
                }

                else if (xy === "1200"){
                    this.setState({isOHit:{O120_0c: 'red'} })
                }
                else if (xy === "12040"){
                    this.setState({isOHit:{O120_40c: 'red'}})
                }
                else if (xy === "12080"){
                    this.setState({isOHit:{O120_80c: 'red'}})
                }
                else if (xy === "120120"){
                    this.setState({isOHit:{O120_120c: 'red'}})
                }
                else if (xy === "120160"){
                    this.setState({isOHit:{O120_160c: 'red'}})
                }
                else if (xy === "120200"){
                    this.setState({isOHit:{O120_200c: 'red'}})
                }
                else if (xy === "120240"){
                    this.setState({isOHit:{O120_240c: 'red'}})
                }
                else if (xy === "120280"){
                    this.setState({isOHit:{O120_280c: 'red'}})
                }
                else if (xy === "120320"){
                    this.setState({isOHit:{O120_320c: 'red'}})
                }
                else if (xy === "120360"){
                    this.setState({isOHit:{O120_360c: 'red'}})
                }
                else if (xy === "120400"){
                    this.setState({isOHit:{O120_400c: 'red'}})
                }

                else if (xy === "1600"){
                    this.setState({isOHit:{O160_0c: 'red'} })
                }
                else if (xy === "16040"){
                    this.setState({isOHit:{O160_40c: 'red'}})
                }
                else if (xy === "16080"){
                    this.setState({isOHit:{O0_80c: 'red'}})
                }
                else if (xy === "160120"){
                    this.setState({isOHit:{O160_120c: 'red'}})
                }
                else if (xy === "160160"){
                    this.setState({isOHit:{O160_160c: 'red'}})
                }
                else if (xy === "160200"){
                    this.setState({isOHit:{O160_200c: 'red'}})
                }
                else if (xy === "160240"){
                    this.setState({isOHit:{O160_240c: 'red'}})
                }
                else if (xy === "160280"){
                    this.setState({isOHit:{O160_280c: 'red'}})
                }
                else if (xy === "160320"){
                    this.setState({isOHit:{O160_320c: 'red'}})
                }
                else if (xy === "160360"){
                    this.setState({isOHit:{O160_360c: 'red'}})
                }
                else if (xy === "160400"){
                    this.setState({isOHit:{O160_400c: 'red'}})
                }

                else if (xy === "2000"){
                    this.setState({isOHit:{O200_0c: 'red'} })
                }
                else if (xy === "20040"){
                    this.setState({isOHit:{O200_40c: 'red'}})
                }
                else if (xy === "20080"){
                    this.setState({isOHit:{O200_80c: 'red'}})
                }
                else if (xy === "200120"){
                    this.setState({isOHit:{O200_120c: 'red'}})
                }
                else if (xy === "200160"){
                    this.setState({isOHit:{O200_160c: 'red'}})
                }
                else if (xy === "200200"){
                    this.setState({isOHit:{O200_200c: 'red'}})
                }
                else if (xy === "200240"){
                    this.setState({isOHit:{O200_240c: 'red'}})
                }
                else if (xy === "200280"){
                    this.setState({isOHit:{O200_280c: 'red'}})
                }
                else if (xy === "200320"){
                    this.setState({isOHit:{O200_320c: 'red'}})
                }
                else if (xy === "200360"){
                    this.setState({isOHit:{O200_360c: 'red'}})
                }
                else if (xy === "200400"){
                    this.setState({isOHit:{O200_400c: 'red'}})
                }

                else if (xy === "2400"){
                    this.setState({isOHit:{O240_0c: 'red'} })
                }
                else if (xy === "24040"){
                    this.setState({isOHit:{O240_40c: 'red'}})
                }
                else if (xy === "24080"){
                    this.setState({isOHit:{O240_80c: 'red'}})
                }
                else if (xy === "240120"){
                    this.setState({isOHit:{O240_120c: 'red'}})
                }
                else if (xy === "240160"){
                    this.setState({isOHit:{O240_160c: 'red'}})
                }
                else if (xy === "240200"){
                    this.setState({isOHit:{O240_200c: 'red'}})
                }
                else if (xy === "240240"){
                    this.setState({isOHit:{O240_240c: 'red'}})
                }
                else if (xy === "240280"){
                    this.setState({isOHit:{O240_280c: 'red'}})
                }
                else if (xy === "240320"){
                    this.setState({isOHit:{O240_320c: 'red'}})
                }
                else if (xy === "240360"){
                    this.setState({isOHit:{O240_360c: 'red'}})
                }
                else if (xy === "240400"){
                    this.setState({isOHit:{O240_400c: 'red'}})
                }

                else if (xy === "3200"){
                    this.setState({isOHit:{O320_0c: 'red'} })
                }
                else if (xy === "32040"){
                    this.setState({isOHit:{O320_40c: 'red'}})
                }
                else if (xy === "32080"){
                    this.setState({isOHit:{O320_80c: 'red'}})
                }
                else if (xy === "320120"){
                    this.setState({isOHit:{O320_120c: 'red'}})
                }
                else if (xy === "320160"){
                    this.setState({isOHit:{O320_160c: 'red'}})
                }
                else if (xy === "320200"){
                    this.setState({isOHit:{O320_200c: 'red'}})
                }
                else if (xy === "320240"){
                    this.setState({isOHit:{O320_240c: 'red'}})
                }
                else if (xy === "3240280"){
                    this.setState({isOHit:{O320_280c: 'red'}})
                }
                else if (xy === "320320"){
                    this.setState({isOHit:{O320_320c: 'red'}})
                }
                else if (xy === "320360"){
                    this.setState({isOHit:{O320_360c: 'red'}})
                }
                else if (xy === "320400"){
                    this.setState({isOHit:{O320_400c: 'red'}})
                }

                else if (xy === "3600"){
                    this.setState({isOHit:{O360_0c: 'red'} })
                }
                else if (xy === "36040"){
                    this.setState({isOHit:{O360_40c: 'red'}})
                }
                else if (xy === "36080"){
                    this.setState({isOHit:{O360_80c: 'red'}})
                }
                else if (xy === "360120"){
                    this.setState({isOHit:{O360_120c: 'red'}})
                }
                else if (xy === "360160"){
                    this.setState({isOHit:{O360_160c: 'red'}})
                }
                else if (xy === "360200"){
                    this.setState({isOHit:{O360_200c: 'red'}})
                }
                else if (xy === "360240"){
                    this.setState({isOHit:{O360_240c: 'red'}})
                }
                else if (xy === "3640280"){
                    this.setState({isOHit:{O360_280c: 'red'}})
                }
                else if (xy === "360320"){
                    this.setState({isOHit:{O360_320c: 'red'}})
                }
                else if (xy === "360360"){
                    this.setState({isOHit:{O360_360c: 'red'}})
                }
                else if (xy === "360400"){
                    this.setState({isOHit:{O360_400c: 'red'}})
                }

                else if (xy === "4000"){
                    this.setState({isOHit:{O400_0c: 'red'} })
                }
                else if (xy === "40040"){
                    this.setState({isOHit:{O400_40c: 'red'}})
                }
                else if (xy === "40080"){
                    this.setState({isOHit:{O400_80c: 'red'}})
                }
                else if (xy === "400120"){
                    this.setState({isOHit:{O400_120c: 'red'}})
                }
                else if (xy === "400160"){
                    this.setState({isOHit:{O400_160c: 'red'}})
                }
                else if (xy === "400200"){
                    this.setState({isOHit:{O400_200c: 'red'}})
                }
                else if (xy === "400240"){
                    this.setState({isOHit:{O400_240c: 'red'}})
                }
                else if (xy === "4040280"){
                    this.setState({isOHit:{O400_280c: 'red'}})
                }
                else if (xy === "400320"){
                    this.setState({isOHit:{O400_320c: 'red'}})
                }
                else if (xy === "400360"){
                    this.setState({isOHit:{O400_360c: 'red'}})
                }
                else if (xy === "4004000"){
                    this.setState({isOHit:{O400_400c: 'red'}})
                }

            }
            else if (result === 2){
                // miss shot
                let d = new Date().toLocaleTimeString();
                console.log("2")
            }
            else if (result === 3){
                // already shot there
                console.log("3")
            }
            else if (result === 4){
                // not your turn
                console.log("4")
            }
        });
    }
    
      render() {
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
                <p id="error_box"></p>

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
                <p id="yFleet">{this.state.currPlayer._id}'s Fleet</p>
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
                    <Rect x={0} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.O0_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,0)}/>
                    <Rect x={0} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.O0_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,40)}/>
                    <Rect x={0} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.O0_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,80)}/>
                    <Rect x={0} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.O0_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,120)}/>
                    <Rect x={0} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.O0_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,160)}/>
                    <Rect x={0} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.O0_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,200)}/>
                    <Rect x={0} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.O0_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,240)}/>
                    <Rect x={0} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.O0_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,280)}/>
                    <Rect x={0} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.O0_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,320)}/>
                    <Rect x={0} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.O0_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,360)}/>
                    <Rect x={0} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.O0_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(0,400)}/>

                    <Rect x={40} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.O40_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,0)}/>
                    <Rect x={40} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.O40_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,40)}/>
                    <Rect x={40} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.O40_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,80)}/>
                    <Rect x={40} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.O40_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,120)}/>
                    <Rect x={40} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.O40_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,160)}/>
                    <Rect x={40} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.O40_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,200)}/>
                    <Rect x={40} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.O40_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,240)}/>
                    <Rect x={40} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.O40_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,280)}/>
                    <Rect x={40} y={320} width={40} height={40} stroke="white"  fill={this.state.isOHit.O40_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,320)}/>
                    <Rect x={40} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.O40_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,360)}/>
                    <Rect x={40} y={400} width={40} height={40} stroke="white"  fill={this.state.isOHit.O0_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(40,400)}/>

                    <Rect x={80} y={0} width={40} height={40} stroke="white"  fill={this.state.isOHit.O80_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,0)}/>
                    <Rect x={80} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.O80_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,40)}/>
                    <Rect x={80} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.O80_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,80)}/>
                    <Rect x={80} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.O80_120c}  strokeWidth={1} onClick={() => this.handleOFleetClick(80,120)}/>
                    <Rect x={80} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.O80_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,160)}/>
                    <Rect x={80} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.O80_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,200)}/>
                    <Rect x={80} y={240} width={40} height={40} stroke="white"  fill={this.state.isOHit.O80_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,240)}/>
                    <Rect x={80} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.O80_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,280)}/>
                    <Rect x={80} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.O80_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,320)}/>
                    <Rect x={80} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.O80_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,360)}/>
                    <Rect x={80} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.O80_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(80,400)}/>

                    <Rect x={120} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.O120_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,0)}/>
                    <Rect x={120} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.O120_40c}  strokeWidth={1} onClick={() => this.handleOFleetClick(120,40)}/>
                    <Rect x={120} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.O120_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,80)}/>
                    <Rect x={120} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.O120_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,120)}/>
                    <Rect x={120} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.O120_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,160)}/>
                    <Rect x={120} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.O120_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,200)}/>
                    <Rect x={120} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.O120_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,240)}/>
                    <Rect x={120} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.O120_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,280)}/>
                    <Rect x={120} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.O120_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,320)}/>
                    <Rect x={120} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.O120_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,360)}/>
                    <Rect x={120} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.O120_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(120,400)}/>

                    <Rect x={160} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.O160_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,0)}/>
                    <Rect x={160} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.O160_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,40)}/>
                    <Rect x={160} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.O160_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,80)}/>
                    <Rect x={160} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.O160_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,120)}/>
                    <Rect x={160} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.O160_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,160)}/>
                    <Rect x={160} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.O160_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,200)}/>
                    <Rect x={160} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.O160_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,240)}/>
                    <Rect x={160} y={280} width={40} height={40} stroke="white"  fill={this.state.isOHit.O160_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,280)}/>
                    <Rect x={160} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.O160_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,320)}/>
                    <Rect x={160} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.O160_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,360)}/>
                    <Rect x={160} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.O160_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(160,400)}/>

                    <Rect x={200} y={0} width={40} height={40} stroke="white"  fill={this.state.isOHit.O200_0c}strokeWidth={1} onClick={() => this.handleOFleetClick(200,0)}/>
                    <Rect x={200} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.O200_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,40)}/>
                    <Rect x={200} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.O200_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,80)}/>
                    <Rect x={200} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.O200_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,120)}/>
                    <Rect x={200} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.O200_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,160)}/>
                    <Rect x={200} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.O200_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,200)}/>
                    <Rect x={200} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.O200_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,240)}/>
                    <Rect x={200} y={280} width={40} height={40} stroke="white"  fill={this.state.isOHit.O200_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,280)}/>
                    <Rect x={200} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.O200_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,320)}/>
                    <Rect x={200} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.O200_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,360)}/>
                    <Rect x={200} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.O200_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(200,400)}/>

                    <Rect x={240} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.O240_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,0)}/>
                    <Rect x={240} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.O240_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,40)}/>
                    <Rect x={240} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.O240_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,80)}/>
                    <Rect x={240} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.O240_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,120)}/>
                    <Rect x={240} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.O240_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,160)}/>
                    <Rect x={240} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.O240_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,200)}/>
                    <Rect x={240} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.O240_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,240)}/>
                    <Rect x={240} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.O240_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,280)}/>
                    <Rect x={240} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.O240_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,320)}/>
                    <Rect x={240} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.O240_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,360)}/>
                    <Rect x={240} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.O240_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(240,400)}/>

                    <Rect x={280} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.O280_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,0)}/>
                    <Rect x={280} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.O280_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,40)}/>
                    <Rect x={280} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.O280_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,80)}/>
                    <Rect x={280} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.O280_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,120)}/>
                    <Rect x={280} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.O280_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,160)}/>
                    <Rect x={280} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.O280_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,200)}/>
                    <Rect x={280} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.O280_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,240)}/>
                    <Rect x={280} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.O280_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,280)}/>
                    <Rect x={280} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.O280_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,320)}/>
                    <Rect x={280} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.O280_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(280,360)}/>
                    <Rect x={280} y={400} width={40} height={40} stroke="white"fill={this.state.isOHit.O280_400c}  strokeWidth={1} onClick={() => this.handleOFleetClick(280,400)}/>

                    <Rect x={320} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.O320_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,0)}/>
                    <Rect x={320} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.O320_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,40)}/>
                    <Rect x={320} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.O320_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,80)}/>
                    <Rect x={320} y={120} width={40} height={40} stroke="white"fill={this.state.isOHit.O320_120c}  strokeWidth={1} onClick={() => this.handleOFleetClick(320,120)}/>
                    <Rect x={320} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.O320_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,160)}/>
                    <Rect x={320} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.O320_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,200)}/>
                    <Rect x={320} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.O320_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,240)}/>
                    <Rect x={320} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.O320_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,280)}/>
                    <Rect x={320} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.O320_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,320)}/>
                    <Rect x={320} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.O320_360c}strokeWidth={1} onClick={() => this.handleOFleetClick(320,360)}/>
                    <Rect x={320} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.O320_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(320,400)}/>

                    <Rect x={360} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.O360_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,0)}/>
                    <Rect x={360} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.O360_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,40)}/>
                    <Rect x={360} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.O360_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,80)}/>
                    <Rect x={360} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.O360_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,120)}/>
                    <Rect x={360} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.O360_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,160)}/>
                    <Rect x={360} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.O360_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,200)}/>
                    <Rect x={360} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.O360_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,240)}/>
                    <Rect x={360} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.O360_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,280)}/>
                    <Rect x={360} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.O360_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,320)}/>
                    <Rect x={360} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.O360_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,360)}/>
                    <Rect x={360} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.O360_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(360,400)}/>

                    <Rect x={400} y={0} width={40} height={40} stroke="white" fill={this.state.isOHit.O400_0c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,0)}/>
                    <Rect x={400} y={40} width={40} height={40} stroke="white" fill={this.state.isOHit.O400_40c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,40)}/>
                    <Rect x={400} y={80} width={40} height={40} stroke="white" fill={this.state.isOHit.O400_80c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,80)}/>
                    <Rect x={400} y={120} width={40} height={40} stroke="white" fill={this.state.isOHit.O400_120c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,120)}/>
                    <Rect x={400} y={160} width={40} height={40} stroke="white" fill={this.state.isOHit.O400_160c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,160)}/>
                    <Rect x={400} y={200} width={40} height={40} stroke="white" fill={this.state.isOHit.O400_200c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,200)}/>
                    <Rect x={400} y={240} width={40} height={40} stroke="white" fill={this.state.isOHit.O400_240c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,240)}/>
                    <Rect x={400} y={280} width={40} height={40} stroke="white" fill={this.state.isOHit.O400_280c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,280)}/>
                    <Rect x={400} y={320} width={40} height={40} stroke="white" fill={this.state.isOHit.O400_320c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,320)}/>
                    <Rect x={400} y={360} width={40} height={40} stroke="white" fill={this.state.isOHit.O400_360c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,360)}/>
                    <Rect x={400} y={400} width={40} height={40} stroke="white" fill={this.state.isOHit.O400_400c} strokeWidth={1} onClick={() => this.handleOFleetClick(400,400)}/>
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
            </div>
            <div style={{marginBottom:"100px"}}></div>
        </div>
    </div>
      );
    }
  }
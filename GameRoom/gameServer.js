// probably merge this into the app.js

'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static("static")); // replace later

/// remove this once merging
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/battleshipGame.html');
})

let numPlayers = 0;
let players = [];

//potentially useful stuff in the future ///////////////////////////////////////////////////
let gameList = [];
let gameState = 0;
// something about each game as a room and have 2 sockets join that room
// so you know which game each socket emit belongs to
// E.G on server side: socket.join("Game #1")
// and on client side: socket.to("Game #1").emit("Something", might need extra info)
// I think the client emit is wrong actually



// a way to send player ships as an array for client to draw
// on the board. Should be called every time playerBoard is
// updated (i think, or maybe when a nwe ship is placed)

//io.to('playerShips').emit(ship list of the player);

// I was thinking of a way to display both all the missed shots and the hit 
// shots on the playerboard by maybe passing the player board, but that also
// depends of how we implement the player's board.
// Following line uses a 2d array of the player board

//io.to('playerHits').emit(player board);

// a way to send all the shots that the player made against the other player
// Not sure how to handle what object to send back, i think the enemy's board
// might work 

//io.to('playerShots').emit(enemy board???);

// Also, is is a way to differenciate between which socket to send to?
// like io.to('player1').to?('playerShots').emit(enemyBoard)


/* 



*/

////////////////////////////////////


/*let createGame = new function (firstId, secondId, gameName){
    let player1 = player(firstId, secondId);
    let player2 = player(secondId, firstId);
    player1.turn = 1;
    player2.turn = 0;
    players.push(player1);
    players.push(player2);
    let newGame = gameSession(player1, player2, gameName);
    gameList.push(newGame);
    io.clients[firstId].join(gameName);
    io.clients[secondId].join(gameName);
}*/

io.on("ready", function (socket) {

})

io.on("connection", function (socket) {
    console.info((new Date().toISOString()) + ": ID " + socket.id + " connected.");
    // once socked has connected, increment number of players and have socket join the game if they can

    numPlayers++;
    if (numPlayers <= 2) {
        socket.join("game");
        players.push(new player(socket.id));
        if (numPlayers < 2) {
            io.to("game").emit("message", "Waiting for all players to join");
        }
    } else {
        socket.join("full")
        io.to("full").emit("message", "game is full, try again later");
    }
    if (numPlayers >= 2) {
        io.to("game").emit("setup");
        players[0].setOpponent(players[1]);
        players[1].setOpponent(players[0]);
    }

    socket.on("place", function (type, x, y, rotated, returnStatus) {
        let player;
        let placed = false;
        players.forEach((el) => {
            if (el.socketId === socket.id) {
                player = el;
            }
        });
        if (player) {
            placed = player.placeShip(type, x, y, rotated);
            if(placed) { 
                socket.emit("displayShips", player.ships) 
                if(player.Ready() && player.opponent.Ready()) {
                    io.to("game").emit("ready");
                    players[0].turn = true;
                    io.to(players[0].socketId).emit("changeTurn", true);
                    io.to(players[1].socketId).emit("changeTurn", false);

                }
            }
        }
        return placed ? returnStatus(null) : returnStatus("Cannot Place There");
    });
    socket.on("shot", function (x, y, returnResult) {
        let player;
        players.forEach((el) => {
            if (el.socketId === socket.id) {
                player = el;
            }
        });
        if (player) {
            let hit;
            console.log(player.turn);
            if(player.turn) {
                hit = player.opponent.Hit(x, y);
                if(hit === -1) { //return [-1, "Already shot there."] 
                    returnResult(3);
                }
                socket.emit("displayShots", player.board, player.opponent.board);
                io.to(player.opponent.socketId).emit("displayShots", player.opponent.board, player.board);
                
                if(hit === 9)  {
                    socket.emit("gameOver", true, 50);
                    io.to(player.opponent.socketId).emit("gameOver", false, 25);
                }
                hit ? returnResult(1) : returnResult(2);
                io.to(player.socketId).emit("changeTurn", false);
                io.to(player.opponent.socketId).emit("changeTurn", true);
            } else {
                returnResult(4);
            }
        }
    });
});


class ship {
    constructor(shipType) {
        this.shipType = shipType;
        switch (this.shipType) {
            case "destroyer":
                this.size = 2;
                break;

            case "cruiser":
                this.size = 3;
                break;

            case "submarine":
                this.size = 3;
                break;

            case "dreadnought":
                this.size = 4;
                break;

            case "carrier":
                this.size = 5;
                break;

            default:
                this.size = 0;
                //notify error listeners TODO
                break;
        }
        this.health = this.size;
        this.placed = false;
    }
}

// maybe use this ////////////////////////
/*
class gameSession {
    constructor(player1, player2, gameId) {
        this.player1 = player1;
        this.player2 = player2;
        this.gameId = gameId;
        this.turn = 0;
        this.state = 0; // 0 - setting up, 1 - playing, 2 - game over
        
    }

    changeTurn(){
        if (turn){
            turn = 0;
        }
        else {
            turn = 1;
        }
    }

    ready(){
        if (player1.ready && player2.ready){
            state = 1;
            io.to(player1.socketId).emit("turn", "Your Turn"); 
            io.to(player2.socketId).emit("turn", "Opponent's Turn");            
        }
    }

    
    // function to check if anyone has won
    let checkWin = function (){
        if (players[0].totalHealth == 0){
            // player 1 wins
            io.to(player1.socketId).emit("win");
            io.to(player2.socketId).emit("lose");
        }
        else if (players[1].totalHealth == 0{
            // player 2 wins
            io.to(player1.socketId).emit("lose");
            io.to(player2.socketId).emit("win");
        }
    }
}

create a new game session and put it into the list

let createGame = new function (firstId, secondId, gameName){
    let player1 = player(firstId);
    let player2 = player(secondId);
    let newGame = gameSession(player1, player2, gameName);
    io.clients[firstId].join(gameName);
    io.clients[secondId].join(gameName);

}



*/
////////////////////////////////////////////

/*class gameSession {
    constructor(player1, player2, gameId) {
        this.player1 = player1;
        this.player2 = player2;
        this.gameId = gameId;
        this.turn = true; // true - player1's turn, false - player2's turn
        this.state = 0; // 0 - setting up, 1 - playing, 2 - game over    
    }

    changeTurn(){
        this.turn = !this.turn;
    }
}*/

class player {
    constructor(socketId) {
        this.socketId = socketId;
        this.ships = {
            carriers: [new ship("carrier")],
            dreadnoughts: [new ship("dreadnought")],
            submarines: [new ship("submarine"), new ship("submarine")],
            cruisers: [new ship("cruiser"), new ship("cruiser")],
            destroyers: [new ship("destroyer"), new ship("destroyer"), new ship("destroyer")]
        }
        this.health = ((ships) => {
            let health = 0;
            for(let key in ships) {
                if(ships.hasOwnProperty(key)) {
                    ships[key].forEach((ship) => {
                        health += ship.size;
                    });
                }
            }
            return health;
        })(this.ships);
        this.ready = false;
        this.turn = false;
        this.board = Array(10).fill().map(() => Array(10).fill(1));
    }

    placeShip(type, x, y, rotated) {
        // x = row, y = column
        // rotated: 0 - horizontal, 1 - vertical
        // received x is treated as leftmost if horizontal, y is bottom if vertical
        // 1 - empty and unsearched, 2 - undamaged ship, -1 empty and searched, -2 - damaged ship
        let placed = false;
        let shipsArray = [];
        switch (type) {
            case "destroyer":
                shipsArray = this.ships.destroyers;
                break;
            case "cruiser":
                shipsArray = this.ships.cruisers;
                break;
            case "submarine":
                shipsArray = this.ships.submarines;
                break;
            case "dreadnought":
                shipsArray = this.ships.dreadnoughts;
                break;
            case "carrier":
                shipsArray = this.ships.carriers;
                break;
        }
        shipsArray.forEach((ship) => {
            if (!ship.placed) {
                if (this.canPlace(ship.size, x, y, rotated, this.board)) {
                    this.Place(ship.size, x, y, rotated, this.board);
                    ship.x = x;
                    ship.y = y;
                    ship.placed = true;
                    placed = true;
                    ship.rotated = rotated;
                    return true;
                }
            }
        });
        return placed;
    }

    canPlace(size, x, y, rotated, board) {
        if (rotated) {
            if ((x + 1) - size < 0) {
                return false;
            } else {
                for (let i = x; i >= (x + 1) - size; i--) {
                    if (board[i][y] != 1) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            if (y + (size - 1) > 9) {
                return false;
            } else {
                for (let i = y; i < y + (size - 1); i++) {
                    if (board[x][i] != 1) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    Place(size, x, y, rotated, board) {
        if (rotated) {
            for (let i = x; i >= (x + 1) - size; i--) {
                board[i][y] = 2;
            }
        } else {
            for (let i = y; i <= y + (size - 1); i++) {
                board[x][i] = 2;
            }
        }
    }

    setOpponent(opponent) {
        this.opponent = opponent;
    }

    Hit(x, y) {
        console.log(x, y)
        if(this.board[x][y] < 0) {
            return -1
        }
        this.opponent.turn = false;
        this.turn = true;
        this.board[x][y] *= -1;
        if(this.board[x][y] === -2) {
            this.health -= 1;
            if (this.health === 0) {
                return 9;
            }
            return true;
        }
        return false;
    }

    Ready() {
        let isReady = true;
        for(let key in this.ships) {
            if(this.ships.hasOwnProperty(key)) {
                this.ships[key].forEach((ship) => {
                    if (!ship.placed) {
                        isReady = false;
                        return;
                    }
                })
            }
        }
        this.ready = isReady;
        return isReady;
    }

}

http.listen(3000, function () {
    console.log("listening on *:3000");
});

// TO-DO: SHOT, GAME SESSION
// FUTURE: DISCONNECT
// FUTURE FUTURE: SCALE TO LOBBIES
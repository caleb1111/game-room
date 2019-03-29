const crypto = require('crypto');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
var server = http.listen(5000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
const io = require('socket.io').listen(server);
io.origins(['http://localhost:3000']);
const cors = require('cors');
let MongoClient = require('mongodb').MongoClient;
const validator = require("validator");

var db;
MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydb", { useNewUrlParser: true }, function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

  // Save database object from the callback for reuse.
    db = client.db();
    // Initialize the app.
});

let User = function(id, salt, hash, display){
    this._id = id;
    this.salt = salt;
    this.hash = hash;
    this.picture = 0;
    this.friends = [];
    this.display = display;
    this.coins = 0;
    this.win = 0;
    this.loss = 0;
    this.items = [];
    this.socket = 0;
    this.roomId = 0;
};

let Item = function(name, price, picture){
    this.name = name;
    this.price = price;
    this.picture = picture;
};

let multer  = require('multer');
let upload = multer({ dest: 'uploads/' });
let fs = require('file-system');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const session = require('express-session');
app.use(session({
    secret: 'very secret very secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: false, // key
        maxAge: null
    }
}));

const cookie = require('cookie');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

function generateSalt (){
    return crypto.randomBytes(16).toString('base64');
}

function generateHash (password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}



let corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'GameRoomUI/game-room/build')));


app.use(function(req, res, next){
    req.user = ('user' in req.session)? req.session.user : null;
    let username = (req.user)? req.user._id : '';
    res.setHeader('Set-Cookie', cookie.serialize('username', username, {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    next();
});

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});


var checkUsername = function(req, res, next) {
    if (!validator.isAlphanumeric(req.body.username)) return res.status(400).end("bad input");
    next();
};

var checkId = function(req, res, next) {
    if (!validator.isAlphanumeric(req.params.id)) return res.status(400).end("bad input");
    next();
};

class player {
    constructor(socketId, lobbyId) {
        this.socketId = socketId;
        this.lobbyId = lobbyId;
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
        this.finished = false;
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

    Finished() {
        let isFinished = true;
        for(let key in this.ships) {
            if(this.ships.hasOwnProperty(key)) {
                this.ships[key].forEach((ship) => {
                    if (!ship.placed) {
                        isFinished = false;
                        return;
                    }
                })
            }
        }
        this.finished = isFinished;
        return isFinished;
    }

}

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

class gameSession {
    constructor(id){
        this.id = id;
        this.numPlayers = 0;
        this.player1 = null;
        this.player2 = null;
        this.p1Ready = false;
        this.p2Ready = false;
    }
    addPlayer(player) {
        switch (this.numPlayers){
        case 0:
            this.player1 = player;
            this.numPlayers++;
            return 1;
            break;
        case 1:
            this.player2 = player;
            this.numPlayers++;
            return 2;
            break;
        default:
            return 0;
        }
    }
    reset() {
        this.numPlayers = 0;
        this.player1 = null;
        this.player2 = null;
        this.p1Ready = false;
        this.p2Ready = false;
    }
}

let users = [];
const gameSessions = Array(0);
for(let i = 1; i < 10; i++) {
    gameSessions.push(new gameSession(i))
};

io.on("connection", function (socket) {
    // users.push(socket);
    // var myquery = { _id: req.user._id };
    // var newvalues = { $set: {socket: socket} };
    // db.getCollection("users").updateOne(myquery, newvalues, function(err, res) {
    //     if (err) throw err;
    //     db.close();
    // });

    socket.on("updateCoins", function(coin){
        myquery = { socket: socket.id};
        newvalues = { $inc: {coins: coin}};
        db.collection('users').updateOne(myquery, newvalues, function(err, res){
            if (err) throw err;
        });
    });

    socket.on("sendMessage", function(data){
        io.emit('receiveMessage', data);
    });

    socket.on("disconnect", function(){
        let index = users.indexOf(socket);
        users.splice(index, 1);
    });

    socket.on("joinSession", function(lobbyId) {
        let joined = false;
        if(gameSessions[lobbyId].numPlayers < 2) {
            joined = gameSessions[lobbyId].addPlayer(new player(socket.id, lobbyId));
            socket.join("lobby"+lobbyId);
        }
        
        socket.emit("joined", joidned, lobbyId); // is joined a boolean or an int?
    });

    /*
    socket.on("joined", function(result, lobbyId){
        if (result){
            lobbyId = lobbyId;
            sessionStorage.setItem("lobbyId", lobbyId);
        }    
    });

    readyButton.addEventListener("click", function(){
        socket.emit("ready", lobbyId);
        // change something to indicate player is ready
    });

    leaveRoom.addEventListener("click", function(){
        lobbyId = null;
        // remove player from list
    });
    
    */

    socket.on("ready", function(lobbyId) {
        const session = gameSessions[lobbyId];
        if(session){
            if(session.player2){
                if(session.player2.id === socket.id) {
                    session.p2Ready = true;
                }
                if(session.p1Ready && session.p2Ready) {
                    session.player1.setOpponent(session.player2);
                    session.player2.setOpponent(session.player1);
                    io.to("lobby"+lobbyId).emit("gameStart", lobbyId);
                }
            } else if(session.player1){
                if(session.player1.socketId === socket.id) {
                    session.p1Ready = true;
                }
            }
        }
    });

    socket.on("place", (lobbyId, type, x, y, rotated, returnStatus) => {
        let player;
        const session = gameSessions[lobbyId];
        let placed = false;
        if(session) {
            if(session.player1.socketId === socket.id) {
                player = session.player1.socketId
            } else if (session.player2.socketId === socket.id) {
                player = session.player2.socketId;
            }
        } else {
            returnResult(-1);
        }
        if(player) {
            placed = player.placeShip(type, x, y, rotated);
            if(placed) {
                socket.emit("displayShips", player.ships);
                if(player.Finished() && player.opponent.Finished()) {
                    io.to("lobby"+lobbyId).emit("finished");
                    session.player1.turn = true;
                    io.to(session.player1.socketId).emit("changeTurn", true);
                    io.to(session.player2.socketId).emit("changeTurn", false);
                }
            }
        } else {
            returnStatus(-1);
        }
        return placed ? returnStatus(null) : returnStatus("Cannot Place There");
    });

    socket.on("shot", (lobbyId, x, y, returnResult) => {
        let player;
        const session = gameSessions[lobbyId];
        let errored = false;
        if(session) {
            if(session.player1.socketId === socket.id) {
                player = session.player1.socketId
            } else if (session.player2.socketId === socket.id) {
                player = session.player2.socketId;
            }
        } else {
            returnResult(-1);
        }
        if(player) {
            let hit;
            if(player.turn) {
                hit = player.opponent.Hit(x, y);
                if(hit === -1) { //return [-1, "Already shot there."] 
                    returnResult(3);
                    errored = true;
                }
                socket.emit("displayShots", player.board, player.opponent.board);
                io.to(player.opponent.socketId).emit("displayShots", player.opponent.board, player.board);
                
                if(hit === 9)  {
                    socket.emit("gameOver", true, 50);
                    myquery = { socket: socket.id};
                    newvalues = { $inc: {win: 1}};
                    db.collection('users').updateOne(myquery, newvalues, function(err, res){
                        if (err) throw err;
                    });
                    io.to(player.opponent.socketId).emit("gameOver", false, 25);
                    myquery = { socket: player.opponent.socketId};
                    newvalues = { $inc: {loss: 1}};
                    db.collection('users').updateOne(myquery, newvalues, function(err, res){
                        if (err) throw err;
                    });
                    gameList[lobby].reset();
                }
                hit ? returnResult(1) : returnResult(2);
                if (!errored){
                    io.to(player.socketId).emit("changeTurn", false);
                    io.to(player.opponent.socketId).emit("changeTurn", true);
                }  
            } else {
                returnResult(4);
            }
        } else {
            returnResult(-1);
        }
    });

});


// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signup/
app.post('/signup/', checkUsername, (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    db.collection("users").findOne({_id: username}, function(err, user) {
        if (err) return res.status(500).end(err);
        if (user) return res.status(409).end("username " + username + " already exists");
        var salt = generateSalt();
        var hash = generateHash(password, salt);
        let newUser = new User(username, salt, hash, 0);
        db.collection("users").insertOne(newUser, function(err, result) {
            if (err) return res.status(500).end(err);
            db.collection("loggedUsers").insertOne(newUser, function(err, result) {
                if (err) return res.status(500).end(err);
                res.setHeader('Set-Cookie', cookie.serialize('username', newUser._id, {
                    path : '/', 
                    maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                    sameSite: true,
                    secure: true
                }));
                req.session.user = newUser;
                res.json(newUser);
            });
        });
    });
});

// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signin/
app.post('/signin/', checkUsername, (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    // retrieve user from the database
    //res.setHeader('Access-Control-Allow-Credentials', 'true')
    db.collection("users").findOne({ _id: username }, function(err, user) {
        if (err) return res.status(500).end(err);
        if (!user) return res.status(404).end("username " + username + " does not exists");
        if (user.hash !== generateHash(password, user.salt)) return res.status(401).end("access denied"); // invalid password
        db.collection("loggedUsers").findOne({ _id:username  }, function(err, loggedUser){
            if (loggedUser) return res.status(409).end("username " + username + " already signed in");
            db.collection("loggedUsers").insertOne(user, function(err, result) {
                if (err) return res.status(500).end(err);
                res.setHeader('Set-Cookie', cookie.serialize('username', user._id, {
                    path : '/', 
                    maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                    sameSite: true,
                    secure: true
                }));
                req.session.user = user;
                res.json(user);
            });
        })
        
    });
});

// curl -b cookie.txt -c cookie.txt localhost:3000/signout/
app.get('/signout/', function (req, res, next) {
    let myquery = { _id: req.user._id };
    db.collection("loggedUsers").deleteOne(myquery, function(err, obj) {
        if (err) return res.status(500).end(err);
        console.log("removed user: ", obj);
    });
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
          sameSite: true,
          secure: true
    }));
    res.json("user successfully logged out")
});

app.patch('/api/user/:userId/socket', (req, res) => {
    let userId = req.params.userId;
    let socket = req.body.socket;
    let myquery = { _id: userId };
    let newvalues = { $set: { socket: socket} };
    db.collection('users').updateOne(myquery, newvalues, function(err, result){
        if (err) return res.status(500).end(err);
        res.json("suceesfully updated socket id");
    });
})

app.get("/api/user/loggedUsers", (req, res) => {
    db.collection("loggedUsers").find({}).toArray(function(err, result){
        if (err) return res.status(500).end(err);
        res.json(result);
    })
})

// return picture
// return friends
// return win loss/ items / rank
app.patch('/api/user/picture', checkId, upload.single('picture'), (req, res) => {
    
})

app.get('/api/currUser/', (req, res) => {
    res.json(req.user);
})

app.get('/api/user/:userId/picture', checkId, (req, res) => {
    db.collection("users").findOne({_id: req.params.userId}, function(err, user) {
        if (err) return res.status(500).end(err);
        if (!user) return res.status(404).end('Image id ' + req.params.imageid + ' does not exists');
        let file = user.picture;
        res.setHeader('Content-Type', file.mimetype);
        res.sendFile(path.join(__dirname, file.path));
    });
});

app.get('/api/user/friends', checkId, (req, res) => {
    res.json(req.user.friends);
});

app.patch("/api/user/:friendId", checkId, (req, res) => {
    let friendId = req.params.friendId;
    let myquery = { _id: req.user._id };
    let friendList = req.user.friends;
    console.log("old friendlist: ", friendList);
    friendList = friendList.push(friendId);
    console.log("new friend list: ", req.user.friends);
    let newvalues = { $set: { friends: friendList } };
    db.collection('users').updateOne(myquery, newvalues, function(err, result){
        if (err) return res.status(500).end(err);
        req.session.user = req.user;
        res.json("suceesfully updated friend list");
    });
})

app.patch("/api/user/unfriend/:friendId", (req, res) =>{
    let friendId = req.params.friendId;
    let friendList = req.user.friends;
    let index = friendList.indexOf(friendId);
    friendList.splice(index, 1);
    let myquery = { _id: req.user._id };
    let newvalues = { $set: { friends: friendList } }
    db.collection("users").updateOne(myquery, newvalues, function(err, result){
        if (err) return res.status(500).end(err);
        req.session.user = req.user;
        res.json("successfully removed friend: " + friendId);
    })
})

app.patch("/api/user/:roomId", (req, res) => {
    let roomId = req.params.roomId;
    let myquery = { _id: req.user._id };
    let newvalues = { $set: {roomId: roomId} };
    db.collection('users').updateOne(myquery, newvalues, function(err, result){
        if (err) return res.status(500).end(err);
        req.user.roomId = roomId;
        req.session.user = req.user;
        res.json("suceesfully updated friend list");
    });
})

app.get("/api/user/getOpponent", (req, res) =>{
    let roomId = req.user.roomId;
    let myquery = { _id: { $ne: req.user._id }, roomId: roomId };
    db.collection("users").findOne(myquery, function(err, user){
        if (err) return res.status(500).end(err);
        res.json(user);
    })
})

app.patch("/api/user/chargeCoins", (req, res) => {
    let myquery = { _id: req.user._id };
    let newvalues = { $inc: {coins: 5000} };
    db.collection("users").updateOne(myquery, newvalues, function(err, result){
        if (err) return res.status(500).end(err);
        res.json("You have successfully charged 5000 coins to your account");
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname = '/GameRoomUI/game-room/build/index.html'));
});
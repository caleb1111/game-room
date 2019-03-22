const crypto = require('crypto');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let MongoClient = require('mongodb').MongoClient;
const sanitize = require('validator').sanitize;

var db;
MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydb", { useNewUrlParser: true }, function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

  // Save database object from the callback for reuse.
    db = client.db();
    // Initialize the app.
    var server = app.listen(5000, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

let User = function(id, salt, hash, display){
    this._id = id;
    this.salt = salt;
    this.hash = hash;
    this.picture = defaultPic;
    this.friends = [];
    this.display = display;
    this.coins = 0;
    this.win = 0;
    this.loss = 0;
    this.items = [];
    this.socket = 0;
};

let Item = function(name, price, picture){
    this.name = name;
    this.price = price;
    this.picture = picture;
};

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let multer  = require('multer');
let upload = multer({ dest: 'uploads/' });

let fs = require('file-system');

const cookie = require('cookie');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const session = require('express-session');
app.use(session({
    secret: 'very secret secret',
    resave: false,
    saveUninitialized: true,
}));

function generateSalt (){
    return crypto.randomBytes(16).toString('base64');
}

function generateHash (password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}

app.use(function(req, res, next){
    req.user = ('user' in req.session)? req.session.user : null;
    let username = (req.user)? req.user._id : '';
    res.setHeader('Set-Cookie', cookie.serialize('username', username, {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    next();
});

app.use(express.static(path.join(__dirname, 'GameRoomUI/game-room/build')));

app.use(function (req, res, next){
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

let users = []

io.on("connection", function (socket) {
    users.push(socket);
    var myquery = { _id: req.user._id };
    var newvalues = { $set: {socket: socket} };
    db.getCollection("users").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        db.close();
    });

    socket.on("updateCoins", function(coin){
        myquery = { socket: socket.id};
        newvalues = { $inc: {coins: coin}};
        db.getCollection('users').updateOne(myquery, newvalues, function(err, res){
            if (err) throw err;
            db.close();
        })
    })

    socket.on("sendMessage", function(data){
        data.message = sanitize(data.message).xss();
        io.emit('receiveMessage', data);
    })

    socket.on('disconnect', function(){
        let index = users.indexOf(socket);
        users.splice(index, 1);
    })
});

// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signup/
app.post('/signup/', checkUsername, (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    db.getCollection("users").findOne({_id: username}, function(err, user) {
        if (err) return res.status(500).end(err);
        if (user) return res.status(409).end("username " + username + " already exists");
        var salt = generateSalt();
        var hash = generateHash(password, salt);
        let newUser = new User(username, salt, hash, 0);
        dbo.collection("users").insertOne(newUser, function(err, res) {
            if (err) return res.status(500).end(err);
            res.json("user " + username + " signed up");
            db.close();
        });
    });
});

// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signin/
app.post('/signin/', checkUsername, (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    // retrieve user from the database
    db.getCollection("users").findOne({_id: username}, function(err, user) {
        if (err) return res.status(500).end(err);
        if (!user) return res.status(409).end("username " + username + " already exists");
        if (user.hash !== generateHash(password, user.salt)) return res.status(401).end("access denied"); // invalid password
        dbo.collection("loggedUsers").insertOne(user, function(err, res) {
            if (err) return res.status(500).end(err);
            res.setHeader('Set-Cookie', cookie.serialize('username', user._id, {
                path : '/', 
                maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                sameSite: true,
                secure: true
            }));
            res.json("user " + username + " signed in");
            db.close();
        });
    });
});

// curl -b cookie.txt -c cookie.txt localhost:3000/signout/
app.get('/signout/', function (req, res, next) {
    req.user.socket.disconnect();
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
          sameSite: true,
          secure: true
    }));
    res.json("user successfully logged out")
});

// return picture
// return friends
// return win loss/ items / rank
app.patch('/api/user/:userId/picture', checkId, upload.single('picture'), (req, res) => {
    
})

app.get('/api/currUser/', (req, res) => {
    res.json(req.user);
})

app.get('/api/user/:userId/picture', checkId, (req, res) => {
    db.getCollection("users").findOne({_id: req.params.userId}, function(err, user) {
        if (err) return res.status(500).end(err);
        if (!user) return res.status(404).end('Image id ' + req.params.imageid + ' does not exists');
        let file = user.picture;
        res.setHeader('Content-Type', file.mimetype);
        res.sendFile(path.join(__dirname, file.path));
        db.close();
    });
});

app.get('/api/user/:userId/friends', checkId, (req, res) => {
    db.getCollection("users").findOne({_id: req.params.userId}, function(err, user) {
        if (err) return res.status(500).end(err);
        if (!user) return res.status(404).end('Image id ' + req.params.imageid + ' does not exists');
        let friends = user.friends;
        res.json(friends);
        db.close();
    });
      
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname = '/GameRoomUI/game-room/build/index.html'));
});
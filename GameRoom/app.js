const crypto = require('crypto');
const path = require('path');
const express = require('express');
const app = express();

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("users", function(err, res) {
      if (err) throw err;
      console.log("User collection created!");
      db.close();
    });
    dbo.createCollection("items", function(err, res) {
        if (err) throw err;
        console.log("Item collection created!");
        db.close();
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
}



let Item = function(name, price, picture){
    this.name = name;
    this.price = price;
    this.picture = picture;
}

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

app.use(express.static('frontend'));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

var checkUsername = function(req, res, next) {
    if (!validator.isAlphanumeric(req.body.username)) return res.status(400).end("bad input");
    next();
};

var sanitizeContent = function(req, res, next) {
    req.body.content = validator.escape(req.body.content);
    next();
}

var checkId = function(req, res, next) {
    if (!validator.isAlphanumeric(req.params.id)) return res.status(400).end("bad input");
    next();
};

// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signup/
app.post('/signup/', checkUsername, function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");
        dbo.collection("users").findOne({_id: username}, function(err, user) {
            if (err) return res.status(500).end(err);
            if (user) return res.status(409).end("username " + username + " already exists");
            var salt = generateSalt();
            var hash = generateHash(password, salt);
            let user = new User(username, salt, hash, 0);
            db.close();
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                dbo.collection("users").insertOne(user, function(err, res) {
                    if (err) return res.status(500).end(err);
                    db.close();
                    return res.json("user " + username + " signed up");
                });
            });
        });
    });
});

// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signin/
app.post('/signin/', checkUsername, function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    // retrieve user from the database
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");
        dbo.collection("users").findOne({_id: username}, function(err, user) {
            if (err) return res.status(500).end(err);
            if (!user) return res.status(409).end("username " + username + " already exists");
            if (user.hash !== generateHash(password, user.salt)) return res.status(401).end("access denied"); // invalid password
            db.close();
            res.setHeader('Set-Cookie', cookie.serialize('username', user._id, {
                path : '/', 
                maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                sameSite: true,
                secure: true
            }));
            return res.json("user " + username + " signed in");
});

// curl -b cookie.txt -c cookie.txt localhost:3000/signout/
app.get('/signout/', function (req, res, next) {
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
          sameSite: true,
          secure: true
    }));
    res.redirect('/');
});


// return picture
// return friends
// return win loss/ items / rank

app.get('/api/user/:userId/picture', checkId, function(req, res, next){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");
        dbo.collection("users").findOne({_id: req.params.userId}, function(err, user) {
            if (err) return res.status(500).end(err);
            if (!user) return res.status(404).end('Image id ' + req.params.imageid + ' does not exists');
            let file = user.picture;
            res.setHeader('Content-Type', file.mimetype);
            res.sendFile(path.join(__dirname, file.path));
            db.close();
        });
      });
})

app.get('/api/user/:userId/friends', checkId, function(req, res, next){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");
        dbo.collection("users").findOne({_id: req.params.userId}, function(err, user) {
            if (err) return res.status(500).end(err);
            if (!user) return res.status(404).end('Image id ' + req.params.imageid + ' does not exists');
            let friends = user.friends;
            db.close();
            return res.json(friends);
        });
      });
})

const https = require('https');
const PORT = 3000;
var privateKey = fs.readFileSync( 'server.key' );
var certificate = fs.readFileSync( 'server.crt' );
var config = {
        key: privateKey,
        cert: certificate
};

https.createServer(config, app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTPS server on https://localhost:%s", PORT);
});
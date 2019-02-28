// probably merge this into the app.js

'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static("static")); // replace later

let gameId = 0;
const players = {};

io.on('connection', function (socket){
    console.log((new Date().toISOString()) + ": ID" + socket.id + " connected." );
    users[socket.id] = {
        playing: null,
        player: null
    };

    socket.join('waiting room');

    socket.on('shot', function(position) {

    });

});
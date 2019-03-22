"use strict";


(function () {

    let socket = io();
    let setupMode = false;
    let rotate = document.getElementById("rotateShips");
    let playerGrid = document.getElementById("playerBoard");
    let opponentGrid = document.getElementById("opponentBoard");
    let playerBoard = null;
    let opponentBoard = null;
    let destroyerSelect = document.getElementById("destroyerSelect");
    let submarineSelect = document.getElementById("submarineSelect");
    let cruiserSelect = document.getElementById("cruiserSelect");
    let dreadnoughtSelect = document.getElementById("dreadnoughtSelect");
    let carrierSelect = document.getElementById("carrierSelect");
    let status = document.getElementById("status");
    let playerDraw = playerGrid.getContext('2d');
    let shipArray = null;
    let ending = document.getElementById("ending");
    let returnButton = document.getElementById("returnButton");
    let ready = false;
    let winner = document.getElementById("result");
    let opponentDraw = opponentGrid.getContext('2d');
    let logs = document.getElementById("textLog");
    let drawHeight = playerGrid.height;
    let drawWidth = playerGrid.width;
    let selectedShip = "";
    let gained = document.getElementById("earned");
    let rotated = 1;
    let prevX = 0;
    let prevY = 0;
    let xOpp = 0;
    let yOpp = 0;
    let line = null;
    let remainingDeployment = [1,1,2,2,3]; //5,4,3,3,2
    let lobbyId = sessionStorage.getItem("lobbyId");
    playerDraw.fillStyle = "#d4d4d4";

    let remainingFleet = function (position){
        let carrierRemaining = document.getElementById("carrierRemaining");
        let dreadnoughtRemaining = document.getElementById("dreadnoughtRemaining");
        let submarineRemaining = document.getElementById("submarineRemaining");
        let cruiserRemaining = document.getElementById("cruiserRemaining");
        let destroyerRemaining = document.getElementById("destroyerRemaining");
        console.log("position" + position);
        if (position != null){
            remainingDeployment[position] = remainingDeployment[position] - 1;
        }
        carrierRemaining.innerHTML = "Remaining: " + remainingDeployment[0];
        dreadnoughtRemaining.innerHTML = "Remaining: " + remainingDeployment[1];
        submarineRemaining.innerHTML = "Remaining: " + remainingDeployment[2];
        cruiserRemaining.innerHTML = "Remaining: " + remainingDeployment[3];
        destroyerRemaining.innerHTML = "Remaining: " + remainingDeployment[4]; 
    }

    let createGrid = function () {
        for (let i = 0; i < 10; i++) {
            // draw rectangles with size - vertical: 40x400 and horizontal: 400x40
            //vertical
            playerDraw.rect(i * drawWidth / 10, 0, drawWidth / 10, drawHeight);
            opponentDraw.rect(i * drawWidth / 10, 0, drawWidth / 10, drawHeight);
            playerDraw.stroke();
            opponentDraw.stroke();

            //horizontal
            playerDraw.rect(0, i * drawHeight / 10, drawWidth, drawHeight / 10);
            opponentDraw.rect(0, i * drawHeight / 10, drawWidth, drawHeight / 10);

            playerDraw.stroke();
            opponentDraw.stroke();

        }
    }

    let writeLog = function (msg, date, type = 0){
        let newMessage = document.createElement("div");
        let result = "[" + date + "] " + msg;
        newMessage.innerHTML = result;
        if (type){
            newMessage.style.color = "lightcoral";
        }
        let divider = document.createElement("hr");
        logs.append(newMessage);
        logs.append(divider);
    }


    let displayShips = function (ships){
        shipArray = ships;
        let img = null;
        let yOffset = 0;
        for (let key in shipArray){
            if (ships.hasOwnProperty(key)){
                ships[key].forEach(function (ship){
                    switch (ship.shipType) {
                        case "destroyer":
                        if (ship.placed){
                            if (ship.rotated){
                                yOffset = 40;
                                img = document.getElementById("destroyerPlace");
                            }
                            else{
                                yOffset = 0;
                                img = document.getElementById("destroyerHPlace");
                            }
                            
                                playerDraw.drawImage(img, ship.y*40, (ship.x*40-yOffset));
                            
                        }
                            break;
            
                        case "cruiser":
                        if (ship.placed){
                            if (ship.rotated){
                                yOffset = 80;
                                img = document.getElementById("cruiserPlace");
                            }
                            else{
                                yOffset = 0;
                                img = document.getElementById("cruiserHPlace");
                            }
                            
                            playerDraw.drawImage(img, ship.y*40, (ship.x*40-yOffset));
                            
                        }
                            break;
            
                        case "submarine":
                        if (ship.placed){
                            if (ship.rotated){
                                yOffset = 80;
                                img = document.getElementById("submarinePlace");
                            }
                            else{
                                yOffset = 0;
                                img = document.getElementById("submarineHPlace");
                            }
                                playerDraw.drawImage(img, ship.y*40, (ship.x*40-yOffset));
                        }
                            break;
            
                        case "dreadnought":
                        if (ship.placed){
                            if (ship.rotated){
                                yOffset = 120;
                                img = document.getElementById("dreadnoughtPlace");
                            }
                            else{
                                yOffset = 0;
                                img = document.getElementById("dreadnoughtHPlace");
                            }
                                playerDraw.drawImage(img, ship.y*40, (ship.x*40-yOffset));
                        }
                            break;
            
                        case "carrier":
                        if (ship.placed){
                            if (ship.rotated){
                                yOffset = 160;
                                img = document.getElementById("carrierPlace");
                            }
                            else{
                                yOffset = 0;
                                img = document.getElementById("carrierHPlace");
                            }
                                playerDraw.drawImage(img, ship.y*40, (ship.x*40-yOffset));
                        }
                            break;
            
                        default:
                            //this.size = 0;
                            //notify error listeners TODO
                            console.log("not ok");
                            break;
                    }
                });
            }
        }
        
    }


    /*Back up for draw ships 
    
    
    let displayShips = function (ships){

        shipArray = ships;
        let img = null;
        let yOffset = 0;
        for (let key in ships){
            if (ships.hasOwnProperty(key)){
                ships[key].forEach(function (ship){
                    switch (ship.shipType) {
                        case "destroyer":
                            img = document.getElementById("destroyerImg");
                            if (ship.rotated){
                                yOffset = 0;
                            }
                            else{
                                yOffset = 40;
                            }
                            playerDraw.drawImage(img, ship.y*40, (ship.x*40-yOffset));
                            break;
            
                        case "cruiser":
                            img = document.getElementById("cruiserImg");
                            if (ship.rotated){
                                yOffset = 0;
                            }
                            else{
                                yOffset = 80;
                            }
                            playerDraw.drawImage(img, ship.y*40, (ship.x*40-yOffset));
                            break;
            
                        case "submarine":
                            img = document.getElementById("submarineImg");
                            if (ship.rotated){
                                yOffset = 0;
                            }
                            else{
                                yOffset = 80;
                            }
                            playerDraw.drawImage(img, ship.y*40, (ship.x*40-yOffset));
                            break;
            
                        case "dreadnought":
                            img = document.getElementById("dreadnoughtImg");
                            if (ship.rotated){
                                yOffset = 0;
                            }
                            else{
                                yOffset = 120;
                            }
                            playerDraw.drawImage(img, ship.y*40, (ship.x*40-yOffset));
                            break;
            
                        case "carrier":
                            img = document.getElementById("carrierImg");
                            if (ship.rotated){
                                yOffset = 0;
                            }
                            else{
                                yOffset = 160;
                            }
                            playerDraw.drawImage(img, ship.y*40, (ship.x*40-yOffset));
                            break;
            
                        default:
                            //this.size = 0;
                            //notify error listeners TODO
                            break;
                    }
                });
            }
        }
        
    }
*/
    let redrawBoard = function (){
        displayShips(shipArray);
        if (playerBoard != null && opponentBoard != null){
            displayShots(playerBoard);
            displayFired(opponentBoard);
        }
    }

    let displayShots = function (pBoard){
        // 1 - empty and unsearched, 2 - undamaged ship, -1 empty and searched, -2 - damaged ship
        playerBoard = pBoard;
        let hit = null;
        hit = document.getElementById("hit");
        let miss = null;
        miss = document.getElementById("miss");

        let x = 0;
        let y = 0;
        pBoard.forEach(function (row){
            row.forEach(function (square){
                switch (square){
                    case -1: //miss
                        playerDraw.drawImage(miss, y, x);
                        break;
                    case -2:
                        playerDraw.drawImage(hit, y, x);
                        break;
                }
                y = y + 40;
            });
            y = 0;
            x = x + 40;
        });
    }

    let displayFired = function (oBoard){
        // 1 - empty and unsearched, 2 - undamaged ship, -1 empty and searched, -2 - damaged ship
        opponentBoard = oBoard; 
        let hit = null;
        hit = document.getElementById("hit");
        let miss = null;
        miss = document.getElementById("miss");

        let x = 0;
        let y = 0;
        oBoard.forEach(function (row){
            row.forEach(function (square){
                switch (square){
                    case -1: //miss
                        opponentDraw.drawImage(miss, y, x);
                        break;
                    case -2:
                        opponentDraw.drawImage(hit, y, x);
                        break;
                }
                y = y + 40;
            });
            y = 0;
            x = x + 40;
        });
    }
    

    let shoot = function(x, y){
        socket.emit("shot",lobbyId, x, y, function(result){
            if (result == -1){ // something very bad went wrong need to redirect back to lobby
                ///////////////////////////////////////////////////////////////////////////////// caleb, please redirect back lobby
            }
            else if (result == 1){
                // success shot was a hit
                let d = new Date().toLocaleTimeString();
                writeLog("The Shot Hit", d);
            }
            else if (result == 2){
                // miss shot
                let d = new Date().toLocaleTimeString();
                writeLog("The Shot Missed", d);
            }
            else if (result == 3){
                // already shot there
                onError("Already shot there, Pick something else");
            }
            else if (result == 4){
                // not your turn
                onError("Not your turn, please wait");
            }
        });
    }


    let placeShip = function (x, y){
        let size = 0;
        let valid = false;
        let position = 0;
        switch(selectedShip){
            case "destroyer":
                if (remainingDeployment[4] > 0){
                    valid = true;
                    size = 2;
                    position = 4;
                }
                break;

            case "cruiser":
                if (remainingDeployment[3] > 0){
                    valid = true;
                    size = 3;
                    position = 3;
                }
                break;
            
            case "submarine":
                if (remainingDeployment[2] > 0){
                    valid = true;
                    size = 3;
                    position = 2;
                }
                break;

            case "dreadnought":
                if (remainingDeployment[1] > 0){
                    valid = true;
                    size = 4;
                    position = 1;
                }
                break;

            case "carrier":
                if (remainingDeployment[0] > 0){
                    valid = true;
                    size = 5;
                    position = 0;
                }
                break;

            default:
                size = 0;
                break;
        }

        if (!rotated){
            if (x + size - 1 >= 10){ // ship is off the board from the right side
                onError("Cannot place ship off side of board");
            }
            else if (valid){
                socket.emit("place", lobbyId, selectedShip, y , x, rotated, function(err){
                    if (err === -1){ // very bad, never supposed to happen
                        //redirect CHANGE THIS LATER /////////////////////////////////////////////////////////////////////////////////// Caleb maybe if u see this, redirect to lobby
                        //window.location.replace("");
                    }
                    else if (err) onError(err);
                    else{
                        remainingFleet(position);
                    }
                });
            }
            else{
                onError("Cannot place that");
            }
        }
        else{
            if (y - size + 1 < 0){
                onError("Cannot place ship off top of board");
            }
            else if (valid){
                socket.emit("place", lobbyId, selectedShip, y , x, rotated, function(err){
                    if (err) onError(err);
                    else{
                        remainingFleet(position);
                    }
                });  
            }
            else{
                onError("Cannot place that");
            }
        }
        selectedShip = "";
        selectorDisplay(); 
    }

    let drawSelected = function (x, y){
        x = x * 40;
        y = y * 40;
        
        playerDraw.fillRect(x+1, y+1, 38, 38);
    }

    

    let selectorDisplay = function(){
        switch(selectedShip){
            case "destroyer":
                line = document.getElementById("destroyerBar");
                line.style.display = "table";
                line = document.getElementById("carrierBar");
                line.style.display = "none";  
                line = document.getElementById("cruiserBar");
                line.style.display = "none";
                line = document.getElementById("dreadnoughtBar");
                line.style.display = "none";  
                line = document.getElementById("submarineBar");
                line.style.display = "none";  
                break;

            case "cruiser":
                line = document.getElementById("cruiserBar");
                line.style.display = "table";
                line = document.getElementById("carrierBar");
                line.style.display = "none";
                line = document.getElementById("dreadnoughtBar");
                line.style.display = "none";  
                line = document.getElementById("submarineBar");
                line.style.display = "none";  
                line = document.getElementById("destroyerBar");
                line.style.display = "none"; 
                break;
        
            
            case "submarine":
                line = document.getElementById("submarineBar");
                line.style.display = "table"
                line = document.getElementById("carrierBar");
                line.style.display = "none";  
                line = document.getElementById("cruiserBar");
                line.style.display = "none";
                line = document.getElementById("dreadnoughtBar");
                line.style.display = "none";  
                line = document.getElementById("destroyerBar");
                line.style.display = "none";  
                break;

            case "dreadnought":
                line = document.getElementById("dreadnoughtBar");
                line.style.display = "table";
                line = document.getElementById("carrierBar");
                line.style.display = "none";  
                line = document.getElementById("cruiserBar");
                line.style.display = "none";
                line = document.getElementById("submarineBar");
                line.style.display = "none";  
                line = document.getElementById("destroyerBar");
                line.style.display = "none";  
                break;

            case "carrier":
                line = document.getElementById("carrierBar");
                line.style.display = "table";
                line = document.getElementById("cruiserBar");
                line.style.display = "none";
                line = document.getElementById("dreadnoughtBar");
                line.style.display = "none";  
                line = document.getElementById("submarineBar");
                line.style.display = "none";  
                line = document.getElementById("destroyerBar");
                line.style.display = "none";  
                break;

             default:
                line = document.getElementById("carrierBar");
                line.style.display = "none";  
                line = document.getElementById("cruiserBar");
                line.style.display = "none";
                line = document.getElementById("dreadnoughtBar");
                line.style.display = "none";  
                line = document.getElementById("submarineBar");
                line.style.display = "none";  
                line = document.getElementById("destroyerBar");
                line.style.display = "none";  
            }
    }




    let onError = function(err){
        let d = new Date().toLocaleTimeString();
        writeLog(err, d, 1);
    };


    window.addEventListener('load', function () {
        createGrid();
        remainingFleet(null);
        playerGrid.addEventListener("click", function (e) {
            let bounds = playerGrid.getBoundingClientRect();
            let x = e.clientX - bounds.left;
            let y = e.clientY - bounds.top;
            let xIndex = Math.floor(x / 40);
            let yIndex = Math.floor(y / 40);
            drawSelected(xIndex, yIndex);
            if (setupMode){
                placeShip(xIndex, yIndex);
            }
           
        });

        playerGrid.addEventListener("mousemove", function (e){ // highlight the selected square
            let bounds = playerGrid.getBoundingClientRect();
            let x = e.clientX - bounds.left;
            let y = e.clientY - bounds.top;
            let xIndex = Math.floor(x / 40);
            let yIndex = Math.floor(y / 40);
            
            let selected = [xIndex, yIndex];

            if (prevX != xIndex || prevY != yIndex){
                playerDraw.fillStyle = "#f1f1f1";
                playerDraw.fillRect((prevX*40) + 1, (prevY*40) + 1, 38, 38);
                playerDraw.fillStyle = "#bad4ff";
                redrawBoard();
            }

            playerDraw.fillRect(xIndex*40+1, yIndex*40+1, 38, 38);
            
            prevX = xIndex;
            prevY = yIndex;
        });

        playerGrid.addEventListener("mouseover", function (e){
            
            let bounds = playerGrid.getBoundingClientRect();
            let x = e.clientX - bounds.left;
            let y = e.clientY - bounds.top;
            let xIndex = Math.floor(x / 40);
            let yIndex = Math.floor(y / 40);
            playerGrid.style.border = '2px solid #00eeee';
        });


        playerGrid.addEventListener("mouseout", function (e){
            playerGrid.style.border = "2px solid white";
            playerDraw.fillStyle = "#f1f1f1";
            playerDraw.fillRect((prevX*40) + 1, (prevY*40) + 1, 38, 38);
            playerDraw.fillStyle = "#bad4ff";
            redrawBoard();
        });

        opponentGrid.addEventListener("mouseout", function (e){
            opponentGrid.style.border = "2px solid white";
            opponentDraw.fillStyle = "#f1f1f1";
            opponentDraw.fillRect((xOpp*40) + 1, (yOpp*40) + 1, 38, 38);
            opponentDraw.fillStyle = "#bad4ff";
            redrawBoard();
        });

        opponentGrid.addEventListener("mouseover", function (e){
            
            let bounds = playerGrid.getBoundingClientRect();
            let x = e.clientX - bounds.left;
            let y = e.clientY - bounds.top;
            let xIndex = Math.floor(x / 40);
            let yIndex = Math.floor(y / 40);
            opponentGrid.style.border = '2px solid #ea6e4f';

        });

        opponentGrid.addEventListener("mousemove", function (e){ // highlight the selected square
            let bounds = opponentGrid.getBoundingClientRect();
            let x = e.clientX - bounds.left;
            let y = e.clientY - bounds.top;
            let xIndex = Math.floor(x / 40);
            let yIndex = Math.floor(y / 40);
            
            if (xOpp != xIndex || yOpp != yIndex){
                opponentDraw.fillStyle = "#f1f1f1";
                opponentDraw.fillRect((xOpp*40) + 1, (yOpp*40) + 1, 38, 38);
                opponentDraw.fillStyle = "#ffd4ba";
                redrawBoard();
            }

            opponentDraw.fillRect(xIndex*40+1, yIndex*40+1, 38, 38);
            
            xOpp = xIndex;
            yOpp = yIndex;
        });

        opponentGrid.addEventListener("click", function (e){
            let bounds = opponentGrid.getBoundingClientRect();
            let x = e.clientX - bounds.left;
            let y = e.clientY - bounds.top;
            let xIndex = Math.floor(x / 40);
            let yIndex = Math.floor(y / 40);
            if (setupMode && ready){
                shoot(yIndex, xIndex);
            }
            
        });

        rotate.addEventListener("click", function (e){
            let img = null;
            if (rotated){
                rotated = 0;
                img = document.getElementById("carrierImg");
                img.src = "assets/carrierH.png"
                img = document.getElementById("dreadnoughtImg");
                img.src = "assets/dreadnoughtH.png"
                img = document.getElementById("cruiserImg");
                img.src = "assets/cruiserH.png"
                img = document.getElementById("submarineImg");
                img.src = "assets/submarineH.png"
                img = document.getElementById("destroyerImg");
                img.src = "assets/destroyerH.png"
            }
            else{
                rotated = 1;
                img = document.getElementById("carrierImg");
                img.src = "assets/carrier.png"
                img = document.getElementById("dreadnoughtImg");
                img.src = "assets/dreadnought.png"
                img = document.getElementById("cruiserImg");
                img.src = "assets/cruiser.png"
                img = document.getElementById("submarineImg");
                img.src = "assets/submarine.png"
                img = document.getElementById("destroyerImg");
                img.src = "assets/destroyer.png"
            }
            
        });

        socket.on("setup", function (e){
            //updateStatus("Setting up", 3);
            setupMode = true;
            let d = new Date().toLocaleTimeString();
            writeLog("Set up your boards", d);
        });

        socket.on("gameOver", function (result, money){
            // and another for coins
            ready = false;
            status.style.color = "black";
            status.innerHTML = "Game Over!"
            ending.style.display = "table";
            
            if (result){
                winner.innerHTML = "You Win";
            }
            else{
                winner.innerHTML = "You Lose";
            }
            gained.innerHTML = money;
            socket.emit("updateCoins", money);
            returnButton.addEventListener("click", function (e){
                // some sort of redirect;

            });
            
        });      

        socket.on("changeTurn", function (who){
            if (who){
                status.innerHTML = "Your Turn";
                status.style.color = "green";
            }
            else{
                status.innerHTML = "Opponent's Turn";
                status.style.color = "red";
            }
        });

        socket.on("message", function (msg){
            let d = new Date().toLocaleTimeString();
            writeLog(msg, d);
        });

        socket.on("deployed", function (ship){
            remainingDeployment = ship;
        });

        socket.on("finished", function(){
            ready = true;
        });

        socket.on("displayShips", function (ships){
            displayShips(ships);
        });

        socket.on("displayShots", function (pBoard, oBoard){
            displayFired(oBoard);
            displayShots(pBoard);
        });

        destroyerSelect.addEventListener("click", function (e){
            selectedShip = "destroyer";
            selectorDisplay();
        });

        submarineSelect.addEventListener("click", function (e){
            selectedShip = "submarine";
            selectorDisplay();
        });

        cruiserSelect.addEventListener("click", function (e) {
            selectedShip = "cruiser";
            selectorDisplay();
        });
        dreadnoughtSelect.addEventListener("click", function (e){
            selectedShip = "dreadnought";
            selectorDisplay();
        });
        carrierSelect.addEventListener("click", function (e){
            selectedShip = "carrier";
            selectorDisplay();
        });
    });



}())
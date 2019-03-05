var api = (function(){
    "use strict";

    var module = {};

    function sendFiles(method, url, data, callback){
        let formdata = new FormData();
        Object.keys(data).forEach(function(key){
            let value = data[key];
            formdata.append(key, value);
        });
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
            else callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        xhr.send(formdata);
    }


    function send(method, url, data, callback){
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
            else callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        if (!data) xhr.send();
        else{
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }

    module.signup = function(username, password){
        send("POST", "/signup/", {username: username, password: password}, function(err, res){
            if (err) return notifyErrorListeners(err);
       });
    };
    
    module.signin = function(username, password){
        send("POST", "/signin/", {username: username, password: password}, function(err, res){
            if (err) return notifyErrorListeners(err);
       });
    };

    let getFriends = function(userId, callback){
        send("GET", "/api/user/" + userId + "/friends/", null, callback);
    }
});
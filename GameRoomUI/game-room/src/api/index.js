/*jshint esversion: 6 */
(function(){
    "use strict";
    window.onload = function(){

        console.log("11");
        
        api.onError(function(err){
            console.error("[error]", err);
        });
        
        api.onError(function(err){
            var error_box = document.querySelector('#error_box');
            error_box.innerHTML = err;
            error_box.style.visibility = "visible";
        });

        function submit(){
            if (document.querySelector("#create_signup_form").checkValidity()){
                var username = document.querySelector("#create_signup_form [name=username]").value;
                var password =document.querySelector("#create_signup_form [name=password]").value;
                var action =document.querySelector("#create_signup_form [name=action]").value;
                if (action === "signin"){
                    api.signin(username, password);
                    document.querySelector("#create_signup_form").reset();
                } else {
                    api.signup(username, password);
                    document.querySelector("#create_signup_form").reset();
                }
            }
        }

        document.querySelector('#signin').addEventListener('click', function(){
            document.querySelector("#create_signup_form [name=action]").value = 'signin';
            submit();
            console.log("11");
        });

        document.querySelector('#signup').addEventListener('click', function(){
            document.querySelector("#create_signup_form [name=action]").value = 'signup';
            console.log("11");
            submit();
        });

        document.querySelector('#create_signup_form').addEventListener('submit', function(e3){
            e3.preventDefault();
        });
    };
}());


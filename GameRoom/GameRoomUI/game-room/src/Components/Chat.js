import React from "react";
import io from "socket.io-client";
import '../style/chat.css';
// import User_img from '../media/user.png';

class Chat extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            message: '',
            messages: []
        }; 

        /*
        this.state = {
            messages : [
                {messageId: 1, message: "Hello", username: "User1", img: User_img},
                {messageId: 2, message: "Hello", username: "User2", img: User_img},
                {messageId: 3, message: "Hello", username: "User3", img: User_img},
                {messageId: 4, message: "Hello", username: "User4", img: User_img},
                {messageId: 5, message: "Hello", username: "User5", img: User_img},
                {messageId: 6, message: "Hello", username: "User6", img: User_img},
                {messageId: 7, message: "Hello", username: "User7", img: User_img},
                {messageId: 8, message: "Hello", username: "User8", img: User_img},
                {messageId: 9, message: "Hello", username: "User9", img: User_img},
                {messageId: 10, message: "Hello", username: "User10", img: User_img},
                {messageId: 11, message: "Hello", username: "User11", img: User_img},
            ]
        }*/

        // https://blog.cloudboost.io/creating-a-chat-web-app-using-express-js-react-js-socket-io-1b01100a8ea5 
        this.socket = io('localhost:5000');

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({message: ''});
        }

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });
        
        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };
    }
    
    render(){
        return (
            <div className="chat_box">
                <div className="menu_title">Chat</div>
                <div className="chat_content">
                    <div className="messages_box">
                    <ul id="message">
                    {this.state.messages.map(message => {
                        return (
                            <li><cite><img src={message.img} alt='user_img'/>{message.username}: {message.message}</cite></li>
                        )
                    })}
                    </ul>
                    </div>
                <div>
                <input type="text" placeholder="Enter Your Message" className="form_element" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                <br/>
                <button onClick={this.sendMessage} className="btn_msg">Send</button>
                </div>
                </div>
            </div>
        );
    }
}

export default Chat;




/*  Server side https://blog.cloudboost.io/creating-a-chat-web-app-using-express-js-react-js-socket-io-1b01100a8ea5
var express = require('express');
var socket = require('socket.io');

var app = express();


server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});
 */
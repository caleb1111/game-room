import React from "react";
import io from "socket.io-client";
import '../style/chat.css';
import User_img from '../media/user.png';

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };
        // https://blog.cloudboost.io/creating-a-chat-web-app-using-express-js-react-js-socket-io-1b01100a8ea5 
        this.socket = io('localhost:3000');

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
                    {this.state.messages.map(message => {
                        return (
                            // <div>{message.username}: {message.message}</div>
                            <ul id="message">{message.message}</ul>
                        )
                    })}
                    <ul id="message">
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
                        <li><cite><img src={User_img} alt='user_img'/>Milton Chapman: message</cite></li>
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
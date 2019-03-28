import React from "react";
import io from "socket.io-client";
import '../style/chat.css';
import User_img from '../media/user.png';

class Chat extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            img: User_img,
            message: '',
            messages: []
        }; 
    }

    componentDidMount(){
        // https://blog.cloudboost.io/creating-a-chat-web-app-using-express-js-react-js-socket-io-1b01100a8ea5 
        this.socket = io.connect('http://localhost:5000');

        this.sendMessage = ev => {
            console.log("send:", this.state.username, "  ", this.state.message);
            ev.preventDefault();
            if (this.state.message !== ''){
                this.socket.emit('sendMessage', {
                    author: this.state.username,
                    message: this.state.message,
                    image: this.state.img
                });
            }
            else {
                console.log("empty message cant be sent")
            }
            this.setState({message: ''});
        }

        this.socket.on('receiveMessage', function(data){
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
                    {this.state.messages.map((message, i) => {
                        return (
                            <li key={i}><div className="msg"><img src={message.img} alt='user_img'/>{message.username}: {message.message}</div></li>
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
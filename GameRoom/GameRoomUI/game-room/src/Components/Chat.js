import React from "react";
import io from "socket.io-client";
import '../style/chat.css';
import User_img from '../media/user.png';

class Chat extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            user: {},
            message: '',
            messages: []
        }; 

        this.handleChatUser = this.handleChatUser.bind(this);
    }

    componentDidMount(){
        // https://blog.cloudboost.io/creating-a-chat-web-app-using-express-js-react-js-socket-io-1b01100a8ea5 
        this.socket = io.connect('http://localhost:5000');

        this.sendMessage = ev => {
            console.log("send:", this.state.user._id, "  ", this.state.message);
            ev.preventDefault();
            if (this.state.message !== ''){
                this.socket.emit('sendMessage', {
                    author: this.state.user._id,
                    message: this.state.message,
                    image: this.state.user.picture
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

    handleChatUser(){
        const that = this;
        fetch('http://localhost:5000/api/currUser/', {
            credentials: 'include',
          })
          .then(function(response) {
            return response.json(); 
          })
            .then(function(data) {
                const user = data;
                that.setState({
                  user: user
                })
                console.log("user: ", user)
                console.log("user name: ", user._id)
                })
          .catch(function(error){
            console.log(error);
          })
      }
    
    render(){
        const that = this;
        return (
            <div className="chat_box">
                <div className="menu_title">Chat</div>
                <div className="chat_content">
                    <div className="messages_box">
                    <ul id="message">
                    {this.state.messages.map((message, i) => {
                        return (
                            <li key={i}><div className="msg"><img src={User_img} alt='user_img'/>{that.state.user._id}: {message.message}</div></li>
                        )
                    })}
                    </ul>
                    </div>
                <div>
                <input type="text" placeholder="Enter Your Message" className="form_element" value={this.state.message}
                onLoad={this.handleChatUser} onChange={ev => this.setState({message: ev.target.value})}/>
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
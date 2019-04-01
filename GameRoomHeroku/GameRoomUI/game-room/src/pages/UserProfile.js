import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from '../Components/Logo';
import '../style/home.css';
import Nav from '../Components/NavBar';
import UserPhoto from '../media/user.png';
import '../style/user_profile.css';


export default class UserProfile extends Component {

  constructor(){
    super();

    this.state = {
        upload: true,
        selectedFile: null,
        user: {},
        items: [],
        friends: []
    }

    this.handleUpload = this.handleUpload.bind(this);
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
}

fileSelectHandler(event) {
    this.setState({
        selectedFile: event.target.files[0]
    })
    console.log(event.target.files[0]);
}

componentDidMount(){
  const that = this;
  fetch('https://cscc09gameroom.herokuapp.com/api/currUser/', {
      credentials: 'include',
    })
    .then(function(response) {
      return response.json(); 
    })
      .then(function(data) {
          const user = data;
          let profileId = user.profile;
          fetch('https://cscc09gameroom.herokuapp.com/api/user/' + profileId + '/', {
                credentials: 'include',
            })
            .then(function(response) {
              return response.json(); 
            })
              .then(function(data) {
                  const user = data;
                  console.log("usr object:", user);
                  console.log("user:", user.friends);
                  that.setState({
                    user: user,
                    friends: user.friends,
                    items: user.items
                  })
                })
            .catch(function(error){
                console.log(error);
            })
        })
    .catch(function(error){
      console.log(error);
    })
}


fileUploadHandler(){
  const that = this;
  const fd = new FormData();
  if (that.state.selectedFile !== null){
      fd.append('image', that.state.selectedFile, that.state.selectedFile.name);
      console.log("image: ",that.state.selectedFile);
      fetch('https://cscc09gameroom.herokuapp.com/api/user/picture/', {
          credentials: 'include',
          method: 'PATCH',
          body: fd
      }).then(function(response){
          that.handleUpload();
          return response.json(); 
      })
          .then(function(data) {
              const items = data;
              console.log(items);
          })
      .catch(function(error){
          console.log(error);
      })
  }
  else {
      console.log("no image selected");
  }
}

handleUpload(){
    this.setState(this.clickUploadState)
}

clickUploadState(state) {   
    return{
        upload: !state.upload,
    };
}

    render() {
      let showUploadbtn =  this.state.upload ? "show" : "hide";
      let showUploadbtn2 =  this.state.upload ? "hide" : "show";

      return (
        <div className="background">
          <header>
          <Link to="/home/"><Logo/></Link>
            <Nav/>
          </header>
          <div>
              <br />
                <header>
                    <div className="welcome_msg">Welcome, {this.state.user._id}</div>
                </header>
            <div className="row" style={{marginTop:"50px"}}>
                <div className="col span-1-of-3 user_photo">
                    <img src={UserPhoto} alt='user'/>
                    <br />
                    <br />
                    <div className={showUploadbtn}>
                        <button className="btn btn_profile" style={{margin: "0 0 0 30px"}}
                        onClick={() => this.clickUploadState && this.handleUpload()}>Edit Your Profile</button>
                    </div>
                    <div className={showUploadbtn2}>
                        <input className="upload_img" id="upload_image" type="file" onChange={this.fileSelectHandler} />
                        <button className="btn_upload" onClick={() => this.fileUploadHandler()} >Upload</button>
                    </div>
                </div>

                <div className="col span-1-of-3">
                <div className="friend_list2">
                    <div className="menu_title2">Friend List</div>
                        <div className="friend_box2">
                        <ul id="friends2">
                            {this.state.friends.map((friend, i) => {
                                return (
                                    <li key={i}><cite style={{textAlign:"center"}}>{friend}</cite>
                                        <div className="friend_clicked">
                                            <button className="f_btn" style={{marginRight:"15px"}}
                                            onClick={() => this.handleUnfriend(friend)}>Unfriend</button>
                                            <button className="f_btn"
                                            onClick={() => this.handleViewProfile(friend)}>View Profile</button>
                                        </div>
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                </div>
                </div>
                <div className="col span-1-of-3 ">
                <div className="friend_list">
                    <div className="menu_title">Items You Purchased</div>
                        <div className="friend_box">
                        <ul id="friends">
                            {this.state.friends.map((friend, i) => {
                                return (
                                    <li key={i}><cite style={{textAlign:"center"}}>{friend}</cite>
                                        <div className="friend_clicked">
                                            <button className="f_btn" style={{marginRight:"15px"}}
                                            onClick={() => this.handleUnfriend(friend)}>Unfriend</button>
                                            <button className="f_btn"
                                            onClick={() => this.handleViewProfile(friend)}>View Profile</button>
                                        </div>
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                </div>
                </div>
            </div>
            </div>
        </div>
      );
    }
  }
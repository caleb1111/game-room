import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from '../Components/Logo';
import '../style/home.css';
import Nav from '../Components/NavBar';
import UserPhoto from '../media/user.png';
import plus_sign from '../media/items/plus-sign.png';
import coin from '../media/items/coin.png';

export default class UserProfile extends Component {

  constructor(){
    super();

    this.state = {
        upload: true,
        selectedFile: null,
        user: {},
    }

    this.handleUpload = this.handleUpload.bind(this);
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.getUser = this.getUser.bind(this);

}

fileSelectHandler(event) {
    this.setState({
        selectedFile: event.target.files[0]
    })
    console.log(event.target.files[0]);
}

getUser(){
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
      fetch('http://localhost:5000/api/user/'+ that.state.user._id +'/picture/', {
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
          <header onLoad={this.getUser}>
          <Link to="/home/"><Logo/></Link>
            <Nav/>
          </header>
          <div>
                <header>
                    <div className="welcome_msg">Welcome, {this.state.user._id}</div>
                    <div className="coin">
                        <img src={coin} alt='coin'/> <p> {this.state.userCoins}  Coins </p>
                        <img className="plus_sign" src={plus_sign} alt='plus sign' />
                    </div>
                </header>
            <div className="row" style={{marginTop:"15px"}}>
                <div className="col span-1-of-3 user_photo">
                    <img src={UserPhoto} alt='user'/>
                    <br />
                    <br />
                    <div className={showUploadbtn}>
                        <button className="btn btn_profile" style={{margin: "0 0 0 30px"}}
                        onClick={() => this.clickUploadState && this.handleUpload()}>Edite Your Profile</button>
                    </div>
                    <div className={showUploadbtn2}>
                        <input className="upload_img" id="upload_image" type="file" onChange={this.fileSelectHandler} />
                        <button className="btn_upload" onClick={() => this.fileUploadHandler()} >Upload</button>
                    </div>
                </div>
                <div className="col span-1-of-3 box random_box" style={{border: "1px solid white"}}>
                    <h3>Something here</h3>
                </div>
                <div className="col span-1-of-3 box random_box" style={{border: "1px solid white", margin: "150 0 0 0px"}}>
                    <h3>Friends List can be here</h3>
                </div>
            </div>

            <div className="row">
                <div className="col box random_box2" style={{border: "1px solid white"}}>
                    <h3>Your Rank here</h3>
                </div>
                <div className="col box random_box2" style={{border: "1px solid white"}}>
                    <h3>Items You purchased</h3>
                </div>
                <div className="col box random_box2" style={{border: "1px solid white"}}>
                    <h3>Random thing here</h3>
                </div>
                <div className="col box random_box2" style={{border: "1px solid white"}}>
                    <h3>Random thing here</h3>
                </div>
                <div className="col box random_box2" style={{border: "1px solid white"}}>
                    <h3>Random thing here</h3>
                </div>
            </div>
            </div>
        </div>
      );
    }
  }
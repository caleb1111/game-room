import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from '../Components/Logo';
import '../style/home.css';
import Nav from '../Components/NavBar';
import UserPhoto from '../media/user.png';
import '../style/user_profile.css';
import bronzeMedal from '../media/items/bronzeMedal.png';
import silverMedal from '../media/items/silverMedal.png';
import goldMedal from '../media/items/goldMedal.png';
import platnumMedal from '../media/items/platnumMedal.png';
import diamondMedal from '../media/items/diamondMedal.png';
import masterMedal from '../media/items/masterMedal.png';
import arrowsBG from '../media/items/arrowsBG.png';
import bubbles from '../media/items/bubbles.png';
import catBG from '../media/items/catBG.png';
import cloudsBG from '../media/items/cloudsBG.png';
import chocolateBG from '../media/items/chocolateBG.png';
import circlesBG from '../media/items/circlesBG.png';


export default class UserProfile extends Component {

  constructor(){
    super();

    this.state = {
        upload: true,
        selectedFile: null,
        user: {},
        friends: [],
        userItems: []
    }

    this.handleUpload = this.handleUpload.bind(this);
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
}

items_list = {
    items : [
    {itemId: 1, item_name:"Bronze Medal", item_img: bronzeMedal, price: 100},
    {itemId: 2, item_name:"Silver Medal", item_img: silverMedal, price: 200},
    {itemId: 3, item_name:"Gold Medal", item_img: goldMedal, price: 300},
    {itemId: 4, item_name:"Platnum Medal", item_img: platnumMedal, price: 400},
    {itemId: 5, item_name:"Diamond Medal", item_img: diamondMedal, price: 500},
    {itemId: 6, item_name:"Master Medal", item_img: masterMedal, price: 800},
    {itemId: 7, item_name:"Bubbles", item_img: bubbles, price: 100},
    {itemId: 8, item_name:"Arrows Background", item_img: arrowsBG, price: 500},
    {itemId: 9, item_name:"Cat Background", item_img: catBG, price: 500},
    {itemId: 10, item_name:"Clouds Background", item_img: cloudsBG, price: 500},
    {itemId: 11, item_name:"Chocolate Backgroundbbles", item_img: chocolateBG, price: 500},
    {itemId: 12, item_name:"Circles Backgroundbbles", item_img: circlesBG, price: 500},
  ]}

fileSelectHandler(event) {
    this.setState({
        selectedFile: event.target.files[0]
    })
    console.log(event.target.files[0]);
}

componentDidMount(){
  const that = this;
  fetch('http://localhost:5000/api/currUser/', {
      credentials: 'include',
    })
    .then(function(response) {
      return response.json(); 
    })
      .then(function(data) {
          const user = data;
          let profileId = user.profile;
          fetch('http://localhost:5000/api/user/' + profileId + '/', {
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
            that.setState({
                items: user.items
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
      fetch('http://localhost:5000/api/user/picture/', {
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
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                </div>
                </div>
                <div className="col span-1-of-3 ">
                <div className="item2_list">
                    <div className="menu_title3">Items You Purchased</div>
                        <div className="item2_box">
                        <ul id="items2">
                            {this.items_list.items.map((item, i) => {
                                return (
                                    <li key={i}><div className="item6"><img src={item.item_img} alt='user_img'/>{item.item_name}</div>
                                        
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
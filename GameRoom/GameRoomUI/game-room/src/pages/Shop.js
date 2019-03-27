import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from '../Components/Logo';
import '../style/shop.css';
import Nav from '../Components/NavBar';
import bronzeMedal from '../media/items/bronzeMedal.png';
import coin from '../media/items/coin.png';
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
import plus_sign from '../media/items/plus-sign.png';
import circlesBG from '../media/items/circlesBG.png';

export default class Shop extends Component {

  Coins = {
        coin: "1000"
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


    render() {
      return (
        <div className="background">
          <header>
            <Link to="/home/"><Logo/></Link>
            <Nav/>
            <br />
            <hr />
            <br />
            <div className="coin">
             <img src={coin} alt='coin'/> <p> {this.Coins.coin}  Coins </p>
             <img className="plus_sign" src={plus_sign} alt='plus sign' />
            </div>
          </header>
          <div className="shop">
          <div className="row">
            <ul className="item_list_1">
              {this.items_list.items.map((item, i) => {
                return (
                    <li key={i}>
                      <div className="col span-1-of-3 item_photo" key={i}>
                        <h4> {item.item_name} </h4>
                        <h6> {item.price} coins </h6>
                        <img src={item.item_img} alt='item_img'/>
                        <button className="btn_purchase">Purchase</button>
                      </div>
                    </li>
                      )
                  })}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
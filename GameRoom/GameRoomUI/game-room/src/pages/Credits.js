import React, {Component} from 'react';
import Logo from '../media/title.png';
import '../style/vendors/grid.css';
import '../style/vendors/normalize.css';
import '../style/home.css';


const SignLogo = () => (
    <img src={Logo} className="sign_logo" alt="logo"></img>
  );

export default class Credits extends Component {
  
  render() {

    return (
      <div className="background" style={{color:"white"}}>
        <SignLogo/>
        <h1 style={{marginLeft:"800px"}}>Credits</h1>
        <h2 style={{marginBottom:"100px"}}>CSS and Javascript code and Socket and React-Konva</h2>
        <ul style={{marginLeft:"100px", color:"white"}}>
            <li><a style={{marginLeft:"100px", color:"white"}} href="http://stackoverflow.com/">Stackoverflow</a></li>
            <li> <a style={{marginLeft:"100px", color:"white"}} href="https://www.w3schools.com">W3S</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://github.com/ThierrySans/CSCC09">ThierrySans CSCC09 Github</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://github.com/louischatriot/nedb">NeDB Github</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://github.com/socketio/socket.io/issues/2294">Socket IO</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://stackoverflow.com/questions/24058157/socket-io-node-js-cross-origin-request-blocked">Stackoverflow Socket IO</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://www.reddit.com/r/node/comments/3m6hpp/expressjs_socketio_cross_origin_blocked_https/">Reddit Socket IO</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://stackoverflow.com/questions/48198835/socket-io-404-error">Stackoverflow Socket IO</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://stackoverflow.com/questions/16981396/get-http-localhost3000-socket-io-socket-io-js-404-not-found">Stackoverflow Socket IO</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://www.npmjs.com/package/socket.io">NPM Socket IO</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://socket.io/get-started/chat/">Chat Socket IO</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://www.w3schools.com/tags/ref_canvas.asp">W3S Canvas</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://stackoverflow.com/questions/43172115/get-the-mouse-coordinates-when-clicking-on-canvas">Stackoverflow Canvas</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://www.npmjs.com/package/socket.io">NPM Socket IO</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://stackoverflow.com/questions/40987309/react-display-loading-screen-while-dom-is-rendering">Stackoverflow DOM Loading</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://github.com/nguyenbathanh/react-loading-screen">Github Loading Screen</a></li>
            <li><a style={{marginLeft:"100px", color:"white"}} href="https://konvajs.org/docs/react/">Knova</a></li>
        </ul>
        <h2 style={{marginBottom:"100px"}}>Images</h2>
            <ul style={{marginLeft:"200px", color:"white"}}> 
                <li style={{margin:"0 auto"}}>All Images made by Alex(YiShuai) Wang</li>
            </ul>

            <h2 style={{marginBottom:"100px"}}>Loading Gif</h2>
            <ul style={{marginLeft:"200px", color:"white"}}> 
                <li style={{margin:"0 auto"}}>Loading Gif by <a  href="https://dribbble.com/shots/1024835--GIF-Loading"> Charles Patterson</a></li>
            </ul>

        
        <h2 style={{marginBottom:"100px"}}>Title Styled Fonts</h2>
        <ul style={{marginLeft:"200px", marginBottom:"200px", color:"white"}}>
            <li>Styled Font made by <a href="https://coolsymbol.com/">Coolsymbol</a></li>
        </ul>
    </div>
    );
  }
}

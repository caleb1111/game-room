import React from 'react';
import '../style/game.css';

export default class Canvas extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }

    render() {
      return <canvas width="400" height="400" id="playerBoard" ref={this.canvasRef}></canvas>;
    }
  }
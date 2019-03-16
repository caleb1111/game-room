import React, {Component} from 'react';
import axios from "axios";
import Logo from '../media/title.png';
import '../style/sign_form.css';
import '../style/vendors/grid.css';
import '../style/vendors/normalize.css';

const SignLogo = () => (
    <img src={Logo} className="sign_logo" alt="logo"></img>
  );

export default class SignUpIn extends Component {
  // initialize our state 
  state = {
    data: [],
    id: 0,
    username: null,
    password: null,
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putUserToDB = (username, password) => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3000/signup/", {
      id: idToBeAdded,
      username: username,
      password: password
    });
  };

  // our put method that uses our backend api
  // to create new query into our data base
  checkUserFromDB = (username, password) => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3000/signin/", {
      id: idToBeAdded,
      username: username,
      password: password
    });
  };

  render() {
    return (
      <div className="background">
        <SignLogo/>
        <div id="sign_form">
          <form className="signup_form" id="create_signup_form">
              <div className="form_title">𝕊𝕚𝕘𝕟 𝕌𝕡/𝕊𝕚𝕘𝕟 𝕀𝕟</div>
              <input type="text" name="username" className="form_element" placeholder="Enter a username" 
              onChange={e => this.setState({ username: e.target.value })} required/>
              <input type="text" name="password" className="form_element" placeholder="Enter a password" 
              onChange={e => this.setState({ password: e.target.value })} required/>
              <div className="buttons">
                  <label htmlFor="signup" className="btn_signup">Sign Up</label>
                  <label htmlFor="signin" className="btn_signin">Sign in</label>
                  <button id="signup" style={{visibility:"hidden"}} name="action" 
                  onClick={() => this.putUserToDB(this.state.username, this.state.password)}></button>
                  <button id="signin" style={{visibility:"hidden"}} name="action" 
                  onClick={() => this.checkUserFromDB(this.state.username, this.state.password)}></button>
              </div>
          </form>
        </div>
    </div>
    );
  }
}

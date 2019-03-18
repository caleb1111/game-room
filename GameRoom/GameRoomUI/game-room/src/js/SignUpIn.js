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
  constructor() {
    super();

    this.state = {
        password: '',
        username: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // 无条件登录
    this.props.history.push("/");

    console.log('The form was submitted with the following data: username: ', 
    this.state.username, ' password: ', this.state.password);
  }

  // our put method that uses our backend api
  // to create new query into our data base
  putUserToDB = (username, password) => {
    axios.post("http://localhost:3000/signup/", {
      username: username,
      password: password
    });
  };

  // our put method that uses our backend api
  // to create new query into our data base
  checkUserFromDB = (username, password) => {
    axios.post("http://localhost:3000/signin/", {
      username: username,
      password: password
    });
  };

  render() {
    return (
      <div className="background">
        <SignLogo/>
        <div id="sign_form">
          <form onSubmit={this.handleSubmit} className="signup_form" id="create_signup_form">
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

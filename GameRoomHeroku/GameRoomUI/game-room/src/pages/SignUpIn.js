import React, {Component} from 'react';
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
        username: '',
        password: '',
        errorMsg: '',
    }

    this.formAction = {
      action: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    var that = this;
    e.preventDefault();
    if (this.formAction.action === 'signup'){
      fetch('https://cscc09gameroom.herokuapp.com/signup/', {
        method: 'POST', // or 'PUT'
        credentials: 'include',
        body: JSON.stringify({ username: this.state.username, password: this.state.password }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        return response.json(); 
      })
        .then(function() {
            that.props.history.push("/home/");
        })
      .catch(function(){
        that.setState({
          errorMsg: 'Username already taken',
        })
      })
    }
    if (this.formAction.action === 'signin'){
      fetch('https://cscc09gameroom.herokuapp.com/signin/', {
        method: 'POST', // or 'PUT'
        credentials: 'include',
        body: JSON.stringify({ username: this.state.username, password: this.state.password }), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        return response.json(); })
        .then(function(data) {
          that.props.history.push("/home/");
      })
      .catch(function(){
        that.setState({
          errorMsg: 'User already logged in Or Username not registered',
        })
      })
      }
  }

  render() {

    return (
      <div className="background">
        <SignLogo/>
        <div style={{color: "red", marginLeft:"150px", marginBottom:"50px"}}> {this.state.errorMsg}</div>
        <div id="sign_form">
          <form onSubmit={this.handleSubmit} className="signup_form" id="create_signup_form">
              <div className="form_title">𝕊𝕚𝕘𝕟 𝕌𝕡/𝕊𝕚𝕘𝕟 𝕀𝕟</div>
              <input type="text" name="username" className="form_element" placeholder="Enter a username" 
              onChange={e => this.setState({ username: e.target.value })} required/>
              <input type="password" name="password" className="form_element" placeholder="Enter a password" 
              onChange={e => this.setState({ password: e.target.value })} required/>
              <div className="buttons">
                  <label htmlFor="signup" className="btn_signup">Sign Up</label>
                  <label htmlFor="signin" className="btn_signin">Sign in</label>
                  <button id="signup" style={{visibility:"hidden"} }
                  onClick={() => this.formAction.action ='signup'}>
                  </button>
                  <button id="signin" style={{visibility:"hidden"}}
                  onClick={() => this.formAction.action ='signin'}>
                  </button>
              </div>
          </form>
        </div>
    </div>
    );
  }
}

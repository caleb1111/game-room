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
        password: ''
    }

    this.formAction = {
      action: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    var that = this;
    e.preventDefault();
    console.log("front end user", this.state);

    console.log('The form was submitted with the following data: username: ', 
    this.state.username, ' password: ', this.state.password, 'action: ', this.formAction.action);
    if (this.formAction.action === 'signup'){
      fetch('http://localhost:5000/signup/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({ username: this.state.username, password: this.state.password }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        return response.json(); 
      })
        .then(function(data) {
            const items = data;
            console.log(items)
            that.props.history.push("/home/");
        })
      .catch(function(error){
        console.log(error);
        that.props.history.push("/");
      })
    }
    if (this.formAction.action === 'signin'){
      fetch('http://localhost:5000/signin/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({ username: this.state.username, password: this.state.password }), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        return response.json(); })
        .then(function(data) {
            const items = data;
            console.log(items)
            that.props.history.push("/home/");
      })
      .catch(function(error){
        console.log(error);
        that.props.history.push("/");
      })
      }
  }

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

import React, {Component} from 'react';
import Logo from '../media/title.png';
import Loading from '../Components/Loading';
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
    this.props.history.push("/home/");

    console.log('The form was submitted with the following data: username: ', 
    this.state.username, ' password: ', this.state.password);
  }

  // get request  
  // fetch('/signup/').then((response) => response.json()).then((data)=> console.log(data)); 


  putUserToDB = (username, password) => {
    fetch('/signup/', {
      method : 'POST',
      body : JSON.stringify({username: username, password: password}),
      headers : {
        'Content-type' : "application/json"
      }
    }).then((response) => response.json()).then((data)=> console.log(data))
  };


  // our put method that uses our backend api
  // to create new query into our data base
  checkUserFromDB = (username, password) => {
    fetch('/signin/', {
      method : 'POST',
      body : JSON.stringify({username: username, password: password}),
      headers : {
        'Content-type' : "application/json"
      }
    }).then(
      (response) => response.json()).then((data)=> console.log(data))
  };

  // loading gif ---------------------------------------------------------------------------------
  authenticate(){
    return new Promise(resolve => setTimeout(resolve, 2000))
  }

  componentDidMount(){
    this.authenticate().then(() => {
      const ele = document.getElementById('ipl-progress-indicator')
      if(ele){
        // fade out
        ele.classList.add('available')
        setTimeout(() => {
          // remove from DOM
          ele.outerHTML = ''
        }, 2000)
      }
    })
  }

  // ----------------------------------------------------------------------------------

  render() {
    return (
      <div className="background">
      <Loading/>
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

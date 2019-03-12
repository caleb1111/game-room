import React, {Component} from 'react';
import Logo from '../media/title.png';
import '../style/sign_form.css';
import '../style/vendors/grid.css';
import '../style/vendors/normalize.css';

const SignLogo = () => (
    <img src={Logo} className="sign_logo" alt="logo"></img>
  );

const SignForm = () => (
    <div id="sign_form">
        <form className="signup_form" id="create_signup_form">
            <div className="form_title">𝕊𝕚𝕘𝕟 𝕌𝕡/𝕊𝕚𝕘𝕟 𝕀𝕟</div>
            <input type="text" name="username" className="form_element" placeholder="Enter a username" required/>
            <input type="text" name="password" className="form_element" placeholder="Enter a password" required/>
            <div className="buttons">
                <label htmlFor="signup" className="btn_signup">Sign Up</label>
                <label htmlFor="signin" className="btn_signin">Sign in</label>
                <button id="signup" style={{visibility:"hidden"}} name="action"></button>
                <button id="signin" style={{visibility:"hidden"}} name="action"></button>
            </div>
        </form>
    </div>
  );

export default class SignUpIn extends Component {

  render() {
    return (
      <div className="background">
        <SignLogo/>
        <SignForm />
      </div>
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/vendors/grid.css';
import './style/vendors/normalize.css';
import Home from './pages/Home';
import Game from './pages/Game';
import Shop from './pages/Shop';
import SignUpIn from './pages/SignUpIn';
import UserProfile from './pages/UserProfile';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Loading from './Components/Loading';

export class Load extends React.Component{

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

  render(){
    return(
      <Loading />
    );
  }
}

function AppRouter() {
    return (
      <Router>
        <div>
          <Load />
          <Route path="/" exact component={SignUpIn} />
          <Route path="/game/" component={Game} />
          <Route path="/home/" component={Home} />
          <Route path="/UserProfile/" component={UserProfile} />
          <Route path="/shop/" component={Shop} />
          <Route path="/signin/" component={SignUpIn} />
        </div>
      </Router>
    );
  }
  
  export default AppRouter;
ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

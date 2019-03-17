import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './js/Home';
import Shop from './js/Shop';
import SignUpIn from './js/SignUpIn';
import UserProfile from './js/UserProfile';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom';

function AppRouter() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
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

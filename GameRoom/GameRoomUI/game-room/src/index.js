import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import Home from './pages/Home';
import Shop from './pages/Shop';
import SignUpIn from './pages/SignUpIn';
import UserProfile from './pages/UserProfile';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom';

function AppRouter() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={SignUpIn} />
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

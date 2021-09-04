import React from 'react';
import Login from './components/authentication/login/Login';
import SignIn from './components/authentication/signin/SignIn';
import Home from './components/root/Home';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
        <Route exact path="/">
            <Login />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

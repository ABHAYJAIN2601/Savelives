import React from 'react';
import './App.css';
import Signup from './Signup';
import Signin from './Signin';
import Welcome from './Welcome';
import Forgotpassword from './Forgotpassword';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route
          exact
          path="/forgot-password/:userid"
          component = {Forgotpassword}
        />
        <Route
          exact
          path="/signup"
          component = {Signup}
        />
         <Route
          exact
          path="/"
          component = {Signin}
        />
          <Route
          exact
          path="/welcome"
          component = {Welcome}
        />
        </Switch>
      </Router>
        
    </div>
    
  );
}

export default App;

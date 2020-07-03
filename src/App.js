
import './App.css';
import './config/firebaseconfig';

import React, { Component } from 'react';
import TopMenu from './component/header/topmenu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import * as firebase from 'firebase'
import MessagePage from './component/main/messagepage';
import LoginPage from './component/main/loginpage';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {userLogined: null};
  }

  getUserLogined = (() => {
    var userLogined = firebase.database().ref('/users').child(firebase.auth().currentUser.uid);
    userLogined.on('value',(snapshot)=>{
      this.setState({ userLogined: snapshot.val() });
    })
  })

  render() {
    return (
      <div className="root">
        <TopMenu userLogined={this.state.userLogined} />
        <Router>
          <Switch>
            <Route path="/user">
              <MessagePage />
            </Route>
            <Route path="/">
              <LoginPage getUserLogined = {this.getUserLogined} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

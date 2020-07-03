import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import LoginPage from '../component/main/loginpage';
import MessagePage from '../component/main/messagepage';

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/user">
                        <MessagePage/>
                    </Route>
                    <Route path="/">
                        <LoginPage/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;
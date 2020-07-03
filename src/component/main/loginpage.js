import React, { Component } from 'react';

import * as firebase from 'firebase';
import {
    Redirect,
  } from "react-router-dom";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: '',
            isRedirect: false
        }
    }
    

    onChangeInputText = (event)=>{
        var name = event.target.name;
        var val = event.target.value;
        this.setState({[name]:val});
    }
    onSubmitLogin = (event)=>{
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
        .then((result)=>{
            this.props.getUserLogined();
            this.setState({isRedirect:true});
        })
        .catch((err)=>{
            alert(err);
        })
    }
    redirect(){
        if(this.state.isRedirect===true)
            return <Redirect  to="/user" />
        return null;
    }
    render() {
        return (
            <section className="container">
               {this.redirect()}
                <div className="vh d-flex justify-content-center align-items-center">
                    <form onSubmit={this.onSubmitLogin} className="pb-5 col-lg-4 col-md-6 col-sm-9">
                        <h3 className="text-primary text-center">Login</h3>
                        <div className="form-group">
                            <input onChange={this.onChangeInputText} type="text" className="form-control" name='username' placeholder="email or phone number" />
                        </div>
                        <div className="form-group">
                            <input onChange={this.onChangeInputText} type="password" className="form-control" name='password' placeholder="password" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary container">Login</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default LoginPage;
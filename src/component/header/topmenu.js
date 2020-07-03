import React, { Component } from 'react';

class TopMenu extends Component {

    getUserLogined = () => {
        if (this.props.userLogined)
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            <img alt="avatar" className="img-fluid avatar" src={this.props.userLogined.avatar} />
                            <span>{this.props.userLogined.displayname}</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">logout</a>
                    </li>
                </ul>)
    }

    render() {
        return (
            <header className="navbar navbar-expand navbar-dark bg-success bd-navbar">
                <a className="navbar-brand" href="/">Logo</a>
                {this.getUserLogined()}
            </header>
        );
    }
}

export default TopMenu;
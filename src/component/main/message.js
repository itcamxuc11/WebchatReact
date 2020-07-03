import React, { Component } from 'react';
import * as firebase from 'firebase';


class Message extends Component {
    constructor(props) {
        super(props);
        this.state = { messageInput: '', data: [] };
        this.inputMessage = React.createRef();
    }

    onChangeMessage = (event) => {
        this.setState({ messageInput: event.target.value });
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        let roomId = this.props.roomSelected.roomId;
        let database = firebase.database().ref('chat/messages/' + roomId);
        database.on('child_added', (snapshot) => {
            this.setState({ data: [...this.state.data, snapshot.val()] }, () => {
                this.scrollToBottom();
            })
        })
    }

    componentWillUnmount() {
        let roomId = this.props.roomSelected.roomId;
        let database = firebase.database().ref('chat/messages/' + roomId);
        database.off();
    }

    onClickSendMessage = () => {
        if (this.state.messageInput === '') {
            return;
        }
        let roomId = this.props.roomSelected.roomId;
        let database = firebase.database().ref('chat/messages/' + roomId);

        database.push({
            user: firebase.auth().currentUser.uid,
            timestamp: Date.now(),
            message: this.state.messageInput
        })
        this.inputMessage.current.value = '';
    }

    getUserChattingName = () => {
        if (this.props.roomSelected.user) return this.props.roomSelected.user.displayname;
    }

    onEnterKeySendMessage = (event)=>{
        if(event.key==='Enter') this.onClickSendMessage();
    }

    render() {
        return (
            <div className="col-7 d-flex flex-column">
                <h4 className="pt-3"><b className="text-primary">{this.getUserChattingName()}</b></h4>
                <div className="mesage-window col d-flex flex-column">
                    {
                        this.state.data.map((value, index) => {
                            if (value.user === firebase.auth().currentUser.uid) return (
                                <div key={index} className="mesage-content send-mesage">
                                    <span>{value.message}</span>
                                </div>
                            );
                            else return (
                                <div key={index} className="mesage-content receive-mesage">
                                    <span>{value.message}</span>
                                </div>
                            );
                        })
                    }
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}></div>
                </div>
                <div className="mesage-input">
                    <div className="form-group d-flex">
                        <input onKeyDown={this.onEnterKeySendMessage} ref={this.inputMessage} onChange={this.onChangeMessage} type="text" className="form-control" placeholder="Aa" />
                        <button onClick={this.onClickSendMessage} className="btn btn-primary"> Send </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;
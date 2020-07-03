import React, { Component } from 'react';
import Message from './message';
import * as firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';

var chatRoomList = firebase.database().ref('/chat/room_names');
var userList = firebase.database().ref('/users');

class MessagePage extends Component {
    constructor(props) {
        super(props);
        this.state = { chatList: [], userList: [], roomSelected: {} };
    }

    onClickReadMessage = (roomSelected) => {
        this.setState({ roomSelected: roomSelected }, () => {
        });
    }

    onClickNewChat = (user) => {
        let chatRoom = this.state.chatList.find((elment) => {
            return elment.user.userId === user.userId;
        })
        if (chatRoom) {
            this.setState({ roomSelected: chatRoom });
        }
        else {
            let newRoomId = uuidv4();
            chatRoomList.child(newRoomId).set({
                timestamps: Date.now().toString()
            }, (err) => {
                if (err) console.log(err);
                else {
                    let membersNewChat = '{"' + firebase.auth().currentUser.uid + '":"true",'
                        + '"' + user.userId + '":"true"}';
                    let database = firebase.database().ref('/chat/members/' + newRoomId);
                    database.set(JSON.parse(membersNewChat), (err) => {
                        if (!err) this.setState({ roomSelected: {roomId:newRoomId,user:user} });
                    });
                }
            })
        }
    }

    componentDidMount() {
        userList.on('child_added', (snapshot) => {
            if (snapshot.key !== firebase.auth().currentUser.uid) {
                let tmp = { ...snapshot.val(), userId: snapshot.key };
                this.setState({ userList: [...this.state.userList, tmp] })
            }
        })

        chatRoomList.on('child_added', (snapshot) => {
            let roomList = firebase.database().ref('/chat/members/' + snapshot.key);
            roomList.on('value', (s) => {
                s.forEach((snap) => {
                    if (snap.key !== firebase.auth().currentUser.uid) {
                        let user = userList.child(snap.key);
                        user.on('value', (userSnapshot) => {
                            let userInfo = { ...userSnapshot.val(), userId: snap.key };
                            let tmp = { roomId: snapshot.key, user: userInfo };
                            this.setState({ chatList: [...this.state.chatList, tmp] }, () => {
                                this.setState({ roomSelected: this.state.chatList[0] },()=>{
                                    user.off();
                                });
                            });
                        })
                    }
                })
            })
        })
    }

    render() {
        return (
            <section className="container main-content" >
                <div className="row maximum-height">
                    <div className="col-3 d-flex flex-column">
                        <h3 className="pt-4"><b className="text-primary">Chat</b></h3>
                        <div className="search-box pb-3 fa fa-search">
                            <input className="search-input" type="text" />
                        </div>
                        {
                            this.state.chatList.map((value, index) => {
                                return (
                                    <div onClick={() => { this.onClickReadMessage(value) }} key={index} className="d-flex p-2 mesage-box align-items-center">
                                        <img className="big-avatar" alt="avatar" src={value.user.avatar} />
                                        <div className="d-flex flex-column pl-2">
                                            <b>{value.user.displayname}</b>
                                            <p className="mb-0">You missed a call from Garen</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Message key={this.state.roomSelected.roomId} roomSelected={this.state.roomSelected}></Message>
                    <div className="col-2 pt-5 user-list">
                        {
                            this.state.userList.map((value, index) => {
                                return (
                                    <div onClick={() => { this.onClickNewChat(value) }} key={index} className="mb-2">
                                        <img alt="avatar" src={value.avatar} className="img-fluid avatar"></img>
                                        <b className="pl-1">{value.displayname}</b>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default MessagePage;
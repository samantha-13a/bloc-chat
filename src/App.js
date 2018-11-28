import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
  apiKey: "AIzaSyBVA4BoE1bZgKXB-4vnLvVLblxq8M3Unq0",
  authDomain: "bloc-chat-8e470.firebaseapp.com",
  databaseURL: "https://bloc-chat-8e470.firebaseio.com",
  projectId: "bloc-chat-8e470",
  storageBucket: "bloc-chat-8e470.appspot.com",
  messagingSenderId: "195627469076"
};
firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super();
    this.state= { 
      activeRoomName: '',
      activeRoomId: ''
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(room) {
    this.setState({ 
      activeRoomName: room.name,
      activeRoomId: room.key
     });
  }

  render() {
    return (
      <div className="App">
          <RoomList 
            firebase={firebase}
            setActiveRoom={this.setActiveRoom}
            activeRoomId={this.state.activeRoomId}
          />
          <MessageList firebase={firebase} 
            activeRoomId={this.state.activeRoomId}
            activeRoomName={this.state.activeRoomName}
          />
      </div>
    ); 
  }
}

export default App;
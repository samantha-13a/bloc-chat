import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
      </div>
    ); 
  }
}

export default App;

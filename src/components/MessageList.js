import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state= {
      messages: []
    };

    this.messageRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messageRef.on('child_added', snapshot => {
      const message = JSON.stringify(snapshot.val());
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  render() {
    return (
      <section>
        <section className="room-title">
          <h2>{this.props.activeRoomName}</h2>
        </section>
        <section className="message-list">
        {this.state.messages.map((message) =>
          (JSON.parse(message).roomId === this.props.activeRoomId) && 
          <div>
            [{JSON.parse(message).sentAt}]
            &nbsp;<strong>{JSON.parse(message).username}:</strong>
            &nbsp;{JSON.parse(message).content}
          </div>
        )}
        </section>
    </section>
  )};
}

export default MessageList
import React, { Component } from "react";
import { runInThisContext } from "vm";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: ""
    };

    this.messageRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messageRef.on("child_added", snapshot => {
      const message = JSON.stringify(snapshot.val());
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  createMessage() {
    if (!this.props.activeRoomId) return;
    const newMessage = this.state.newMessage;
    this.messageRef.push({
      content: newMessage,
      roomId: this.props.activeRoomId,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.displayName
    });
    this.setState({ newMessage: "" });
  }

  render() {
    return this.props.activeRoomId ? (
      <section>
        <section className="room-title">
          <h2>{this.props.activeRoomName}</h2>
        </section>
        <section className="message-list">
          {this.state.messages.map(
            message =>
              JSON.parse(message).roomId === this.props.activeRoomId && (
                <div>
                  [
                  {window.dateFns.format(
                    JSON.parse(message).sentAt,
                    "M/D h:mm a"
                  )}
                  ] &nbsp;
                  <strong>{JSON.parse(message).username}:</strong>
                  &nbsp;{JSON.parse(message).content}
                </div>
              )
          )}
        </section>
        <h3>New Message:</h3>
        <input
          type="text"
          value={this.state.newMessage}
          onChange={this.handleChange.bind(this)}
        />
        <button onClick={() => this.createMessage()}>Send</button>
      </section>
    ) : (
      <section />
    );
  }
}

export default MessageList;

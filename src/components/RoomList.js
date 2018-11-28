import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props){
    super(props)

    this.state= {
      rooms: [],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom(e) {
    const newRoomName= this.state.newRoomName;
    this.roomsRef.push({
      name: newRoomName
    });
  }

  handleChange(e) {
    this.setState({newRoomName: e.target.value});
  }

  selectRoom(room) {
    this.props.setActiveRoom(room);
  }

  render() {
    return (
      <section>
        <section className="app-title">
          <h1>Bloc Chat</h1>
        </section>
        <section className="room-list">
        {this.state.rooms.map( (room) =>
          <div>
            <button 
              className={this.props.activeRoomId === room.key ? "active-room" : ""}
              onClick={ () => this.props.setActiveRoom(room) }
            >
              {room.name}
            </button>
          </div>
        )}
        </section>
        <section> 
          <form className="create-room" onSubmit={this.createRoom.bind(this)}>
              <h3>Create Room:</h3>
              <input 
                type="text" 
                value={this.state.newRoomName}
                onChange={this.handleChange.bind(this)} />
            <button>
              <input type="submit" value="Submit" />
            </button>
          </form>
        </section>
      </section>
    );
  }
}


export default RoomList;
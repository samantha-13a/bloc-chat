import React, { Component } from 'react';

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
    this.setState({newRoomName: e.target.value})
  }

  render() {
    return (
      <section>
        <section className="room-list">
        {this.state.rooms.map( (room) =>
          <div>{room.name}</div>
        )}
        </section>
        <section> 
          <form className="create-room" onSubmit={this.createRoom}>
            <label>
              <h3>Create Room</h3>
              <input type="text" ref={(input) => this.input = input} />
            </label>
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
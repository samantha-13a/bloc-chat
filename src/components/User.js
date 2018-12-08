import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
      console.log(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <section>
        {this.props.displayName ? (
          <div>
            {this.props.displayName}
            <br />
            <button onClick={() => this.signOut()}>Sign Out</button>
          </div>
        ) : (
          <div>
            Guest
            <br />
            <button onClick={() => this.signIn()}>Sign In</button>
          </div>
        )}
      </section>
    );
  }
}

export default User;

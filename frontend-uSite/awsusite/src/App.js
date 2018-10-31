import React, { Component } from "react";
import { Redirect } from "react-router";
import "./App.css";

class Authbox extends Component {

  render() {
    return(
      <div>
        <textarea
          className = "UINform"
          placeholder = "Username"
          onChange = {this.props.onUNChange}
        />
        <div>
          <textarea
            className = "UINform"
            placeholder = "Password"
            onChange = {this.props.onPWChange}
          />
        </div>
      </div>
    );
  }

}

class Submitbutton extends Component {

  render() {
    return(
        <button
          className = "Submitbutton"
          onClick = {this.props.onClick}
        >
          Submit
        </button>
    );
  }

}

class App extends Component {

  constructor(props) {
    super(props);
    this.handleUNChange = this.handleUNChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      UNval: "un",
      PWval: "pw",
      redirect: false,
    };
  }

  // target = textarea, .value = what's in the textarea
  handleUNChange(e) {
    this.setState({ UNval: e.target.value });
    console.log( "New Unval = " + e.target.value );
  }

  handlePWChange(e) {
    this.setState({ PWval: e.target.value });
    console.log( "New PWval = " + e.target.value );
  }

  handleSubmit() {
    const UNval = this.state.UNval;
    const PWval = this.state.PWval;
    console.log( "Submit button captured: \nUNval: " + UNval + "\nPWval: " + PWval );
    // Hash PWval and send it somewhere
    this.setState({ redirect: true });
  }

  renderRedirect = () => {
    if( this.state.redirect === true ) {
      return <Redirect to="" />
    }
  }

  render() {

    return (
      <div>
        <div id = "wrapCenter" className = "topHUD">
          <div id = "center">
            <b>FLYP Portal</b>
            <div>
              Please Login
            </div>
          </div>
        </div>
        <div id = "wrapCenter"> 
          <div id = "center">
            <Authbox
              onUNChange = {this.handleUNChange}
              onPWChange = {this.handlePWChange}
            />
            <Submitbutton
              onClick = { () => this.handleSubmit() }
            />
          </div>
          {this.renderRedirect()}
        </div>
      </div>
    );
  }
}

export default App;

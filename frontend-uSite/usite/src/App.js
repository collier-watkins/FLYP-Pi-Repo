import React, { Component } from "react";
import "./App.css";

class NumpadButton extends Component {

  render() {
    return(
      <button
        onClick = {() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }

}

class Numpad extends Component {

  renderButton(i) {
    return(
      <NumpadButton
        value = {i}
        onClick = {() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    this.props.onClick(i);
  }

  render() {
    return(
      <div>
        <div>
          {this.renderButton(7)}
          {this.renderButton(8)}
          {this.renderButton(9)}
        </div>
        <div>
          {this.renderButton(4)}
          {this.renderButton(5)}
          {this.renderButton(6)}
        </div>
        <div>
          {this.renderButton(1)}
          {this.renderButton(2)}
          {this.renderButton(3)}
        </div>
        <div>
          {this.renderButton(0)}
          {this.renderButton("clear")}
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

// Master component: App
class App extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleNumpad = this.handleNumpad.bind(this);
    this.state = {
      UIN: "",
    };
  }

  handleClick() {
    const UIN = this.state.UIN;
    console.log( "Submit button clicked, captured value = " + UIN );
    // Here we can send the value somewhere when the user clicks the button
    //
    // Clear the UIN when we are done
    this.setState({ UIN: "" });
  }

  handleNumpad(i) {
    if( i === "clear" ) {
      const newValue = ""
      this.setState({ UIN: newValue });
      console.log( "State Change, new state value = " + newValue );
    }
    else if( this.state.UIN.length === 9 ) {
      console.log( "Too long" );
    }
    else {
      const newValue = this.state.UIN + i;
      this.setState({ UIN: newValue });
      console.log( "State Change, new state value = " + newValue );
    }
  }

  render() {

    // Mozilla: GlobalEventHandlers.onInput
    // --> Could be what we need
    // window.addEventListener() ==> Use with JSX though

    const className = "CSCE 121";
    const UIN = this.state.UIN;

    return (
      <div>
        <div className = "Header">
          Welcome to: {className}
        </div>
        <div id = "wrapCenter" className = "topHUD">
          <div id = "center">
            <b>Please swipe or scan your student ID for attendance.</b>
            <div>
              If you do not have your student ID, enter your UIN and tap submit. 
            </div>
          </div>
        </div>
        <div id = "wrapCenter"> 
          <div id = "center">
            {UIN}
            <Submitbutton
              onClick = { () => this.handleClick() }
            />
            <Numpad
              onClick = {i => this.handleNumpad(i)}
            />
          </div>
          <textarea 
            hidden = {true}
            onKeyPress = {console.log("Google: Mozilla GlobalEventHandlers")}
          />
        </div>
        <div id = "wrapCenter" className = "bottomHUD">
          <div id = "center">
            Welcome NAME
          </div>
        </div>
      </div>
    );
  }
}

export default App;

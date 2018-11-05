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
// - Controls the heavy lifting
// - Maintains the overall state of each sub-component
// - Maintains communication b/t all components
// - Lays out the render positions of components
class App extends Component {

  // Holds the state variables and callback functions
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleNumpad = this.handleNumpad.bind(this);
    this.state = {
      value: "",
    };
  }

  handleClick() {
    const value = this.state.value;
    console.log( "Submit button clicked, captured value = " + value );
    // Here we can send the value somewhere when the user clicks the button
  }

  handleNumpad(i) {
    if( i === "clear" ) {
      const newValue = ""
      this.setState({ value: newValue });
      console.log( "State Change, new state value = " + newValue );
    }
    else if( this.state.value.length === 9 ) {
      console.log( "Too long" );
    }
    else {
      const newValue = this.state.value + i;
      this.setState({ value: newValue });
      console.log( "State Change, new state value = " + newValue );
    }
  }

  // Render & return methods are a staple in each component
  // - They must exist
  render() {

    // We can define typical JS stuff here
    // - e.g. variables, helper functions

    //const value = this.state.value;
    const className = "CSCE 121";
    const UIN = this.state.value;

    // The return is JSX language (Babel)
    // - Babel is a preprocessor JS language that is converted into plain JS
    // - Babel just makes our job easier
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

// Defines what we are pushing into the HTML driver file
// - ONE export default per JS file! No more!
export default App;

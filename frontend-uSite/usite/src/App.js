import React, { Component } from 'react';
import './App.css';

// Sub-component: Textbox
// - Driven by the master component
// - This guy defines a specific textarea and display
class Textbox extends Component {

  // Each render method allows the use of ONE outer </div>
  // - Multiple inner </div> is allowed though
  // - If you are rendering 1 HTML element, you can just return that element
  render() {
    return(
      <div>
        <textarea
          onChange = {this.props.onChange}
          defaultValue = {this.props.value}
        />
        <p>This is the output: {this.props.value}</p>
        <div>
          Also checkout the console log for more info.
        </div>
      </div>
    );
  }

}

class Submitbutton extends Component {

  render() {
    return(
      <div>
        <button
          className = "Submitbutton"
          onClick = {this.props.onClick}
        >
          Submit
        </button>
      </div>
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
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      value: "YES",
    };
  }

  // Defining one of the callback functions
  handleChange(e) {
    this.setState({ value: e.target.value });
    console.log( "State Change, new state value = " + e.target.value );
  }

  handleClick() {
    const value = this.state.value;
    console.log( "Submit button clicked, captured value = " + value );
    // Here we can send the value somewhere when the user clicks the button
  }

  // Render & return methods are a staple in each component
  // - They must exist
  render() {

    // We can define typical JS stuff here
    // - e.g. variables, helper functions

    const value = this.state.value;

    // The return is JSX language (Babel)
    // - Babel is a preprocessor JS language that is converted into plain JS
    // - Babel just makes our job easier
    return (
      <div>
        <div className = "Header">
          Look magic! {value}
        </div>
        <div>
          <Textbox
            onChange = {this.handleChange}
            defaultValue = {this.state.value}
            value = {this.state.value}
          />
        </div>
        <div>
          <Submitbutton
            onClick = { () => this.handleClick() }
          />
        </div>
      </div>
    );
  }
}

// Defines what we are pushing into the HTML driver file
// - ONE export default per JS file! No more!
export default App;

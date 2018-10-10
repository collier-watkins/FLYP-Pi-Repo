import React, { Component } from 'react';
import './App.css';

// Sub-component: Textbox
// - Driven by the master component
// - This guy defines a specific textarea and display
class Textbox extends Component {

  render() {
    return(
      <div>
        <textarea
          onChange = {this.props.onChange}
          defaultValue = {this.props.value}
        />
        <p>{this.props.value}</p>
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
    this.state = {
      value: "YES",
    };
  }

  // Defining one of the callback functions
  handleChange(e) {
    this.setState({ value: e.target.value });
    console.log( "State Change, new state value = " + e.target.value );
  }

  // Render & return methods are a staple in each component
  // - They must exist
  render() {

    // We can define typical JS stuff here
    // - e.g. variables, helper functions

    // The return is JSX language (Babel)
    // - Babel is a preprocessor JS language that is converted into plain JS
    // - Babel just makes our job easier
    return (
      <div>
        <Textbox
          onChange = {this.handleChange}
          defaultValue = {this.state.value}
          value = {this.state.value}
        />
      </div>
    );
  }
}

// Defines what we are pushing into the HTML driver file
// - ONE export default per JS file! No more!
export default App;

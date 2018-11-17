import React, { Component } from "react";
import "./App.css";
import * as api from "./apiCalls.js";
import * as IDparse from "./IDparse.js";

// When we insert a sutdent, save their card ID as null for now

class NumpadButton extends Component {

  render() {
    return(
      <button
        onClick = {() => this.props.onClick()}
        className = "numPad"
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
        </div>
        <div>
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
    this.handleCardReader = this.handleCardReader.bind(this);
    this.state = {
      UIN: "",
      CardReader: "",
      Roster: [], // TODO this will be populated by a Curtis call
    };

  }

  componentDidMount() {

    console.log( "Mounted" );
    this.interval = setInterval( () => this.tick(), 300 );

  }

  checkRoster( cardValue, inputType ) {
    
    console.log( "Checking roster..." );

    if( inputType === "UIN" ) {

      console.log( "UIN input" );

    }

    else if( inputType === "CardReader" ) {

      console.log( "CardReader input" );

      // TODO check if it is an ID or RFID input
      
      if( IDparse.magParser( cardValue, true ) === true ) {

        let parsedMagID = IDparse.magParser( cardValue, false );
        console.log( "Parsed MagID: " + parsedMagID );

        const Roster = this.state.Roster;
        Roster.forEach( function( item, index, array ) {

          const cardNum = Roster[index].cardNum;
          console.log( "Card Number:" + cardNum );


        });

      }

      //else if( IDparse.rfidParse( cardValue, "TEST" ) === true ) {

      //}

    }

  }

  handleClick() {
    const UIN = this.state.UIN;
    console.log( "Submit button clicked, captured value = " + UIN );
    
    // callApi: addStudent
    api.testApi();
    //this.setState({ Roster: api.getRoster( "CSCE_121_500" ) });
    //api.trackAttendance("111001111", "CSCE_121_500", "2018_11_14");
    //console.log( "ROSTER:", this.state.Roster );
    
    this.checkRoster( UIN, "UIN" );

    // Clear the UIN when we are done
    this.setState({ UIN: "" });
  }

  tick(){

    this.refs.MMM.focus();
    const cardReaderValue = this.refs.MMM.value;

    // Increase interval if the whole card reader is not caputred
    if( cardReaderValue !== "" ) {
      console.log( "Sent: " + cardReaderValue );
      this.checkRoster( cardReaderValue, "CardReader" );
      this.refs.MMM.value = "";
      this.setState({ UIN: "" });
    }

  }

  handleCardReader() {
    
    const cardReaderValue = this.refs.MMM.value;
    console.log( "Captured Card Reader: " + cardReaderValue );
    this.setState({ CardReader: cardReaderValue });

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
            <Submitbutton
              onClick = { () => this.handleClick() }
            />
            <div>UIN:{UIN}</div>
            <Numpad
              onClick = {i => this.handleNumpad(i)}
            />
          </div>
          <div>
            <input 
              type = "text"
              hidden = {false}
              autoFocus = {true}
              ref = "MMM"
              onChange = {() => this.handleCardReader()}
              className = "hidden"
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

export default App;

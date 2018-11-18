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
          <br/>
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
      tracking: false,
      prof: [],
      class: "",
      date: "",
      Roster: [{}] 
    };

  }

  componentDidMount() {

    console.log( "Mounted" );
    this.interval = setInterval( () => this.tick(), 300 );
    this.checkProf();

  }

  checkProf( ) {
    
    let date = new Date();
    const YYYY = date.getFullYear();
    const MM = date.getMonth() + 1; // Jan = 0
    const DD = date.getDate();
    let YYYY_MM_DD = YYYY + '_' + MM + '_' + DD;
    this.setState({ date: YYYY_MM_DD });

    // Check Prof
    // If valid get their classes
    // -- Display their classes
    // Based on their selection, get that classes roster
    // Flip boolean tracking
    // Start class
    
    api.getProfessors().then( data => {

      this.setState({ Roster: data.professors });

    });
    
    /*
    api.login( UIN ).then(data => {

      console.log( "Login Data", data.data );
    
    });
    */

    /*
    api.getRoster("CSCE_121_500").then(data => {

      // nice
      this.setState({ Roster: data.data });

    });
    */

    //this.setState( prevState => ({ tracking: !prevState.tracking }) );

  }

  fetchClasses() {

    console.log( "Finish me" );
    const profUIN = this.state.prof.uin;
    api.getCourses().then( data => {

    });

  }

  checkRoster( cardValue, inputType ) {
    
    console.log( "Checking roster..." );

    const Roster = this.state.Roster;
    const date = this.state.date;
    const theClass = this.state.class;
    const tracking = this.state.tracking;

    if( inputType === "UIN" ) {

      console.log( "UIN input: " + Roster.length );
      console.log( "ROSTER:", Roster);

      for( let i = 0; i < Roster.length; ++i ) {

        const rosterUIN = Roster[i].uin;
        const inputUIN = cardValue;

        console.log( "Roster uin:" + rosterUIN );

        if( rosterUIN === inputUIN ) {

          if( tracking === true ) {

            console.log( "Welcome to the class buddy" );
            api.trackAttendance( inputUIN, theClass, date );

          }

          else {

            api.professorExists( inputUIN ).then( data => {

              const existance = data.data;

              if( existance === true ) {

                console.log( "Prof login:", data );
                this.setState( prevState => ({
                  prof: Roster[i],
                  tracking: !prevState.tracking

                }));

                this.fetchClasses();

              }

            });

          }

        }

      }

    }

    else if( inputType === "CardReader" ) {
      
      if( IDparse.magParser( cardValue, true ) === true ) {

        console.log( "Mag Stripe input" );
        let parsedMagID = IDparse.magParser( cardValue, false );
        console.log( "Parsed MagID: " + parsedMagID );

        for( let i = 0; i < Roster.length; ++i ) {

          const cardNum = Roster[i].cardNum;
          console.log( "Card Number:" + cardNum );

          if( cardNum === parsedMagID ) {

            if( tracking === true ) {

              console.log( "Attendance recorded" );
              api.trackAttendance( parsedMagID, theClass, date );

            }

            else {

              api.professorExists( parsedMagID ).then( data => {

                const existance = data.data;

                if( existance === true ) {

                  console.log( "Prof login:", data );
                  this.setState( prevState => ({
                    prof: Roster[i],
                    tracking: !prevState.tracking

                  }));

                  this.fetchClasses();

                }

              });

            }

          }

        }

      }

      else if( IDparse.rfidParser( cardValue, true ) === true ) {

        console.log( "RFID input" );
        let parsedRFID = IDparse.rfidParser( cardValue, false );
        console.log( "Parsed RFID: " + parsedRFID );

        for( let i = 0; i < Roster.length; ++i ) {

          const cardNum = Roster[i].cardNum;
          console.log( "cardNum" + cardNum );

          if( cardNum === parsedRFID ) {

            if( tracking === true ) {

              console.log( "Attendance recorded" );
              api.trackAttendance( parsedRFID, theClass, date );

            }

            else {

              api.professorExists( parsedRFID ).then( data => {

                const existance = data.data;

                if( existance === true ) {

                  console.log( "Prof login:", data );
                  this.setState( prevState => ({
                    prof: Roster[i],
                    tracking: !prevState.tracking

                  }));

                  this.fetchClasses();

                }

              });

            }

          }

        }

      }

      else {

        console.error( "Invalid card read" );

      }

    }

  }

  handleClick() {


    //api.addStudentToClass( "CSCE_121_500", "523002492" );
    //api.updateCardOrRfid( "523002492", "03317156" );
    
    //api.testApi();
    
    const tracking = this.state.tracking;
    const UIN = this.state.UIN;


    console.log( "Submit button clicked, captured value = " + UIN );

    this.checkRoster( UIN, "UIN" );

    // Clear the UIN when we are done
    this.setState({ UIN: "" });

  }

  tick(){

    this.refs.MMM.focus();
    const cardReaderValue = this.refs.MMM.value;
    const tracking = this.state.tracking;

    // Increase interval if the whole card reader is not caputred
    if( cardReaderValue !== "" ) {

      console.log( "Sent: " + cardReaderValue );

      //if( tracking === true )

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
    const trackingStatus = this.state.tracking;

    return (

      <div>

        <div className = "Header">
          Welcome to: {className}
        </div>

        <div id = "wrapCenter" className = "topHUD" hidden = {trackingStatus}>
          <div id = "center">
            <b>Please swipe/scan your ID and select a class to start tracking attendenace</b>
            <div>
              If you do not have your student ID, enter your UIN and tap submit. 
            </div>
          </div>
        </div>

        <div id = "wrapCenter" className = "topHUD" hidden = {!trackingStatus}>
          <div id = "center">
            <b>Please swipe or scan your student ID for attendance.</b>
            <div>
              If you do not have your student ID, enter your UIN and tap submit. 
            </div>
          </div>
        </div>

        <br/>
        <div id = "wrapCenter"> 
          <div id = "center">
            <Submitbutton
              onClick = { () => this.handleClick() }
            />
            <div><b>UIN:</b>{UIN}</div>
            <br/>
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
              className = "commando"
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

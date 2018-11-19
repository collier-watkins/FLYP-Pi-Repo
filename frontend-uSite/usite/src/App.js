import React, { Component } from "react";
import "./App.css";
import * as api from "./apiCalls.js";
import * as IDparse from "./IDparse.js";

// TODO: Find a better place to pull the current professors from
// ----> Not componentDidMount() b/c internet connectivity could be shoddy
// ----> If no prof roster is pulled then we need to poll for it every couple of seconds
// TODO: If prof has no classes, let em know
// TODO: Remove the attendanceStatus student name on an interval

class ClassList extends Component {

  handleClick(i) {
    this.props.onClick(i);
  }

  render() {
    return(
      <ul>
        {this.props.items.map( item => (
          <button 
            className = "classButton"
            key = {item.text}
            onClick = {() => this.handleClick(item.text)}
          >
            {item.text}
          </button>
        ))}
      </ul>
    );
  }

}

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
    this.handleSelectedClass = this.handleSelectedClass.bind(this);
    this.state = {
      UIN: "",
      CardReader: "",
      tracking: false,
      linking: false,
      attendanceStatus: false,
      student: "",
      prof: {},
      currClass: "FLYP",
      date: "",
      items: [],
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
    
    api.getProfessors().then( data => {

      this.setState({ Roster: data.professors });

    });

  }

  fetchClasses() {

    const profUIN = this.state.prof.uin;

    api.getCourses( profUIN ).then( data => {

      console.log( "Profs courses:", data.data );
      for( let i = 0; i < data.data.length; ++i ) {

        const className = data.data[i].course_id;
        const key = className;
        console.log( "Adding class:" + className );

        const newItem = { text: className, key: key };

        this.setState( prevState => ({ 
          items: prevState.items.concat( newItem )
        }));
      }

    });

  }

  handleSelectedClass( chosenClass ) {

    console.log( "Chose class: " + chosenClass );

    this.setState( prevState => ({ 
      tracking: !prevState.tracking,
      currClass: chosenClass
    }));

    const currentDate = this.state.date;
    api.addAttendanceDay( chosenClass, currentDate );

    console.log( "Pulling student roster for: " + chosenClass );

    api.getRoster( chosenClass ).then(data => {

      this.setState({ Roster: data.data });

    });
    
  }

  // Im so sorry
  checkRoster( cardValue, inputType ) {
    
    console.log( "Checking roster..." );

    const Roster = this.state.Roster;
    const date = this.state.date;
    const theClass = this.state.currClass;
    const tracking = this.state.tracking;
    const profUIN = this.state.prof.uin;
    const linking = this.state.linking;

    let recognizedCard = false;
    let parsedCard = "";
    let linkingStatus = false;

    if( inputType === "UIN" ) {

      const inputUIN = cardValue;

      console.log( "UIN input: " + Roster.length );
      console.log( "ROSTER:", Roster);

      if( profUIN === inputUIN && tracking === true ) {

        console.log( "Tracking Stopped, Prof logged out" );
        this.setState( prevState => ({
          tracking: !prevState.tracking,
          currClass: "FLYP",
          items: [],
          prof: {}
        }));

        this.checkProf();

      }

      else {

        for( let i = 0; i < Roster.length; ++i ) {

          const rosterUIN = Roster[i].uin;

          console.log( "Roster uin: " + rosterUIN );

          if( rosterUIN === inputUIN ) {

            if( linking === true ) {

              const cardReader = this.state.cardReader;
              console.log( "Linking UIN " + inputUIN + " to card value: " + cardReader );
              api.updateCardOrRfid( inputUIN, cardReader );
              this.setState({ linking: false });
              linkingStatus = true;

              // Update local roster
              if( cardReader.length < 10 ) {
                Roster[i].rfidNum = cardReader;
              }
              else {
                Roster[i].cardNum = cardReader;
              }

            }

            else if( tracking === true ) {

              console.log( "Welcome to the class buddy" );
              api.trackAttendance( inputUIN, theClass, date );
              const uinStudent = Roster[i].firstName;
              this.setState({ 
                student: uinStudent,
                attendanceStatus: true
              });

            }

            else {

              api.professorExists( inputUIN ).then( data => {

                const existance = data.data;

                if( existance === true ) {

                  console.log( "Prof login:", data );
                  this.setState( prevState => ({
                    prof: Roster[i],
                    //tracking: !prevState.tracking

                  }));

                  this.fetchClasses();

                }

              });

            }

          }

        }

      }

      if( linkingStatus === false && linking === true ) {

        console.log( "User failed linking UIN to card value" );
        this.setState({ linking: false });

      }

    }

    else if( inputType === "CardReader" && linking === false ) {
      
      if( IDparse.magParser( cardValue, true ) === true ) {

        console.log( "Mag Stripe input" );
        let parsedMagID = IDparse.magParser( cardValue, false );
        parsedCard = parsedMagID;
        console.log( "Parsed MagID: " + parsedMagID );

        for( let i = 0; i < Roster.length; ++i ) {

          const cardNum = Roster[i].cardNum;
          console.log( "Card Number:" + cardNum );

          if( cardNum === parsedMagID ) {

            recognizedCard = true;

            if( tracking === true ) {

              console.log( "Attendance recorded" );
              api.trackAttendance( parsedMagID, theClass, date );
              const uinStudent = Roster[i].firstName;
              this.setState({ 
                student: uinStudent,
                attendanceStatus: true
              });

            }

            else {

              api.professorExists( parsedMagID ).then( data => {

                const existance = data.data;

                if( existance === true ) {

                  console.log( "Prof login:", data );
                  this.setState( prevState => ({
                    prof: Roster[i],
                    //tracking: !prevState.tracking

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
        parsedCard = parsedRFID;
        console.log( "Parsed RFID: " + parsedRFID );

        for( let i = 0; i < Roster.length; ++i ) {

          const cardNum = Roster[i].cardNum;
          console.log( "cardNum" + cardNum );

          if( cardNum === parsedRFID ) {

            recognizedCard = true;

            if( tracking === true ) {

              console.log( "Attendance recorded" );
              api.trackAttendance( parsedRFID, theClass, date );
              const uinStudent = Roster[i].firstName;
              this.setState({ 
                student: uinStudent,
                attendanceStatus: true
              });

            }

            else {

              api.professorExists( parsedRFID ).then( data => {

                const existance = data.data;

                if( existance === true ) {

                  console.log( "Prof login:", data );
                  this.setState( prevState => ({
                    prof: Roster[i],
                    //tracking: !prevState.tracking

                  }));

                  this.fetchClasses();

                }

              });

            }

          }

        }

      }

      if( recognizedCard === false ) {

        console.log( "Unrecognized Card: " + parsedCard );
        this.setState({
          linking: true,
          cardReader: parsedCard
        });

      }

    }

  }

  handleClick() {

    const UIN = this.state.UIN;

    if( UIN.length === 9 ) {

      console.log( "Submit button clicked, captured value = " + UIN );

      this.checkRoster( UIN, "UIN" );

    }

    else {
      console.log( "UIN input length is not 9, try again" );
      this.setState({ linking: false });
    }

    // Clear the UIN when we are done
    this.setState({ UIN: "" });

  }

  tick(){

    this.refs.MMM.focus();
    const cardReaderValue = this.refs.MMM.value;

    // Increase interval if the whole card reader is not caputred
    if( cardReaderValue.length >= 8 ) {

      console.log( "Sent: " + cardReaderValue );

      this.checkRoster( cardReaderValue, "CardReader" );

      this.refs.MMM.value = "";
      this.setState({ UIN: "" });

    }

    else {
      this.refs.MMM.value = "";
    }

  }

  handleCardReader() {
    
    const cardReaderValue = this.refs.MMM.value;
    console.log( "Captured Card Reader: " + cardReaderValue );
    //this.setState({ CardReader: cardReaderValue });

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

    const currClass = this.state.currClass;
    const UIN = this.state.UIN;
    const trackingStatus = this.state.tracking;
    const items = this.state.items;
    const linking = this.state.linking;
    const attendanceStatus = this.state.attendanceStatus;
    const student = this.state.student;

    return (

      <div>

        <div className = "Header">
          Welcome to: {currClass}
        </div>

        <div id = "wrapCenter" className = "topHUD" hidden = {trackingStatus}>
          <div id = "center">
            <b>Please swipe/scan your ID and select a class to start tracking attendenace</b>
            <div>
              If you do not have your student ID, enter your UIN and tap submit. 
            </div>
            <ClassList
              items = {items}
              onClick = {i => this.handleSelectedClass(i)}
            />
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

        <div id = "wrapCenter" className = "linkingCard" hidden = {!linking}>
          <b>Unrecognized MagStripe or RFID card input</b> 
          <div>
            please input your UIN using the keypad to link it to your card.  
          </div>
        </div>

        <div id = "wrapCenter" className = "linkingCard" hidden = {!attendanceStatus}>
          <b>Attendance Recorded: </b> {student}
        </div>

        <br/>
        <div id = "wrapCenter"> 
          <div id = "center">
            <Submitbutton
              onClick = { () => this.handleClick() }
            />
            <div><b>UIN:</b>{UIN}</div>
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

      </div>
    );
  }
}

export default App;

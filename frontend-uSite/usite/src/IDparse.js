// hash length is 64
// total length is 65 b/c of appended "r" or "m"
import * as crypto from "crypto";

export function magParser(rawData, test){

  //var regexFull = /[%]([0-9]{16})\?([;+]\1\?([+]\1\?)?)?/;
  var regexFull = /[\+\%;](\d{16})/;

  var result = regexFull.test(rawData);

  if( test === true && result === true ) {

    return true;

  }

  else if( test === false ) {

      const hash = crypto.createHash('sha256');
      var cardID = regexFull.exec(rawData)[1]; 
      hash.update( cardID );
      //const finalHash = "m" + hash.digest('hex');
      const finalHash = hash.digest('hex');
      console.log( "MagStripe hash:", finalHash );
      return( finalHash ); 

  }

  else {

    return false;

  }

}


export function rfidParser( rawData, test ){

  var regexFull = /([0-9]{8})/; 

  var result = regexFull.test(rawData);

  if( test === true && result === true ){

    return true;

  }

  else if( test === false ) {

    const hash = crypto.createHash('sha256');
    var cardID = regexFull.exec(rawData)[1];
    hash.update( cardID );
    //const finalHash = "r" + hash.digest('hex');
    const finalHash = hash.digest('hex');
    console.log( "RFID hash:", finalHash );
    return( finalHash );

  }

  else {

    return false;

  }

}



export function uinParser(rawData){

	var regexFull = /^[0-9]{3}00[0-9]{4}$/

	var result = regexFull.test(rawData);

	if(result){
		//No need to hash UIN
		return rawData;
	}
	else{
		return "Regected";
	}

	return "end of function";
}

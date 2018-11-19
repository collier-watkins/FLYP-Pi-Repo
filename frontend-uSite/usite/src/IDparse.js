// Must import 'forge-sha256/build/forge-sha256.min.js'
//import p from "./forge-sha256/build/forge-sha256.min.js";

export function magParser(rawData, test){

  //var regexFull = /[%]([0-9]{16})\?([;+]\1\?([+]\1\?)?)?/;
  var regexFull = /[\+\%;](\d{16})/;

  var result = regexFull.test(rawData);

  if( test === true && result === true ) {

    return true;

  }

  else if( test === false ) {

      var cardID = regexFull.exec(rawData)[1]; 
      //return forge_sha256(cardID); //Hash card ID
      return( cardID ); 

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

    var cardID = regexFull.exec(rawData)[1];
    return( cardID );

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

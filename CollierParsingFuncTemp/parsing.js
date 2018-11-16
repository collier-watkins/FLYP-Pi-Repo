// Must import 'forge-sha256/build/forge-sha256.min.js'



function magParser(rawData){

	var regexFull = /[%]([0-9]{16})\?([;+]\1\?([+]\1\?)?)?/;

	var result = regexFull.test(rawData);

	if(result){	
		//Grab string of numbers, send through hash
		var cardID = regexFull.exec(rawData)[1]; //Get first capturing group from Regex
		return forge_sha256(cardID);	//Hash card ID
	}
	else{
		return "Regected";
	}

	return "end of function";
}


function rfidParser(rawData){

	var regexFull = /[0-9]{8}/ //Incomplete. Need dummy data

	var result = regexFull.test(rawData);

	if(result){
		var cardID = regexFull.exec(rawData)[1];	//Get first capturing group from Regex
		return forge_sha256(cardID);	//Hash card ID
	}

	else{
		return "Regected";
	}

	return "end of function";
}



function uinParser(rawData){

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

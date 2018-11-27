//require crypto library
const crypto = require('crypto');


//make sure "hash" is a local object so it gets deleted after the final hashed value is passed
//based on the crypto lib documentation, hash and hash.digest can only be used once per object
const hash = crypto.createHash('sha256');

var input = "TODO here is the swipe input";
var append = "m";

if (input[0] == "r") {
    append = "r";
}

hash.update(input);
var hashed_val = hash.digest('hex');

//final_hashed_val includes the "m" or "r" identifier in order to maintain the distinction between mag stripe and RFID codes
var final_hashed_val = append + hashed_val;
console.log(final_hashed_val);
// Stand alone file to test that the card reader is working
// just run it like $ node usb-poll
// OR: require it to slap it in somewhere
const USB = require("./usb-provider");
var usb = new USB();

var HID = require('node-hid');
console.log( 'Devices:', HID.devices() );

var deviceHandle = null;

usb.on('usbconnect', function(h) {
  
  console.log( "Usb Connect" );

  deviceHandle = h;

  deviceHandle.on('data', (data) => {

    //var hex = data.toString('hex');
    console.log( "Swipe data: " + data );

  });

});

usb.poll();

